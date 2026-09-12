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
    logo: 'https://logodetimes.com/times/premier-league/logo-premier-league-2048.png',
    descricao: 'A Premier League é a primeira divisão do futebol inglês e uma das ligas mais disputadas do mundo. Com 20 times, a competição oferece jogos de alta qualidade e grandes estrelas do futebol mundial.',
    times: ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester City', 'Manchester United', 'Tottenham', 'Newcastle', 'Aston Villa', 'Brighton', 'West Ham', 'Brentford', 'Crystal Palace', 'Wolves', 'Fulham', 'Bournemouth', 'Everton', 'Nottingham Forest', 'Burnley', 'Luton Town', 'Sheffield United'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 380,
      totalGols: 1024,
      mediaGols: 2.69,
      artilheiro: 'Erling Haaland',
      artilheiroGols: 36,
      lider: 'Arsenal',
      liderPontos: 72,
    },
    proximosJogos: [
      { data: '14/09/2026', horario: '13:30', mandante: 'Liverpool', visitante: 'Arsenal' },
      { data: '14/09/2026', horario: '16:00', mandante: 'Chelsea', visitante: 'Manchester United' },
      { data: '14/09/2026', horario: '18:30', mandante: 'Tottenham', visitante: 'Newcastle' },
    ],
  },
  {
    id: 'la-liga',
    slug: 'la-liga',
    nome: 'La Liga',
    pais: 'Espanha',
    logo: 'https://logodetimes.com/times/la-liga/logo-la-liga-2048.png',
    descricao: 'A La Liga é a primeira divisão do futebol espanhol, conhecida por sua qualidade técnica e rivalidades históricas. Real Madrid e Barcelona dominam a competição há décadas.',
    times: ['Real Madrid', 'Barcelona', 'Atletico Madrid', 'Sevilla', 'Real Sociedad', 'Villarreal', 'Athletic Bilbao', 'Real Betis', 'Valencia', 'Girona', 'Osasuna', 'Celta Vigo', 'Mallorca', 'Las Palmas', 'Getafe', 'Rayo Vallecano', 'Alaves', 'Espanyol', 'Leganes', 'Valladolid'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 380,
      totalGols: 985,
      mediaGols: 2.59,
      artilheiro: 'Robert Lewandowski',
      artilheiroGols: 28,
      lider: 'Real Madrid',
      liderPontos: 68,
    },
    proximosJogos: [
      { data: '14/09/2026', horario: '14:00', mandante: 'Real Madrid', visitante: 'Barcelona' },
      { data: '14/09/2026', horario: '16:15', mandante: 'Atletico Madrid', visitante: 'Sevilla' },
      { data: '14/09/2026', horario: '18:30', mandante: 'Real Sociedad', visitante: 'Villarreal' },
    ],
  },
  {
    id: 'bundesliga',
    slug: 'bundesliga',
    nome: 'Bundesliga',
    pais: 'Alemanha',
    logo: 'https://logodetimes.com/times/bundesliga/logo-bundesliga-2048.png',
    descricao: 'A Bundesliga é a primeira divisão do futebol alemão, conhecida por sua torcida apaixonada e jogos de alta intensidade. O Bayern München é o dominador histórico da competição.',
    times: ['Bayern München', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Eintracht Frankfurt', 'Wolfsburg', 'Union Berlin', 'Freiburg', 'Bayer Leverkusen', 'Stuttgart', 'Mainz', 'Köln', 'Hoffenheim', 'Augsburg', 'Werder Bremen', 'Darmstadt', 'Heidenheim', 'Bochum'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 306,
      totalGols: 892,
      mediaGols: 2.92,
      artilheiro: 'Harry Kane',
      artilheiroGols: 32,
      lider: 'Bayer Leverkusen',
      liderPontos: 65,
    },
    proximosJogos: [
      { data: '14/09/2026', horario: '10:30', mandante: 'Borussia Dortmund', visitante: 'Bayern München' },
      { data: '14/09/2026', horario: '10:30', mandante: 'RB Leipzig', visitante: 'Eintracht Frankfurt' },
      { data: '14/09/2026', horario: '13:30', mandante: 'Stuttgart', visitante: 'Bayer Leverkusen' },
    ],
  },
  {
    id: 'serie-a',
    slug: 'serie-a',
    nome: 'Serie A',
    pais: 'Itália',
    logo: 'https://logodetimes.com/times/serie-a/logo-serie-a-2048.png',
    descricao: 'A Serie A é a primeira divisão do futebol italiano, uma das ligas mais táticas e defensivas do mundo. Juventus, Milan e Inter são os maiores clubes da história.',
    times: ['Inter Milan', 'AC Milan', 'Juventus', 'Napoli', 'Roma', 'Lazio', 'Atalanta', 'Fiorentina', 'Torino', 'Bologna', 'Monza', 'Udinese', 'Sassuolo', 'Empoli', 'Cagliari', 'Genoa', 'Lecce', 'Verona', 'Frosinone', 'Cagliari'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 380,
      totalGols: 968,
      mediaGols: 2.55,
      artilheiro: 'Lautaro Martinez',
      artilheiroGols: 27,
      lider: 'Inter Milan',
      liderPontos: 70,
    },
    proximosJogos: [
      { data: '14/09/2026', horario: '12:00', mandante: 'AC Milan', visitante: 'Inter Milan' },
      { data: '14/09/2026', horario: '15:00', mandante: 'Juventus', visitante: 'Napoli' },
      { data: '14/09/2026', horario: '18:00', mandante: 'Roma', visitante: 'Lazio' },
    ],
  },
  {
    id: 'ligue-1',
    slug: 'ligue-1',
    nome: 'Ligue 1',
    pais: 'França',
    logo: 'https://logodetimes.com/times/ligue-1/logo-ligue-1-2048.png',
    descricao: 'A Ligue 1 é a primeira divisão do futebol francês, conhecida por revelar grandes talentos e oferecer jogos disputados. O PSG é o dominador recente da competição.',
    times: ['Paris Saint-Germain', 'Monaco', 'Marseille', 'Lyon', 'Lille', 'Nice', 'Lens', 'Rennes', 'Strasbourg', 'Nantes', 'Montpellier', 'Toulouse', 'Brest', 'Reims', 'Le Havre', 'Metz', 'Lorient', 'Clermont'],
    estatisticas: {
      temporada: '2026/27',
      totalJogos: 306,
      totalGols: 845,
      mediaGols: 2.76,
      artilheiro: 'Kylian Mbappe',
      artilheiroGols: 29,
      lider: 'Paris Saint-Germain',
      liderPontos: 67,
    },
    proximosJogos: [
      { data: '14/09/2026', horario: '15:00', mandante: 'Paris Saint-Germain', visitante: 'Marseille' },
      { data: '14/09/2026', horario: '17:00', mandante: 'Monaco', visitante: 'Lyon' },
      { data: '14/09/2026', horario: '19:00', mandante: 'Lille', visitante: 'Nice' },
    ],
  },
];

export function getLiga(slug: string): Liga | undefined {
  return ligas.find((l) => l.slug === slug);
}
