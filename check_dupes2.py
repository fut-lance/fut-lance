import requests
from collections import Counter

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

page = 1
all_news = []
while True:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[page]={page}&pagination[pageSize]=25&populate=categoria", headers=HDR, timeout=60)
    items = r.json().get("data", [])
    all_news.extend(items)
    pc = r.json().get("meta", {}).get("pagination", {}).get("pageCount", 1)
    if page >= pc:
        break
    page += 1

# Check by title
titles = [n.get("titulo", "") for n in all_news]
title_counts = Counter(titles)
dupes = {t: c for t, c in title_counts.items() if c > 1}

print(f"Total: {len(all_news)} noticias")
print(f"Titulos unicos: {len(set(titles))}")

if dupes:
    print(f"\n{len(dupes)} titulos duplicados:")
    for title, count in dupes.items():
        print(f"\n  '{title[:60]}' aparece {count}x")
        found = [n for n in all_news if n.get("titulo") == title]
        for n in found:
            print(f"    slug={n.get('slug','?')} | cat={n.get('categoria',{}).get('nome','?') if n.get('categoria') else '?'} | id={n.get('documentId','?')}")
