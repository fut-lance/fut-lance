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
    horario: '19:00',
    timeMandante: 'Palmeiras',
    logoTimeMandante: 'https://img..flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'LDU',
    logoTimeVisitante: 'https://img..flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'Paramount+ 01', url: 'http://xigfh01.site:80/031532627/513117897/618.m3u8' },
      { nome: 'Paramount+ 02', url: 'http://xigfh01.site:80/031532627/513117897/619.m3u8' },
    ],
  },
  {
    id: 'lib-002',
    competicao: 'Libertadores',
    data: '10/09/2026',
    horario: '21:30',
    timeMandante: 'Estudiantes',
    logoTimeMandante: 'https://img..flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Corinthians',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'GE TV FHD', url: 'http://xigfh01.site:80/031532627/513117897/588.m3u8' },
      { nome: 'GE TV HD', url: 'http://xigfh01.site:80/031532627/513117897/589.m3u8' },
      { nome: 'Paramount+ 03', url: 'http://xigfh01.site:80/031532627/513117897/620.m3u8' },
    ],
  },
  {
    id: 'lib-003',
    competicao: 'Libertadores',
    data: '11/09/2026',
    horario: '19:30',
    timeMandante: 'Independiente del Valle',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Flamengo',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: 'http://xigfh01.site:80/031532627/513117897/594.m3u8' },
      { nome: 'Premiere Clubes HD', url: 'http://xigfh01.site:80/031532627/513117897/595.m3u8' },
    ],
  },
  {
    id: 'lib-004',
    competicao: 'Libertadores',
    data: '15/09/2026',
    horario: '17:00',
    timeMandante: 'Platense',
    logoTimeMandante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    timeVisitante: 'Fluminense',
    logoTimeVisitante: 'https://img.flashscore.com/res/image/data/2mFhdmWP-40x40.png',
    status: 'em-breve',
    canais: [
      { nome: 'Paramount+ 01', url: 'http://xigfh01.site:80/031532627/513117897/618.m3u8' },
    ],
  },
];
