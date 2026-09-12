import requests
import time
import re
import unicodedata

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

IMG = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop"

def make_slug(title):
    nfkd = unicodedata.normalize('NFKD', title)
    ascii_title = ''.join(c for c in nfkd if not unicodedata.combining(c))
    s = ascii_title.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s[:80]

def pub(titulo, resumo, conteudo, cat_id, data):
    slug = make_slug(titulo)
    payload = {"data": {
        "titulo": titulo, "slug": slug, "resumo": resumo, "conteudo": conteudo,
        "categoria": cat_id, "imagem_url": IMG,
        "data_publicacao": data, "autor": "FUT LANCE"
    }}
    r = requests.post(f"{STRAPI_URL}/api/noticias", headers=HDR, json=payload, timeout=60)
    if r.status_code == 201:
        print(f"  OK [{slug}]")
        return True
    print(f"  ERRO {r.status_code}: {r.text[:150]}")
    return False

pub("Coritiba e Athletico-PR fazem derby paranaense pelo Brasileirao",
    "Derby paranaense entre Coritiba e Athletico-PR pela 27a rodada do Brasileirao.",
    "<p>O Coritiba recebe o Athletico-PR no Couto Pereira pelo derby paranaense da 27a rodada do Brasileirao. Jogo importante para ambos os times na classificacao.</p>",
    1, "2026-09-11T12:00:00.000Z")
time.sleep(3)

pub("Palmeiras e LDU disputam vaga nas semifinais da Libertadores",
    "Palmeiras e LDU se enfrentam nas quartas da Libertadores com Deyverson como adversario.",
    "<p>Palmeiras e LDU disputam vaga nas semifinais da Libertadores. Deyverson, que marcou o titulo do Palmeiras em 2021, agora defende a LDU.</p>",
    2, "2026-09-09T14:00:00.000Z")
time.sleep(3)

# Verify
r = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=1", 
    headers={"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}, timeout=60)
total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"\nTotal final: {total}")
