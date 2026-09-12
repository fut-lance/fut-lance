import requests

# Test the same queries the frontend makes
STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"

print("=== TESTE DIRETO DA API ===")

# Test getNoticias (home page)
r = requests.get(f"{STRAPI_URL}/api/noticias?pagination[page]=1&pagination[pageSize]=8&sort=data_publicacao:desc&populate=*", timeout=60)
data = r.json()
total = data.get("meta", {}).get("pagination", {}).get("total", 0)
items = data.get("data", [])
print(f"\nHome page (getNoticias): {total} total, {len(items)} returned")
for n in items[:3]:
    cat = n.get("categoria", {})
    print(f"  - {n.get('titulo','?')[:50]} | cat={cat.get('nome','?') if cat else '?'} | slug={n.get('slug','?')}")

# Test category page query for Brasileirão
r = requests.get(f"{STRAPI_URL}/api/noticias?filters[categoria][nome][$eq]=Brasileir%C3%A3o&sort=data_publicacao:desc&populate=*&pagination[pageSize]=5", timeout=60)
data = r.json()
total = data.get("meta", {}).get("pagination", {}).get("total", 0)
print(f"\nCategoria Brasileirão: {total} noticias")

# Test category page query for Libertadores
r = requests.get(f"{STRAPI_URL}/api/noticias?filters[categoria][nome][$eq]=Libertadores&sort=data_publicacao:desc&populate=*&pagination[pageSize]=5", timeout=60)
data = r.json()
total = data.get("meta", {}).get("pagination", {}).get("total", 0)
print(f"Categoria Libertadores: {total} noticias")

# Test category page query for Champions League
r = requests.get(f"{STRAPI_URL}/api/noticias?filters[categoria][nome][$eq]=Champions%20League&sort=data_publicacao:desc&populate=*&pagination[pageSize]=5", timeout=60)
data = r.json()
total = data.get("meta", {}).get("pagination", {}).get("total", 0)
print(f"Categoria Champions League: {total} noticias")

# Test category page query for Transferências
r = requests.get(f"{STRAPI_URL}/api/noticias?filters[categoria][nome][$eq]=Transfer%C3%AAncias&sort=data_publicacao:desc&populate=*&pagination[pageSize]=5", timeout=60)
data = r.json()
total = data.get("meta", {}).get("pagination", {}).get("total", 0)
print(f"Categoria Transferências: {total} noticias")

# Test news detail
r = requests.get(f"{STRAPI_URL}/api/noticias?filters[slug][$eq]=flamengo-assume-lideranca-do-brasileirao-apos-vitoria-sobre-o-remo-1&populate=*", timeout=60)
data = r.json()
items = data.get("data", [])
print(f"\nTeste noticia slug: {len(items)} resultado(s)")
if items:
    n = items[0]
    print(f"  titulo: {n.get('titulo','?')}")
    print(f"  conteudo: {str(n.get('conteudo',''))[:100]}...")
    print(f"  imagem_url: {n.get('imagem_url','?')[:80]}")
