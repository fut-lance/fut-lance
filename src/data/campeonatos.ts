export interface Campeonato {
  nome: string;
  slug: string;
  pais: string;
  continente: string;
  periodo: string;
  times: number;
  formato: string;
  fase: string;
  logo: string;
  descricao: string;
  proximosJogos: {
    data: string;
    horario: string;
    mandante: string;
    visitante: string;
    local: string;
  }[];
  classificacao: {
    pos: number;
    time: string;
    pts: number;
    j: number;
    v: number;
    e: number;
    d: number;
    gp: number;
    gc: number;
    sg: number;
  }[];
  artilheiros: {
    pos: number;
    jogador: string;
    time: string;
    gols: number;
  }[];
}

export const campeonatos: Record<string, Campeonato> = {
  brasileirao: {
    nome: 'Brasileirão Série A',
    slug: 'brasileirao',
    pais: 'Brasil',
    continente: 'América do Sul',
    periodo: 'Abril - Dezembro 2026',
    times: 20,
    formato: 'Pontos corridos (todos contra todos, ida e volta)',
    fase: '27ª Rodada',
    logo: '🏆',
    descricao: 'O Campeonato Brasileiro de Futebol Série A, também conhecido como Brasileirão, é a principal competição de futebol do Brasil. Disputado desde 1971 no formato atual, é considerado um dos campeonatos mais disputados do mundo. Em 2026, a competição conta com 20 clubes e segue o formato de pontos corridos, com 38 rodadas.',
    proximosJogos: [
      { data: '12/09/2026', horario: '16:00', mandante: 'Grêmio', visitante: 'Vasco', local: 'Arena do Grêmio' },
      { data: '12/09/2026', horario: '16:00', mandante: 'Atlético-MG', visitante: 'Fluminense', local: 'Arena Independência' },
      { data: '12/09/2026', horario: '17:00', mandante: 'Chapecoense', visitante: 'Internacional', local: 'Arena Condá' },
      { data: '12/09/2026', horario: '18:30', mandante: 'Palmeiras', visitante: 'São Paulo', local: 'Nubank Parque' },
      { data: '12/09/2026', horario: '20:30', mandante: 'Botafogo', visitante: 'Bragantino', local: 'Nilton Santos' },
      { data: '12/09/2026', horario: '21:00', mandante: 'Santos', visitante: 'Cruzeiro', local: 'Vila Belmiro' },
    ],
    classificacao: [
      { pos: 1, time: 'Flamengo', pts: 57, j: 27, v: 17, e: 6, d: 4, gp: 53, gc: 22, sg: 31 },
      { pos: 2, time: 'Palmeiras', pts: 56, j: 27, v: 16, e: 8, d: 3, gp: 47, gc: 21, sg: 26 },
      { pos: 3, time: 'Athletico-PR', pts: 46, j: 27, v: 13, e: 7, d: 7, gp: 41, gc: 31, sg: 10 },
      { pos: 4, time: 'Bahia', pts: 46, j: 27, v: 12, e: 10, d: 5, gp: 42, gc: 33, sg: 9 },
      { pos: 5, time: 'Fluminense', pts: 45, j: 27, v: 12, e: 9, d: 6, gp: 41, gc: 35, sg: 6 },
      { pos: 6, time: 'Cruzeiro', pts: 42, j: 27, v: 12, e: 6, d: 9, gp: 39, gc: 39, sg: 0 },
      { pos: 7, time: 'Atlético-MG', pts: 39, j: 26, v: 11, e: 6, d: 9, gp: 35, gc: 31, sg: 4 },
      { pos: 8, time: 'Coritiba', pts: 38, j: 27, v: 10, e: 8, d: 9, gp: 37, gc: 38, sg: -1 },
      { pos: 9, time: 'Bragantino', pts: 36, j: 26, v: 10, e: 6, d: 10, gp: 32, gc: 29, sg: 3 },
      { pos: 10, time: 'Santos', pts: 35, j: 26, v: 9, e: 8, d: 9, gp: 39, gc: 39, sg: 0 },
      { pos: 11, time: 'Botafogo', pts: 35, j: 27, v: 9, e: 8, d: 10, gp: 41, gc: 43, sg: -2 },
      { pos: 12, time: 'São Paulo', pts: 33, j: 26, v: 9, e: 6, d: 11, gp: 31, gc: 30, sg: 1 },
      { pos: 13, time: 'Vitória', pts: 33, j: 27, v: 9, e: 6, d: 12, gp: 27, gc: 39, sg: -12 },
      { pos: 14, time: 'Corinthians', pts: 32, j: 27, v: 8, e: 8, d: 11, gp: 28, gc: 29, sg: -1 },
      { pos: 15, time: 'Mirassol', pts: 29, j: 27, v: 7, e: 8, d: 12, gp: 31, gc: 42, sg: -11 },
      { pos: 16, time: 'Grêmio', pts: 28, j: 27, v: 7, e: 7, d: 13, gp: 30, gc: 38, sg: -8 },
      { pos: 17, time: 'Vasco', pts: 28, j: 26, v: 7, e: 7, d: 12, gp: 29, gc: 41, sg: -12 },
      { pos: 18, time: 'Internacional', pts: 28, j: 27, v: 6, e: 10, d: 11, gp: 30, gc: 35, sg: -5 },
      { pos: 19, time: 'Remo', pts: 23, j: 27, v: 5, e: 8, d: 14, gp: 31, gc: 45, sg: -14 },
      { pos: 20, time: 'Chapecoense', pts: 17, j: 26, v: 3, e: 8, d: 15, gp: 28, gc: 52, sg: -24 },
    ],
    artilheiros: [
      { pos: 1, jogador: 'Kevin Viveros', time: 'Athletico-PR', gols: 18 },
      { pos: 2, jogador: 'Pedro', time: 'Flamengo', gols: 15 },
      { pos: 3, jogador: 'Carlos Vinícius', time: 'Grêmio', gols: 10 },
    ],
  },
  libertadores: {
    nome: 'Copa Libertadores da América',
    slug: 'libertadores',
    pais: 'América do Sul',
    continente: 'América do Sul',
    periodo: 'Fevereiro - Novembro 2026',
    times: 48,
    formato: 'Fase de grupos + Eliminatórias',
    fase: 'Quartas de Final',
    logo: '🌎',
    descricao: 'A Copa Libertadores da América é a principal competição de clubes de futebol da América do Sul, organizada pela CONMEBOL. Desde sua criação em 1960, é considerada uma das competições mais prestigiadas do mundo. Em 2026, a competição conta com 48 clubes de 10 países sul-americanos.',
    proximosJogos: [
      { data: '16/09/2026', horario: '19:00', mandante: 'Palmeiras', visitante: 'Cerro Porteño', local: 'Nubank Parque' },
      { data: '17/09/2026', horario: '21:00', mandante: 'River Plate', visitante: 'Boca Juniors', local: 'Monumental' },
      { data: '24/09/2026', horario: '19:00', mandante: 'Cerro Porteño', visitante: 'Palmeiras', local: 'Defensores del Chaco' },
    ],
    classificacao: [],
    artilheiros: [
      { pos: 1, jogador: 'Gabriel Barbosa', time: 'Flamengo', gols: 8 },
      { pos: 2, jogador: 'Yuri Alberto', time: 'Corinthians', gols: 7 },
      { pos: 3, jogador: 'Pedro', time: 'Flamengo', gols: 6 },
    ],
  },
  'champions-league': {
    nome: 'UEFA Champions League',
    slug: 'champions-league',
    pais: 'Europa',
    continente: 'Europa',
    periodo: 'Setembro 2026 - Maio 2027',
    times: 36,
    formato: 'Liga (36 times) + Eliminatórias',
    fase: 'Fase de Liga',
    logo: '⭐',
    descricao: 'A Liga dos Campeões da UEFA é a principal competição de clubes de futebol da Europa. Organizada pela UEFA desde 1955, é considerada a competição de clubes mais prestigiada do mundo. Em 2026/27, a competição adota o novo formato de liga com 36 times.',
    proximosJogos: [
      { data: '16/09/2026', horario: '16:00', mandante: 'Real Madrid', visitante: 'Manchester City', local: 'Santiago Bernabéu' },
      { data: '16/09/2026', horario: '16:00', mandante: 'Barcelona', visitante: 'Bayern München', local: 'Camp Nou' },
      { data: '17/09/2026', horario: '16:00', mandante: 'Liverpool', visitante: 'PSG', local: 'Anfield' },
      { data: '17/09/2026', horario: '16:00', mandante: 'Inter Milan', visitante: 'Arsenal', local: 'San Siro' },
    ],
    classificacao: [],
    artilheiros: [
      { pos: 1, jogador: 'Mbappé', time: 'Real Madrid', gols: 5 },
      { pos: 2, jogador: 'Haaland', time: 'Manchester City', gols: 4 },
      { pos: 3, jogador: 'Vinicius Jr', time: 'Real Madrid', gols: 4 },
    ],
  },
  'copa-do-brasil': {
    nome: 'Copa do Brasil',
    slug: 'copa-do-brasil',
    pais: 'Brasil',
    continente: 'América do Sul',
    periodo: 'Fevereiro - Novembro 2026',
    times: 92,
    formato: 'Eliminatórias + Quartas + Semifinal + Final',
    fase: 'Semifinal',
    logo: '🥇',
    descricao: 'A Copa do Brasil é a principal competição por eliminação do futebol brasileiro. Organizada pela CBF desde 1989, reúne clubes de todos os estados do país. Em 2026, a competição conta com 92 clubes e é disputada no formato de ida e volta até a final.',
    proximosJogos: [
      { data: '24/09/2026', horario: '21:30', mandante: 'Flamengo', visitante: 'Palmeiras', local: 'Maracanã' },
      { data: '01/10/2026', horario: '21:30', mandante: 'Palmeiras', visitante: 'Flamengo', local: 'Nubank Parque' },
    ],
    classificacao: [],
    artilheiros: [
      { pos: 1, jogador: 'Gabriel Barbosa', time: 'Flamengo', gols: 6 },
      { pos: 2, jogador: 'Rony', time: 'Palmeiras', gols: 5 },
      { pos: 3, jogador: 'Yuri Alberto', time: 'Corinthians', gols: 4 },
    ],
  },
  'serie-b': {
    nome: 'Brasileirão Série B',
    slug: 'serie-b',
    pais: 'Brasil',
    continente: 'América do Sul',
    periodo: 'Abril - Novembro 2026',
    times: 20,
    formato: 'Pontos corridos (todos contra todos, ida e volta)',
    fase: '28ª Rodada',
    logo: '🥈',
    descricao: 'O Campeonato Brasileiro de Futebol Série B é a segunda divisão do futebol brasileiro. Disputado desde 1971, é uma das ligas mais importantes da América do Sul. Em 2026, a competição conta com 20 clubes e segue o formato de pontos corridos, com 38 rodadas. Os dois primeiros colocados são promovidos diretamente à Série A, enquanto os times entre 3º e 6º disputam playoffs de acesso.',
    proximosJogos: [
      { data: '13/09/2026', horario: '16:00', mandante: 'Atlético-GO', visitante: 'Criciúma', local: 'Arena Pantanal' },
      { data: '13/09/2026', horario: '18:00', mandante: 'Juventude', visitante: 'Athletic-MG', local: 'Alfredo Jaconi' },
      { data: '13/09/2026', horario: '18:30', mandante: 'Fortaleza', visitante: 'Ceará', local: 'Castelão' },
      { data: '13/09/2026', horario: '18:30', mandante: 'Novorizontino', visitante: 'Cuiabá', local: 'Dr. Jorge Ismael de Biasi' },
    ],
    classificacao: [
      { pos: 1, time: 'Novorizontino', pts: 50, j: 28, v: 14, e: 8, d: 6, gp: 48, gc: 25, sg: 23 },
      { pos: 2, time: 'Juventude', pts: 50, j: 28, v: 14, e: 8, d: 6, gp: 30, gc: 17, sg: 13 },
      { pos: 3, time: 'Vila Nova', pts: 48, j: 28, v: 14, e: 6, d: 8, gp: 40, gc: 31, sg: 9 },
      { pos: 4, time: 'Fortaleza', pts: 48, j: 28, v: 13, e: 9, d: 6, gp: 31, gc: 23, sg: 8 },
      { pos: 5, time: 'Criciúma', pts: 47, j: 28, v: 13, e: 8, d: 7, gp: 28, gc: 25, sg: 3 },
      { pos: 6, time: 'Atlético-GO', pts: 46, j: 28, v: 12, e: 10, d: 6, gp: 36, gc: 26, sg: 10 },
      { pos: 7, time: 'CRB', pts: 45, j: 28, v: 13, e: 6, d: 9, gp: 42, gc: 40, sg: 2 },
      { pos: 8, time: 'Operário', pts: 44, j: 28, v: 12, e: 8, d: 8, gp: 39, gc: 36, sg: 3 },
      { pos: 9, time: 'Sport', pts: 41, j: 28, v: 10, e: 11, d: 7, gp: 37, gc: 28, sg: 9 },
      { pos: 10, time: 'Athletic-MG', pts: 40, j: 28, v: 10, e: 10, d: 8, gp: 33, gc: 30, sg: 3 },
      { pos: 11, time: 'Cuiabá', pts: 40, j: 28, v: 9, e: 13, d: 6, gp: 27, gc: 22, sg: 5 },
      { pos: 12, time: 'Goiás', pts: 39, j: 28, v: 11, e: 6, d: 11, gp: 28, gc: 34, sg: -6 },
      { pos: 13, time: 'São Bernardo', pts: 38, j: 28, v: 10, e: 8, d: 10, gp: 39, gc: 31, sg: 8 },
      { pos: 14, time: 'Náutico', pts: 38, j: 28, v: 10, e: 8, d: 10, gp: 35, gc: 33, sg: 2 },
      { pos: 15, time: 'Ceará', pts: 32, j: 28, v: 8, e: 8, d: 12, gp: 29, gc: 36, sg: -7 },
      { pos: 16, time: 'Botafogo-SP', pts: 31, j: 28, v: 8, e: 7, d: 13, gp: 31, gc: 35, sg: -4 },
      { pos: 17, time: 'Avaí', pts: 30, j: 28, v: 8, e: 6, d: 14, gp: 29, gc: 36, sg: -7 },
      { pos: 18, time: 'Londrina', pts: 28, j: 28, v: 7, e: 7, d: 14, gp: 38, gc: 39, sg: -1 },
      { pos: 19, time: 'América-MG', pts: 17, j: 28, v: 4, e: 5, d: 19, gp: 21, gc: 48, sg: -27 },
      { pos: 20, time: 'Ponte Preta', pts: 10, j: 28, v: 2, e: 4, d: 22, gp: 16, gc: 62, sg: -46 },
    ],
    artilheiros: [
      { pos: 1, jogador: 'Mikael Sousa', time: 'Novorizontino', gols: 16 },
      { pos: 2, jogador: 'Robson', time: 'Novorizontino', gols: 15 },
      { pos: 3, jogador: 'Gustavo Coutinho', time: 'Atlético-GO', gols: 13 },
    ],
  },
};

export function getCampeonato(slug: string): Campeonato | undefined {
  return campeonatos[slug];
}

export function getAllCampeonatos(): Campeonato[] {
  return Object.values(campeonatos);
}
