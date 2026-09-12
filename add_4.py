import requests
import time
import re
import unicodedata

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

IMG = [
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop",
]

def make_slug(title):
    nfkd = unicodedata.normalize('NFKD', title)
    ascii_title = ''.join(c for c in nfkd if not unicodedata.combining(c))
    s = ascii_title.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s[:80]

def pub(titulo, resumo, conteudo, cat_id, img_idx, data):
    slug = make_slug(titulo)
    payload = {"data": {
        "titulo": titulo, "slug": slug, "resumo": resumo, "conteudo": conteudo,
        "categoria": cat_id, "imagem_url": IMG[img_idx],
        "data_publicacao": data, "autor": "FUT LANCE"
    }}
    r = requests.post(f"{STRAPI_URL}/api/noticias", headers=HDR, json=payload, timeout=60)
    if r.status_code == 201:
        print(f"  OK [{slug}]")
        return True
    print(f"  ERRO {r.status_code}: {r.text[:150]}")
    return False

# 4 news: 1 Brasileirao, 1 Libertadores, 1 Champions, 1 Transferencias

pub("Coritiba recebe o Athletico-PR no derby paranaense pela 27a rodada",
    "Coritiba e Athletico-PR se enfrentam hoje, as 21h, no Couto Pereira, pelo Brasileirao.",
    "<p>O Coritiba recebe o Athletico-PR hoje, sexta-feira (11/09), as 21h (horario de Brasilia), no Couto Pereira, pela 27a rodada do Brasileirao. Jogo sera transmitido pelo SporTV e Premiere.</p>",
    1, 0, "2026-09-11T10:00:00.000Z")
time.sleep(3)

pub("Palmeiras vence a LDU por 1 a 0 e abre vantagem nas quartas da Libertadores",
    "Giay marca de cabeca e Palmeiras vence LDU por 1 a 0 no Nubank Parque.",
    "<p>Giay marcou de cabeca e o Palmeiras venceu a LDU por 1 a 0 no Nubank Parque pelas quartas da Libertadores. Verdao precisa de empate na volta, em Quito, para avancar a semifinal.</p>",
    2, 0, "2026-09-09T22:00:00.000Z")
time.sleep(3)

pub("Champions League 2026-27 fase de liga comeca com jogos de peso na primeira rodada",
    "Real Madrid recebe a Inter, Barcelona enfrenta o Feyenoord e Liverpool joga com o Atletico de Madrid.",
    "<p>A fase de liga da Champions League 2026-27 comeca com grandes jogos na primeira rodada. Real Madrid recebe a Inter, Barcelona enfrenta o Feyenoord e Liverpool joga com o Atletico de Madrid.</p>",
    6, 0, "2026-09-10T10:00:00.000Z")
time.sleep(3)

pub("Janela de transferencias do Brasileirao fecha hoje com movimentacao recorde",
    "Segunda janela de transferencias fecha em 11 de setembro com movimentacao recorde.",
    "<p>A janela de transferencias do futebol brasileiro fecha em 11 de setembro com movimentacao recorde. Principais destaques: Casemiro para o Inter Miami, Lewandowski para o Chicago Fire.</p>",
    7, 0, "2026-09-11T10:00:00.000Z")
time.sleep(3)

# Verify
r = requests.get(f"{STRAPI_URL}/api/noticias?pagination[pageSize]=1", 
    headers={"Authorization": f"Bearer {TOKEN}", "Accept-Charset": "utf-8"}, timeout=60)
total = r.json().get("meta", {}).get("pagination", {}).get("total", 0)
print(f"\nTotal apos adicionar 4: {total}")
