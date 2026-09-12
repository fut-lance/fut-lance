import requests

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
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
