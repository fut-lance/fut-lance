import requests

import os
TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

# Exact same query as frontend
print("=== TESTE EXATO DO FRONTEND ===")
r = requests.get(
    "https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]=Brasileir%C3%A3o&sort=data_publicacao:desc&populate=*",
    headers=HDR, timeout=60
)
data = r.json()
total = data.get("meta", {}).get("pagination", {}).get("total", 0)
items = data.get("data", [])
print(f"Brasileirao com populate=*: {total} noticias, {len(items)} returned")

# Without populate
r2 = requests.get(
    "https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]=Brasileir%C3%A3o&sort=data_publicacao:desc",
    headers=HDR, timeout=60
)
total2 = r2.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"Brasileirao sem populate: {total2} noticias")

# Check a Brasileirão article with populate
if items:
    n = items[0]
    print(f"\nExemplo de noticia:")
    print(f"  titulo: {n.get('titulo','?')[:60]}")
    print(f"  slug: {n.get('slug','?')}")
    print(f"  categoria: {n.get('categoria',{})}")
    print(f"  imagem_url: {n.get('imagem_url','?')[:80]}")
    print(f"  conteudo: {str(n.get('conteudo',''))[:100]}")

# Check with documentId populate
r3 = requests.get(
    "https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]=Brasileir%C3%A3o&sort=data_publicacao:desc&populate[categoria][fields]=nome,slug",
    headers=HDR, timeout=60
)
total3 = r3.json().get("meta", {}).get("pagination", {}).get("total", 0)
items3 = r3.json().get("data", [])
print(f"\nBrasileirao com nested populate: {total3} noticias")
if items3:
    print(f"  categoria: {items3[0].get('categoria',{})}")
