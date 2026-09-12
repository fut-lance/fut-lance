import requests

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
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
