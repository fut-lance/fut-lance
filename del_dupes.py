import requests
import time

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

# Delete bad-slug duplicates
to_delete = [
    "hmn8ui9se3anmz89y339pun0",  # Lewandowski slug=ww-
    "qaaqoigj17dakrpuqfm2mso9",  # Walace slug=w-
]

for doc_id in to_delete:
    r = requests.delete(f"https://fut-lance-cms-v2.onrender.com/api/noticias/{doc_id}", headers=HDR, timeout=60)
    print(f"  {doc_id}: {r.status_code}")
    time.sleep(1)

# Verify
HDR2 = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[pageSize]=1", headers=HDR2, timeout=60)
total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"\nTotal apos limpeza: {total}")

# Check for remaining dupes
page = 1
all_news = []
while True:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[page]={page}&pagination[pageSize]=25", headers=HDR2, timeout=60)
    items = r.json().get("data", [])
    all_news.extend(items)
    pc = r.json().get("meta", {}).get("pagination", {}).get("pageCount", 1)
    if page >= pc:
        break
    page += 1

from collections import Counter
titles = [n.get("titulo", "") for n in all_news]
title_dupes = {t: c for t, c in Counter(titles).items() if c > 1}
print(f"Titulos duplicados restantes: {len(title_dupes)}")
