import requests
import json
from collections import Counter

import os
TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
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
