import requests

TOKEN = "***REMOVED***"
headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

# Fix slugs for categories that are missing them
fixes = [
    (1, "brasileirao"),
    (2, "libertadores"),
]

for cat_id, slug in fixes:
    r = requests.put(
        f"https://fut-lance-cms-v2.onrender.com/api/categorias/{cat_id}",
        headers=headers,
        json={"data": {"slug": slug}},
        timeout=60
    )
    if r.status_code == 200:
        print(f"OK: Categoria {cat_id} agora tem slug={slug}")
    else:
        print(f"ERRO {r.status_code}: {r.text[:200]}")

# Verify
print("\n=== VERIFICAÇÃO ===")
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/categorias?pagination[pageSize]=100", headers=headers, timeout=60)
for c in r.json().get("data", []):
    print(f"  id={c['id']} nome={c.get('nome','?')} slug={c.get('slug','?')}")
