import requests
from collections import Counter

TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}

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

print(f"Total: {len(all_news)} noticias\n")

# Check each article
issues = []
for n in all_news:
    titulo = n.get("titulo", "").lower()
    resumo = n.get("resumo", "").lower()
    conteudo = n.get("conteudo", "").lower()
    cat = n.get("categoria", {})
    cat_nome = cat.get("nome", "?") if cat else "?"
    slug = n.get("slug", "?")
    text = titulo + " " + resumo + " " + conteudo
    
    # Determine expected category
    expected = None
    if any(w in text for w in ["libertadores", "quartas da libertadores", "copa libertadores", "deyverson", "ldu", "platense", "estudiantes", "quartas"]):
        expected = "Libertadores"
    elif any(w in text for w in ["champions league", "liga dos campeoes", "uefa", "mbappe", "yamal", "real madrid", "barcelona", "bayern", "liverpool", "psg", "aston villa", "napoli", "arsenal", "porto", "man city", "inter", "atletico de madrid"]):
        expected = "Champions League"
    elif any(w in text for w in ["brasileirao", "brasileir", "serie a", "série a", "classificacao do brasileir", "flamengo", "palmeiras", "corinthians", "sao paulo", "gremio", "cruzeiro", "bahia", "vitoria", "athletico", "fluminense", "mirassol", "santos", "botafogo", "remo", "chapecoense", "internacional", "coritiba", "bragantino", "atletico-mg"]):
        expected = "Brasileirão"
    elif any(w in text for w in ["transferencia", "transfer", "contrat", "mercado", "janela", "paqueta", "gerson", "arias", "casemiro", "lewandowski", "griezmann", "hulk", "thiago silva", "barboza", "walace", "santiago rodriguez", "arthur chaves"]):
        expected = "Transferências"
    
    if expected and expected != cat_nome:
        issues.append({
            "titulo": n.get("titulo", "?")[:60],
            "slug": slug,
            "current": cat_nome,
            "expected": expected
        })

if issues:
    print(f"PROBLEMAS ENCONTRADOS: {len(issues)} noticias na categoria errada\n")
    for i in issues:
        print(f"  TITULO: {i['titulo']}")
        print(f"  SLUG: {i['slug']}")
        print(f"  CATEGORIA ATUAL: {i['current']}")
        print(f"  CATEGORIA ESPERADA: {i['expected']}")
        print()
else:
    print("Todas as noticias estao na categoria correta!")
