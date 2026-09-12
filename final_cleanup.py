import requests
import time

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
HDR_GET = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

# Find and delete bad slugs
page = 1
bad = []
while True:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[page]={page}&pagination[pageSize]=25", headers=HDR_GET, timeout=60)
    items = r.json().get("data", [])
    for n in items:
        slug = n.get("slug", "")
        if not slug or slug.startswith("-") or slug.startswith("w-") or slug.startswith("ww-") or len(slug) < 5:
            bad.append(n.get("documentId"))
            print(f"Bad slug: {slug} | {n.get('titulo','?')[:40]} | docId={n.get('documentId')}")
    pc = r.json().get("meta", {}).get("pagination", {}).get("pageCount", 1)
    if page >= pc:
        break
    page += 1

if bad:
    print(f"\nDeletando {len(bad)} slugs ruins...")
    for doc_id in bad:
        r = requests.delete(f"https://fut-lance-cms-v2.onrender.com/api/noticias/{doc_id}", headers=HDR, timeout=60)
        print(f"  {r.status_code}: {doc_id}")
        time.sleep(1)

# Also find title duplicates
from collections import Counter
page = 1
all_news = []
while True:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[page]={page}&pagination[pageSize]=25", headers=HDR_GET, timeout=60)
    items = r.json().get("data", [])
    all_news.extend(items)
    pc = r.json().get("meta", {}).get("pagination", {}).get("pageCount", 1)
    if page >= pc:
        break
    page += 1

titles = [n.get("titulo", "") for n in all_news]
title_dupes = {t: c for t, c in Counter(titles).items() if c > 1}
if title_dupes:
    print(f"\n{len(title_dupes)} titulos duplicados:")
    for title, count in title_dupes.items():
        found = [n for n in all_news if n.get("titulo") == title]
        # Keep the one with the better slug, delete others
        for n in found[1:]:
            r = requests.delete(f"https://fut-lance-cms-v2.onrender.com/api/noticias/{n.get('documentId')}", headers=HDR, timeout=60)
            print(f"  Deleted duplicate: {n.get('slug')} | {r.status_code}")
            time.sleep(1)
else:
    print("\nNenhum titulo duplicado.")

# Final count
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[pageSize]=1", headers=HDR_GET, timeout=60)
total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"\nTotal final: {total}")
