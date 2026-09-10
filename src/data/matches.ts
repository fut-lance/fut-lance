export interface MatchChannel {
  nome: string;
  url: string;
}

export interface Match {
  id: string;
  competicao: string;
  data: string;
  horario: string;
  timeMandante: string;
  logoTimeMandante: string;
  timeVisitante: string;
  logoTimeVisitante: string;
  status: 'em-breve' | 'ao-vivo' | 'encerrado';
  canais: MatchChannel[];
}

export const matches: Match[] = [
  {
    id: 'lib-001',
    competicao: 'Libertadores',
    data: '10/09/2026',
    horario: '21:30',
    timeMandante: 'Independiente del Valle',
    logoTimeMandante: 'https://media.api-sports.io/football/teams/256.png',
    timeVisitante: 'Flamengo',
    logoTimeVisitante: 'https://media.api-sports.io/football/teams/1959.png',
    status: 'em-breve',
    canais: [
      { nome: 'ESPN', url: 'http://xigfh01.site:80/031532627/513117897/620.m3u8' },
    ],
  },
  {
    id: 'sula-001',
    competicao: 'Sul-Americana',
    data: '10/09/2026',
    horario: '21:30',
    timeMandante: 'Cienciano',
    logoTimeMandante: 'https://media.api-sports.io/football/teams/1960.png',
    timeVisitante: 'Montevideo City',
    logoTimeVisitante: 'https://media.api-sports.io/football/teams/1961.png',
    status: 'em-breve',
    canais: [
      { nome: 'Paramount+', url: 'http://xigfh01.site:80/031532627/513117897/618.m3u8' },
    ],
  },
  {
    id: 'sb-001',
    competicao: 'Brasileirão Série B',
    data: '10/09/2026',
    horario: '19:30',
    timeMandante: 'São Bernardo',
    logoTimeMandante: 'https://media.api-sports.io/football/teams/1962.png',
    timeVisitante: 'Londrina',
    logoTimeVisitante: 'https://media.api-sports.io/football/teams/1963.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere', url: 'http://xigfh01.site:80/031532627/513117897/594.m3u8' },
    ],
  },
  {
    id: 'sb-002',
    competicao: 'Brasileirão Série B',
    data: '10/09/2026',
    horario: '19:30',
    timeMandante: 'Vila Nova',
    logoTimeMandante: 'https://media.api-sports.io/football/teams/1964.png',
    timeVisitante: 'Goiás',
    logoTimeVisitante: 'https://media.api-sports.io/football/teams/1965.png',
    status: 'em-breve',
    canais: [
      { nome: 'Disney+', url: 'http://xigfh01.site:80/031532627/513117897/595.m3u8' },
    ],
  },
  {
    id: 'sb-003',
    competicao: 'Brasileirão Série B',
    data: '10/09/2026',
    horario: '21:30',
    timeMandante: 'Sport',
    logoTimeMandante: 'https://media.api-sports.io/football/teams/1966.png',
    timeVisitante: 'Ponte Preta',
    logoTimeVisitante: 'https://media.api-sports.io/football/teams/1967.png',
    status: 'em-breve',
    canais: [
      { nome: 'ESPN4', url: 'http://xigfh01.site:80/031532627/513117897/619.m3u8' },
    ],
  },
];
