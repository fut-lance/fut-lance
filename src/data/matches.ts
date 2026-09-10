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
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Flamengo',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'ESPN', url: 'http://xigfh01.site:80/031532627/513117897/620.m3u8' },
    ],
  },
];
