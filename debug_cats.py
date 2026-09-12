import requests
import json

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
headers = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

# 1. Check categories
print("=== CATEGORIAS NO STRAPI ===")
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/categorias?pagination[pageSize]=100", headers=headers, timeout=60)
cats = r.json().get("data", [])
for c in cats:
    print(f"  id={c['id']} nome={c.get('nome','?')} slug={c.get('slug','?')}")

# 2. Check news by category
print("\n=== NOTICIAS POR CATEGORIA ===")
for cat in cats:
    cat_id = cat['id']
    cat_nome = cat.get('nome', '?')
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][id][$eq]={cat_id}&pagination[pageSize]=100", headers=headers, timeout=60)
    items = r.json().get("data", [])
    total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
    print(f"  [{cat_nome}] {total} noticias")

# 3. Check how frontend queries
print("\n=== TESTE QUERY DO FRONTEND ===")
for slug_name, nome_real in [("brasileirao", "Brasileirão"), ("libertadores", "Libertadores"), ("champions-league", "Champions League"), ("transferencias", "Transferências")]:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]={nome_real}&sort=data_publicacao:desc&populate=*&pagination[pageSize]=5", headers=headers, timeout=60)
    items = r.json().get("data", [])
    total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
    print(f"  [{nome_real}] query={slug_name} -> {total} noticias")
    if items:
        print(f"    Primeira: {items[0].get('titulo','?')[:50]}")
