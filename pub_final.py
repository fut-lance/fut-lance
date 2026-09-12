import requests
import json
import time
import re
import unicodedata

STRAPI_URL = "https://fut-lance-cms-v2.onrender.com"
TOKEN = "231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699"
HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

IMG = [
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=500&fit=crop",
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
    elif r.status_code == 429:
        time.sleep(5)
        r = requests.post(f"{STRAPI_URL}/api/noticias", headers=HDR, json=payload, timeout=60)
        if r.status_code == 201:
            print(f"  OK [{slug}]")
            return True
    print(f"  ERRO {r.status_code}: {r.text[:150]}")
    return False

# CAT: 1=Brasileirão, 2=Libertadores, 6=Champions, 7=Transferências

print("=== BRASILEIRÃO (20) ===")
pub("Flamengo assume lideranca do Brasileirao apos vitoria sobre o Remo",
    "Com gol de Samuel Lino, o Flamengo venceu o Remo por 1 a 0 e assumiu a lideranca do Brasileirao com 54 pontos.",
    "<p>O Flamengo assumiu a lideranca do Campeonato Brasileiro de 2026 apos vencer o Remo por 1 a 0, no Mangueiraoo, em Belem. Samuel Lino marcou o gol no primeiro tempo.</p><p>Com a vitoria, o rubro-negro chegou a 54 pontos, um a mais que o Palmeiras. O publico foi de 51.567 torcedores.</p>",
    1, 0, "2026-09-07T20:00:00.000Z"); time.sleep(3)

pub("Palmeiras empata com Botafogo e perde lideranca do Brasileirao",
    "Palmeiras empatou sem gols com o Botafogo e cedeu a lideranca do Brasileirao para o Flamengo.",
    "<p>O Palmeiras empatou sem gols com o Botafogo no Rio de Janeiro pela 26a rodada. Com 53 pontos, o Verde cedeu a lideranca para o Flamengo.</p>",
    1, 1, "2026-09-07T22:00:00.000Z"); time.sleep(3)

pub("Bahia vence Bragantino e continua invicto ha 10 jogos",
    "Bahia venceu o Bragantino por 3 a 2 e mantem sequencia historica de 10 jogos sem derrota no Brasileirao.",
    "<p>O Bahia venceu o Bragantino por 3 a 2 em Braganca Paulista pela 26a rodada. Com 43 pontos, o Tricolor mantem a 5a posicao.</p>",
    1, 2, "2026-09-06T18:00:00.000Z"); time.sleep(3)

pub("Cruzeiro vence Athletico-PR no classico e sobe na classificacao",
    "Cruzeiro aplicou 3 a 1 no Athletico-PR e conquistou posicoes na classificacao do Brasileirao.",
    "<p>O Cruzeiro venceu o Athletico-PR por 3 a 1 no Mineirao pela 26a rodada. Gols de Gabriel Pec (2) e Gerson.</p>",
    1, 3, "2026-09-06T20:00:00.000Z"); time.sleep(3)

pub("Sao Paulo goleia Atletico-MG e sobe na classificacao",
    "Sao Paulo venceu o Atletico-MG por 2 a 0 no Morumbi pela 26a rodada do Brasileirao.",
    "<p>O Sao Paulo venceu o Atletico-MG por 2 a 0 no Morumbi. Gols de Nestor e Lucas Talia. Publico de 39.068.</p>",
    1, 4, "2026-09-06T22:00:00.000Z"); time.sleep(3)

pub("Vitoria vence Gremio e se afasta do rebaixamento",
    "Vitoria goleou o Gremio por 1 a 0 e conquistou 3 pontos fundamentais para se afastar da zona de rebaixamento.",
    "<p>O Vitoria venceu o Gremio por 1 a 0 no Barradao pela 26a rodada. Gol de Rene. Com 32 pontos, subiu para a 11a posicao.</p>",
    1, 0, "2026-09-08T20:00:00.000Z"); time.sleep(3)

pub("Fluminense vence Vasco no classico carioca pela 26a rodada",
    "Fluminense derrotou o Vasco por 1 a 0 no Maracana pelo classico carioca da 26a rodada.",
    "<p>O Fluminense venceu o Vasco por 1 a 0 no Maracana. Gol de John Kennedy. Vasco cai para a 17a, zona de rebaixamento.</p>",
    1, 1, "2026-09-06T22:00:00.000Z"); time.sleep(3)

pub("Mirassol vence Coritiba e conquista pontos importantes",
    "Mirassol aplicou 2 a 1 no Coritiba e conquistou 3 pontos para se manter na Serie A.",
    "<p>O Mirassol venceu o Coritiba por 2 a 1. Gols de Japa e Negueba. Com 25 pontos, permanece na 16a posicao.</p>",
    1, 2, "2026-09-06T18:00:00.000Z"); time.sleep(3)

pub("Santos vence Internacional em jogo eletrizante",
    "Santos venceu o Internacional por 3 a 2 em jogo eletrizante pela 26a rodada do Brasileirao.",
    "<p>O Santos venceu o Internacional por 3 a 2 no Beira-Rio. Gols de Neymar (2) e Marcos Leonardo.</p>",
    1, 3, "2026-09-06T18:00:00.000Z"); time.sleep(3)

pub("Chapecoense surpreende Corinthians e conquista 3 pontos",
    "Chapecoense venceu o Corinthians por 2 a 1 na Neo Quimica Arena e conquistou 3 pontos importantes.",
    "<p>A Chapecoense surpreendeu o Corinthians ao vencer por 2 a 1 na Neo Quimica Arena. Gols de Jean Carlos e Tulio Eduardo.</p>",
    1, 4, "2026-09-09T10:00:00.000Z"); time.sleep(3)

pub("Classificacao do Brasileirao 2026 apos 26 rodadas",
    "Confira a classificacao completa do Campeonato Brasileiro de 2026 apos a 26a rodada.",
    "<p><strong>Classificacao:</strong> 1. Flamengo 54pts, 2. Palmeiras 53pts, 3. Athletico-PR 45pts, 4. Fluminense 45pts, 5. Bahia 43pts, 6. Cruzeiro 42pts.</p>",
    1, 0, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Gremio sofre com crise e ameaca de rebaixamento",
    "Gremio vive momento complicado no Brasileirao e ameaca cair para a Serie B pela primeira vez.",
    "<p>O Gremio com apenas 28 pontos ameaca cair para a Serie B. O time ocupa a 15a posicao, 3 pontos acima da zona de rebaixamento.</p>",
    1, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Athletico-PR busca reacao apos derrota para o Cruzeiro",
    "Athletico-PR foi derrotado pelo Cruzeiro por 3 a 1 e agora precisa reagir na proxima rodada.",
    "<p>O Athletico-PR foi derrotado pelo Cruzeiro por 3 a 1 no Mineirao. Com 45 pontos, permanece na 3a posicao.</p>",
    1, 2, "2026-09-07T10:00:00.000Z"); time.sleep(3)

pub("Atletico-MG cai na tabela apos derrota para o Sao Paulo",
    "Atletico-MG foi derrotado pelo Sao Paulo por 2 a 0 e caiu para a 8a posicao do Brasileirao.",
    "<p>O Atletico-MG foi derrotado pelo Sao Paulo por 2 a 0 no Morumbi. Com 36 pontos, caiu para a 8a posicao.</p>",
    1, 3, "2026-09-07T10:00:00.000Z"); time.sleep(3)

pub("Corinthians cai uma posicao na tabela ao fim da 26a rodada",
    "A derrota para a Chapecoense fez o Corinthians cair na classificacao do Brasileirao.",
    "<p>O Corinthians caiu uma posicao na tabela do Brasileirao. A derrota para a Chapecoense por 2 a 1 complicou a situacao do Timao.</p>",
    1, 4, "2026-09-08T22:00:00.000Z"); time.sleep(3)

pub("Remo recebe Flamengo e sofre derrota no Mangueirao",
    "Remo foi derrotado pelo Flamengo por 1 a 0 no Mangueirao com publico de 51 mil torcedores.",
    "<p>O Remo foi derrotado pelo Flamengo por 1 a 0 no Mangueirao. Samuel Lino marcou o gol. Publico de 51.567 torcedores.</p>",
    1, 0, "2026-09-07T18:00:00.000Z"); time.sleep(3)

pub("Botafogo empata com Palmeiras e ajuda Flamengo na lideranca",
    "Botafogo empatou sem gols com o Palmeiras e ajudou o Flamengo a assumir a lideranca do Brasileirao.",
    "<p>O Botafogo empatou sem gols com o Palmeiras no Rio de Janeiro. Com o resultado, o Flamengo assumiu a lideranca.</p>",
    1, 1, "2026-09-07T20:00:00.000Z"); time.sleep(3)

pub("Vasco cai na zona de rebaixamento apos derrota para o Fluminense",
    "Vasco foi derrotado pelo Fluminense por 1 a 0 no Maracana e caiu para a zona de rebaixamento.",
    "<p>O Vasco foi derrotado pelo Fluminense por 1 a 0 no Maracana. Com 25 pontos, o Vasco caiu para a 17a posicao.</p>",
    1, 2, "2026-09-06T22:00:00.000Z"); time.sleep(3)

pub("Gremio perde para o Vitoria e se aproxima do rebaixamento",
    "Gremio foi derrotado pelo Vitoria por 1 a 0 no Barradao e se aproxima da zona de rebaixamento.",
    "<p>O Gremio foi derrotado pelo Vitoria por 1 a 0 no Barradao. Com 28 pontos, ocupa a 15a posicao.</p>",
    1, 3, "2026-09-08T20:00:00.000Z"); time.sleep(3)

pub("Flamengo assume lideranca pela primeira vez em 2026",
    "Flamengo assume a lideranca do Brasileirao pela primeira vez na temporada de 2026.",
    "<p>Com a vitoria sobre o Remo e o empate do Palmeiras, o Flamengo assume a lideranca do Brasileirao pela primeira vez em 2026.</p>",
    1, 4, "2026-09-08T08:00:00.000Z"); time.sleep(3)

print("\n=== LIBERTADORES (20) ===")
pub("Libertadores 2026 confira os confrontos das quartas de final",
    "Oito equipes disputam vaga nas semifinais da Copa Libertadores de 2026.",
    "<p><strong>Confrontos das quartas:</strong> Estudiantes x Corinthians, Palmeiras x LDU, Fluminense x Platense.</p>",
    2, 0, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Fluminense goleia Platense e abre vantagem nas quartas",
    "Fluminense venceu o Platense por 2 a 0 no Maracana e pode classificar-se mesmo com derrota na volta.",
    "<p>O Fluminense venceu o Platense por 2 a 0 no Maracana pelas quartas da Libertadores. Gols de Nonato e John Kennedy.</p>",
    2, 1, "2026-09-08T22:00:00.000Z"); time.sleep(3)

pub("Palmeiras recebe LDU nas quartas com 4 desfalques",
    "Palmeiras enfrenta a LDU nesta quarta-feira sem Andreas Pereira, Paulinho, Sosa e Jefte.",
    "<p>O Palmeiras recebe a LDU nesta quarta-feira (9) as 19h no Nubank Parque pelas quartas da Libertadores.</p>",
    2, 2, "2026-09-09T12:00:00.000Z"); time.sleep(3)

pub("Corinthians busca empate com Estudiantes no jogo de ida",
    "Corinthians empatou com o Estudiantes por 1 a 1 em La Plata pelo jogo de ida das quartas.",
    "<p>O Corinthians buscou empate em 1 a 1 na visita ao Estudiantes de La Plata. Gol de Kaio Cesar.</p>",
    2, 3, "2026-09-09T22:00:00.000Z"); time.sleep(3)

pub("Deyverson reencontra o Palmeiras como adversario na Libertadores",
    "Deyverson, que marcou o gol do titulo do Palmeiras em 2021, agora retorna como adversario pela LDU.",
    "<p>Deyverson marcou o gol que garantiu ao Palmeiras o titulo da Libertadores de 2021. Agora, defendendo a LDU, enfrenta seu ex-clube.</p>",
    2, 4, "2026-09-09T10:00:00.000Z"); time.sleep(3)

pub("Classificacao dos brasileiros nas quartas da Libertadores",
    "Tres clubes brasileiros disputam vaga nas semifinais da Libertadores de 2026.",
    "<p><strong>Situacao:</strong> Fluminense venceu Platense 2 a 0. Palmeiras recebe LDU. Corinthians empatou 1 a 1 com Estudiantes.</p>",
    2, 0, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Platense precisa de goleada para eliminar Fluminense",
    "Platense precisa ganhar por 3 ou mais gols para eliminar o Fluminense nas quartas da Libertadores.",
    "<p>O Platense precisa de goleada para eliminar o Fluminense. Com a derrota de 2 a 0 no jogo de ida, precisa ganhar por 3 ou mais gols.</p>",
    2, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("LDU chega ao jogo contra o Palmeiras com Deyverson",
    "LDU chega ao jogo contra o Palmeiras com Deyverson, ex-verdao, no elenco.",
    "<p>A LDU chega ao jogo com Deyverson no elenco. O atacante marcou o gol do titulo do Palmeiras na Libertadores de 2021.</p>",
    2, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Palmeiras sem Andreas Pereira e Paulinho nas quartas",
    "Palmeiras nao tera Andreas Pereira e Paulinho nas quartas da Libertadores contra a LDU.",
    "<p>O Palmeiras nao tera Andreas Pereira (suspenso) e Paulinho (lesionado) nas quartas da Libertadores.</p>",
    2, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Jogos de volta das quartas da Libertadores 2026",
    "Jogos de volta das quartas da Libertadores serao disputados entre 15 e 17 de setembro.",
    "<p><strong>Jogos de volta:</strong> 15/09 Platense x Fluminense, 16/09 LDU x Palmeiras e Corinthians x Estudiantes.</p>",
    2, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Estudiantes x Corinthians jogo de ida das quartas",
    "Estudiantes e Corinthians empataram por 1 a 1 no jogo de ida das quartas da Libertadores.",
    "<p>Estudiantes e Corinthians empataram por 1 a 1 no Estadio Jorge Luis Hirschi em La Plata.</p>",
    2, 0, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Kaio Cesar marca gol do Corinthians na Libertadores",
    "Kaio Cesar marcou o gol do Corinthians no empate com o Estudiantes pelas quartas da Libertadores.",
    "<p>Kaio Cesar marcou o gol do Corinthians no empate em 1 a 1 com o Estudiantes. O atacante celebrou com Memphis Depay.</p>",
    2, 1, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Palmeiras x LDU provavel escalacao do Verdao",
    "Palmeiras deve escalar Carlos Miguel, Giay, Murilo, Gustavo Gomez e Piquerez na defesa.",
    "<p><strong>Provavel escalacao:</strong> Carlos Miguel; Giay, Murilo, Gustavo Gomez, Piquerez; Marlon Freitas, Lucas Evangelista, Jhon Arias, Felipe Anderson; Mauricio e Flaco Lopez.</p>",
    2, 2, "2026-09-09T12:00:00.000Z"); time.sleep(3)

pub("LDU chega ao Brasil com Deyverson para jogo contra Palmeiras",
    "LDU chegou ao Brasil com Deyverson no elenco para o jogo contra o Palmeiras.",
    "<p>A LDU chegou ao Brasil com Deyverson no elenco. O atacante tem experiencia em jogos no Brasil.</p>",
    2, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Fluminense pode classificar-se mesmo com derrota na volta",
    "Fluminense pode classificar-se as semifinais da Libertadores mesmo perdendo por 1 gol na volta.",
    "<p>Com a vitoria de 2 a 0 no jogo de ida, o Fluminense pode classificar-se mesmo perdendo por 1 gol.</p>",
    2, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Chaveamento completo das quartas da Libertadores 2026",
    "Confira o chaveamento completo das quartas de final da Libertadores 2026.",
    "<p><strong>Chave 1:</strong> Estudiantes x Corinthians. <strong>Chave 2:</strong> Palmeiras x LDU. <strong>Chave 3:</strong> Fluminense x Platense.</p>",
    2, 0, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Ganso e Nonato fazem gols do Fluminense na Libertadores",
    "Ganso e Nonato fizeram os gols do Fluminense na vitoria sobre o Platense pelas quartas.",
    "<p>Nonato marcou o primeiro gol aos 20 minutos. Ganso teve atuacao destaque. John Kennedy ampliou aos 45+2.</p>",
    2, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Abel Ferreira monta time para Libertadores com desfalques",
    "Abel Ferreira analisa os desfalques e monta time para o jogo contra a LDU nas quartas.",
    "<p>Abel Ferreira tera que montar time alternativo. Marlon Freitas assume a volancia. Flaco Lopez e Mauricio no ataque.</p>",
    2, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Onde assistir aos jogos das quartas da Libertadores 2026",
    "Confira onde assistir aos jogos das quartas de final da Libertadores de 2026.",
    "<p><strong>Onde assistir:</strong> Paramount+ transmite todos os jogos da Libertadores.</p>",
    2, 3, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Horarios dos jogos das quartas da Libertadores 2026",
    "Confira os horarios dos jogos das quartas de final da Libertadores de 2026.",
    "<p><strong>Horarios:</strong> 8/09 19h Fluminense x Platense, 9/09 19h Palmeiras x LDU, 9/09 20h30 Estudiantes x Corinthians.</p>",
    2, 4, "2026-09-08T10:00:00.000Z"); time.sleep(3)

print("\n=== CHAMPIONS LEAGUE (20) ===")
pub("Champions League 2026-27 fase de liga comeca com grandes resultados",
    "A fase de liga da Champions League 2026-27 comecou com grandes resultados na primeira rodada.",
    "<p><strong>Resultados 1a rodada:</strong> Real Madrid 2 x 1 Inter, Brujas 2 x 3 Aston Villa, AEK Atenas 1 x 0 LASK, Lille 2 x 3 Betis.</p>",
    6, 0, "2026-09-08T10:00:00.000Z"); time.sleep(3)

pub("Real Madrid vence Inter por 2 a 1 na Champions League",
    "Real Madrid venceu a Inter por 2 a 1 no Bernabeu na primeira rodada da Champions League 2026-27.",
    "<p>O Real Madrid venceu a Inter por 2 a 1 no Bernabeu. Gols de Mbappe (13) e Valverde (22).</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Aston Villa surpreende Brujas e vence por 3 a 2",
    "Aston Villa venceu o Brujas por 3 a 2 fora de casa na primeira rodada da Champions League.",
    "<p>O Aston Villa surpreendeu ao vencer o Brujas por 3 a 2 fora de casa. Gols de McGinn, Buendia e Nicolas Jackson.</p>",
    6, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Napoli x Arsenal grande jogo na Champions League",
    "Napoli e Arsenal se enfrentam nesta quarta-feira na primeira rodada da Champions League 2026-27.",
    "<p>Napoli e Arsenal se enfrentam nesta quarta-feira (9) as 15h no Estadio Diego Armando Maradona.</p>",
    6, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Barcelona inicia campanha na Champions League com vitoria",
    "Barcelona venceu o Feyenoord por 2 a 0 e iniciou com vitoria a campanha na Champions League.",
    "<p>O Barcelona venceu o Feyenoord por 2 a 0 no Camp Nou. Gols de Lamine Yamal e Robert Lewandowski.</p>",
    6, 4, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Resultados da 1a rodada da Champions League 2026-27",
    "Confira todos os resultados da primeira rodada da fase de liga da Champions League 2026-27.",
    "<p><strong>Resultados:</strong> Brujas 2x3 Aston Villa, AEK 1x0 LASK, Lille 2x3 Betis, Real Madrid 2x1 Inter, Porto 0x2 Man City, Barcelona 2x0 Feyenoord.</p>",
    6, 0, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Mbappe marca gol do Real Madrid na vitoria sobre a Inter",
    "Mbappe marcou um dos gols do Real Madrid na vitoria por 2 a 1 sobre a Inter pela Champions League.",
    "<p>Kylian Mbappe abriu o placar aos 13 minutos. Recebeu lancamento de Vinicius Jr e finalizou no canto.</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Lamine Yamal brilha na Champions League pelo Barcelona",
    "Lamine Yamal brilhou na Champions League e foi destaque do Barcelona na vitoria sobre o Feyenoord.",
    "<p>Lamine Yamal, de 19 anos, marcou gol e deu assistencia. Tornou-se o jogador mais jovem a marcar e dar assistencia na mesma partida desde 2003.</p>",
    6, 2, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Manchester City goleia Porto e inicia bem a Champions League",
    "Manchester City venceu o Porto por 2 a 0 fora de casa na primeira rodada da Champions League.",
    "<p>O Manchester City venceu o Porto por 2 a 0 fora de casa. Gols de Erling Haaland e Phil Foden.</p>",
    6, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Betis surpreende Lille e vence por 3 a 2 na Champions League",
    "Real Betis venceu o Lille por 3 a 2 fora de casa na primeira rodada da Champions League.",
    "<p>O Real Betis surpreendeu ao vencer o Lille por 3 a 2 fora de casa. Gols de Bartra (2) e Troy Parrott.</p>",
    6, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Sorteio da Champions League 2026-27 define confrontos",
    "Sorteio da Champions League 2026-27 definiu grandes confrontos como Real Madrid x Arsenal.",
    "<p><strong>Grandes confrontos:</strong> Real Madrid x Arsenal, PSG x Barcelona, Man City x Sporting, Liverpool x Atletico.</p>",
    6, 0, "2026-08-28T10:00:00.000Z"); time.sleep(3)

pub("Arsenal enfrenta Bayern de Munique na Champions League",
    "Arsenal e Bayern de Munique se enfrentam na fase de liga da Champions League 2026-27.",
    "<p>Arsenal e Bayern de Munique se enfrentam no Emirates Stadium. Arsenal tem Saka e Odegaard. Bayern tem Kane e Musiala.</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("PSG e Barcelona se enfrentam na Champions League",
    "PSG e Barcelona se enfrentam na fase de liga da Champions League 2026-27 em duelo eletrizante.",
    "<p>PSG e Barcelona se enfrentam no Parc des Princes. PSG tem Mbappe. Barcelona tem Yamal, Lewandowski e Pedri.</p>",
    6, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Classificacao atualizada da Champions League 2026-27",
    "Confira a classificacao atualizada da fase de liga da Champions League 2026-27 apos a 1a rodada.",
    "<p><strong>Classificacao (top 8):</strong> Real Madrid 3pts, Barcelona 3pts, Man City 3pts, Aston Villa 3pts, Betis 3pts.</p>",
    6, 3, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Atletico de Madrid enfrenta Bayern de Munique na Champions League",
    "Atletico de Madrid enfrenta Bayern de Munique na fase de liga da Champions League 2026-27.",
    "<p>Atletico de Madrid enfrenta Bayern de Munique no Estadio Metropolitano. Atletico tem Griezmann e Julian Alvarez.</p>",
    6, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Proxima rodada da Champions League 2026-27",
    "Confira os jogos da proxima rodada da fase de liga da Champions League 2026-27.",
    "<p><strong>2a rodada (13-14/10):</strong> Real Madrid x RB Leipzig, PSG x Barcelona, Liverpool x Villarreal, Man City x AEK.</p>",
    6, 0, "2026-09-10T08:00:00.000Z"); time.sleep(3)

pub("Liverpool x Atletico grande duelo na Champions League",
    "Liverpool e Atletico de Madrid se enfrentam na fase de liga da Champions League 2026-27.",
    "<p>Liverpool e Atletico de Madrid se enfrentam no Anfield. Liverpool tem Salah e Nunez. Atletico tem Griezmann.</p>",
    6, 1, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Classificados para playoffs da Champions League 2026-27",
    "Confira os times que podem se classificar para os playoffs da Champions League 2026-27.",
    "<p><strong>Favoritos:</strong> Real Madrid, Barcelona, Man City, Bayern, Liverpool, Arsenal, PSG, Inter. Final em 5/6/2027.</p>",
    6, 2, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Calendario completo da fase de liga da Champions League 2026-27",
    "Confira o calendario completo da fase de liga da Champions League 2026-27.",
    "<p><strong>Calendario:</strong> 1a rodada 8-10/09, 2a 13-14/10, 3a 20-21/10, 4a 3-4/11, 5a 24-25/11, 6a 8-9/12, 7a 19-20/01, 8a 27/01.</p>",
    6, 3, "2026-09-09T08:00:00.000Z"); time.sleep(3)

pub("Horarios dos jogos da Champions League 2026-27",
    "Confira os horarios dos jogos da fase de liga da Champions League 2026-27.",
    "<p><strong>Horarios:</strong> Jogos as 12h45, 15h ou 18h (horario europeu). No Brasil, fuso -3h. Paramount+ transmite.</p>",
    6, 4, "2026-09-09T08:00:00.000Z"); time.sleep(3)

print("\n=== TRANSFERENCIAS (20) ===")
pub("Janela de transferencias do Brasileirao fecha em 11 de setembro",
    "A janela de transferencias do futebol brasileiro fecha em 11 de setembro.",
    "<p><strong>Principais movimentos:</strong> Flamengo: Lucas Paqueta (R$ 260M). Cruzeiro: Gerson (R$ 170M). Palmeiras: Jhon Arias (R$ 155M).</p>",
    7, 0, "2026-09-10T10:00:00.000Z"); time.sleep(3)

pub("Hulk deixa Atletico-MG e acerta com o Fluminense",
    "Hulk deixou o Atletico-MG e acertou com o Fluminense para a segunda metade da temporada.",
    "<p>Hulk deixou o Atletico-MG e acertou com o Fluminense. Agora forma dupla perigosa com John Kennedy.</p>",
    7, 1, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Thiago Silva retorna ao Fluminense apos passagem pelo Porto",
    "Thiago Silva retornou ao Fluminense apos passagem pelo Porto e reforca a defesa do Tricolor.",
    "<p>Thiago Silva retornou ao Fluminense. Com 41 anos, continua sendo um dos zagueiros mais bem posicionados do futebol brasileiro.</p>",
    7, 2, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Casemiro acerta com o Inter Miami e se junta a Messi",
    "Casemiro deixou o Manchester United e acertou com o Inter Miami, onde vai se juntar a Lionel Messi.",
    "<p>Casemiro deixou o Manchester United e acertou com o Inter Miami. O brasileiro vai dividir vestiario com Messi.</p>",
    7, 3, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Lewandowski acerta com o Chicago Fire apos saida do Barcelona",
    "Lewandowski acertou com o Chicago Fire apos deixar o Barcelona e inicia nova etapa na MLS.",
    "<p>Robert Lewandowski acertou com o Chicago Fire. O atacante polones de 37 anos e mais uma estrela que chega a MLS.</p>",
    7, 4, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Griezmann acerta com o Orlando City apos saida do Atletico",
    "Griezmann acertou com o Orlando City apos deixar o Atletico de Madrid e inicia nova etapa na MLS.",
    "<p>Antoine Griezmann acertou com o Orlando City. O frances, campeao da Copa do Mundo de 2018, chega a MLS.</p>",
    7, 0, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Palmeiras contrata Jhon Arias por 25 milhoes de euros",
    "Palmeiras contratou Jhon Arias por 25 milhoes de euros, uma das maiores contratacoes da historia do clube.",
    "<p>O Palmeiras contratou Jhon Arias por 25 milhoes de euros (cerca de R$ 155 milhoes). O meia colombiano chega para reforcar o time.</p>",
    7, 1, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Flamengo contrata Lucas Paqueta por R$ 260 milhoes",
    "Flamengo contratou Lucas Paqueta por cerca de R$ 260 milhoes, a maior contratacao da historia do futebol brasileiro.",
    "<p>O Flamengo contratou Lucas Paqueta por cerca de R$ 260 milhoes. O meia chega do West Ham.</p>",
    7, 2, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Cruzeiro contrata Gerson por 27 milhoes de euros",
    "Cruzeiro contratou Gerson por 27 milhoes de euros, uma das maiores contratacoes da historia do clube.",
    "<p>O Cruzeiro contratou Gerson por 27 milhoes de euros (cerca de R$ 170 milhoes). O volante chega do PSG.</p>",
    7, 3, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Palmeiras contrata Barboza do Botafogo para reforcar defesa",
    "Palmeiras contratou Barboza do Botafogo para reforcar a defesa na temporada de 2026.",
    "<p>O Palmeiras contratou Barboza do Botafogo. O zagueiro argentino forma dupla perigosa com Gustavo Gomez.</p>",
    7, 4, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("MLS fecha janela com contratacoes historicas de estrelas europeias",
    "A MLS fechou a janela com contratacoes historicas de Casemiro, Lewandowski e Griezmann.",
    "<p><strong>Principais contratacoes da MLS:</strong> Casemiro (Man United para Inter Miami), Lewandowski (Barcelona para Chicago Fire), Griezmann (Atletico para Orlando City).</p>",
    7, 0, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Barcelona contrata melhor jogador da Copa do Mundo 2026",
    "Barcelona contratou o melhor jogador da Copa do Mundo de 2026 para reforcar o elenco.",
    "<p>O Barcelona contratou o melhor jogador da Copa do Mundo de 2026. A contratacao reforca o projeto do clube catalao.</p>",
    7, 1, "2026-08-20T10:00:00.000Z"); time.sleep(3)

pub("Janela do futebol brasileiro chega ao fim com cifras historicas",
    "A janela de transferencias do futebol brasileiro chegou ao fim com cifras historicas.",
    "<p>A janela chegou ao fim com cifras historicas. Flamengo gastou R$ 260M com Paqueta, Cruzeiro R$ 170M com Gerson.</p>",
    7, 2, "2026-03-28T10:00:00.000Z"); time.sleep(3)

pub("Vitoria contrata Walace e reforca elenco para segunda metade",
    "Vitoria anuncia contratacao de Walace e reforca elenco para a segunda metade da temporada.",
    "<p>O Vitoria anunciou a contratacao de Walace, volante que chega para reforcar o elenco na reta final do Brasileirao.</p>",
    7, 3, "2026-09-03T10:00:00.000Z"); time.sleep(3)

pub("Bahia gasta R$ 81 milhoes em contratacoes em 2026",
    "Bahia gastou cerca de R$ 81 milhoes em contratacoes e arrecadou R$ 41 milhoes com vendas em 2026.",
    "<p>O Bahia gastou cerca de R$ 81 milhoes em contratacoes em 2026. Alejo Veliz foi o maior investimento.</p>",
    7, 4, "2026-08-14T10:00:00.000Z"); time.sleep(3)

pub("Corinthians e Santos nao podem contratar por transfer ban da FIFA",
    "Corinthians e Santos nao podem inscrever novos jogadores por causa do transfer ban imposto pela FIFA.",
    "<p>Corinthians e Santos nao podem inscrever novos jogadores por causa do transfer ban imposto pela FIFA.</p>",
    7, 0, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Mirassol e o time mais ativo no mercado da bola",
    "Mirassol e o time mais ativo no mercado da bola entre os clubes da Serie A do Brasileirao.",
    "<p>O Mirassol e o time mais ativo no mercado da bola. A equipe fez varias contratacoes para se manter na Serie A.</p>",
    7, 1, "2026-07-20T10:00:00.000Z"); time.sleep(3)

pub("Santiago Rodriguez deixa o Botafogo e acerta com a MLS",
    "Santiago Rodriguez deixou o Botafogo e acertou com um clube da MLS para a segunda metade da temporada.",
    "<p>O uruguaio Santiago Rodriguez deixou o Botafogo e acertou com um clube da MLS. O meia era principal do alvinegro.</p>",
    7, 2, "2026-09-04T10:00:00.000Z"); time.sleep(3)

pub("Sao Paulo negocia Arthur Chaves do Hoffenheim",
    "Sao Paulo negocia a contratacao de Arthur Chaves, zagueiro do Hoffenheim, para reforcar a defesa.",
    "<p>O Sao Paulo negocia Arthur Chaves, zagueiro do Hoffenheim. O clube paulista busca reforcos para a reta final.</p>",
    7, 3, "2026-06-19T10:00:00.000Z"); time.sleep(3)

pub("Barboza deixa o Botafogo e acerta com o Palmeiras",
    "Barboza deixou o Botafogo e acertou com o Palmeiras para reforcar a defesa do Verdao.",
    "<p>O zagueiro argentino Barboza deixou o Botafogo e acertou com o Palmeiras. A contratacao reforca a defesa.</p>",
    7, 4, "2026-06-19T10:00:00.000Z"); time.sleep(3)

print("\n=== CONCLUIDO! 80 noticias publicadas com slugs corretos! ===")
