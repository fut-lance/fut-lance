import requests

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

print("=== CHAMPIONS LEAGUE ===")
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]=Champions%20League&sort=data_publicacao:desc&populate=*", headers=HDR, timeout=60)
items = r.json().get("data", [])
total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"Total: {total}")
for n in items[:5]:
    print(f"  slug={n.get('slug','?')[:50]} | titulo={n.get('titulo','?')[:50]}")

print("\n=== TRANSFERENCIAS ===")
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]=Transfer%C3%AAncias&sort=data_publicacao:desc&populate=*", headers=HDR, timeout=60)
items2 = r.json().get("data", [])
total2 = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"Total: {total2}")
for n in items2[:5]:
    print(f"  slug={n.get('slug','?')[:50]} | titulo={n.get('titulo','?')[:50]}")

# Check if there's a encoding issue with category name
print("\n=== CATEGORIAS ===")
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/categorias?pagination[pageSize]=100", headers=HDR, timeout=60)
for c in r.json().get("data", []):
    print(f"  id={c['id']} nome={c.get('nome','?')} slug={c.get('slug','?')}")
