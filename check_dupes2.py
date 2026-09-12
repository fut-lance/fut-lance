import requests
from collections import Counter

TOKEN = "***REMOVED***"
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

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

# Check by title
titles = [n.get("titulo", "") for n in all_news]
title_counts = Counter(titles)
dupes = {t: c for t, c in title_counts.items() if c > 1}

print(f"Total: {len(all_news)} noticias")
print(f"Titulos unicos: {len(set(titles))}")

if dupes:
    print(f"\n{len(dupes)} titulos duplicados:")
    for title, count in dupes.items():
        print(f"\n  '{title[:60]}' aparece {count}x")
        found = [n for n in all_news if n.get("titulo") == title]
        for n in found:
            print(f"    slug={n.get('slug','?')} | cat={n.get('categoria',{}).get('nome','?') if n.get('categoria') else '?'} | id={n.get('documentId','?')}")
