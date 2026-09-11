import requests
import json

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"

headers = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

print("=" * 70)
print("ETAPA 1 — AUDITORIA COMPLETA")
print("=" * 70)

# Get all news
all_noticias = []
page = 1
while True:
    r = requests.get(f"{STRAPI_URL}/api/noticias?pagination[page]={page}&pagination[pageSize]=25&populate=*", headers=headers, timeout=60)
    if r.status_code != 200:
        print(f"Erro ao buscar pagina {page}: {r.status_code}")
        break
    data = r.json()
    items = data.get("data", [])
    all_noticias.extend(items)
    pagination = data.get("pagination", {})
    if page >= pagination.get("pageCount", 1):
        break
    page += 1

print(f"\nTotal de noticias: {len(all_noticias)}")
print()

# Classify each news
for n in all_noticias:
    titulo = n.get("titulo", "SEM TITULO")
    cat = n.get("categoria", {}).get("nome", "SEM CATEGORIA") if n.get("categoria") else "SEM CATEGORIA"
    slug = n.get("slug", "NONE")
    data_pub = n.get("data_publicacao", "NONE")
    imagem = n.get("imagem_url", "NONE")
    resumo = n.get("resumo", "")
    
    # Check status
    issues = []
    if not slug:
        issues.append("SEM SLUG")
    if not imagem or imagem == "NONE":
        issues.append("SEM IMAGEM")
    if cat == "SEM CATEGORIA":
        issues.append("SEM CATEGORIA")
    if not resumo:
        issues.append("SEM RESUMO")
    
    status = "OK" if not issues else " | ".join(issues)
    print(f"[{cat:20}] {titulo[:50]:50} | {status}")

print()
print("=" * 70)
print("AUDITORIA CONCLUIDA")
print("=" * 70)
