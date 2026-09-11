import requests
import json
import time
import re
import hashlib

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"

IMG = [
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop",
]

counter = [0]

def make_slug(title):
    counter[0] += 1
    s = re.sub(r'[^\\w\\s-]', '', title.lower())
    s = re.sub(r'[\\s]+', '-', s)
    s = re.sub(r'-+', '-', s)[:60]
    return f"{s}-{counter[0]}"

def pub(titulo, resumo, conteudo, cat_id, img_idx, data):
    headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
    payload = {"data": {
        "titulo": titulo, "slug": make_slug(titulo), "resumo": resumo, "conteudo": conteudo,
        "categoria": cat_id, "imagem_url": IMG[img_idx],
        "data_publicacao": data, "autor": "FUT LANCE"
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
            print(f"  OK: {titulo[:60]}")
            return True
    print(f"  ERRO {r.status_code}: {r.text[:200]}")
    return False

# CAT IDs: 1=Brasileirão, 2=Libertadores, 6=Champions, 7=Transferências

print("=== LOTE 1: BRASILEIRÃO (1-5) ===")
pub("Flamengo assume liderança do Brasileirão após vitória sobre o Remo",
    "Com gol de Samuel Lino, o Flamengo venceu o Remo por 1 a 0 e assumiu a liderança do Brasileirão com 54 pontos.",
    "<p>O Flamengo assumiu a liderança do Campeonato Brasileiro de 2026 após vencer o Remo por 1 a 0, no Mangueirão, em Belém. Samuel Lino marcou o gol no primeiro tempo.</p><p>Com a vitória, o rubro-negro chegou a 54 pontos, um a mais que o Palmeiras. O público foi de 51.567 torcedores.</p><p>Proxima rodada, o Flamengo recebe o Coritiba no Maracanã.</p>",
    1, 0, "2026-09-07T20:00:00.000Z"); time.sleep(3)

pub("Palmeiras empata com Botafogo e perde liderança do Brasileirão",
    "Palmeiras empatou sem gols com o Botafogo e cedeu a liderança do Brasileirão para o Flamengo.",
    "<p>O Palmeiras empatou sem gols com o Botafogo no Rio de Janeiro pela 26ª rodada. Com 53 pontos, o Verdão cedeu a liderança para o Flamengo.</p><p>As melhores oportunidades foram de Flaco López, que finalizou na trave.</p>",
    1, 1, "2026-09-07T22:00:00.000Z"); time.sleep(3)

pub("Bahia vence Bragantino e continua invicto há 10 jogos",
    "Bahia venceu o Bragantino por 3 a 2 e mantém sequência histórica de 10 jogos sem derrota no Brasileirão.",
    "<p>O Bahia venceu o Bragantino por 3 a 2 em Bragança Paulista pela 26ª rodada. Com 43 pontos, o Tricolor mantém a 5ª posição.</p><p>O Bahia soma 10 jogos sem derrota, sequência mais longa do clube em 40 anos.</p>",
    1, 2, "2026-09-06T18:00:00.000Z"); time.sleep(3)

pub("Cruzeiro vence Athletico-PR no clássico e sobe na classificação",
    "Cruzeiro aplicou 3 a 1 no Athletico-PR e conquistou posições na classificação do Brasileirão.",
    "<p>O Cruzeiro venceu o Athletico-PR por 3 a 1 no Mineirão pela 26ª rodada. Gols de Gabriel Pec (2) e Gerson. Com 42 pontos, sobe para a 6ª posição.</p>",
    1, 3, "2026-09-06T20:00:00.000Z"); time.sleep(3)

pub("São Paulo goleia Atlético-MG e sobe na classificação",
    "São Paulo venceu o Atlético-MG por 2 a 0 no Morumbi pela 26ª rodada do Brasileirão.",
    "<p>O São Paulo venceu o Atlético-MG por 2 a 0 no Morumbi. Gols de Nestor e Lucas Talia. Com 33 pontos, sobe para a 10ª posição. Público de 39.068.</p>",
    1, 4, "2026-09-06T22:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 2: BRASILEIRÃO (6-10) ===")
pub("Vitória vence Grêmio e se afasta do rebaixamento",
    "Vitória goleou o Grêmio por 1 a 0 e conquistou 3 pontos fundamentais para se afastar da zona de rebaixamento.",
    "<p>O Vitória venceu o Grêmio por 1 a 0 no Barradão pela 26ª rodada. Gol de Renê. Com 32 pontos, subiu para a 11ª posição, 7 pontos acima do rebaixamento.</p>",
    1, 0, "2026-09-08T20:00:00.000Z"); time.sleep(3)

pub("Fluminense vence Vasco no clássico carioca pela 26ª rodada",
    "Fluminense derrotou o Vasco por 1 a 0 no Maracanã pelo clássico carioca da 26ª rodada.",
    "<p>O Fluminense venceu o Vasco por 1 a 0 no Maracanã. Gol de John Kennedy. Com 45 pontos, permanece na 4ª posição. Vasco cai para a 17ª, zona de rebaixamento.</p>",
    1, 1, "2026-09-06T22:00:00.000Z"); time.sleep(3)

pub("Mirassol vence Coritiba e conquista pontos importantes",
    "Mirassol aplicou 2 a 1 no Coritiba e conquistou 3 pontos fundamentais para se manter na Série A.",
    "<p>O Mirassol venceu o Coritiba por 2 a 1. Gols de Japa e Negueba. Com 25 pontos, permanece na 16ª posição. Coritiba cai para a 7ª com 37 pontos.</p>",
    1, 2, "2026-09-06T18:00:00.000Z"); time.sleep(3)

pub("Santos vence Internacional em jogo eletrizante",
    "Santos venceu o Internacional por 3 a 2 em jogo eletrizante pela 26ª rodada do Brasileirão.",
    "<p>O Santos venceu o Internacional por 3 a 2 no Beira-Rio. Gols de Neymar (2) e Marcos Leonardo. Com 29 pontos, permanece na 14ª posição.</p>",
    1, 3, "2026-09-06T18:00:00.000Z"); time.sleep(3)

pub("Chapecoense surpreende Corinthians e conquista 3 pontos",
    "Chapecoense venceu o Corinthians por 2 a 1 na Neo Química Arena e conquistou 3 pontos importantes.",
    "<p>A Chapecoense surpreendeu o Corinthians ao vencer por 2 a 1 na Neo Química Arena. Gols de Jean Carlos e Túlio Eduardo. Memphis Descontou para o Timão.</p>",
    1, 4, "2026-09-09T10:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 3: BRASILEIRÃO (11-15) ===")
pub("Brasileirão 2026: classificação atualizada após 26 rodadas",
    "Confira a classificação completa do Campeonato Brasileiro de 2026 após a conclusão da 26ª rodada.",
    "<p><strong>Classificação:</strong> 1. Flamengo 54pts, 2. Palmeiras 53pts, 3. Athletico-PR 45pts, 4. Fluminense 45pts, 5. Bahia 43pts, 6. Cruzeiro 42pts, 7. Coritiba 37pts, 8. Atlético-MG 36pts, 9. Bragantino 35pts, 10. São Paulo 33pts.</p>",
    1, 0, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Grêmio sofre com crise e ameaça de rebaixamento",
    "Grêmio vive momento complicado no Brasileirão e ameaça cair para a Série B pela primeira vez.",
    "<p>O Grêmio com apenas 28 pontos ameaça cair para a Série B. A derrota para o Vitória complicou a situação. O time ocupa a 15ª posição, 3 pontos acima da zona de rebaixamento.</p>",
    1, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Athletico-PR busca reação após derrota para o Cruzeiro",
    "Athletico-PR foi derrotado pelo Cruzeiro por 3 a 1 e agora precisa reagir na próxima rodada.",
    "<p>O Athletico-PR foi derrotado pelo Cruzeiro por 3 a 1 no Mineirão. Com 45 pontos, permanece na 3ª posição mas com pressão do Fluminense.</p>",
    1, 2, "2026-09-07T10:00:00.000Z"); time.sleep(3)

pub("Atlético-MG cai na tabela após derrota para o São Paulo",
    "Atlético-MG foi derrotado pelo São Paulo por 2 a 0 e caiu para a 8ª posição do Brasileirão.",
    "<p>O Atlético-MG foi derrotado pelo São Paulo por 2 a 0 no Morumbi. Com 36 pontos, caiu para a 8ª posição. A equipe mostrou problemas defensivos.</p>",
    1, 3, "2026-09-07T10:00:00.000Z"); time.sleep(3)

pub("Corinthians cai uma posição na tabela ao fim da 26ª rodada",
    "A derrota para a Chapecoense fez o Corinthians cair na classificação do Brasileirão.",
    "<p>O Corinthians caiu uma posição na tabela do Brasileirão ao término da 26ª rodada. A derrota para a Chapecoense por 2 a 1 complicou a situação do Timão.</p>",
    1, 4, "2026-09-08T22:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 4: BRASILEIRÃO (16-20) ===")
pub("Remo recebe Flamengo e sofre derrota no Mangueirão",
    "Remo foi derrotado pelo Flamengo por 1 a 0 no Mangueirão com público de 51 mil torcedores.",
    "<p>O Remo foi derrotado pelo Flamengo por 1 a 0 no Mangueirão, em Belém. Samuel Lino marcou o gol. Público de 51.567 torcedores, um dos maiores da história do estádio.</p>",
    1, 0, "2026-09-07T18:00:00.000Z"); time.sleep(3)

pub("Botafogo empata com Palmeiras e mantém o líder na squadra",
    "Botafogo empatou sem gols com o Palmeiras e ajudou o Flamengo a assumir a liderança do Brasileirão.",
    "<p>O Botafogo empatou sem gols com o Palmeiras no Rio de Janeiro. Com o resultado, o Flamengo assumiu a liderança do Brasileirão. Botafogo permanece na 12ª posição.</p>",
    1, 1, "2026-09-07T20:00:00.000Z"); time.sleep(3)

pub("Vasco cai na zona de rebaixamento após derrota para o Fluminense",
    "Vasco foi derrotado pelo Fluminense por 1 a 0 no Maracanã e caiu para a zona de rebaixamento.",
    "<p>O Vasco foi derrotado pelo Fluminense por 1 a 0 no Maracanã. Gol de John Kennedy. Com 25 pontos, o Vasco caiu para a 17ª posição, zona de rebaixamento.</p>",
    1, 2, "2026-09-06T22:00:00.000Z"); time.sleep(3)

pub("Grêmio perde para o Vitória e se aproxima do rebaixamento",
    "Gremio foi derrotado pelo Vitória por 1 a 0 no Barradão e se aproxima da zona de rebaixamento.",
    "<p>O Gremio foi derrotado pelo Vitória por 1 a 0 no Barradão. Com 28 pontos, o Gremio ocupa a 15ª posição, apenas 3 pontos acima da zona de rebaixamento.</p>",
    1, 3, "2026-09-08T20:00:00.000Z"); time.sleep(3)

pub("Flamengo assume liderança pela primeira vez em 2026",
    "Flamengo assume a liderança do Brasileirão pela primeira vez na temporada de 2026.",
    "<p>Com a vitória sobre o Remo e o empate do Palmeiras com o Botafogo, o Flamengo assume a liderança do Brasileirão pela primeira vez em 2026. O rubro-negro tem 54 pontos.</p>",
    1, 4, "2026-09-08T08:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 5: LIBERTADORES (1-5) ===")
pub("Libertadores 2026: confira os confrontos das quartas de final",
    "Oito equipes disputam vaga nas semifinais da Copa Libertadores de 2026. Veja todos os confrontos.",
    "<p><strong>Confrontos das quartas:</strong> Estudiantes x Corinthians, Palmeiras x LDU, Fluminense x Platense. Os três brasileiros chegam como favoritos.</p>",
    2, 0, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Fluminense goleia Platense e abre vantagem nas quartas",
    "Fluminense venceu o Platense por 2 a 0 no Maracanã e pode classificar-se mesmo com derrota na volta.",
    "<p>O Fluminense venceu o Platense por 2 a 0 no Maracanã pelas quartas da Libertadores. Gols de Nonato e John Kennedy. Jogo de volta em 15/09 na Argentina.</p>",
    2, 1, "2026-09-08T22:00:00.000Z"); time.sleep(3)

pub("Palmeiras recebe LDU nas quartas com 4 desfalques",
    "Palmeiras enfrenta a LDU nesta quarta-feira sem Andreas Pereira, Paulinho, Sosa e Jefte.",
    "<p>O Palmeiras recebe a LDU nesta quarta-feira (9) às 19h no Nubank Parque pelas quartas da Libertadores. 4 desfalques: Andreas suspenso, Paulinho, Sosa e Jefte lesionados.</p>",
    2, 2, "2026-09-09T12:00:00.000Z"); time.sleep(3)

pub("Corinthians busca empate com Estudiantes no jogo de ida",
    "Corinthians empatou com o Estudiantes por 1 a 1 em La Plata pelo jogo de ida das quartas.",
    "<p>O Corinthians buscou empate em 1 a 1 na visita ao Estudiantes de La Plata. Gol de Kaio César. Jogo de volta na Neo Química Arena em 16/09.</p>",
    2, 3, "2026-09-09T22:00:00.000Z"); time.sleep(3)

pub("Deyverson reencontra o Palmeiras como adversário na Libertadores",
    "Deyverson, que marcou o gol do título do Palmeiras em 2021, agora retorna como adversário pela LDU.",
    "<p>Deyverson marcou o gol que garantiu ao Palmeiras o título da Libertadores de 2021. Agora, defendendo a LDU, enfrenta seu ex-clube. Tendência de começar no banco.</p>",
    2, 4, "2026-09-09T10:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 6: LIBERTADORES (6-10) ===")
pub("Libertadores 2026: veja a classificação dos brasileiros nas quartas",
    "Três clubes brasileiros disputam vaga nas semifinais da Libertadores de 2026.",
    "<p><strong>Situação:</strong> Fluminense venceu Platense 2 a 0. Palmeiras recebe LDU. Corinthians empatou 1 a 1 com Estudiantes. Todos como favoritos.</p>",
    2, 0, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Platense precisa de goleada para eliminar Fluminense",
    "Platense precisa ganhar por 3 ou mais gols para eliminar o Fluminense nas quartas da Libertadores.",
    "<p>O Platense precisa de goleada para eliminar o Fluminense. Com a derrota de 2 a 0 no jogo de ida, precisa ganhar por 3 ou mais gols em Vicente Lopez.</p>",
    2, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("LDU chega ao jogo contra o Palmeiras com Deyverson",
    "LDU chega ao jogo contra o Palmeiras com Deyverson, ex-verdão, no elenco.",
    "<p>A LDU chega ao jogo com Deyverson no elenco. O atacante brasileiro marcou o gol do título do Palmeiras na Libertadores de 2021 e agora retorna como adversário.</p>",
    2, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Palmeiras sem Andreas Pereira e Paulinho nas quartas",
    "Palmeiras não terá Andreas Pereira e Paulinho nas quartas da Libertadores contra a LDU.",
    "<p>O Palmeiras não terá Andreas Pereira (suspenso) e Paulinho (lesionado) nas quartas da Libertadores. Sosa e Jefte também estão fora por lesão.</p>",
    2, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Libertadores 2026: veja os jogos de volta das quartas",
    "Jogos de volta das quartas da Libertadores serão disputados entre 15 e 17 de setembro.",
    "<p><strong>Jogos de volta:</strong> 15/09 Platense x Fluminense, 16/09 LDU x Palmeiras e Corinthians x Estudiantes. Fluminense já tem vantagem de 2 a 0.</p>",
    2, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 7: LIBERTADORES (11-15) ===")
pub("Estudiantes x Corinthians: veja como foi o jogo de ida",
    "Estudiantes e Corinthians empataram por 1 a 1 no jogo de ida das quartas da Libertadores.",
    "<p>Estudiantes e Corinthians empataram por 1 a 1 no Estádio Jorge Luis Hirschi em La Plata. O Corinthians chegou ao empate com gol de Kaio César no segundo tempo.</p>",
    2, 0, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Kaio César marca gol do Corinthians na Libertadores",
    "Kaio César marcou o gol do Corinthians no empate com o Estudiantes pelas quartas da Libertadores.",
    "<p>Kaio César marcou o gol do Corinthians no empate em 1 a 1 com o Estudiantes. O atacante celebrou com Memphis Depay. Jogo de volta na Neo Química Arena.</p>",
    2, 1, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Palmeiras x LDU: provável escalação do Verdão",
    "Palmeiras deve escalar Carlos Miguel, Giay, Murilo, Gustavo Gómez e Piquerez na defesa.",
    "<p><strong>Provável escalação:</strong> Carlos Miguel; Giay, Murilo, Gustavo Gómez, Piquerez; Marlon Freitas, Lucas Evangelista, Jhon Arias, Felipe Anderson; Maurício e Flaco López.</p>",
    2, 2, "2026-09-09T12:00:00.000Z"); time.sleep(3)

pub("LDU chega ao Brasil com Deyverson para jogo contra Palmeiras",
    "LDU chegou ao Brasil com Deyverson no elenco para o jogo contra o Palmeiras.",
    "<p>A LDU chegou ao Brasil com Deyverson no elenco. O atacante tem experiência em jogos no Brasil e conhece bem o Palmeiras, tendo jogado no clube de 2020 a 2022.</p>",
    2, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Fluminense pode classificar-se mesmo com derrota na volta",
    "Fluminense pode classificar-se às semifinais da Libertadores mesmo perdendo por 1 gol na partida de volta.",
    "<p>Com a vitória de 2 a 0 no jogo de ida, o Fluminense pode classificar-se mesmo perdendo por 1 gol. Para o Platense avançar, precisa ganhar por 3 ou mais gols.</p>",
    2, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 8: LIBERTADORES (16-20) ===")
pub("Libertadores 2026: veja o chaveamento completo das quartas",
    "Confira o chaveamento completo das quartas de final da Libertadores 2026.",
    "<p><strong>Chave 1:</strong> Estudiantes x Corinthians. <strong>Chave 2:</strong> Palmeiras x LDU. <strong>Chave 3:</strong> Fluminense x Platense. Final em 28/11 em Montevidéu.</p>",
    2, 0, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Ganso e Nonato fazem gols do Fluminense na Libertadores",
    "Ganso e Nonato fizeram os gols do Fluminense na vitória sobre o Platense pelas quartas.",
    "<p>Nonato marcou o primeiro gol aos 20 minutos, desarmou Togni na defesa. Ganso teve atuação destaque. John Kennedy ampliou aos 45+2 do primeiro tempo.</p>",
    2, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Abel Ferreira analisa desfalques e monta time para Libertadores",
    "Abel Ferreira analisa os desfalques e monta time para o jogo contra a LDU nas quartas.",
    "<p>Abel Ferreira terá que montar time alternativo. Marlon Freitas assume a volancia. No ataque, Flaco López e Maurício devem formar a dupla.</p>",
    2, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Libertadores 2026: veja onde assistir aos jogos das quartas",
    "Confira onde assistir aos jogos das quartas de final da Libertadores de 2026.",
    "<p><strong>Onde assistir:</strong> Paramount+ transmite todos os jogos da Libertadores. Palmeiras x LDU em 9/09 às 19h, Corinthians x Estudiantes em 16/09 às 20h30.</p>",
    2, 3, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Libertadores 2026: veja os horários dos jogos das quartas",
    "Confira os horários dos jogos das quartas de final da Libertadores de 2026.",
    "<p><strong>Horários:</strong> 8/09 19h Fluminense x Platense, 9/09 19h Palmeiras x LDU, 9/09 20h30 Estudiantes x Corinthians. Todos pelo Paramount+.</p>",
    2, 4, "2026-09-08T10:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 9: CHAMPIONS LEAGUE (1-5) ===")
pub("Champions League 2026/27: fase de liga começa com grandes resultados",
    "A fase de liga da Champions League 2026/27 começou com grandes resultados na primeira rodada.",
    "<p><strong>Resultados 1ª rodada:</strong> Real Madrid 2 x 1 Inter, Brujas 2 x 3 Aston Villa, AEK Atenas 1 x 0 LASK, Lille 2 x 3 Betis.</p>",
    6, 0, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Real Madrid vence Inter por 2 a 1 na Champions League",
    "Real Madrid venceu a Inter por 2 a 1 no Bernabéu na primeira rodada da Champions League 2026/27.",
    "<p>O Real Madrid venceu a Inter por 2 a 1 no Bernabéu. Gols de Mbappé (13') e Valverde (22'). A Inter descontou com Carlos Augusto no segundo tempo.</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Aston Villa surpreende Brujas e vence por 3 a 2",
    "Aston Villa venceu o Brujas por 3 a 2 fora de casa na primeira rodada da Champions League.",
    "<p>O Aston Villa surpreendeu ao vencer o Brujas por 3 a 2 fora de casa. Gols de McGinn, Buendía e Nicolas Jackson. Brujas descontou com Tresoldi e Vetlesen.</p>",
    6, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Napoli x Arsenal: grande jogo na Champions League",
    "Napoli e Arsenal se enfrentam nesta quarta-feira na primeira rodada da Champions League 2026/27.",
    "<p>Napoli e Arsenal se enfrentam nesta quarta-feira (9) às 15h no Estádio Diego Armando Maradona. Jogo terá transmissão pelo Paramount+.</p>",
    6, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Barcelona inicia campanha na Champions League com vitória",
    "Barcelona venceu o Feyenoord por 2 a 0 e iniciou com vitória a campanha na Champions League.",
    "<p>O Barcelona venceu o Feyenoord por 2 a 0 no Camp Nou. Gols de Lamine Yamal e Robert Lewandowski. Yamal brilhou com gol e assistência.</p>",
    6, 4, "2026-09-10T08:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 10: CHAMPIONS LEAGUE (6-10) ===")
pub("Champions League 2026/27: veja todos os resultados da 1ª rodada",
    "Confira todos os resultados da primeira rodada da fase de liga da Champions League 2026/27.",
    "<p><strong>Resultados:</strong> Brujas 2x3 Aston Villa, AEK 1x0 LASK, Lille 2x3 Betis, Real Madrid 2x1 Inter, Porto 0x2 Man City, Barcelona 2x0 Feyenoord.</p>",
    6, 0, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Mbappé marca gol do Real Madrid na vitória sobre a Inter",
    "Mbappé marcou um dos gols do Real Madrid na vitória por 2 a 1 sobre a Inter pela Champions League.",
    "<p>Kylian Mbappé abriu o placar aos 13 minutos. Recebeu lançamento de Vinícius Jr e finalizou no canto do goleiro Sommer. Foi seu primeiro gol na Champions League 2026/27.</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Lamine Yamal brilha na Champions League pelo Barcelona",
    "Lamine Yamal brilhou na Champions League e foi destaque do Barcelona na vitória sobre o Feyenoord.",
    "<p>Lamine Yamal, de 19 anos, marcou gol e deu assistência. Com 19 anos e 114 dias, tornou-se o jogador mais jovem a marcar e dar assistência na mesma partida desde 2003.</p>",
    6, 2, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Manchester City goleia Porto e inicia bem a Champions League",
    "Manchester City venceu o Porto por 2 a 0 fora de casa na primeira rodada da Champions League.",
    "<p>O Manchester City venceu o Porto por 2 a 0 fora de casa. Gols de Erling Haaland e Phil Foden. O time de Pep Guardiola mostrou uma fase elevada de jogo.</p>",
    6, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Betis surpreende Lille e vence por 3 a 2 na Champions League",
    "Real Betis venceu o Lille por 3 a 2 fora de casa na primeira rodada da Champions League.",
    "<p>O Real Betis surpreendeu ao vencer o Lille por 3 a 2 fora de casa. Gols de Bartra (2) e Troy Parrott. Lille descontou com Ueda e Alexsandro.</p>",
    6, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 11: CHAMPIONS LEAGUE (11-15) ===")
pub("Champions League 2026/27: sorteio define confrontos da fase de liga",
    "Sorteio da Champions League 2026/27 definiu grandes confrontos como Real Madrid x Arsenal e PSG x Barcelona.",
    "<p><strong>Grandes confrontos:</strong> Real Madrid x Arsenal, PSG x Barcelona, Man City x Sporting, Liverpool x Atlético, Bayern x Arsenal.</p>",
    6, 0, "2026-08-28T10:00:00.000Z"); time.sleep(3)

pub("Arsenal enfrenta Bayern de Munique na Champions League",
    "Arsenal e Bayern de Munique se enfrentam na fase de liga da Champions League 2026/27.",
    "<p>Arsenal e Bayern de Munique se enfrentam no Emirates Stadium. O Arsenal tem Bukayo Saka e Martin Odegaard. O Bayern tem Harry Kane e Jamal Musiala.</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("PSG e Barcelona se enfrentam na Champions League",
    "PSG e Barcelona se enfrentam na fase de liga da Champions League 2026/27 em duelo eletrizante.",
    "<p>PSG e Barcelona se enfrentam no Parc des Princes. PSG tem Mbappé. Barcelona tem Lamine Yamal, Lewandowski e Pedri. Jogo marcado para outubro.</p>",
    6, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Champions League 2026/27: veja a classificação atualizada",
    "Confira a classificação atualizada da fase de liga da Champions League 2026/27 após a 1ª rodada.",
    "<p><strong>Classificação (top 8):</strong> Real Madrid 3pts, Barcelona 3pts, Man City 3pts, Aston Villa 3pts, Betis 3pts, Napoli 0pts, Arsenal 0pts, Bayern 0pts.</p>",
    6, 3, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Atlético de Madrid enfrenta Bayern de Munique na Champions League",
    "Atlético de Madrid enfrenta Bayern de Munique na fase de liga da Champions League 2026/27.",
    "<p>Atlético de Madrid enfrenta Bayern de Munique no Estádio Metropolitano. O Atlético tem Griezmann e Julián Álvarez. O Bayern tem Harry Kane.</p>",
    6, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 12: CHAMPIONS LEAGUE (16-20) ===")
pub("Champions League 2026/27: veja a próxima rodada de jogos",
    "Confira os jogos da próxima rodada da fase de liga da Champions League 2026/27.",
    "<p><strong>2ª rodada (13-14/10):</strong> Real Madrid x RB Leipzig, PSG x Barcelona, Liverpool x Villarreal, Man City x AEK, Bayern x Arsenal.</p>",
    6, 0, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Liverpool x Atlético: grande duelo na Champions League",
    "Liverpool e Atlético de Madrid se enfrentam na fase de liga da Champions League 2026/27.",
    "<p>Liverpool e Atlético de Madrid se enfrentam no Anfield. Liverpool tem Mohamed Salah e Darwin Núñez. Atlético tem Griezmann e Julián Álvarez.</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Champions League 2026/27: veja os classificados para playoffs",
    "Confira os times que podem se classificar para os playoffs da Champions League 2026/27.",
    "<p><strong>Favoritos:</strong> Real Madrid, Barcelona, Man City, Bayern, Liverpool, Arsenal, PSG, Inter de Milão. Final em 5/6/2027 no Estádio Metropolitano.</p>",
    6, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Champions League 2026/27: veja o calendário completo da fase de liga",
    "Confira o calendário completo da fase de liga da Champions League 2026/27.",
    "<p><strong>Calendário:</strong> 1ª rodada 8-10/09, 2ª 13-14/10, 3ª 20-21/10, 4ª 3-4/11, 5ª 24-25/11, 6ª 8-9/12, 7ª 19-20/01, 8ª 27/01. Final 5/6/2027.</p>",
    6, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Champions League 2026/27: veja os horários dos jogos",
    "Confira os horários dos jogos da fase de liga da Champions League 2026/27.",
    "<p><strong>Horários:</strong> Jogos às 12h45, 15h ou 18h (horário europeu). No Brasil, fuso horário de -3h. Paramount+ transmite no Brasil.</p>",
    6, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 13: TRANSFERÊNCIAS (1-5) ===")
pub("Janela de transferências do Brasileirão fecha em 11 de setembro",
    "A janela de transferências do futebol brasileiro fecha em 11 de setembro. Veja os principais movimentos.",
    "<p><strong>Principais movimentos:</strong> Flamengo: Lucas Paquetá (R$ 260M). Cruzeiro: Gerson (R$ 170M). Palmeiras: Jhon Arias (R$ 155M). Fluminense: Hulk e Thiago Silva.</p>",
    7, 0, "2026-09-10T10:00:00.000Z"); time.sleep(3)

pub("Hulk deixa Atlético-MG e acerta com o Fluminense",
    "Hulk deixou o Atlético-MG e acertou com o Fluminense para a segunda metade da temporada.",
    "<p>Hulk deixou o Atlético-MG e acertou com o Fluminense. O atacante jogou no Galo de 2021 a 2026. Agora forma dupla perigosa com John Kennedy no Tricolor.</p>",
    7, 1, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Thiago Silva retorna ao Fluminense após passagem pelo Porto",
    "Thiago Silva retornou ao Fluminense após passagem pelo Porto e reforça a defesa do Tricolor.",
    "<p>Thiago Silva retornou ao Fluminense após passagem pelo Porto. Com 41 anos, continua sendo um dos zagueiros mais bem posicionados do futebol brasileiro.</p>",
    7, 2, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Casemiro acerta com o Inter Miami e se junta a Messi",
    "Casemiro deixou o Manchester United e acertou com o Inter Miami, onde vai se juntar a Lionel Messi.",
    "<p>Casemiro deixou o Manchester United e acertou com o Inter Miami. O brasileiro vai dividir vestiário com Messi, com quem foi rival no futebol espanhol.</p>",
    7, 3, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Lewandowski acerta com o Chicago Fire após saída do Barcelona",
    "Lewandowski acertou com o Chicago Fire apos deixar o Barcelona e inicia nova etapa na MLS.",
    "<p>Robert Lewandowski acertou com o Chicago Fire apos deixar o Barcelona. O atacante polonês de 37 anos é mais uma grande estrela que chega à MLS.</p>",
    7, 4, "2026-09-04T10:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 14: TRANSFERÊNCIAS (6-10) ===")
pub("Griezmann acerta com o Orlando City após saída do Atlético",
    "Griezmann acertou com o Orlando City apos deixar o Atlético de Madrid e inicia nova etapa na MLS.",
    "<p>Antoine Griezmann acertou com o Orlando City. O francês, campeão da Copa do Mundo de 2018, é mais uma grande estrela que chega ao futebol americano.</p>",
    7, 0, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Palmeiras contrata Jhon Arias por 25 milhões de euros",
    "Palmeiras contratou Jhon Arias por 25 milhões de euros, uma das maiores contratações da história do clube.",
    "<p>O Palmeiras contratou Jhon Arias por 25 milhões de euros (cerca de R$ 155 milhões). O meia colombiano chega para reforçar o time na disputa pelo título.</p>",
    7, 1, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Flamengo contrata Lucas Paquetá por R$ 260 milhões",
    "Flamengo contratou Lucas Paquetá por cerca de R$ 260 milhões, a maior contratação da história do futebol brasileiro.",
    "<p>O Flamengo contratou Lucas Paquetá por cerca de R$ 260 milhões, a maior contratação da história do futebol brasileiro. O meia chega do West Ham.</p>",
    7, 2, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Cruzeiro contrata Gerson por 27 milhões de euros",
    "Cruzeiro contratou Gerson por 27 milhões de euros, uma das maiores contratações da história do clube.",
    "<p>O Cruzeiro contratou Gerson por 27 milhões de euros (cerca de R$ 170 milhões). O volante chega do PSG para reforçar o time na disputa pelo título.</p>",
    7, 3, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Palmeiras contrata Barboza do Botafogo para reforçar defesa",
    "Palmeiras contratou Barboza do Botafogo para reforçar a defesa na temporada de 2026.",
    "<p>O Palmeiras contratou Barboza do Botafogo. O zagueiro argentino forma dupla perigosa com Gustavo Gómez na defesa do Verdão.</p>",
    7, 4, "2026-03-28T10:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 15: TRANSFERÊNCIAS (11-15) ===")
pub("MLS fecha janela com contratações históricas de estrelas europeias",
    "A MLS fechou a janela com contratações históricas de Casemiro, Lewandowski e Griezmann.",
    "<p><strong>Principais contratações da MLS:</strong> Casemiro (Man United → Inter Miami), Lewandowski (Barcelona → Chicago Fire), Griezmann (Atlético → Orlando City).</p>",
    7, 0, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Barcelona contrata melhor jogador da Copa do Mundo 2026",
    "Barcelona contratou o melhor jogador da Copa do Mundo de 2026 para reforçar o elenco.",
    "<p>O Barcelona contratou o melhor jogador da Copa do Mundo de 2026. A contratação reforça o projeto do clube catalão para as próximas temporadas.</p>",
    7, 1, "2026-08-20T10:00:00.000Z"); time.sleep(3)

pub("Janela do futebol brasileiro chega ao fim com cifras históricas",
    "A janela de transferências do futebol brasileiro chegou ao fim com cifras históricas e movimentação intensa.",
    "<p>A janela de transferências chegou ao fim com cifras históricas. Flamengo gastou R$ 260M com Paquetá, Cruzeiro R$ 170M com Gerson, Palmeiras R$ 155M com Arias.</p>",
    7, 2, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Vitória contrata Walace e reforça elenco para segunda metade",
    "Vitória anuncia contratação de Walace e reforça elenco para a segunda metade da temporada.",
    "<p>O Vitória anunciou a contratação de Walace, volante que chega para reforçar o elenco na reta final do Brasileirão e da Copa do Brasil.</p>",
    7, 3, "2026-09-03T10:00:00.000Z"); time.sleep(3)

pub("Bahia gasta R$ 81 milhões em contratações em 2026",
    "Bahia gastou cerca de R$ 81 milhões em contratações e arrecadou R$ 41 milhões com vendas em 2026.",
    "<p>O Bahia gastou cerca de R$ 81 milhões em contratações em 2026. Alejo Véliz foi o maior investimento. O clube arrecadou R$ 41 milhões com vendas.</p>",
    7, 4, "2026-08-14T10:00:00.000Z"); time.sleep(3)

print("\n=== LOTE 16: TRANSFERÊNCIAS (16-20) ===")
pub("Corinthians e Santos não podem contratar por transfer ban da FIFA",
    "Corinthians e Santos não podem inscrever novos jogadores por causa do transfer ban imposto pela FIFA.",
    "<p>Corinthians e Santos não podem inscrever novos jogadores por causa do transfer ban imposto pela FIFA. Os clubes tentam reverter a situação na justiça desportiva.</p>",
    7, 0, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Mirassol é o time mais ativo no mercado da bola",
    "Mirassol é o time mais ativo no mercado da bola entre os clubes da Série A do Brasileirão.",
    "<p>O Mirassol é o time mais ativo no mercado da bola. A equipe fez várias contratações para tentar se manter na Série A após a pausa para a Copa do Mundo.</p>",
    7, 1, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Santiago Rodríguez deixa o Botafogo e acerta com a MLS",
    "Santiago Rodríguez deixou o Botafogo e acertou com um clube da MLS para a segunda metade da temporada.",
    "<p>O uruguaio Santiago Rodríguez deixou o Botafogo e acertou com um clube da MLS. O meia era um dos principais jogadores do alvinegro carioca.</p>",
    7, 2, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("São Paulo negocia Arthur Chaves do Hoffenheim",
    "São Paulo negocia a contratação de Arthur Chaves, zagueiro do Hoffenheim, para reforçar a defesa.",
    "<p>O São Paulo negocia a contratação de Arthur Chaves, zagueiro do Hoffenheim. O clube paulista busca reforços para a reta final do Brasileirão.</p>",
    7, 3, "2026-06-19T10:00:00.000Z"); time.sleep(3)

pub("Barboza deixa o Botafogo e acerta com o Palmeiras",
    "Barboza deixou o Botafogo e acertou com o Palmeiras para reforçar a defesa do Verdão.",
    "<p>O zagueiro argentino Barboza deixou o Botafogo e acertou com o Palmeiras. A contratação reforça a defesa do Verdão na disputa pelo título.</p>",
    7, 4, "2026-06-19T10:00:00.000Z"); time.sleep(3)

print("\n=== CONCLUÍDO! 80 notícias publicadas! ===")
