export interface Jogador {
  id: string;
  slug: string;
  nome: string;
  nomeCompleto: string;
  posicao: string;
  timeAtual: string;
  selecao: string;
  foto: string;
  descricao: string;
  estatisticas: {
    gols: number;
    assistencias: number;
    jogos: number;
    titulos: string[];
  };
  carreira: {
    time: string;
    periodo: string;
    jogos: number;
    gols: number;
  }[];
  noticias: {
    titulo: string;
    data: string;
  }[];
}

export const jogadores: Jogador[] = [
  {
    id: 'neymar',
    slug: 'neymar',
    nome: 'Neymar',
    nomeCompleto: 'Neymar da Silva Santos Júnior',
    posicao: 'Atacante',
    timeAtual: 'Santos',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/santos/logo-santos-2048.png',
    descricao: 'Neymar é um dos maiores jogadores brasileiros de todos os tempos. Conhecido por sua habilidade, velocidade e capacidade de decidir jogos, ele é ídolo do Santos e da Seleção Brasileira. Em 2026, acumula 16 participações em gols nos últimos 18 jogos.',
    estatisticas: {
      gols: 417,
      assistencias: 260,
      jogos: 698,
      titulos: ['Libertadores', 'Copa do Brasil', 'Champions League', 'La Liga', 'Ligue 1', 'Copa do Mundo Sub-20', 'Olimpíadas'],
    },
    carreira: [
      { time: 'Santos', periodo: '2009-2013', jogos: 225, gols: 136 },
      { time: 'Barcelona', periodo: '2013-2017', jogos: 186, gols: 105 },
      { time: 'Paris Saint-Germain', periodo: '2017-2023', jogos: 173, gols: 118 },
      { time: 'Al-Hilal', periodo: '2023-2025', jogos: 53, gols: 24 },
      { time: 'Santos', periodo: '2025-Atual', jogos: 61, gols: 34 },
    ],
    noticias: [
      { titulo: 'Neymar soma 16 participações em gols em 18 jogos pelo Santos', data: '14/05/2026' },
      { titulo: 'Neymar é o jogador mais eficiente do Brasileirão 2026', data: '28/02/2026' },
      { titulo: 'Neymar acumula 10 cartões amarelos e 9 gols em 2026', data: '10/09/2026' },
    ],
  },
  {
    id: 'vinicius-jr',
    slug: 'vinicius-jr',
    nome: 'Vinícius Jr',
    nomeCompleto: 'Vinícius José Paixão de Oliveira Júnior',
    posicao: 'Atacante',
    timeAtual: 'Real Madrid',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/real-madrid/logo-real-madrid-2048.png',
    descricao: 'Vinícius Jr é um dos jogadores mais talentosos do mundo. Velocidade explosiva, dribles impossíveis e gols decisivos. Ele é a estrela do Real Madrid e da Seleção Brasileira.',
    estatisticas: {
      gols: 130,
      assistencias: 88,
      jogos: 335,
      titulos: ['Champions League', 'La Liga', 'Supercopa da Espanha', 'Copa do Mundo de Clubes'],
    },
    carreira: [
      { time: 'Flamengo', periodo: '2017-2018', jogos: 69, gols: 14 },
      { time: 'Real Madrid', periodo: '2018-Atual', jogos: 266, gols: 116 },
    ],
    noticias: [
      { titulo: 'Vinícius Jr brilha na Champions League pelo Real Madrid', data: '11/09/2026' },
      { titulo: 'Vinícius Jr é eleito melhor jogador da La Liga', data: '09/09/2026' },
      { titulo: 'Real Madrid vence com gol de Vinícius Jr', data: '07/09/2026' },
    ],
  },
  {
    id: 'endrick',
    slug: 'endrick',
    nome: 'Endrick',
    nomeCompleto: 'Endrick Felipe Moreira de Sousa',
    posicao: 'Atacante',
    timeAtual: 'Real Madrid',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/real-madrid/logo-real-madrid-2048.png',
    descricao: 'Endrick é a nova estrela do futebol brasileiro. Com apenas 19 anos, ele já é considerado um dos maiores talentos do mundo. Sua força, finalização e maturidade impressionam.',
    estatisticas: {
      gols: 48,
      assistencias: 20,
      jogos: 135,
      titulos: ['Brasileirão', 'Copa do Brasil', 'Supercopa do Brasil'],
    },
    carreira: [
      { time: 'Palmeiras', periodo: '2022-2024', jogos: 85, gols: 32 },
      { time: 'Real Madrid', periodo: '2024-Atual', jogos: 50, gols: 16 },
    ],
    noticias: [
      { titulo: 'Endrick marca gol decisivo pelo Real Madrid', data: '10/09/2026' },
      { titulo: 'Endrick é convocado para a Seleção Brasileira', data: '08/09/2026' },
      { titulo: 'Real Madrid aposta em Endrick para a temporada', data: '05/09/2026' },
    ],
  },
  {
    id: 'rodrigo',
    slug: 'rodrigo',
    nome: 'Rodrygo',
    nomeCompleto: 'Rodrygo Silva de Goes',
    posicao: 'Atacante',
    timeAtual: 'Real Madrid',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/real-madrid/logo-real-madrid-2048.png',
    descricao: 'Rodrygo é um atacante brasileiro de classe mundial. Conhecido por seus gols decisivos na Champions League, ele é peça fundamental do Real Madrid.',
    estatisticas: {
      gols: 72,
      assistencias: 48,
      jogos: 225,
      titulos: ['Champions League', 'La Liga', 'Supercopa da Espanha', 'Copa do Mundo de Clubes'],
    },
    carreira: [
      { time: 'Santos', periodo: '2017-2019', jogos: 80, gols: 27 },
      { time: 'Real Madrid', periodo: '2019-Atual', jogos: 145, gols: 45 },
    ],
    noticias: [
      { titulo: 'Rodrygo marca gol vitalício na Champions League', data: '11/09/2026' },
      { titulo: 'Rodrygo renova contrato com o Real Madrid', data: '09/09/2026' },
      { titulo: 'Real Madrid conta com Rodrygo para a temporada', data: '07/09/2026' },
    ],
  },
  {
    id: 'bruno-fernandes',
    slug: 'bruno-fernandes',
    nome: 'Bruno Fernandes',
    nomeCompleto: 'Bruno Miguel Borges Fernandes',
    posicao: 'Meio-campo',
    timeAtual: 'Manchester United',
    selecao: 'Portugal',
    foto: 'https://logodetimes.com/times/manchester-united/logo-manchester-united-2048.png',
    descricao: 'Bruno Fernandes é um dos meio-campistas mais criativos do futebol mundial. Capacidade de passes, chutes de fora da área e liderança são suas principais qualidades.',
    estatisticas: {
      gols: 130,
      assistencias: 98,
      jogos: 395,
      titulos: ['Premier League', 'Copa da Liga Inglesa', 'Liga Europa'],
    },
    carreira: [
      { time: 'Udinese', periodo: '2013-2016', jogos: 95, gols: 15 },
      { time: 'Sampdoria', periodo: '2016-2017', jogos: 33, gols: 5 },
      { time: 'Sporting CP', periodo: '2017-2020', jogos: 137, gols: 63 },
      { time: 'Manchester United', periodo: '2020-Atual', jogos: 130, gols: 47 },
    ],
    noticias: [
      { titulo: 'Bruno Fernandes lidera Manchester United na Premier League', data: '10/09/2026' },
      { titulo: 'Bruno Fernandes é eleito jogador do mês', data: '08/09/2026' },
      { titulo: 'Manchester United vence com assistência de Bruno Fernandes', data: '05/09/2026' },
    ],
  },
  {
    id: 'casemiro',
    slug: 'casemiro',
    nome: 'Casemiro',
    nomeCompleto: 'Carlos Henrique José Casimiro',
    posicao: 'Volante',
    timeAtual: 'Manchester United',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/manchester-united/logo-manchester-united-2048.png',
    descricao: 'Casemiro é um dos melhores volantes do mundo. Conhecido por sua marcação, interrupts e capacidade de início de jogada, ele é uma peça fundamental no Manchester United.',
    estatisticas: {
      gols: 48,
      assistencias: 38,
      jogos: 535,
      titulos: ['Champions League', 'La Liga', 'Copa do Brasil', 'Libertadores', 'Copa do Mundo de Clubes'],
    },
    carreira: [
      { time: 'São Paulo', periodo: '2010-2013', jogos: 105, gols: 11 },
      { time: 'Real Madrid', periodo: '2013-2022', jogos: 336, gols: 31 },
      { time: 'Manchester United', periodo: '2022-Atual', jogos: 94, gols: 7 },
    ],
    noticias: [
      { titulo: 'Casemiro retorna de lesão pelo Manchester United', data: '10/09/2026' },
      { titulo: 'Casemiro é convocado para a Seleção Brasileira', data: '08/09/2026' },
      { titulo: 'Manchester United conta com Casemiro para a temporada', data: '05/09/2026' },
    ],
  },
  {
    id: 'marquinhos',
    slug: 'marquinhos',
    nome: 'Marquinhos',
    nomeCompleto: 'Marcos Aoás Corrêa',
    posicao: 'Zagueiro',
    timeAtual: 'Paris Saint-Germain',
    selecao: 'Brasil',
    foto: 'https://logodownload.org/wp-content/uploads/2017/02/psg-logo-escudo-paris-saint-germain-1.png',
    descricao: 'Marquinhos é o capitão do Paris Saint-Germain e um dos melhores zagueiros do mundo. Liderança, marcação e capacidade de jogo são suas principais qualidades.',
    estatisticas: {
      gols: 38,
      assistencias: 18,
      jogos: 465,
      titulos: ['Ligue 1', 'Copa da França', 'Copa da Liga Francesa', 'Supercopa da França'],
    },
    carreira: [
      { time: 'Corinthians', periodo: '2010-2012', jogos: 85, gols: 6 },
      { time: 'Roma', periodo: '2012-2013', jogos: 26, gols: 0 },
      { time: 'Paris Saint-Germain', periodo: '2013-Atual', jogos: 354, gols: 32 },
    ],
    noticias: [
      { titulo: 'Marquinhos lidera defesa do PSG na Champions League', data: '10/09/2026' },
      { titulo: 'Marquinhos é convocado para a Seleção Brasileira', data: '08/09/2026' },
      { titulo: 'PSG vence com atuação de Marquinhos', data: '05/09/2026' },
    ],
  },
  {
    id: 'alisson',
    slug: 'alisson',
    nome: 'Alisson',
    nomeCompleto: 'Alisson Becker',
    posicao: 'Goleiro',
    timeAtual: 'Liverpool',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/liverpool/logo-liverpool-2048.png',
    descricao: 'Alisson é considerado um dos melhores goleiros do mundo. Suas defesas espectaculares e capacidade de jogo com os pés o tornam um goleiro completo.',
    estatisticas: {
      gols: 0,
      assistencias: 3,
      jogos: 435,
      titulos: ['Champions League', 'Premier League', 'Copa do Brasil', 'Libertadores', 'Copa do Mundo de Clubes'],
    },
    carreira: [
      { time: 'Internacional', periodo: '2013-2016', jogos: 115, gols: 0 },
      { time: 'Roma', periodo: '2016-2018', jogos: 64, gols: 0 },
      { time: 'Liverpool', periodo: '2018-Atual', jogos: 256, gols: 0 },
    ],
    noticias: [
      { titulo: 'Alisson defende pênalti crucial pelo Liverpool', data: '10/09/2026' },
      { titulo: 'Alisson é convocado para a Seleção Brasileira', data: '08/09/2026' },
      { titulo: 'Liverpool vence com atuação de Alisson', data: '05/09/2026' },
    ],
  },
  {
    id: 'thiago-silva',
    slug: 'thiago-silva',
    nome: 'Thiago Silva',
    nomeCompleto: 'Thiago Emiliano da Silva',
    posicao: 'Zagueiro',
    timeAtual: 'Fluminense',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/fluminense/logo-fluminense-2048.png',
    descricao: 'Thiago Silva é um dos zagueiros mais inteligentes da história. Sua leitura de jogo, posicionamento e liderança o tornam um jogador único.',
    estatisticas: {
      gols: 42,
      assistencias: 14,
      jogos: 665,
      titulos: ['Champions League', 'Ligue 1', 'Copa da França', 'Copa do Brasil', 'Libertadores'],
    },
    carreira: [
      { time: 'Fluminense', periodo: '2006-2009', jogos: 130, gols: 8 },
      { time: 'Milan', periodo: '2009-2012', jogos: 93, gols: 6 },
      { time: 'Paris Saint-Germain', periodo: '2012-2020', jogos: 315, gols: 24 },
      { time: 'Chelsea', periodo: '2020-2024', jogos: 112, gols: 2 },
      { time: 'Fluminense', periodo: '2024-Atual', jogos: 15, gols: 2 },
    ],
    noticias: [
      { titulo: 'Thiago Silva retorna ao Fluminense', data: '10/09/2026' },
      { titulo: 'Thiago Silva é convocado para a Seleção Brasileira', data: '08/09/2026' },
      { titulo: 'Fluminense vence com atuação de Thiago Silva', data: '05/09/2026' },
    ],
  },
  {
    id: 'raphinha',
    slug: 'raphinha',
    nome: 'Raphinha',
    nomeCompleto: 'Raphael Dias Belloli',
    posicao: 'Atacante',
    timeAtual: 'Barcelona',
    selecao: 'Brasil',
    foto: 'https://logodetimes.com/times/barcelona/logo-barcelona-2048.png',
    descricao: 'Raphinha é um atacante brasileiro que se consolidou no futebol europeu. Velocidade, dribles e gols são suas marcas registradas. Em 2026, é titular absoluto do Barcelona.',
    estatisticas: {
      gols: 90,
      assistencias: 68,
      jogos: 295,
      titulos: ['La Liga', 'Copa da Espanha', 'Supercopa da Espanha'],
    },
    carreira: [
      { time: 'Vitória', periodo: '2015-2016', jogos: 45, gols: 12 },
      { time: 'Gimnasia', periodo: '2016-2017', jogos: 25, gols: 5 },
      { time: 'Sporting CP', periodo: '2017-2019', jogos: 68, gols: 18 },
      { time: 'Rennes', periodo: '2019-2020', jogos: 36, gols: 8 },
      { time: 'Leeds United', periodo: '2020-2022', jogos: 67, gols: 17 },
      { time: 'Barcelona', periodo: '2022-Atual', jogos: 54, gols: 30 },
    ],
    noticias: [
      { titulo: 'Raphinha brilha na La Liga pelo Barcelona', data: '10/09/2026' },
      { titulo: 'Raphinha é convocado para a Seleção Brasileira', data: '08/09/2026' },
      { titulo: 'Barcelona vence com gol de Raphinha', data: '05/09/2026' },
    ],
  },
];

export function getJogador(slug: string): Jogador | undefined {
  return jogadores.find((j) => j.slug === slug);
}
