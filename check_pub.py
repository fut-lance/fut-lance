import requests
import json

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
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
