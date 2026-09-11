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
    fase: '26ª Rodada',
    logo: '🏆',
    descricao: 'O Campeonato Brasileiro de Futebol Série A, também conhecido como Brasileirão, é a principal competição de futebol do Brasil. Disputado desde 1971 no formato atual, é considerado um dos campeonatos mais disputados do mundo. Em 2026, a competição conta com 20 clubes e segue o formato de pontos corridos, com 38 rodadas.',
    proximosJogos: [
      { data: '12/09/2026', horario: '16:00', mandante: 'Grêmio', visitante: 'Vasco', local: 'Arena do Grêmio' },
      { data: '12/09/2026', horario: '16:00', mandante: 'Atlético-MG', visitante: 'Fluminense', local: 'Arena Independência' },
      { data: '12/09/2026', horario: '17:00', mandante: 'Chapecoense', visitante: 'Internacional', local: 'Arena Condá' },
      { data: '12/09/2026', horario: '18:30', mandante: 'Palmeiras', visitante: 'São Paulo', local: 'Allianz Parque' },
      { data: '12/09/2026', horario: '20:30', mandante: 'Botafogo', visitante: 'Bragantino', local: 'Nilton Santos' },
      { data: '12/09/2026', horario: '21:00', mandante: 'Santos', visitante: 'Cruzeiro', local: 'Vila Belmiro' },
    ],
    classificacao: [
      { pos: 1, time: 'Flamengo', pts: 58, j: 25, v: 17, e: 7, d: 1, gp: 52, gc: 19, sg: 33 },
      { pos: 2, time: 'Palmeiras', pts: 56, j: 25, v: 16, e: 8, d: 1, gp: 48, gc: 22, sg: 26 },
      { pos: 3, time: 'Botafogo', pts: 50, j: 25, v: 14, e: 8, d: 3, gp: 45, gc: 24, sg: 21 },
      { pos: 4, time: 'São Paulo', pts: 47, j: 25, v: 13, e: 8, d: 4, gp: 42, gc: 28, sg: 14 },
      { pos: 5, time: 'Cruzeiro', pts: 46, j: 25, v: 13, e: 7, d: 5, gp: 40, gc: 26, sg: 14 },
      { pos: 6, time: 'Internacional', pts: 44, j: 25, v: 12, e: 8, d: 5, gp: 38, gc: 27, sg: 11 },
      { pos: 7, time: 'Santos', pts: 43, j: 25, v: 12, e: 7, d: 6, gp: 36, gc: 28, sg: 8 },
      { pos: 8, time: 'Fluminense', pts: 42, j: 25, v: 12, e: 6, d: 7, gp: 38, gc: 30, sg: 8 },
      { pos: 9, time: 'Vasco', pts: 40, j: 25, v: 11, e: 7, d: 7, gp: 35, gc: 30, sg: 5 },
      { pos: 10, time: 'Bragantino', pts: 39, j: 25, v: 11, e: 6, d: 8, gp: 34, gc: 32, sg: 2 },
    ],
    artilheiros: [
      { pos: 1, jogador: 'Pedro', time: 'Flamengo', gols: 18 },
      { pos: 2, jogador: 'Yuri Alberto', time: 'Corinthians', gols: 15 },
      { pos: 3, jogador: 'Gabriel Barbosa', time: 'Flamengo', gols: 14 },
      { pos: 4, jogador: 'Rony', time: 'Palmeiras', gols: 13 },
      { pos: 5, jogador: 'Calleri', time: 'São Paulo', gols: 12 },
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
    fase: 'Oitavas de Final',
    logo: '🌎',
    descricao: 'A Copa Libertadores da América é a principal competição de clubes de futebol da América do Sul, organizada pela CONMEBOL. Desde sua criação em 1960, é considerada uma das competições mais prestigiadas do mundo. Em 2026, a competição conta com 48 clubes de 10 países sul-americanos.',
    proximosJogos: [
      { data: '16/09/2026', horario: '19:00', mandante: 'Palmeiras', visitante: 'Flamengo', local: 'Allianz Parque' },
      { data: '17/09/2026', horario: '21:00', mandante: 'River Plate', visitante: 'Boca Juniors', local: 'Monumental' },
      { data: '23/09/2026', horario: '19:00', mandante: 'Flamengo', visitante: 'Palmeiras', local: 'Maracanã' },
      { data: '24/09/2026', horario: '21:00', mandante: 'Boca Juniors', visitante: 'River Plate', local: 'La Bombonera' },
    ],
    classificacao: [],
    artilheiros: [
      { pos: 1, jogador: 'Gabriel Barbosa', time: 'Flamengo', gols: 8 },
      { pos: 2, jogador: 'Yuri Alberto', time: 'Corinthians', gols: 7 },
      { pos: 3, jogador: 'Rony', time: 'Palmeiras', gols: 6 },
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
    fase: 'Fase de Ligada',
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
      { data: '01/10/2026', horario: '21:30', mandante: 'Palmeiras', visitante: 'Flamengo', local: 'Allianz Parque' },
    ],
    classificacao: [],
    artilheiros: [
      { pos: 1, jogador: 'Gabriel Barbosa', time: 'Flamengo', gols: 6 },
      { pos: 2, jogador: 'Rony', time: 'Palmeiras', gols: 5 },
      { pos: 3, jogador: 'Yuri Alberto', time: 'Corinthians', gols: 4 },
    ],
  },
};

export function getCampeonato(slug: string): Campeonato | undefined {
  return campeonatos[slug];
}

export function getAllCampeonatos(): Campeonato[] {
  return Object.values(campeonatos);
}
