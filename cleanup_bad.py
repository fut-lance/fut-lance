import requests
import json
import time
import re
import unicodedata

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
headers_auth = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

def make_slug(title):
    # Normalize unicode and remove accents
    nfkd = unicodedata.normalize('NFKD', title)
    ascii_title = ''.join(c for c in nfkd if not unicodedata.combining(c))
    s = ascii_title.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s[:80]

# 1. Delete ALL news (except the 5 originals)
print("=== LIMPANDO NOTICIAS ANTIGAS ===")
page = 1
to_delete = []
while True:
    r = requests.get(f"{STRAPI_URL}/api/noticias?pagination[page]={page}&pagination[pageSize]=25", headers=headers_auth, timeout=60)
    items = r.json().get("data", [])
    for n in items:
        slug = n.get("slug", "")
        # Keep only the 5 originals (they have proper slugs)
        if not slug or slug.startswith("--") or slug.startswith("-"):
            to_delete.append(n.get("documentId"))
    page_count = r.json().get("meta", {}).get("pagination", {}).get("pageCount", 1)
    if page >= page_count:
        break
    page += 1

print(f"  Encontradas {len(to_delete)} noticias para deletar")

for doc_id in to_delete:
    r = requests.delete(f"{STRAPI_URL}/api/noticias/{doc_id}", headers=headers_auth, timeout=60)
    if r.status_code == 200:
        print(f"  Deletado: {doc_id}")
    else:
        print(f"  Erro ao deletar {doc_id}: {r.status_code}")
    time.sleep(1)

print(f"\n  Total deletadas: {len(to_delete)}")
