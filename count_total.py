import requests

TOKEN = "***REMOVED***"
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[pageSize]=1", headers=HDR, timeout=60)
total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"Total no Strapi: {total}")

# Count by category
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

cats = {}
for n in all_news:
    cat = n.get("categoria", {})
    cat_nome = cat.get("nome", "?") if cat else "?"
    cats[cat_nome] = cats.get(cat_nome, 0) + 1

print(f"\nPor categoria:")
for c, q in sorted(cats.items()):
    print(f"  {c}: {q}")
print(f"  TOTAL: {sum(cats.values())}")
