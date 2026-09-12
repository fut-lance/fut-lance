import requests

TOKEN = "***REMOVED***"
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
