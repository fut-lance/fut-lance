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

const BASE = 'http://filtror7679.site:80/031532627/513117897';

export const matches: Match[] = [
  {
    id: 'bras-12-001',
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '16:00',
    timeMandante: 'Grêmio',
    logoTimeMandante: 'https://logodetimes.com/times/gremio/logo-gremio-2048.png',
    timeVisitante: 'Vasco',
    logoTimeVisitante: 'https://assets.footylogos.com/logos/vasco-da-gama/vasco-da-gama-logo-footylogos.svg',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `${BASE}/424208.m3u8` },
      { nome: 'Premiere Clubes HD', url: `${BASE}/424209.m3u8` },
      { nome: 'Premiere 2 FHD', url: `${BASE}/424212.m3u8` },
      { nome: 'Premiere 2 HD', url: `${BASE}/424213.m3u8` },
      { nome: 'Premiere 3 FHD', url: `${BASE}/424216.m3u8` },
      { nome: 'Premiere 3 HD', url: `${BASE}/424217.m3u8` },
      { nome: 'Premiere 4 FHD', url: `${BASE}/424220.m3u8` },
      { nome: 'Premiere 4 HD', url: `${BASE}/424221.m3u8` },
      { nome: 'SporTV FHD', url: `${BASE}/423791.m3u8` },
      { nome: 'SporTV HD', url: `${BASE}/423792.m3u8` },
    ],
  },
  {
    id: 'bras-12-002',
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '16:00',
    timeMandante: 'Atlético-MG',
    logoTimeMandante: 'https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-2048.png',
    timeVisitante: 'Fluminense',
    logoTimeVisitante: 'https://logodetimes.com/times/fluminense/logo-fluminense-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 5 HD', url: `${BASE}/424224.m3u8` },
      { nome: 'Premiere 5 SD', url: `${BASE}/424225.m3u8` },
      { nome: 'Premiere 6 FHD', url: `${BASE}/424227.m3u8` },
      { nome: 'Premiere 6 HD', url: `${BASE}/424228.m3u8` },
      { nome: 'Premiere 7 FHD', url: `${BASE}/424231.m3u8` },
      { nome: 'Premiere 7 HD', url: `${BASE}/424232.m3u8` },
      { nome: 'SporTV 2 FHD', url: `${BASE}/423795.m3u8` },
      { nome: 'SporTV 2 HD', url: `${BASE}/423796.m3u8` },
    ],
  },
  {
    id: 'bras-12-003',
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '17:00',
    timeMandante: 'Chapecoense',
    logoTimeMandante: 'https://logodetimes.com/times/chapecoense/logo-chapecoense-2048.png',
    timeVisitante: 'Internacional',
    logoTimeVisitante: 'https://logodetimes.com/times/internacional/logo-internacional-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 8 FHD', url: `${BASE}/424235.m3u8` },
      { nome: 'Premiere 8 HD', url: `${BASE}/424236.m3u8` },
      { nome: 'SporTV 3 FHD', url: `${BASE}/423799.m3u8` },
      { nome: 'SporTV 3 HD', url: `${BASE}/423800.m3u8` },
    ],
  },
  {
    id: 'bras-12-004',
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '18:30',
    timeMandante: 'Palmeiras',
    logoTimeMandante: 'https://logodetimes.com/times/palmeiras/logo-palmeiras-2048.png',
    timeVisitante: 'São Paulo',
    logoTimeVisitante: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `${BASE}/424208.m3u8` },
      { nome: 'Premiere Clubes HD', url: `${BASE}/424209.m3u8` },
      { nome: 'Premiere 2 FHD', url: `${BASE}/424212.m3u8` },
      { nome: 'Premiere 2 HD', url: `${BASE}/424213.m3u8` },
      { nome: 'Premiere 3 FHD', url: `${BASE}/424216.m3u8` },
      { nome: 'Premiere 3 HD', url: `${BASE}/424217.m3u8` },
      { nome: 'SporTV FHD', url: `${BASE}/423791.m3u8` },
      { nome: 'SporTV HD', url: `${BASE}/423792.m3u8` },
    ],
  },
  {
    id: 'bras-12-005',
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '20:30',
    timeMandante: 'Botafogo',
    logoTimeMandante: 'https://logodetimes.com/times/botafogo/logo-botafogo-2048.png',
    timeVisitante: 'Bragantino',
    logoTimeVisitante: 'https://logodetimes.com/times/bragantino/logo-bragantino-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 4 FHD', url: `${BASE}/424220.m3u8` },
      { nome: 'Premiere 4 HD', url: `${BASE}/424221.m3u8` },
      { nome: 'Premiere 5 HD', url: `${BASE}/424224.m3u8` },
      { nome: 'Premiere 5 SD', url: `${BASE}/424225.m3u8` },
      { nome: 'SporTV 2 FHD', url: `${BASE}/423795.m3u8` },
      { nome: 'SporTV 2 HD', url: `${BASE}/423796.m3u8` },
    ],
  },
  {
    id: 'bras-12-006',
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '21:00',
    timeMandante: 'Santos',
    logoTimeMandante: 'https://logodetimes.com/times/santos/logo-santos-2048.png',
    timeVisitante: 'Cruzeiro',
    logoTimeVisitante: 'https://logodetimes.com/times/cruzeiro/logo-cruzeiro-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 6 FHD', url: `${BASE}/424227.m3u8` },
      { nome: 'Premiere 6 HD', url: `${BASE}/424228.m3u8` },
      { nome: 'Premiere 7 FHD', url: `${BASE}/424231.m3u8` },
      { nome: 'Premiere 7 HD', url: `${BASE}/424232.m3u8` },
      { nome: 'SporTV 3 FHD', url: `${BASE}/423799.m3u8` },
      { nome: 'SporTV 3 HD', url: `${BASE}/423800.m3u8` },
    ],
  },
];
