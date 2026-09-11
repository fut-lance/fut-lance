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

# Noticias reais baseadas em fatos atuais
noticias = [
    {
        "titulo": "Neymar sofre lesao no joelho e pode ficar dois meses fora do Santos",
        "resumo": "Atacante do Santos sofreu lesao no joelho direito durante treinamento e pode ficar afastado por ate dois meses. Jogador ja iniciou tratamento e espera retorno para a reta final do Brasileirao.",
        "conteudo": "Neymar Jr., atacante do Santos Futebol Clube, sofreu uma lesao no joelho direito durante treinamento nesta semana. De acordo com boletim medico divulgado pelo clube, o jogador apresentou distensao nos ligamentos e deve ficar afastado por aproximadamente dois meses.\n\nO camisa 10 ja iniciou o tratamento fisioterapeutico e segue avaliacao da comissao tecnica. A expectativa e que Neymar possa retornar aos campos ainda em outubro, para a reta decisiva do Brasileirao.\n\nA saida de Neymar e um golpe para o Santos, que enfrenta periodo decisivo no campeonato brasileiro. O atacante era um dos destaque do time e tinha se recuperado bem de lesao anterior.",
        "imagem_url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria": "Brasileirao"
    },
    {
        "titulo": "Palmeiras registra deficit de R$ 156 milhoes e vende jogadores para cobrir buraco",
        "resumo": "Sociedade Esportiva Palmeiras fechou os primeiros sete meses de 2026 com resultado negativo de R$ 156 milhoes. Venda de Allan para o Manchester City e outras operacoes devem ajudar a reduzir impacto.",
        "conteudo": "O Palmeiras registrou deficit de R$ 156 milhoes nos primeiros sete meses de 2026, segundo balanco financeiro divulgado pelo clube. O resultado negativo foi impulsionado por despesas elevadas com folha salarial e investimentos no elenco.\n\nPara tentar equilibrar as contas, a diretoria alviverde busca a venda de jogadores. A principal negociacao em andamento e a transferencia de Allan para o Manchester City, que deve render cerca de R$ 80 milhoes.\n\nOutras operacoes tambem estao em andamento, incluindo emprestimos e vendas parciais de atletas da base. A expectativa e que as movimentacoes do mercado de transferencias ajudem a reduzir o impacto financeiro no segundo semestre.",
        "imagem_url": "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200",
        "data_publicacao": "2026-09-11",
        "categoria": "Transferencias"
    },
    {
        "titulo": "Real Madrid bate recorde de gastos com transferencias na temporada 2026",
        "resumo": "Clube espanhol abriu os cofres e registrou maior gasto em reforcos desde 2019. Mbappe, Endrick e Bellingham lideram investimento milionario do Time Merengue.",
        "conteudo": "O Real Madrid quebrou seu recorde de gastos com transferencias na temporada 2026, registrando o maior investimento em reforcos desde 2019. O clube espanhol investiu mais de 300 milhoes de euros em novos jogadores.\n\nKylian Mbappe, francês que chegou do PSG, foi a principal contratacao. Junto com Endrick, jovem brasileiro contratado do Palmeiras, e Jude Bellingham, o Time Merengue montou um elenco de peso para a temporada.\n\nO investimento milionario tem como objetivo recuperar a hegemonia do clube na Europa e disputar a Champions League com forca total. O técnico Carlo Ancelotti conta com um dos elencos mais caros da historia do futebol.",
        "imagem_url": "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200",
        "data_publicacao": "2026-09-10",
        "categoria": "Champions League"
    },
    {
        "titulo": "Samuel Lino decide e Flamengo vence o Remo e assume lideranca do Brasileirao",
        "resumo": "Com gol de Samuel Lino, o Flamengo venceu o Remo por 1 a 0 em Belém e assumiu a lideranca provisoria do Campeonato Brasileiro. Vitoria coloca Mengo na frente na disputa pelo titulo.",
        "conteudo": "O Flamengo venceu o Remo por 1 a 0 neste domingo, em partida valida pela 26a rodada do Campeonato Brasileiro. O gol foi marcado por Samuel Lino, que aproveitou cruzamento da area e balancou as redes.\n\nCom a vitoria, o Flamengo assume a lideranca provisoria do Brasileirao, com 58 pontos em 25 jogos. O Palmeiras, que empatou com o Botafogo, caiu para segunda posicao com 56 pontos.\n\nA partida foi disputada no Mangueirão, em Belém, e teve dominio absoluto do Flamengo. O time rubro-negro criou varias oportunidades e mereceu a vitoria. O Remo tentou reagir, mas nao conseguiu superar a defesa fluminense.",
        "imagem_url": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200",
        "data_publicacao": "2026-09-10",
        "categoria": "Brasileirao"
    },
    {
        "titulo": "Botafogo 0 x 0 Palmeiras: empate na 26a rodada do Brasileirao",
        "resumo": "Botafogo e Palmeiras empataram sem gols em partida valida pela 26a rodada do Campeonato Brasileiro. Empate beneficia o Flamengo, que assume a lideranca.",
        "conteudo": "Botafogo e Palmeiras empataram por 0 a 0 neste domingo, em partida valida pela 26a rodada do Campeonato Brasileiro. Jogo disputado no Nilton Santos, no Rio de Janeiro.\n\nA partida foi equilibrada, com oportunidades para os dois lados. O Botafogo teve as melhores chances no primeiro tempo, enquanto o Palmeiras dominou no segundo tempo. Porém, nenhum dos times conseguiu balancar as redes.\n\nO empate beneficia o Flamengo, que venceu o Remo e assume a lideranca do campeonato. Palmeiras cai para segunda posicao com 56 pontos, enquanto o Botafogo mantem terceiro lugar com 50 pontos.",
        "imagem_url": "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200",
        "data_publicacao": "2026-09-10",
        "categoria": "Brasileirao"
    },
    {
        "titulo": "Corinthians sofre virada em casa para a Chapecoense no Brasileirao",
        "resumo": "Corinthians perdeu para a Chapecoense por 2 a 1 em casa, em partida valida pelo Brasileirao. Derrota complica situacao do Timao na classificacao.",
        "conteudo": "O Corinthians sofreu uma derrota inesperada para a Chapecoense, perdendo por 2 a 1 em casa, em partida valida pelo Brasileirao. A equipe alvinegra abriu o placar, mas sofreu a virada no segundo tempo.\n\nMarcou para o Corinthians o atacante Yuri Alberto. Para a Chapecoense, os gols foram de Marcinho, que marcou dois gols e foi destaque da partida.\n\nA derrota complica a situacao do Corinthians na classificacao do Brasileirao. O time paulista ocupa posicao intermediaria na tabela e precisa reagir para disputar vagas em competicoes internacionais.",
        "imagem_url": "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200",
        "data_publicacao": "2026-09-10",
        "categoria": "Brasileirao"
    },
    {
        "titulo": "Palmeiras empata com Botafogo e perde lideranca do Brasileirao para o Flamengo",
        "resumo": "Palmeiras empatou com o Botafogo e viu o Flamengo assumir a lideranca do Brasileirao. Verdão cai para segunda posicao com 56 pontos.",
        "conteudo": "O Palmeiras empatou com o Botafogo por 0 a 0 e perdeu a lideranca do Campeonato Brasileiro. Com a vitoria do Flamengo sobre o Remo, o Verdão caiu para segunda posicao na classificacao.\n\nO Palmeiras chega ao empate com 56 pontos em 25 jogos, enquanto o Flamengo assume a lideranca com 58 pontos. A diferenca de dois pontos abre uma nova fase na disputa pelo titulo.\n\nO técnico Abel Ferreira elogiou a atuacao do time, mas reconheceu que a falta de eficiencia no ataque foi decisiva. O Palmeiras cria varias oportunidades, mas nao conseguiu marcar.",
        "imagem_url": "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200",
        "data_publicacao": "2026-09-10",
        "categoria": "Brasileirao"
    },
    {
        "titulo": "Vasco vence o Palmeiras na final do Brasileirao Sub-20 e conquista titulo",
        "resumo": "Vasco da Gama venceu o Palmeiras na final do Brasileirao Sub-20 e conquistou o titulo da competicao. Andrey Fernandes marcou os dois gols da vitoria.",
        "conteudo": "O Vasco da Gama conquistou o titulo do Campeonato Brasileiro Sub-20 ao vencer o Palmeiras na final. Andrey Fernandes, autor dos dois gols, foi o destaque da decisao.\n\nA partida foi disputada no Estádio São Januário, e o Vasco mostrou superioridade em campo. Andrey marcou no primeiro e no segundo tempo, garantindo o titulo para a base vascaína.\n\nA conquista e motivo de alegria para a torcida vascaína, que comemorou o titulo na arquibancada. O juvenil do Vasco mostrou qualidade e garra ao longo de toda a competicao.",
        "imagem_url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "data_publicacao": "2026-09-09",
        "categoria": "Brasileirao"
    }
]

# Primeiro, buscar categorias existentes
print("Buscando categorias...")
try:
    resp = requests.get(f"{STRAPI_URL}/api/categorias", headers=headers, timeout=30)
    if resp.status_code == 200:
        cats = resp.json().get("data", [])
        cat_map = {}
        for c in cats:
            cat_map[c["nome"]] = c["documentId"]
        print(f"Categorias encontradas: {list(cat_map.keys())}")
    else:
        print(f"Erro ao buscar categorias: {resp.status_code}")
        cat_map = {}
except Exception as e:
    print(f"Erro ao buscar categorias: {e}")
    cat_map = {}

# Publicar cada noticia
for i, noticia in enumerate(noticias):
    print(f"\nPublicando noticia {i+1}/{len(noticias)}: {noticia['titulo'][:50]}...")
    
    cat_id = cat_map.get(noticia["categoria"])
    
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
            print(f"  OK! Noticia publicada com sucesso.")
        else:
            print(f"  Erro {resp.status_code}: {resp.text[:200]}")
    except Exception as e:
        print(f"  Erro: {e}")
    
    time.sleep(4)

print("\nConcluido!")
