import requests
import json

import os
TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
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
