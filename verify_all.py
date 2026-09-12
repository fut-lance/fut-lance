import requests
import json
from collections import Counter

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

print("=== VERIFICACAO COMPLETA ===\n")

# 1. Get all news
page = 1
all_news = []
while True:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?pagination[page]={page}&pagination[pageSize]=25&populate=categoria", headers=HDR, timeout=60)
    items = r.json().get("data", [])
    all_news.extend(items)
    pc = r.json().get("meta", {}).get("pagination", {}).get("pageCount", 1)
    if page >= pc:
        break
    page += 1

print(f"1. TOTAL: {len(all_news)} noticias")

# 2. By category
cats = {}
for n in all_news:
    cat = n.get("categoria", {})
    cat_name = cat.get("nome", "SEM") if cat else "SEM"
    cats[cat_name] = cats.get(cat_name, 0) + 1
print(f"\n2. POR CATEGORIA:")
for c, q in sorted(cats.items()):
    print(f"   {c}: {q}")

# 3. Slugs
slugs = [n.get("slug", "") for n in all_news]
bad = [s for s in slugs if not s or s.startswith("-")]
dupes = [(s, c) for s, c in Counter(slugs).items() if c > 1]
print(f"\n3. SLUGS:")
print(f"   Invalidos: {len(bad)}")
print(f"   Duplicados: {len(dupes)}")
if dupes:
    for s, c in dupes:
        print(f"     '{s}' aparece {c}x")

# 4. Test slug query (simula frontend)
print(f"\n4. TESTE SLUG QUERY:")
test_slugs = [
    "flamengo-assume-lideranca-do-brasileirao-apos-vitoria-sobre-o-remo",
    "fluminense-goleia-platense-e-abre-vantagem-nas-quartas",
    "real-madrid-vence-inter-por-2-a-1-na-champions-league",
    "hulk-deixa-atletico-mg-e-acerta-com-o-fluminense"
]
for slug in test_slugs:
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?filters[slug][$eq]={slug}&populate=*", headers=HDR, timeout=60)
    items = r.json().get("data", [])
    titulo = items[0].get("titulo", "?")[:50] if items else "NAO ENCONTRADO"
    print(f"   slug={slug[:40]}... -> {titulo}")

# 5. Test category query (simula frontend)
print(f"\n5. TESTE CATEGORY QUERY:")
cat_names = ["Brasileir%C3%A3o", "Libertadores", "Champions%20League", "Transfer%C3%AAncias"]
cat_labels = ["Brasileirão", "Libertadores", "Champions League", "Transferências"]
for name, label in zip(cat_names, cat_labels):
    r = requests.get(f"https://fut-lance-cms-v2.onrender.com/api/noticias?filters[categoria][nome][$eq]={name}&sort=data_publicacao:desc&pagination[pageSize]=5", headers=HDR, timeout=60)
    total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
    print(f"   {label}: {total} noticias")

# 6. Categories slugs
print(f"\n6. CATEGORIAS:")
r = requests.get("https://fut-lance-cms-v2.onrender.com/api/categorias?pagination[pageSize]=100", headers=HDR, timeout=60)
for c in r.json().get("data", []):
    print(f"   id={c['id']} nome={c.get('nome','?')} slug={c.get('slug','?')}")

print("\n=== FIM DA VERIFICACAO ===")
