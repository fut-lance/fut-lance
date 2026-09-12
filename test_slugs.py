import requests

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
headers = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

# Get first 5 Brasileirão news with slugs
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]=Brasileir%C3%A3o&sort=data_publicacao:desc&pagination[pageSize]=5", headers=headers, timeout=60)
items = r.json().get("data", [])
print("=== PRIMEIRAS 5 NOTICIAS BRASILEIRAO ===")
for n in items:
    print(f"  slug={n.get('slug','?')}")
    print(f"  titulo={n.get('titulo','?')[:60]}")
    print(f"  conteudo={str(n.get('conteudo',''))[:80]}...")
    print()

# Test slug lookup
if items:
    test_slug = items[0].get('slug')
    print(f"\n=== TESTANDO SLUG: {test_slug} ===")
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?filters[slug][$eq]={test_slug}&populate=*", headers=headers, timeout=60)
    result = r.json().get("data", [])
    print(f"  Resultado: {len(result)} item(s)")
    if result:
        print(f"  Titulo: {result[0].get('titulo','?')}")
