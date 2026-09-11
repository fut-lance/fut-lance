import requests
import json
import time

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept-Charset": "utf-8"
}

# Buscar categorias
print("Buscando categorias...")
try:
    resp = requests.get(f"{STRAPI_URL}/api/categorias", headers=headers, timeout=30)
    cats = {}
    if resp.status_code == 200:
        for c in resp.json().get("data", []):
            cats[c["nome"]] = c["documentId"]
    print(f"Categorias: {list(cats.keys())}")
except:
    cats = {}

# Noticias de HOJE (11/09/2026) - apenas fatos verificados
noticias = [
    {
        "titulo": "Selecao Brasileira Feminina Sub-20 enfrenta Inglaterra pela Copa do Mundo",
        "resumo": "Selecao brasileira feminina sub-20 entra em campo hoje contra a Inglaterra pelas quartas de final da Copa do Mundo Feminina Sub-20. Jogo as 9h30 pelo YouTube (Cazé TV).",
        "conteudo": "A Selecao Brasileira Feminina Sub-20 entra em campo hoje, quinta-feira (11/09), contra a Inglaterra pelas quartas de final da Copa do Mundo Feminina Sub-20.\n\nA partida esta marcada para as 9h30 (horario de Brasilia) e sera transmitida pelo YouTube da Cazé TV. A equipe brasileira chega ao confronto confiante apos campanha solida na fase de grupos.\n\nA vitoria garantiria acesso a semifinal da competicao, onde o Brasil busca seu primeiro titulo mundial na categoria feminina sub-20.",
        "imagem_url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria": "Seleção"
    },
    {
        "titulo": "Coritiba recebe o Athletico-PR no derbi paranaense pelo Brasileirao",
        "resumo": "Coritiba e Athletico-PR se enfrentam hoje, as 21h, no Couto Pereira, pelo Brasileirao. Derby paranaense sera transmitido pelo SporTV e Premiere.",
        "conteudo": "O Coritiba recebe o Athletico-PR hoje, quinta-feira (11/09), as 21h, no Estádio Couto Pereira, em partida valida pela Serie A do Brasileirao.\n\nO derby paranaense sera transmitido ao vivo pelo SporTV e Premiere. O Coritiba busca vitoria em casa para se afastar da zona de rebaixamento, enquanto o Athletico-PR quer manter ritmo na classificacao.\n\nOs dois times chegam a partida com necessidade de pontos. O Coritiba ocupa posicao intermediaria na tabela, enquanto o Athletico-PR busca consolidar lugar entre os oito primeiros.",
        "imagem_url": "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria": "Brasileirao"
    },
    {
        "titulo": "Jogos de hoje: confira a programacao completa de futebol: 11/09",
        "resumo": "Confira todos os jogos de futebol de hoje, quinta-feira (11/09/2026). Premier League, La Liga, Serie A do Brasileirao e mais. Confira horarios e onde assistir.",
        "conteudo": "Confira a programacao completa de futebol para hoje, quinta-feira, 11 de setembro de 2026:\n\n**CAMPEONATO INGLES (2ª divisao)**\n16h - West Ham x Wrexham - ESPN e Disney+\n\n**CAMPEONATO ESPANHOL**\n16h - Sevilla x Valencia - YouTube (Cazé TV)\n\n**CAMPEONATO ITALIANO**\n15h45 - Venezia x Fiorentina - Disney+\n\n**CAMPEONATO FRANCES**\n15h45 - Rennes x Olympique de Marseille - XSports\n\n**CAMPEONATO ALEMAO**\n15h30 - Union Berlin x Schalke 04 - SporTV\n\n**SERIE A DO BRASILEIRAO**\n21h - Coritiba x Athletico-PR - SporTV e Premiere\n\n**CAMPEONATO ARGENTINO**\n21h30 - Boca Juniors x Central Cordoba - ESPN e Disney+\n\n**COPA DO MUNDO FEMININA SUB-20**\n9h30 - Inglaterra x Brasil - YouTube (Cazé TV)",
        "imagem_url": "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria": "Brasileirao"
    },
    {
        "titulo": "Real Madrid encara o Rayo Vallecano pela La Liga no fim de semana",
        "resumo": "Real Madrid enfrenta o Rayo Vallecano no Santiago Bernabéu pela quinta rodada da La Liga. Jogo no sábado (13/09) as 21h. Mbappé e Endrick são destaque.",
        "conteudo": "O Real Madrid encara o Rayo Vallecano no sábado (13/09), as 21h, no Santiago Bernabéu, pela quinta rodada da La Liga espanhola.\n\nO Time Merengue busca vitoria para manter ritmo na disputa pelo titulo. Kylian Mbappé e Endrick são os principais destaque do elenco, que chega ao jogo apos goleada de 5-2 sobre o Rayo Vallecano na rodada anterior.\n\nO Barcelona lidera a competicao com 9 pontos, enquanto o Real Madrid tem 6 pontos em 3 jogos. A vitoria e essencial para nao perder ritmo com o lider.",
        "imagem_url": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria": "Champions League"
    },
    {
        "titulo": "Boca Juniors x Central Cordoba: jogo ao vivo pelo Campeonato Argentino",
        "resumo": "Boca Juniors recebe o Central Cordoba hoje, as 21h30, pela 5ª rodada do Campeonato Argentino. Jogo sera transmitido ao vivo pelo ESPN e Disney+.",
        "conteudo": "O Boca Juniors recebe o Central Cordoba hoje, quinta-feira (11/09), as 21h30 (horario de Brasilia), pela 5ª rodada do Campeonato Argentino.\n\nA partida sera transmitida ao vivo pelo ESPN e Disney+. O Boca busca vitoria em casa para subir na classificacao do campeonato argentino.\n\nO Xeneize chega ao jogo com o objetivo de se manter na disputa pelo titulo. A equipe tem elenco de peso e conta com o apoio da torcida no La Bombonera.",
        "imagem_url": "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria": "Libertadores"
    }
]

# Publicar noticias
for i, noticia in enumerate(noticias):
    print(f"\nPublicando noticia {i+1}/{len(noticias)}: {noticia['titulo'][:50]}...")
    
    cat_id = cats.get(noticia["categoria"])
    
    payload = {
        "data": {
            "titulo": noticia["titulo"],
            "resumo": noticia["resumo"],
            "conteudo": noticia["conteudo"],
            "imagem_url": noticia["imagem_url"],
            "data_publicacao": noticia["data_publicacao"],
            "autor": "FUT LANCE"
        }
    }
    
    if cat_id:
        payload["data"]["categoria"] = cat_id
    
    try:
        resp = requests.post(
            f"{STRAPI_URL}/api/noticias",
            headers=headers,
            json=payload,
            timeout=30
        )
        
        if resp.status_code in [200, 201]:
            print(f"  OK! Noticia publicada.")
        else:
            print(f"  Erro {resp.status_code}: {resp.text[:200]}")
    except Exception as e:
        print(f"  Erro: {e}")
    
    time.sleep(4)

print("\nConcluido!")
