import requests
import json
import time
import re
import sys

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"

IMG = [
    ("https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop", "Estádio de futebol"),
    ("https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop", "Bola de futebol"),
    ("https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=500&fit=crop", "Torcida em estádio"),
    ("https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop", "Jogador em ação"),
    ("https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=500&fit=crop", "Gol de futebol"),
    ("https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop", "Futebol sul-americano"),
    ("https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop", "Competição continental"),
]

def slug(title):
    s = re.sub(r'[^\\w\\s-]', '', title.lower())
    s = re.sub(r'[\\s]+', '-', s)
    return re.sub(r'-+', '-', s)[:80]

def publish(titulo, resumo, conteudo, cat_id, img_idx, meta_title, meta_desc, data, destaque=False):
    headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
    payload = {"data": {
        "titulo": titulo, "slug": slug(titulo), "resumo": resumo, "conteudo": conteudo,
        "categoria": cat_id, "imagem_url": IMG[img_idx][0], "imagem_alt": IMG[img_idx][1],
        "meta_title": meta_title, "meta_description": meta_desc,
        "data_publicacao": data, "destaque": destaque
    }}
    r = requests.post(f"{STRAPI_URL}/api/noticias", headers=headers, json=payload, timeout=60)
    if r.status_code == 201:
        print(f"  OK: {titulo[:60]}")
        return True
    elif r.status_code == 429:
        print(f"  RATE LIMIT - aguardando 5s...")
        time.sleep(5)
        r = requests.post(f"{STRAPI_URL}/api/noticias", headers=headers, json=payload, timeout=60)
        if r.status_code == 201:
            print(f"  OK (retry): {titulo[:60]}")
            return True
    print(f"  ERRO {r.status_code}: {r.text[:200]}")
    return False

# BATCH 1: Brasileirão (5)
print("=== LOTE 1: BRASILEIRÃO ===")
B1 = 1

publish("Flamengo assume liderança do Brasileirão após vitória sobre o Remo",
    "Com gol de Samuel Lino, o Flamengo venceu o Remo por 1 a 0 e assumiu a liderança do Brasileirão com 54 pontos.",
    "<p>O Flamengo assumiu a liderança do Campeonato Brasileiro de 2026 após vencer o Remo por 1 a 0, no Mangueirão, em Belém. Samuel Lino marcou o gol no primeiro tempo.</p><p>Com a vitória, o rubro-negro chegou a 54 pontos, um a mais que o Palmeiras. O público foi de 51.567 torcedores.</p><p>Proxima rodada, o Flamengo recebe o Coritiba no Maracanã.</p>",
    B1, 0, "Flamengo lidera Brasileirão 2026 após vitória sobre Remo",
    "Samuel Lino marca gol e Flamengo assume liderança do Brasileirão com 54 pontos.",
    "2026-09-07T20:00:00.000Z", True)
time.sleep(3)

publish("Palmeiras empata com Botafogo e perde liderança do Brasileirão",
    "Palmeiras empatou sem gols com o Botafogo e cedeu a liderança do Brasileirão para o Flamengo.",
    "<p>O Palmeiras empatou sem gols com o Botafogo no Rio de Janeiro pela 26ª rodada. Com 53 pontos, o Verdão cedeu a liderança para o Flamengo.</p><p>As melhores oportunidades foram de Flaco López, que finalizou na trave. Na próxima rodada, o Palmeiras enfrenta o São Paulo no Morumbi.</p>",
    B1, 1, "Palmeiras empata com Botafogo e perde liderança",
    "Palmeiras empatou 0 a 0 com Botafogo e cedeu liderança do Brasileirão para o Flamengo.",
    "2026-09-07T22:00:00.000Z", False)
time.sleep(3)

publish("Bahia vence Bragantino e continua invicto há 10 jogos",
    "Bahia venceu o Bragantino por 3 a 2 e mantém sequência histórica de 10 jogos sem derrota no Brasileirão.",
    "<p>O Bahia venceu o Bragantino por 3 a 2 em Bragança Paulista pela 26ª rodada. Com 43 pontos, o Tricolor mantém a 5ª posição.</p><p>O Bahia soma 10 jogos sem derrota, sequência mais longa do clube em 40 anos. Gols de Cristian Olivera (2) e Alejo Véliz.</p><p>Na próxima rodada, o Bahia recebe o Fluminense na Fonte Nova.</p>",
    B1, 2, "Bahia vence Bragantino e mantém 10 jogos sem derrota",
    "Bahia vence Bragantino por 3 a 2 e mantém sequência histórica de invencibilidade no Brasileirão.",
    "2026-09-06T18:00:00.000Z", True)
time.sleep(3)

publish("Cruzeiro vence Athletico-PR no clássico e sobe na classificação",
    "Cruzeiro aplicou 3 a 1 no Athletico-PR e conquistou posições importantes na classificação do Brasileirão.",
    "<p>O Cruzeiro venceu o Athletico-PR por 3 a 1 no Mineirão pela 26ª rodada. Gols de Gabriel Pec (2) e Gerson.</p><p>Com 42 pontos, o Cruzeiro sobe para a 6ª posição. O Athletico-PR permanece na 3ª com 45 pontos.</p><p>O Cruzeiro recebe o Internacional na próxima rodada.</p>",
    B1, 3, "Cruzeiro vence Athletico-PR por 3 a 1 no Brasileirão",
    "Cruzeiro goleia Athletico-PR no Mineirão e sobe na classificação do Brasileirão 2026.",
    "2026-09-06T20:00:00.000Z", False)
time.sleep(3)

publish("São Paulo goleia Atlético-MG e sobe na classificação",
    "São Paulo venceu o Atlético-MG por 2 a 0 no Morumbi e conquistou posição na tabela do Brasileirão.",
    "<p>O São Paulo venceu o Atlético-MG por 2 a 0 no Morumbi pela 26ª rodada. Gols de Nestor e Lucas Talia.</p><p>Com 33 pontos, o São Paulo sobe para a 10ª posição. O público foi de 39.068 torcedores.</p><p>Na próxima rodada, o São Paulo recebe o Palmeiras no Morumbi.</p>",
    B1, 4, "São Paulo goleia Atlético-MG por 2 a 0 no Brasileirão",
    "São Paulo vence Atlético-MG no Morumbi e sobe na classificação do Brasileirão 2026.",
    "2026-09-06T22:00:00.000Z", False)
time.sleep(3)

print("Lote 1 concluído!")
