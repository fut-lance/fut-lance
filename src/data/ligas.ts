export interface Liga {
  id: string;
  slug: string;
  nome: string;
  pais: string;
  logo: string;
  descricao: string;
  times: string[];
  estatisticas: {
    temporada: string;
    totalJogos: number;
    totalGols: number;
    mediaGols: number;
    artilheiro: string;
    artilheiroGols: number;
    lider: string;
    liderPontos: number;
  };
  proximosJogos: {
    data: string;
    horario: string;
    mandante: string;
    visitante: string;
  }[];
}

export const ligas: Liga[] = [
  {
    id: 'premier-league',
    slug: 'premier-league',
    nome: 'Premier League',
    pais: 'Inglaterra',
    logo: 'https://crests.football-data.org/PL.png',
    descricao: 'A Premier League é a primeira divisão do futebol inglês e uma das ligas mais disputadas do mundo. Com 20 times, a competição oferece jogos de alta qualidade e grandes estrelas do futebol mundial.',
    times: ['Manchester City', 'Arsenal', 'Hull City', 'Chelsea', 'Liverpool', 'Manchester United', 'Tottenham', 'Newcastle', 'Aston Villa', 'Brighton', 'West Ham', 'Brentford', 'Crystal Palace', 'Wolves', 'Fulham', 'Bournemouth', 'Everton', 'Nottingham Forest', 'Burnley', 'Luton Town'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 3,
      totalGols: 24,
      mediaGols: 2.67,
      artilheiro: 'Erling Haaland',
      artilheiroGols: 2,
      lider: 'Manchester City',
      liderPontos: 9,
    },
    proximosJogos: [
      { data: '13/09/2026', horario: '13:00', mandante: 'Coventry', visitante: 'Brighton' },
      { data: '13/09/2026', horario: '15:30', mandante: 'Manchester United', visitante: 'Manchester City' },
      { data: '14/09/2026', horario: '13:00', mandante: 'Liverpool', visitante: 'Arsenal' },
    ],
  },
  {
    id: 'la-liga',
    slug: 'la-liga',
    nome: 'La Liga',
    pais: 'Espanha',
    logo: 'https://crests.football-data.org/laliga.png',
    descricao: 'A La Liga é a primeira divisão do futebol espanhol, conhecida por sua qualidade técnica e rivalidades históricas. Real Madrid e Barcelona dominam a competição há décadas.',
    times: ['Barcelona', 'Real Madrid', 'Bétis', 'Deportivo de A Coruña', 'Alaves', 'Osasuna', 'Real Sociedad', 'Atlético Madrid', 'Sevilla', 'Valencia', 'Villarreal', 'Athletic Bilbao', 'Celta Vigo', 'Mallorca', 'Las Palmas', 'Getafe', 'Rayo Vallecano', 'Espanyol', 'Leganes', 'Valladolid'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 4,
      totalGols: 32,
      mediaGols: 2.67,
      artilheiro: 'Robert Lewandowski',
      artilheiroGols: 3,
      lider: 'Barcelona',
      liderPontos: 9,
    },
    proximosJogos: [
      { data: '13/09/2026', horario: '14:00', mandante: 'Real Madrid', visitante: 'Rayo Vallecano' },
      { data: '13/09/2026', horario: '14:00', mandante: 'Levante', visitante: 'Barcelona' },
      { data: '13/09/2026', horario: '14:00', mandante: 'Sevilla', visitante: 'Valencia' },
    ],
  },
  {
    id: 'bundesliga',
    slug: 'bundesliga',
    nome: 'Bundesliga',
    pais: 'Alemanha',
    logo: 'https://crests.football-data.org/BL1.png',
    descricao: 'A Bundesliga é a primeira divisão do futebol alemão, conhecida por sua torcida apaixonada e jogos de alta intensidade. O Bayern München é o dominador histórico da competição.',
    times: ['Freiburg', 'Borussia Dortmund', 'Elversberg', 'Bayern de Munique', 'Bayer Leverkusen', 'Augsburg', 'Leipzig', 'Stuttgart', 'Werder Bremen', 'Colônia', 'Eintracht Frankfurt', 'Mainz', 'Paderborn', 'Schalke', 'Union Berlin', 'Hoffenheim', 'Hamburgo', 'Borussia Mönchengladbach'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 2,
      totalGols: 18,
      mediaGols: 3.00,
      artilheiro: 'Younes Ebnoutalib',
      artilheiroGols: 3,
      lider: 'Freiburg',
      liderPontos: 6,
    },
    proximosJogos: [
      { data: '12/09/2026', horario: '14:30', mandante: 'Borussia Dortmund', visitante: 'SC Paderborn' },
      { data: '12/09/2026', horario: '14:30', mandante: 'TSG Hoffenheim', visitante: 'VfB Stuttgart' },
      { data: '13/09/2026', horario: '17:30', mandante: 'Elversberg', visitante: 'Bayern de Munique' },
    ],
  },
  {
    id: 'serie-a',
    slug: 'serie-a',
    nome: 'Serie A',
    pais: 'Itália',
    logo: 'https://crests.football-data.org/SA.png',
    descricao: 'A Serie A é a primeira divisão do futebol italiano, uma das ligas mais táticas e defensivas do mundo. Juventus, Milan e Inter são os maiores clubes da história.',
    times: ['AS Roma', 'Inter', 'Como 1907', 'AC Milan', 'Juventus', 'Frosinone', 'Lazio', 'Atalanta', 'Udinese', 'Sassuolo', 'Napoli', 'Cagliari', 'Torino', 'Lecce', 'Bologna', 'Parma', 'Genoa', 'Venezia', 'Monza', 'Fiorentina'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 3,
      totalGols: 28,
      mediaGols: 2.33,
      artilheiro: 'Paulo Dybala',
      artilheiroGols: 3,
      lider: 'AS Roma',
      liderPontos: 9,
    },
    proximosJogos: [
      { data: '12/09/2026', horario: '14:00', mandante: 'Genoa', visitante: 'Frosinone' },
      { data: '12/09/2026', horario: '17:00', mandante: 'Sassuolo', visitante: 'Juventus' },
      { data: '13/09/2026', horario: '14:45', mandante: 'Lazio', visitante: 'AC Milan' },
    ],
  },
  {
    id: 'ligue-1',
    slug: 'ligue-1',
    nome: 'Ligue 1',
    pais: 'França',
    logo: 'https://crests.football-data.org/FL1.png',
    descricao: 'A Ligue 1 é a primeira divisão do futebol francês, conhecida por revelar grandes talentos e oferecer jogos disputados. O PSG é o dominador recente da competição.',
    times: ['Monaco', 'Paris FC', 'Lyon', 'Lille', 'Rennes', 'Strasbourg', 'Brest', 'Lorient', 'Troyes', 'Marseille', 'Lens', 'Angers', 'Paris Saint-Germain', 'Le Mans', 'Nice', 'Le Havre', 'Toulouse', 'Auxerre'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 3,
      totalGols: 22,
      mediaGols: 2.44,
      artilheiro: 'Wissam Ben Yedder',
      artilheiroGols: 3,
      lider: 'Monaco',
      liderPontos: 9,
    },
    proximosJogos: [
      { data: '13/09/2026', horario: '15:00', mandante: 'Paris Saint-Germain', visitante: 'Marseille' },
      { data: '13/09/2026', horario: '17:00', mandante: 'Monaco', visitante: 'Lyon' },
      { data: '13/09/2026', horario: '19:00', mandante: 'Lille', visitante: 'Nice' },
    ],
  },
];

export function getLiga(slug: string): Liga | undefined {
  return ligas.find((l) => l.slug === slug);
}
