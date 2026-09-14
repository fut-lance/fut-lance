import requests

import os
TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

# Get category IDs
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/categorias?pagination[pageSize]=100", headers=HDR, timeout=60)
cat_map = {}
for c in r.json().get("data", []):
    cat_map[c["id"]] = c.get("slug", "?")

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

print(f"Total: {len(all_news)} noticias\n")

# Show by category with titles
cats = {}
for n in all_news:
    cat = n.get("categoria", {})
    cat_nome = cat.get("nome", "?") if cat else "SEM"
    if cat_nome not in cats:
        cats[cat_nome] = []
    cats[cat_nome].append(n.get("titulo", "?"))

for cat, items in sorted(cats.items()):
    print(f"=== {cat} ({len(items)}) ===")
    for t in items:
        print(f"  - {t[:70]}")
    print()
