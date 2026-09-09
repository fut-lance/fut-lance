async function update() {
  // 1. Update Seleção news with list of convocados
  const r1 = await fetch('https://fut-lance-cms-v2.onrender.com/api/noticias?sort=createdAt:desc&pagination[pageSize]=10&populate=*');
  const d1 = await r1.json();
  const doc = d1.data.find(n => n.titulo.includes('Ancelotti convoca'));
  if (!doc) { console.log('Selecao not found'); return; }
  
  const novoConteudo = '<p>O técnico Carlo Ancelotti anunciou nesta quarta-feira (9), às 15h, na sede da CBF, no Rio de Janeiro, a primeira convocação da Seleção Brasileira após a Copa do Mundo de 2026. O grupo de 26 jogadores dará início ao novo ciclo visando a Copa América de 2028 e a Copa do Mundo de 2030.</p><p>O Brasil enfrentará a Austrália em dois jogos, nos dias 25 e 29 de setembro, em Townsville e Brisbane, e a Índia em um confronto inédito no dia 3 de outubro, em Calcutá, durante a Super Data Fifa.</p><h3 style="color:#00E676;margin-top:16px">Lista completa dos convocados:</h3><p><strong>Goleiros:</strong> Otávio (Cruzeiro), Hugo Souza (Corinthians), Carlos Miguel (Palmeiras)</p><p><strong>Defensores:</strong> Jonathan Jesus (Cruzeiro), Matheuzinho (Corinthians), Vitor Reis (Manchester City), Kaiki Bruno (Como), Danilo (Flamengo), Alex Sandro (Flamengo)</p><p><strong>Meio-campistas:</strong> Zé Lucas (Cruzeiro), Matheus Pereira (Cruzeiro), André (Corinthians), Breno Bidon (Corinthians), Andreas Pereira (Palmeiras), Allan (Manchester City), Gabriel Bontempo (Santos), Lucas Paquetá (Flamengo)</p><p><strong>Atacantes:</strong> Kaio Jorge (Cruzeiro), Pedro (Flamengo), Samuel Lino (Flamengo), Alisson (Napoli), Endrick (Lyon), Raphinha (Barcelona), Vini Jr (Real Madrid)</p><p>Destaque para Gabriel Bontempo, do Santos, chamado pela primeira vez. O Corinthians e o Cruzeiro são os clubes com mais convocados no elenco. Ancelotti afirmou em coletiva que a lista é equilibrada e visa renovar a Seleção.</p>';

  const r2 = await fetch('https://fut-lance-cms-v2.onrender.com/api/noticias/' + doc.documentId, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { conteudo: novoConteudo } })
  });
  console.log('Selecao updated:', r2.status);

  // 2. Update Corinthians news
  const doc2 = d1.data.find(n => n.titulo.includes('Corinthians lidera'));
  if (doc2) {
    const conteudo2 = '<p>O Corinthians é o clube com mais convocados na primeira lista da Seleção Brasileira pós-Copa do Mundo. O Timão mandou 4 jogadores para o grupo de Carlo Ancelotti.</p><h3 style="color:#00E676;margin-top:16px">Corinthians convocados:</h3><p>Hugo Souza (GOL), Matheuzinho (DEF), André (MEI), Breno Bidon (MEI)</p><p>A convocação marca o início do novo ciclo da Seleção visando a Copa América de 2028 e a Copa do Mundo de 2030. Ancelotti deixou claro que pretende dar espaço a novos nomes, especialmente jovens promessas observadas no futebol brasileiro.</p><p>O técnico italiano destacou que a lista é equilibrada e que os amistosos contra Austrália e Índia serão importantes para testar jogadores que podem compor o elenco nos próximos anos.</p>';
    const r3 = await fetch('https://fut-lance-cms-v2.onrender.com/api/noticias/' + doc2.documentId, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { conteudo: conteudo2 } })
    });
    console.log('Corinthians updated:', r3.status);
  }
}
update();
