import requests
import json
from collections import Counter

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
HDR_GET = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

# Get ALL news
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

print(f"Total: {len(all_news)} noticias")

# Find duplicates by slug
slugs = [n.get("slug", "") for n in all_news]
slug_counts = Counter(slugs)
dupes = {s: c for s, c in slug_counts.items() if c > 1}

if not dupes:
    print("Nenhuma duplicata encontrada!")
else:
    print(f"\n{len(dupes)} slugs duplicados encontrados:")
    to_delete = []
    for slug, count in dupes.items():
        print(f"\n  '{slug}' aparece {count}x")
        # Keep the first one, delete the rest
        found = [n for n in all_news if n.get("slug") == slug]
        for n in found[1:]:
            to_delete.append(n.get("documentId"))
            print(f"    Deletar: {n.get('documentId')} | {n.get('titulo','?')[:50]}")
    
    print(f"\nDeletando {len(to_delete)} duplicatas...")
    for doc_id in to_delete:
        r = requests.delete(f"https://fut-lance-cms-v2.onrender.com/api/noticias/{doc_id}", headers=HDR, timeout=60)
        if r.status_code in [200, 204]:
            print(f"  OK: {doc_id}")
        else:
            print(f"  ERRO {r.status_code}: {doc_id}")
        import time
        time.sleep(1)
    
    # Verify
    r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[pageSize]=1", headers=HDR_GET, timeout=60)
    total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
    print(f"\nTotal apos limpeza: {total} noticias")
