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
    id: 'serb-18-001',
    slug: generateSlug('Vila Nova', 'América-MG'),
    competicao: 'Brasileirão Série B',
    data: '18/09/2026',
    horario: '19:30',
    timeMandante: 'Vila Nova',
    logoTimeMandante: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Vila_Nova_Logo_Oficial.svg/500px-Vila_Nova_Logo_Oficial.svg.png',
    timeVisitante: 'América-MG',
    logoTimeVisitante: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Escudo_oficial_do_Am%C3%A9rica_Futebol_Clube.svg/langpt-330px-Escudo_oficial_do_Am%C3%A9rica_Futebol_Clube.svg.png',
    status: 'em-breve',
    canais: [
      { nome: 'ESPN 4 FHD', url: `/api/stream?ch=424154` },
      { nome: 'ESPN 4 HD', url: `/api/stream?ch=424155` },
      { nome: 'Disney+', url: '' },
    ],
  },
  {
    id: 'serb-18-002',
    slug: generateSlug('Ceará', 'Novorizontino'),
    competicao: 'Brasileirão Série B',
    data: '18/09/2026',
    horario: '20:30',
    timeMandante: 'Ceará',
    logoTimeMandante: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/500px-Cear%C3%A1_Sporting_Club_logo.svg.png',
    timeVisitante: 'Novorizontino',
    logoTimeVisitante: 'https://upload.wikimedia.org/wikipedia/pt/9/9e/Gr%C3%AAmio_Esportivo_Novorizontino_logo.png',
    status: 'em-breve',
    canais: [
      { nome: 'Disney+', url: '' },
    ],
  },
  {
    id: 'serb-18-003',
    slug: generateSlug('São Bernardo', 'Atlético-GO'),
    competicao: 'Brasileirão Série B',
    data: '18/09/2026',
    horario: '21:00',
    timeMandante: 'São Bernardo',
    logoTimeMandante: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/S%C3%A3o_Bernardo_FC_2020_crest.png/500px-S%C3%A3o_Bernardo_FC_2020_crest.png',
    timeVisitante: 'Atlético-GO',
    logoTimeVisitante: 'https://commons.wikimedia.org/wiki/Special:FilePath/Atl%C3%A9tico_Clube_Goianiense_logo.svg?width=500',
    status: 'em-breve',
    canais: [
      { nome: 'SporTV FHD', url: `/api/stream?ch=423791` },
      { nome: 'SporTV HD', url: `/api/stream?ch=423792` },
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
      { nome: 'GE TV', url: '' },
    ],
  },
  {
    id: 'bras-19-001',
    slug: generateSlug('Atlético-MG', 'Chapecoense'),
    competicao: 'Brasileirão',
    data: '19/09/2026',
    horario: '16:00',
    timeMandante: 'Atlético-MG',
    logoTimeMandante: 'https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-2048.png',
    timeVisitante: 'Chapecoense',
    logoTimeVisitante: 'https://logodetimes.com/times/chapecoense/logo-chapecoense-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'fem-19-001',
    slug: generateSlug('São Paulo', 'Flamengo'),
    competicao: 'Brasileirão Feminino',
    data: '19/09/2026',
    horario: '16:30',
    timeMandante: 'São Paulo',
    logoTimeMandante: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-2048.png',
    timeVisitante: 'Flamengo',
    logoTimeVisitante: 'https://logodetimes.com/times/flamengo/logo-flamengo-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Globo', url: '' },
      { nome: 'SporTV FHD', url: `/api/stream?ch=423791` },
      { nome: 'SporTV HD', url: `/api/stream?ch=423792` },
      { nome: 'GE TV FHD', url: `/api/stream?ch=424960` },
      { nome: 'GE TV HD', url: `/api/stream?ch=424961` },
    ],
  },
  {
    id: 'bras-19-002',
    slug: generateSlug('Mirassol', 'Botafogo'),
    competicao: 'Brasileirão',
    data: '19/09/2026',
    horario: '17:00',
    timeMandante: 'Mirassol',
    logoTimeMandante: 'https://logodetimes.com/times/mirassol/logo-mirassol-2048.png',
    timeVisitante: 'Botafogo',
    logoTimeVisitante: 'https://logodetimes.com/times/botafogo/logo-botafogo-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Record', url: '' },
      { nome: 'CazéTV', url: '' },
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'bras-19-003',
    slug: generateSlug('Remo', 'Santos'),
    competicao: 'Brasileirão',
    data: '19/09/2026',
    horario: '18:30',
    timeMandante: 'Remo',
    logoTimeMandante: 'https://commons.wikimedia.org/wiki/Special:FilePath/Escudo%20oficial%20do%20Clube%20do%20Remo.png?width=500',
    timeVisitante: 'Santos',
    logoTimeVisitante: 'https://logodetimes.com/times/santos/logo-santos-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'bras-19-004',
    slug: generateSlug('Vasco', 'Coritiba'),
    competicao: 'Brasileirão',
    data: '19/09/2026',
    horario: '20:30',
    timeMandante: 'Vasco',
    logoTimeMandante: 'https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-2048.png',
    timeVisitante: 'Coritiba',
    logoTimeVisitante: 'https://logodetimes.com/times/coritiba/logo-coritiba-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Prime Video', url: '' },
      { nome: 'PRIME VIDEO 07 FHD', url: `/api/stream?ch=424945` },
    ],
  },
  {
    id: 'bras-20-001',
    slug: generateSlug('Grêmio', 'Palmeiras'),
    competicao: 'Brasileirão',
    data: '20/09/2026',
    horario: '11:00',
    timeMandante: 'Grêmio',
    logoTimeMandante: 'https://logodetimes.com/times/gremio/logo-gremio-2048.png',
    timeVisitante: 'Palmeiras',
    logoTimeVisitante: 'https://logodetimes.com/times/palmeiras/logo-palmeiras-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'bras-20-002',
    slug: generateSlug('Vitória', 'Cruzeiro'),
    competicao: 'Brasileirão',
    data: '20/09/2026',
    horario: '16:00',
    timeMandante: 'Vitória',
    logoTimeMandante: 'https://logodetimes.com/times/vitoria/logo-vitoria-2048.png',
    timeVisitante: 'Cruzeiro',
    logoTimeVisitante: 'https://logodetimes.com/times/cruzeiro/logo-cruzeiro-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Globo', url: '' },
      { nome: 'GE TV FHD', url: `/api/stream?ch=424960` },
      { nome: 'GE TV HD', url: `/api/stream?ch=424961` },
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'bras-20-003',
    slug: generateSlug('Corinthians', 'Fluminense'),
    competicao: 'Brasileirão',
    data: '20/09/2026',
    horario: '16:00',
    timeMandante: 'Corinthians',
    logoTimeMandante: 'https://logodetimes.com/times/corinthians/logo-corinthians-2048.png',
    timeVisitante: 'Fluminense',
    logoTimeVisitante: 'https://logodetimes.com/times/fluminense/logo-fluminense-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Globo', url: '' },
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'bras-20-004',
    slug: generateSlug('Flamengo', 'Bragantino'),
    competicao: 'Brasileirão',
    data: '20/09/2026',
    horario: '18:30',
    timeMandante: 'Flamengo',
    logoTimeMandante: 'https://logodetimes.com/times/flamengo/logo-flamengo-2048.png',
    timeVisitante: 'Bragantino',
    logoTimeVisitante: 'https://logodetimes.com/times/bragantino/logo-bragantino-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
      { nome: 'SporTV FHD', url: `/api/stream?ch=423791` },
      { nome: 'SporTV HD', url: `/api/stream?ch=423792` },
    ],
  },
  {
    id: 'bras-20-005',
    slug: generateSlug('Athletico-PR', 'Bahia'),
    competicao: 'Brasileirão',
    data: '20/09/2026',
    horario: '19:30',
    timeMandante: 'Athletico-PR',
    logoTimeMandante: 'https://commons.wikimedia.org/wiki/Special:FilePath/Athletico_Paranaense_(Logo_2019).svg?width=500',
    timeVisitante: 'Bahia',
    logoTimeVisitante: 'https://logodetimes.com/times/bahia/logo-bahia-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: `/api/stream?ch=424208` },
      { nome: 'Premiere Clubes HD', url: `/api/stream?ch=424209` },
    ],
  },
  {
    id: 'fem-21-001',
    slug: generateSlug('Corinthians', 'Bahia'),
    competicao: 'Brasileirão Feminino',
    data: '21/09/2026',
    horario: '21:30',
    timeMandante: 'Corinthians',
    logoTimeMandante: 'https://logodetimes.com/times/corinthians/logo-corinthians-2048.png',
    timeVisitante: 'Bahia',
    logoTimeVisitante: 'https://logodetimes.com/times/bahia/logo-bahia-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'SporTV FHD', url: `/api/stream?ch=423791` },
      { nome: 'SporTV HD', url: `/api/stream?ch=423792` },
      { nome: 'TV Brasil', url: '' },
      { nome: 'N Sports', url: '' },
    ],
  },
];
