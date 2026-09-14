export interface MatchChannel {
  nome: string;
  url: string;
}

export interface Match {
  id: string;
  slug: string;
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

function generateSlug(timeMandante: string, timeVisitante: string): string {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  return `${normalize(timeMandante)}-x-${normalize(timeVisitante)}`;
}


export const matches: Match[] = [
  {
    id: 'bras-11-001',
    slug: generateSlug('Coritiba', 'Athletico-PR'),
    competicao: 'Brasileirão',
    data: '11/09/2026',
    horario: '21:00',
    timeMandante: 'Coritiba',
    logoTimeMandante: 'https://logodetimes.com/times/coritiba/logo-coritiba-2048.png',
    timeVisitante: 'Athletico-PR',
    logoTimeVisitante: 'https://www.ogol.com.br/team/athletico-pr/logo.png',
    status: 'em-breve',
    canais: [
      { nome: 'SporTV FHD', url: `/api/stream?ch=423791` },
      { nome: 'SporTV HD', url: `/api/stream?ch=423792` },
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'bras-12-001',
    slug: generateSlug('Atlético-MG', 'Fluminense'),
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '16:00',
    timeMandante: 'Atlético-MG',
    logoTimeMandante: 'https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-2048.png',
    timeVisitante: 'Fluminense',
    logoTimeVisitante: 'https://logodetimes.com/times/fluminense/logo-fluminense-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 2 FHD', url: `/api/stream?ch=424212` },
      { nome: 'Premiere 2 HD', url: `/api/stream?ch=424213` },
      { nome: 'Premiere 3 FHD', url: `/api/stream?ch=424216` },
      { nome: 'Premiere 3 HD', url: `/api/stream?ch=424217` },
    ],
  },
  {
    id: 'bras-12-002',
    slug: generateSlug('Grêmio', 'Vasco'),
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '16:00',
    timeMandante: 'Grêmio',
    logoTimeMandante: 'https://logodetimes.com/times/gremio/logo-gremio-2048.png',
    timeVisitante: 'Vasco',
    logoTimeVisitante: 'https://assets.footylogos.com/logos/vasco-da-gama/vasco-da-gama-logo-footylogos.svg',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 4 FHD', url: `/api/stream?ch=424220` },
      { nome: 'Premiere 4 HD', url: `/api/stream?ch=424221` },
      { nome: 'Premiere 5 FHD', url: `/api/stream?ch=424224` },
      { nome: 'Premiere 5 HD', url: `/api/stream?ch=424225` },
    ],
  },
  {
    id: 'bras-12-003',
    slug: generateSlug('Chapecoense', 'Internacional'),
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '17:00',
    timeMandante: 'Chapecoense',
    logoTimeMandante: 'https://logodetimes.com/times/chapecoense/logo-chapecoense-2048.png',
    timeVisitante: 'Internacional',
    logoTimeVisitante: 'https://logodetimes.com/times/internacional/logo-internacional-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'CazéTV 01 FHD', url: `/api/stream?ch=424908` },
      { nome: 'CazéTV 01 HD', url: `/api/stream?ch=424909` },
      { nome: 'Premiere 6 FHD', url: `/api/stream?ch=424227` },
      { nome: 'Premiere 6 HD', url: `/api/stream?ch=424228` },
    ],
  },
  {
    id: 'bras-12-004',
    slug: generateSlug('Palmeiras', 'São Paulo'),
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '18:30',
    timeMandante: 'Palmeiras',
    logoTimeMandante: 'https://logodetimes.com/times/palmeiras/logo-palmeiras-2048.png',
    timeVisitante: 'São Paulo',
    logoTimeVisitante: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
      { nome: 'Premiere 2 FHD', url: `/api/stream?ch=424212` },
      { nome: 'Premiere 2 HD', url: `/api/stream?ch=424213` },
    ],
  },
  {
    id: 'bras-12-005',
    slug: generateSlug('Botafogo', 'Bragantino'),
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '20:30',
    timeMandante: 'Botafogo',
    logoTimeMandante: 'https://logodetimes.com/times/botafogo/logo-botafogo-2048.png',
    timeVisitante: 'Bragantino',
    logoTimeVisitante: 'https://logodetimes.com/times/bragantino/logo-bragantino-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Amazon Prime Video', url: '' },
    ],
  },
  {
    id: 'bras-12-006',
    slug: generateSlug('Santos', 'Cruzeiro'),
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '21:00',
    timeMandante: 'Santos',
    logoTimeMandante: 'https://logodetimes.com/times/santos/logo-santos-2048.png',
    timeVisitante: 'Cruzeiro',
    logoTimeVisitante: 'https://logodetimes.com/times/cruzeiro/logo-cruzeiro-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'SporTV 2 FHD', url: `/api/stream?ch=423795` },
      { nome: 'SporTV 2 HD', url: `/api/stream?ch=423796` },
      { nome: 'Premiere 7 FHD', url: `/api/stream?ch=424231` },
      { nome: 'Premiere 7 HD', url: `/api/stream?ch=424232` },
    ],
  },
  {
    id: 'bras-13-001',
    slug: generateSlug('Mirassol', 'Vitória'),
    competicao: 'Brasileirão',
    data: '13/09/2026',
    horario: '16:00',
    timeMandante: 'Mirassol',
    logoTimeMandante: 'https://logodetimes.com/times/mirassol/logo-mirassol-2048.png',
    timeVisitante: 'Vitória',
    logoTimeVisitante: 'https://logodetimes.com/times/vitoria/logo-vitoria-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 8 FHD', url: `/api/stream?ch=424235` },
      { nome: 'Premiere 8 HD', url: `/api/stream?ch=424236` },
    ],
  },
  {
    id: 'bras-13-002',
    slug: generateSlug('Flamengo', 'Corinthians'),
    competicao: 'Brasileirão',
    data: '13/09/2026',
    horario: '17:30',
    timeMandante: 'Flamengo',
    logoTimeMandante: 'https://logodetimes.com/times/flamengo/logo-flamengo-2048.png',
    timeVisitante: 'Corinthians',
    logoTimeVisitante: 'https://logodetimes.com/times/corinthians/logo-corinthians-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Globo', url: '' },
      { nome: 'GE TV', url: '' },
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
      { nome: 'Premiere 2 FHD', url: `/api/stream?ch=424212` },
      { nome: 'Premiere 2 HD', url: `/api/stream?ch=424213` },
    ],
  },
  {
    id: 'bras-14-001',
    slug: generateSlug('Bahia', 'Remo'),
    competicao: 'Brasileirão',
    data: '14/09/2026',
    horario: '20:00',
    timeMandante: 'Bahia',
    logoTimeMandante: 'https://logodetimes.com/times/bahia/logo-bahia-2048.png',
    timeVisitante: 'Remo',
    logoTimeVisitante: 'https://www.clubedoremo.com.br/escudo.svg',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 3 FHD', url: `/api/stream?ch=424216` },
      { nome: 'Premiere 3 HD', url: `/api/stream?ch=424217` },
      { nome: 'Premiere 4 FHD', url: `/api/stream?ch=424220` },
      { nome: 'Premiere 4 HD', url: `/api/stream?ch=424221` },
    ],
  },
  {
    id: 'serb-13-001',
    slug: generateSlug('Atlético-GO', 'Criciúma'),
    competicao: 'Brasileirão Série B',
    data: '13/09/2026',
    horario: '16:00',
    timeMandante: 'Atlético-GO',
    logoTimeMandante: 'https://media.api-sports.io/football/teams/1190.png',
    timeVisitante: 'Criciúma',
    logoTimeVisitante: 'https://media.api-sports.io/football/teams/1194.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 2 HD', url: `/api/stream?ch=424213` },
      { nome: 'SporTV HD', url: `/api/stream?ch=423792` },
    ],
  },
  {
    id: 'serb-13-002',
    slug: generateSlug('Juventude', 'Athletic-MG'),
    competicao: 'Brasileirão Série B',
    data: '13/09/2026',
    horario: '18:00',
    timeMandante: 'Juventude',
    logoTimeMandante: 'https://logodetimes.com/times/juventude/logo-juventude-2048.png',
    timeVisitante: 'Athletic-MG',
    logoTimeVisitante: 'https://media.api-sports.io/football/teams/1191.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 3 HD', url: `/api/stream?ch=424217` },
      { nome: 'SporTV 2 HD', url: `/api/stream?ch=423796` },
    ],
  },
  {
    id: 'serb-13-003',
    slug: generateSlug('Fortaleza', 'Ceará'),
    competicao: 'Brasileirão Série B',
    data: '13/09/2026',
    horario: '18:30',
    timeMandante: 'Fortaleza',
    logoTimeMandante: 'https://logodetimes.com/times/fortaleza/logo-fortaleza-2048.png',
    timeVisitante: 'Ceará',
    logoTimeVisitante: 'https://logodetimes.com/times/ceara/logo-ceara-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 4 HD', url: `/api/stream?ch=424221` },
      { nome: 'SporTV 3 HD', url: `/api/stream?ch=423800` },
    ],
  },
  {
    id: 'serb-13-004',
    slug: generateSlug('Novorizontino', 'Cuiabá'),
    competicao: 'Brasileirão Série B',
    data: '13/09/2026',
    horario: '18:30',
    timeMandante: 'Novorizontino',
    logoTimeMandante: 'https://media.api-sports.io/football/teams/18127.png',
    timeVisitante: 'Cuiabá',
    logoTimeVisitante: 'https://logodetimes.com/times/cuiaba/logo-cuiaba-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere 5 HD', url: `/api/stream?ch=424225` },
      { nome: 'SporTV HD', url: `/api/stream?ch=423792` },
    ],
  },
];
