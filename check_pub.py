import requests
import json

TOKEN = "***REMOVED***"
headers = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

# Check all news with pagination
page = 1
total = 0
published = 0
draft = 0
while True:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[page]={page}&pagination[pageSize]=25&populate=categoria", headers=headers, timeout=60)
    data = r.json()
    items = data.get("data", [])
    total = data.get("meta", {}).get("pagination", {}).get("total", 0)
    
    for n in items:
        pub = n.get("publishedAt")
        cat = n.get("categoria", {})
        cat_name = cat.get("nome", "SEM_CAT") if cat else "SEM_CAT"
        titulo = n.get("titulo", "?")[:50]
        if pub:
            published += 1
            status = "PUBLICADA"
        else:
            draft += 1
            status = "RASCUNHO"
        print(f"  [{status:9}] [{cat_name:15}] {titulo}")
    
    page_count = data.get("meta", {}).get("pagination", {}).get("pageCount", 1)
    if page >= page_count:
        break
    page += 1

print(f"\nTotal: {total} | Publicadas: {published} | Rascunho: {draft}")
