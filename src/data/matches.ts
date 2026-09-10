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
    logoTimeMandante: 'https://logodetimes.com/times/independiente-del-valle/logo-independiente-del-valle-2048.png',
    timeVisitante: 'Flamengo',
    logoTimeVisitante: 'https://logodetimes.com/times/flamengo/logo-flamengo-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'ESPN FHD', url: 'http://xigfh01.site:80/031532627/513117897/570.m3u8' },
      { nome: 'ESPN HD', url: 'http://xigfh01.site:80/031532627/513117897/571.m3u8' },
    ],
  },
  {
    id: 'sula-001',
    competicao: 'Sul-Americana',
    data: '10/09/2026',
    horario: '21:30',
    timeMandante: 'Cienciano',
    logoTimeMandante: 'https://cienciano.com/wp-content/uploads/2023/11/LOGO-CIENCIANO.png',
    timeVisitante: 'Montevideo City',
    logoTimeVisitante: 'https://montevideocitytorque.com/wp-content/uploads/2020/01/escudo-1.png',
    status: 'em-breve',
    canais: [
      { nome: 'Paramount+ 01', url: 'http://xigfh01.site:80/031532627/513117897/618.m3u8' },
      { nome: 'Paramount+ 02', url: 'http://xigfh01.site:80/031532627/513117897/619.m3u8' },
    ],
  },
  {
    id: 'sb-001',
    competicao: 'Brasileirão Série B',
    data: '10/09/2026',
    horario: '19:30',
    timeMandante: 'São Bernardo',
    logoTimeMandante: 'https://logodetimes.com/times/sao-bernardo/logo-sao-bernardo-2048.png',
    timeVisitante: 'Londrina',
    logoTimeVisitante: 'https://logodetimes.com/times/londrina/logo-londrina.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: 'http://xigfh01.site:80/031532627/513117897/594.m3u8' },
      { nome: 'Premiere Clubes HD', url: 'http://xigfh01.site:80/031532627/513117897/595.m3u8' },
      { nome: 'Premiere 2 FHD', url: 'http://xigfh01.site:80/031532627/513117897/597.m3u8' },
      { nome: 'Premiere 2 HD', url: 'http://xigfh01.site:80/031532627/513117897/598.m3u8' },
      { nome: 'Premiere 3 FHD', url: 'http://xigfh01.site:80/031532627/513117897/600.m3u8' },
      { nome: 'Premiere 3 HD', url: 'http://xigfh01.site:80/031532627/513117897/601.m3u8' },
      { nome: 'Premiere 4 FHD', url: 'http://xigfh01.site:80/031532627/513117897/603.m3u8' },
      { nome: 'Premiere 4 HD', url: 'http://xigfh01.site:80/031532627/513117897/604.m3u8' },
      { nome: 'Premiere 5 FHD', url: 'http://xigfh01.site:80/031532627/513117897/606.m3u8' },
      { nome: 'Premiere 5 HD', url: 'http://xigfh01.site:80/031532627/513117897/607.m3u8' },
      { nome: 'Premiere 6 FHD', url: 'http://xigfh01.site:80/031532627/513117897/609.m3u8' },
      { nome: 'Premiere 6 HD', url: 'http://xigfh01.site:80/031532627/513117897/610.m3u8' },
      { nome: 'Premiere 7 FHD', url: 'http://xigfh01.site:80/031532627/513117897/612.m3u8' },
      { nome: 'Premiere 7 HD', url: 'http://xigfh01.site:80/031532627/513117897/613.m3u8' },
      { nome: 'Premiere 8 FHD', url: 'http://xigfh01.site:80/031532627/513117897/615.m3u8' },
      { nome: 'Premiere 8 HD', url: 'http://xigfh01.site:80/031532627/513117897/616.m3u8' },
    ],
  },
  {
    id: 'sb-002',
    competicao: 'Brasileirão Série B',
    data: '10/09/2026',
    horario: '19:30',
    timeMandante: 'Vila Nova',
    logoTimeMandante: 'https://logodetimes.com/times/vila-nova/logo-vila-nova.png',
    timeVisitante: 'Goiás',
    logoTimeVisitante: 'https://www.goiasec.com.br/imagens/header/logo-goias.svg',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: 'http://xigfh01.site:80/031532627/513117897/594.m3u8' },
      { nome: 'Premiere Clubes HD', url: 'http://xigfh01.site:80/031532627/513117897/595.m3u8' },
      { nome: 'Premiere 2 FHD', url: 'http://xigfh01.site:80/031532627/513117897/597.m3u8' },
      { nome: 'Premiere 2 HD', url: 'http://xigfh01.site:80/031532627/513117897/598.m3u8' },
      { nome: 'Premiere 3 FHD', url: 'http://xigfh01.site:80/031532627/513117897/600.m3u8' },
      { nome: 'Premiere 3 HD', url: 'http://xigfh01.site:80/031532627/513117897/601.m3u8' },
      { nome: 'Premiere 4 FHD', url: 'http://xigfh01.site:80/031532627/513117897/603.m3u8' },
      { nome: 'Premiere 4 HD', url: 'http://xigfh01.site:80/031532627/513117897/604.m3u8' },
      { nome: 'Premiere 5 FHD', url: 'http://xigfh01.site:80/031532627/513117897/606.m3u8' },
      { nome: 'Premiere 5 HD', url: 'http://xigfh01.site:80/031532627/513117897/607.m3u8' },
      { nome: 'Premiere 6 FHD', url: 'http://xigfh01.site:80/031532627/513117897/609.m3u8' },
      { nome: 'Premiere 6 HD', url: 'http://xigfh01.site:80/031532627/513117897/610.m3u8' },
      { nome: 'Premiere 7 FHD', url: 'http://xigfh01.site:80/031532627/513117897/612.m3u8' },
      { nome: 'Premiere 7 HD', url: 'http://xigfh01.site:80/031532627/513117897/613.m3u8' },
      { nome: 'Premiere 8 FHD', url: 'http://xigfh01.site:80/031532627/513117897/615.m3u8' },
      { nome: 'Premiere 8 HD', url: 'http://xigfh01.site:80/031532627/513117897/616.m3u8' },
    ],
  },
  {
    id: 'sb-003',
    competicao: 'Brasileirão Série B',
    data: '10/09/2026',
    horario: '21:30',
    timeMandante: 'Sport',
    logoTimeMandante: 'https://logodetimes.com/times/sport-recife/logo-sport-recife-2048.png',
    timeVisitante: 'Ponte Preta',
    logoTimeVisitante: 'https://logodetimes.com/times/ponte-preta/logo-ponte-preta-2048.png',
    status: 'em-breve',
    canais: [
      { nome: 'Premiere Clubes FHD', url: 'http://xigfh01.site:80/031532627/513117897/594.m3u8' },
      { nome: 'Premiere Clubes HD', url: 'http://xigfh01.site:80/031532627/513117897/595.m3u8' },
      { nome: 'Premiere 2 FHD', url: 'http://xigfh01.site:80/031532627/513117897/597.m3u8' },
      { nome: 'Premiere 2 HD', url: 'http://xigfh01.site:80/031532627/513117897/598.m3u8' },
      { nome: 'Premiere 3 FHD', url: 'http://xigfh01.site:80/031532627/513117897/600.m3u8' },
      { nome: 'Premiere 3 HD', url: 'http://xigfh01.site:80/031532627/513117897/601.m3u8' },
      { nome: 'Premiere 4 FHD', url: 'http://xigfh01.site:80/031532627/513117897/603.m3u8' },
      { nome: 'Premiere 4 HD', url: 'http://xigfh01.site:80/031532627/513117897/604.m3u8' },
      { nome: 'Premiere 5 FHD', url: 'http://xigfh01.site:80/031532627/513117897/606.m3u8' },
      { nome: 'Premiere 5 HD', url: 'http://xigfh01.site:80/031532627/513117897/607.m3u8' },
      { nome: 'Premiere 6 FHD', url: 'http://xigfh01.site:80/031532627/513117897/609.m3u8' },
      { nome: 'Premiere 6 HD', url: 'http://xigfh01.site:80/031532627/513117897/610.m3u8' },
      { nome: 'Premiere 7 FHD', url: 'http://xigfh01.site:80/031532627/513117897/612.m3u8' },
      { nome: 'Premiere 7 HD', url: 'http://xigfh01.site:80/031532627/513117897/613.m3u8' },
      { nome: 'Premiere 8 FHD', url: 'http://xigfh01.site:80/031532627/513117897/615.m3u8' },
      { nome: 'Premiere 8 HD', url: 'http://xigfh01.site:80/031532627/513117897/616.m3u8' },
    ],
  },
];
