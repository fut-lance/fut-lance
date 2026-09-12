import requests
import json

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

print("=== STATUS ATUAL ===")
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

print(f"Total: {len(all_news)} noticias")

# Check by category
cats = {}
for n in all_news:
    cat = n.get("categoria", {})
    cat_name = cat.get("nome", "SEM") if cat else "SEM"
    cats[cat_name] = cats.get(cat_name, 0) + 1

print("\nPor categoria:")
for c, q in sorted(cats.items()):
    print(f"  {c}: {q}")

# Check slugs
slugs = [n.get("slug", "") for n in all_news]
bad_slugs = [s for s in slugs if not s or s.startswith("-")]
print(f"\nSlugs invalidos: {len(bad_slugs)}")
if bad_slugs:
    for s in bad_slugs[:5]:
        print(f"  {s}")

# Check duplicates
from collections import Counter
dupes = [s for s, c in Counter(slugs).items() if c > 1]
print(f"Slugs duplicados: {len(dupes)}")
if dupes:
    for s in dupes:
        print(f"  {s}")
