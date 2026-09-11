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
    id: 'bras-12-001',
    competicao: 'Brasileirão',
    data: '12/09/2026',
    horario: '16:00',
    timeMandante: 'Grêmio',
    logoTimeMandante: 'https://logodetimes.com/times/gremio/logo-gremio-2048.png',
    timeVisitante: 'Vasco',
    logoTimeVisitante: 'https://assets.footylogos.com/logos/vasco-da-gama/vasco-da-gama-logo-footylogos.svg',
    status: 'em-breve',
    canais: [],
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
    canais: [],
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
    canais: [],
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
    canais: [],
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
    canais: [],
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
    canais: [],
  },
];
