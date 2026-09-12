import requests

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
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
