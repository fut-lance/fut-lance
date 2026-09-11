import requests
import time
import re
from datetime import datetime

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "***REMOVED***"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept-Charset": "utf-8"
}

def generate_slug(title):
    slug = title.lower()
    slug = re.sub(r'[àáâãäå]', 'a', slug)
    slug = re.sub(r'[èéêë]', 'e', slug)
    slug = re.sub(r'[ìíîï]', 'i', slug)
    slug = re.sub(r'[òóôõö]', 'o', slug)
    slug = re.sub(r'[ùúûü]', 'u', slug)
    slug = re.sub(r'[ç]', 'c', slug)
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug

print("=" * 60)
print("CORRIGINDO SLUGS")
print("=" * 60)

resp = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=10", headers=headers, timeout=60)
if resp.status_code == 200:
    noticias = resp.json().get("data", [])
    print(f"Total: {len(noticias)} noticias")
    
    for n in noticias:
        if not n.get("slug"):
            slug = generate_slug(n["titulo"])
            print(f"Atualizando: {n['titulo'][:40]}... -> {slug}")
            
            update_resp = requests.put(
                f"{STRAPI_URL}/api/noticias/{n['documentId']}",
                headers=headers,
                json={"data": {"slug": slug}},
                timeout=60
            )
            if update_resp.status_code == 200:
                print(f"  OK")
            else:
                print(f"  ERRO: {update_resp.status_code}")
            time.sleep(3)

print("\nCONCLUIDO")
