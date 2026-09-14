import requests
import time

import os
TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

# Get categories with documentId
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/categorias?pagination[pageSize]=100", 
    headers={"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}, timeout=60)
cats = r.json().get("data", [])

for c in cats:
    print(f"  id={c['id']} docId={c.get('documentId','?')} nome={c.get('nome','?')} slug={c.get('slug','?')}")

# Fix slugs using documentId
print("\n=== CORRIGINDO SLUGS ===")
fixes = [
    ("nrnwfb3tqt34lc776ztysfhv", "brasileirao", "Brasileirão"),
    ("rgqtcsh0624cxfoddwk8nq6q", "libertadores", "Libertadores"),
]

for doc_id, slug, nome in fixes:
    r = requests.put(
        f"https://fut-lance-cms-v2.onrender.com/api/categorias/{doc_id}",
        headers=headers,
        json={"data": {"slug": slug}},
        timeout=60
    )
    if r.status_code == 200:
        print(f"  OK: {nome} agora tem slug={slug}")
    else:
        print(f"  ERRO {r.status_code}: {r.text[:200]}")
    time.sleep(2)

# Verify
print("\n=== VERIFICAÇÃO FINAL ===")
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/categorias?pagination[pageSize]=100", 
    headers={"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}, timeout=60)
for c in r.json().get("data", []):
    print(f"  id={c['id']} nome={c.get('nome','?')} slug={c.get('slug','?')}")
