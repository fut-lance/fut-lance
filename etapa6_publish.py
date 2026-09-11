import requests
import time
import json
from datetime import datetime

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept-Charset": "utf-8"
}

# Category IDs (from Strapi)
CATEGORIAS = {
    "brasileirao": "nrnwfb3tqt34lc776ztysfhv",
    "libertadores": "rgqtcsh0624cxfoddwk8nq6q",
    "champions-league": "swyvj5yli1z4v5x51y0ijoj4",
    "transferencias": "bokz7fvh3qeb5i6pcnztnnab",
}

noticias = [
    {
        "titulo": "Coritiba recebe o Athletico-PR no derby paranaense pela 27a rodada do Brasileirao",
        "resumo": "Coritiba e Athletico-PR se enfrentam hoje, as 21h, no Couto Pereira, pelo Brasileirao. Derby paranaense sera transmitido pelo SporTV e Premiere.",
        "conteudo": "O Coritiba recebe o Athletico-PR hoje, sexta-feira (11/09), as 21h (horario de Brasilia), no Estadio Couto Pereira, em partida valida pela 27a rodada da Serie A do Campeonato Brasileiro.\n\nO derby paranaense sera transmitido ao vivo pelo SporTV e Premiere. O Coritiba busca vitoria em casa para se afastar da zona de rebaixamento, enquanto o Athletico-PR quer manter ritmo na classificacao.\n\nO Athletico-PR chega ao jogo na 3a posicao da tabela, com 45 pontos em 26 jogos. O Coritiba ocupa posicao intermediaria e precisa de pontos para se consolidar na Serie A.\n\nEscalacoes provaveis:\nCoritiba: Pedro Rangel; Nino, Aurelio, Robson, Gabriel; Caseres, Lucas Barbosa; Matheus Bianor, Garcia, Biro; Roni.\nAthletico-PR: Santos; Khellven, Palomino, Zaleza, Esquivel; Erick, Julio Cesar; Ivan, Cuello, Alan Kardec; Viveros.",
        "imagem_url": "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria_slug": "brasileirao",
    },
    {
        "titulo": "Palmeiras vence a LDU por 1 a 0 e abre vantagem nas quartas da Libertadores",
        "resumo": "Giay marca de cabeca e Palmeiras vence LDU por 1 a 0 no Nubank Parque. Verdao precisa de empate na volta, em Quito, para avancar a semifinal.",
        "conteudo": "Com gol de cabeca do argentino Giay, o Palmeiras venceu a LDU por 1 a 0 no Nubank Parque, no jogo de ida das quartas de final da Copa Libertadores.\n\nO time comandado por Abel Ferreira dominou as acoes e agora precisa apenas de um empate no duelo de volta, em Quito, para garantir vaga na semifinal do torneio continental.\n\nGiay abriu o placar aos 25 minutos do primeiro tempo, de cabeca, aproveitando cruzamento da direita. O Palmeiras criou mais chances e poderia ter ampliado, mas o goleiro Gonzalo Valle evitou o segundo gol da equipe paulista.\n\nAntes da decisao continental, o Alviverde volta o foco para o Campeonato Brasileiro, onde enfrenta o Sao Paulo no sábado buscando assumir a lideranca da competicao nacional.\n\nPalmeiras: Carlos Miguel; Murilo, Gustavo Gomez e Barboza; Giay, Marlon Freitas, Lucas Evangelista, Jhon Arias e Piquerez; Vitor Roque e Flaco Lopez.\nLDU: Gonzalo Valle; Marcelo Weigandt, Ricardo Ade, Allala e Segovia; Cornejo, Pretell, Lucas Rodriguez; Corozo, Estrada e Quinonez.",
        "imagem_url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "data_publicacao": "2026-09-09",
        "categoria_slug": "libertadores",
    },
    {
        "titulo": "Corinthians empata com o Estudiantes por 1 a 1 nas quartas da Libertadores",
        "resumo": "Kaio Cesar marca para o Corinthians no empate em 1 a 1 com o Estudiantes de La Plata, nas quartas de final da Libertadores. Volta e dia 16/09.",
        "conteudo": "O Corinthians buscou um empate em 1 a 1 na visita ao Estudiantes de La Plata nesta quarta-feira (09/09), no jogo de ida das quartas de final da Copa Libertadores.\n\nKaio Cesar marcou o gol do Timao, que agora recebe o Estudiantes no dia 16 de setembro, na Neo Quimica Arena, com chance de avancar a semifinal do torneio.\n\nO Estudiantes abriu o placar no primeiro tempo, mas o Corinthians reagiu e empatou com Kaio Cesar, que aproveitou assistencia de Memphis Depay.\n\nA equipe brasileira mostrou solidez defensiva e criou chances de virada, mas nao conseguiu marcar o segundo gol. O empate e resultado positivo para o Timao, que joga em casa na volta.\n\nEstudiantes: Muslera; Pourtouse, Inda, Pellegrini, Guidara; Zayat, Lopez, Rollheiser; Carrillo, Castro e Zenon.\nCorinthians: Hugo Souza; Fagner, Gustavo Henrique, Caetano, Fabricio; Raniele, Charles; Garro, Memphis Depay, Yuri Alberto e Roger Guedes.",
        "imagem_url": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200",
        "data_publicacao": "2026-09-09",
        "categoria_slug": "libertadores",
    },
    {
        "titulo": "Champions League 2026/27: fase de liga comeca com jogos de peso na primeira rodada",
        "resumo": "Real Madrid recebe a Inter, Barcelona enfrenta o Feyenoord e Liverpool joga com o Atlético de Madrid na estreia da fase de liga da Champions League.",
        "conteudo": "A fase de liga da Champions League 2026/27 comecou nesta terca-feira (08/09) com jogos de grande porte. O Real Madrid recebeu a Inter de Milão no Santiago Bernabeu, em destaque da primeira rodada.\n\nO Barcelona estreou na quarta-feira (09/09) contra o Feyenoord, enquanto o Liverpool encarou o Atlético de Madrid no Anfield. O PSG, atual bicampeão europeu, jogou contra o Slovan Bratislava.\n\nOs grandes confrontos da primeira rodada incluem tambem Napoli x Arsenal e Manchester City x Porto. A fase de liga tera oito rodadas, com os oito primeiros se classificando diretamente as oitavas de final.\n\nOs times entre a 9a e a 24a posicao disputarao playoffs, enquanto os eliminados serao os times entre a 25a e a 36a colocacao.\n\nA grande final da Champions League acontecera no dia 5 de junho de 2027, no Estadio Metropolitano, em Madrid.\n\nClassificacao provisoria apos primeira rodada:\n1. Alaves - 10 pts\n2. Real Madrid - 9 pts\n3. Barcelona - 6 pts\n4. Liverpool - 3 pts\n5. PSG - 3 pts",
        "imagem_url": "https://images.unsplash.com/photo-1522778119026-d647f5096c20?w=1200",
        "data_publicacao": "2026-09-10",
        "categoria_slug": "champions-league",
    },
    {
        "titulo": "Janela de transferencias do Brasileirao fecha hoje com movimentacao recorde",
        "resumo": "Segunda janela de transferencias fecha em 11 de setembro. Principais destaques: Casemiro para o Inter Miami, Lewandowski para o Chicago Fire.",
        "conteudo": "A segunda janela de transferencias do futebol brasileiro fecha hoje, sexta-feira (11/09), apos movimentacao recorde no mercado da bola.\n\nO fechamento da janela marca o fim do periodo em que os clubes brasileiros puderam registrar reforços para a reta final da temporada, incluindo Brasileirao, Copa do Brasil e Libertadores.\n\nNo mercado internacional, os principais destaques foram a saida de Casemiro do Manchester United para o Inter Miami, onde se junta a Lionel Messi, e a transferencia de Robert Lewandowski do Barcelona para o Chicago Fire, da MLS.\n\nTambem no mercado internacional, Antoine Griezmann deixou o Atlético de Madrid para defender o Orlando City.\n\nNo futebol brasileiro, os clubes mais ativos foram o Flamengo, que investiu R$ 334 milhões em Lucas Paqueta, Vitao e Andrew, e o Palmeiras, que trouxe Jhon Arias e Marlon Freitas.\n\nO Cruzeiro tambem se movimentou com a contratacao do meia Gerson e a saida de Tite do comando tecnico.\n\nA janela do futebol europeu ja havia fechado em 1 de setembro para as principais ligas (Premier League, La Liga, Serie A e Bundesliga).",
        "imagem_url": "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria_slug": "transferencias",
    },
]

print("=" * 60)
print("ETAPA 6 — CRIACAO DAS NOTICIAS")
print("=" * 60)
print(f"Data/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
print()

for i, noticia in enumerate(noticias):
    print(f"Publicando noticia {i+1}/{len(noticias)}: {noticia['titulo'][:50]}...")
    
    data = {
        "data": {
            "titulo": noticia["titulo"],
            "resumo": noticia["resumo"],
            "conteudo": noticia["conteudo"],
            "imagem_url": noticia["imagem_url"],
            "data_publicacao": noticia["data_publicacao"],
            "autor": "FUT LANCE",
            "categoria": CATEGORIAS[noticia["categoria_slug"]],
        }
    }
    
    try:
        resp = requests.post(
            f"{STRAPI_URL}/api/noticias",
            headers=headers,
            json=data,
            timeout=60
        )
        if resp.status_code in [200, 201]:
            print(f"  OK - Publicada com sucesso")
        else:
            print(f"  ERRO - Status {resp.status_code}")
            print(f"  Resposta: {resp.text[:200]}")
    except Exception as e:
        print(f"  ERRO - {e}")
    
    time.sleep(4)

print()
print("ETAPA 6 CONCLUIDA")
