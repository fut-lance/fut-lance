import requests

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
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
