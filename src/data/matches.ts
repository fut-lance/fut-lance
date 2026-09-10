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
    id: 'champ-001',
    competicao: 'Champions League',
    data: '10/09/2026',
    horario: '13:45',
    timeMandante: 'Fenerbahce',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Roma',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'TNT Sports', url: 'http://xigfh01.site:80/031532627/513117897/588.m3u8' },
    ],
  },
  {
    id: 'champ-002',
    competicao: 'Champions League',
    data: '10/09/2026',
    horario: '13:45',
    timeMandante: 'PSV',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Shakhtar',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'Space', url: 'http://xigfh01.site:80/031532627/513117897/589.m3u8' },
    ],
  },
  {
    id: 'champ-003',
    competicao: 'Champions League',
    data: '10/09/2026',
    horario: '16:00',
    timeMandante: 'Bayern',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Bodo/Glimt',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'TNT', url: 'http://xigfh01.site:80/031532627/513117897/594.m3u8' },
    ],
  },
  {
    id: 'champ-004',
    competicao: 'Champions League',
    data: '10/09/2026',
    horario: '16:00',
    timeMandante: 'Manchester United',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Sabah Baku',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'Space', url: 'http://xigfh01.site:80/031532627/513117897/595.m3u8' },
    ],
  },
  {
    id: 'champ-005',
    competicao: 'Champions League',
    data: '10/09/2026',
    horario: '16:00',
    timeMandante: 'Como',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'RB Leipzig',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'HBO Max', url: 'http://xigfh01.site:80/031532627/513117897/618.m3u8' },
    ],
  },
  {
    id: 'champ-006',
    competicao: 'Champions League',
    data: '10/09/2026',
    horario: '16:00',
    timeMandante: 'Slavia Praga',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Lens',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'HBO Max', url: 'http://xigfh01.site:80/031532627/513117897/619.m3u8' },
    ],
  },
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
