export interface Time {
  nome: string;
  slug: string;
  cidade: string;
  estado: string;
  fundacao: string;
  estadio: string;
  capacidade: string;
  cores: string;
  mascote: string;
  presidente: string;
  tecnico: string;
  descricao: string;
  titulos: {
    brasileirao: number;
    copaDoBrasil: number;
    libertadores: number;
    copaDoMundo: number;
  };
  elenco: {
    posicao: string;
    jogadores: string[];
  }[];
  proximosJogos: {
    data: string;
    horario: string;
    adversario: string;
    competicao: string;
    local: string;
  }[];
}

export const times: Record<string, Time> = {
  flamengo: {
    nome: 'Flamengo',
    slug: 'flamengo',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    fundacao: '17/11/1895',
    estadio: 'Maracanã',
    capacidade: '78.838',
    cores: 'Vermelho e Preto',
    mascote: 'Urubu',
    presidente: 'Rodolfo Landim',
    tecnico: 'Filipe Luís',
    descricao: 'Clube de Regatas do Flamengo é o maior clube do Brasil em número de torcedores. Fundado em 1895, se tornou referência no futebol brasileiro com títulos nacionais e internacionais. Em 2026, o Flamengo lidera o Brasileirão e é favorito na Libertadores.',
    titulos: {
      brasileirao: 8,
      copaDoBrasil: 5,
      libertadores: 3,
      copaDoMundo: 1,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Rossi', 'Cássio', 'Matheus Cunha'] },
      { posicao: 'Laterais', jogadores: ['Varela', 'Marcelo', 'Lucas'] },
      { posicao: 'Zagueiros', jogadores: ['David Luiz', 'Léo Ortiz', 'Fabrício Bruno'] },
      { posicao: 'Volantes', jogadores: ['Erick Pulgar', 'Allan', 'Victor'] },
      { posicao: 'Meias', jogadores: ['Everton Ribeiro', 'Giorgian De Arrascaeta', 'Cebolinha'] },
      { posicao: 'Atacantes', jogadores: ['Gabriel Barbosa', 'Pedro', 'Everton Cebolinha'] },
    ],
    proximosJogos: [
      { data: '16/09/2026', horario: '19:00', adversario: 'Palmeiras', competicao: 'Libertadores', local: 'Fora' },
      { data: '23/09/2026', horario: '19:00', adversario: 'Palmeiras', competicao: 'Libertadores', local: 'Casa' },
    ],
  },
  palmeiras: {
    nome: 'Palmeiras',
    slug: 'palmeiras',
    cidade: 'São Paulo',
    estado: 'SP',
    fundacao: '26/08/1914',
    estadio: 'Allianz Parque',
    capacidade: '43.713',
    cores: 'Verde e Branco',
    mascote: 'Porco',
    presidente: 'Leila Pereira',
    tecnico: 'Abel Ferreira',
    descricao: 'Sociedade Esportiva Palmeiras é um dos maiores clubes do Brasil. Fundado em 1914, é o maior campeão brasileiro com 12 títulos. Em 2026, o Palmeiras mantém seu padrão de excelência e争na títulos nacionais e internacionais.',
    titulos: {
      brasileirao: 12,
      copaDoBrasil: 4,
      libertadores: 3,
      copaDoMundo: 2,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Weverton', 'Marcelo Lomba'] },
      { posicao: 'Laterais', jogadores: ['Jhon Juan', 'Piquerez', 'Mayke'] },
      { posicao: 'Zagueiros', jogadores: ['Gustavo Gómez', 'Murilo', 'Luan'] },
      { posicao: 'Volantes', jogadores: ['Zé Rafael', 'Fabinho', 'Jailson'] },
      { posicao: 'Meias', jogadores: ['Raphael Veiga', 'Jhon Jhon', 'Dudu'] },
      { posicao: 'Atacantes', jogadores: ['Rony', 'Flaco López', 'Endrick'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '18:30', adversario: 'São Paulo', competicao: 'Brasileirão', local: 'Casa' },
      { data: '16/09/2026', horario: '19:00', adversario: 'Flamengo', competicao: 'Libertadores', local: 'Casa' },
    ],
  },
  corinthians: {
    nome: 'Corinthians',
    slug: 'corinthians',
    cidade: 'São Paulo',
    estado: 'SP',
    fundacao: '01/09/1910',
    estadio: 'Neo Química Arena',
    capacidade: '49.205',
    cores: 'Preto e Branco',
    mascote: 'Fiel',
    presidente: 'Duílio Monteiro Alves',
    tecnico: 'António Oliveira',
    descricao: 'Sport Club Corinthians Paulista é um dos clubes mais populares do Brasil. Fundado em 1910, possui uma torcida apaixonada e fiel. Em 2026, o Corinthians争na a Libertadores e o Brasileirão com um elenco promissor.',
    titulos: {
      brasileirao: 7,
      copaDoBrasil: 3,
      libertadores: 1,
      copaDoMundo: 2,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Cássio', 'Carlos Miguel'] },
      { posicao: 'Laterais', jogadores: ['Fagner', 'Matheuzinho'] },
      { posicao: 'Zagueiros', jogadores: ['Gil', 'Cacá'] },
      { posicao: 'Volantes', jogadores: ['Ralf', 'Xavier'] },
      { posicao: 'Meias', jogadores: ['Paulinho', 'Maycon'] },
      { posicao: 'Atacantes', jogadores: ['Yuri Alberto', 'Roger Guedes'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '19:30', adversario: 'Chapecoense', competicao: 'Brasileirão', local: 'Casa' },
    ],
  },
  'sao-paulo': {
    nome: 'São Paulo',
    slug: 'sao-paulo',
    cidade: 'São Paulo',
    estado: 'SP',
    fundacao: '25/01/1930',
    estadio: 'Morumbis',
    capacidade: '72.039',
    cores: 'Vermelho, Preto e Branco',
    mascote: 'Tricolor',
    presidente: 'Júlio Casares',
    tecnico: 'Luis Zubeldía',
    descricao: 'São Paulo Futebol Clube é um dos clubes mais vitoriosos do Brasil. Fundado em 1930, possui 3 mundiais, 6 brasileiros e 1 copa do brasil. Em 2026, o São Paulo争na o Brasileirão com um elenco equilibrado.',
    titulos: {
      brasileirao: 6,
      copaDoBrasil: 1,
      libertadores: 3,
      copaDoMundo: 3,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Felipe Alves', 'Jandrei'] },
      { posicao: 'Laterais', jogadores: ['Rafinha', 'Reinaldo'] },
      { posicao: 'Zagueiros', jogadores: ['Arboleda', 'Miranda'] },
      { posicao: 'Volantes', jogadores: ['Liziero', 'Hugo'] },
      { posicao: 'Meias', jogadores: ['Pablo Maia', 'Nestor'] },
      { posicao: 'Atacantes', jogadores: ['Calleri', 'Eder', 'Nikão'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '18:30', adversario: 'Palmeiras', competicao: 'Brasileirão', local: 'Fora' },
    ],
  },
  santos: {
    nome: 'Santos',
    slug: 'santos',
    cidade: 'Santos',
    estado: 'SP',
    fundacao: '14/04/1912',
    estadio: 'Vila Belmiro',
    capacidade: '16.068',
    cores: 'Preto e Branco',
    mascote: 'Peixe',
    presidente: 'Marcelo Teixeira',
    tecnico: 'Cuca',
    descricao: 'Santos Futebol Clube é um dos clubes mais tradicionais do Brasil. Fundado em 1912, é o maior campeão paulista e possui 3 libertadores. Em 2026, o Santos争na o Brasileirão e a Copa do Brasil.',
    titulos: {
      brasileirao: 8,
      copaDoBrasil: 1,
      libertadores: 3,
      copaDoMundo: 2,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['João Paulo', 'John'] },
      { posicao: 'Laterais', jogadores: ['Madson', 'Dodô'] },
      { posicao: 'Zagueiros', jogadores: ['Lucas Veríssimo', 'Luan Peres'] },
      { posicao: 'Volantes', jogadores: ['Bruno Henrique', 'Sandry'] },
      { posicao: 'Meias', jogadores: ['Carlos Sánchez', 'Guillermo'] },
      { posicao: 'Atacantes', jogadores: ['Neymar', 'Marinho', 'Raniel'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '21:00', adversario: 'Cruzeiro', competicao: 'Brasileirão', local: 'Casa' },
    ],
  },
  vasco: {
    nome: 'Vasco da Gama',
    slug: 'vasco',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    fundacao: '21/08/1898',
    estadio: 'São Januário',
    capacidade: '21.880',
    cores: 'Preto e Branco',
    mascote: 'Gigante da Colina',
    presidente: 'Pedrinho',
    tecnico: 'Pedro Emanuel',
    descricao: 'Club de Regatas Vasco da Gama é um dos clubes mais tradicionais do Brasil. Fundado em 1898, possui uma torcida fiel e histórica. Em 2026, o Vasco争na o Brasileirão e busca melhores posições.',
    titulos: {
      brasileirao: 4,
      copaDoBrasil: 1,
      libertadores: 1,
      copaDoMundo: 0,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Léo Jardim', 'Alexandre'] },
      { posicao: 'Laterais', jogadores: ['Puma', 'Maicon'] },
      { posicao: 'Zagueiros', jogadores: ['Léo', 'Igor Diniz'] },
      { posicao: 'Volantes', jogadores: ['Jair', 'Raul'] },
      { posicao: 'Meias', jogadores: ['Nenê', 'Pedrinho'] },
      { posicao: 'Atacantes', jogadores: ['Vegetti', 'Ribeiro'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '16:00', adversario: 'Grêmio', competicao: 'Brasileirão', local: 'Fora' },
    ],
  },
  botafogo: {
    nome: 'Botafogo',
    slug: 'botafogo',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    fundacao: '12/08/1904',
    estadio: 'Nilton Santos',
    capacidade: '46.931',
    cores: 'Preto e Branco',
    mascote: 'Glorioso',
    presidente: 'John Textor',
    tecnico: 'Bruno Lage',
    descricao: 'Botafogo de Futebol e Regatas é um dos clubes mais tradicionais do Brasil. Fundado em 1904, possui uma torcida apaixonada. Em 2026, o Botafogo争na o Brasileirão e é destaque na Libertadores.',
    titulos: {
      brasileirao: 2,
      copaDoBrasil: 0,
      libertadores: 0,
      copaDoMundo: 0,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Gabriel Batista', 'Raul'] },
      { posicao: 'Laterais', jogadores: ['Saravia', 'Pontes'] },
      { posicao: 'Zagueiros', jogadores: ['Bastos', 'Adryelson'] },
      { posicao: 'Volantes', jogadores: ['Danilo', 'Tchê Tchê'] },
      { posicao: 'Meias', jogadores: ['Lucas Fernandes', 'Victor Sá'] },
      { posicao: 'Atacantes', jogadores: ['Carlos Alberto', 'Júnior Santos'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '20:30', adversario: 'Bragantino', competicao: 'Brasileirão', local: 'Casa' },
    ],
  },
  fluminense: {
    nome: 'Fluminense',
    slug: 'fluminense',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    fundacao: '26/07/1902',
    estadio: 'Maracanã',
    capacidade: '78.838',
    cores: 'Grená, Verde e Branco',
    mascote: 'Flu',
    presidente: 'Mario Bittencourt',
    tecnico: 'Renato Gaúcho',
    descricao: 'Fluminense Football Club é um dos clubes mais elegantes do Brasil. Fundado em 1902, possui uma torcida tradicional. Em 2026, o Fluminense争na o Brasileirão com um elenco renovado.',
    titulos: {
      brasileirao: 4,
      copaDoBrasil: 1,
      libertadores: 1,
      copaDoMundo: 0,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Fábio', 'Pedro Rangel'] },
      { posicao: 'Laterais', jogadores: ['Marcelo', 'Calegari'] },
      { posicao: 'Zagueiros', jogadores: ['Nino', 'Felipe Melo'] },
      { posicao: 'Volantes', jogadores: ['André', 'Martinelli'] },
      { posicao: 'Meias', jogadores: ['Ganso', 'Arias'] },
      { posicao: 'Atacantes', jogadores: ['Cano', 'Alexander'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '16:00', adversario: 'Atlético-MG', competicao: 'Brasileirão', local: 'Fora' },
    ],
  },
  internacional: {
    nome: 'Internacional',
    slug: 'internacional',
    cidade: 'Porto Alegre',
    estado: 'RS',
    fundacao: '04/07/1909',
    estadio: 'Beira-Rio',
    capacidade: '50.842',
    cores: 'Vermelho, Branco e Preto',
    mascote: 'Guriazão',
    presidente: 'Alexandre Barcellos',
    tecnico: 'Roger Machado',
    descricao: 'Sport Club Internacional é um dos clubes mais vitoriosos do Sul do Brasil. Fundado em 1909, possui 3 títulos da Libertadores. Em 2026, o Inter争na o Brasileirão e a Copa do Brasil.',
    titulos: {
      brasileirao: 3,
      copaDoBrasil: 1,
      libertadores: 3,
      copaDoMundo: 1,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Daniel', 'Keiller'] },
      { posicao: 'Laterais', jogadores: ['Saravia', 'Bustos'] },
      { posicao: 'Zagueiros', jogadores: ['Cuesta', 'Mercado'] },
      { posicao: 'Volantes', jogadores: ['Benedetto', 'Charles'] },
      { posicao: 'Meias', jogadores: ['Alan Patrick', "D'Arruda"] },
      { posicao: 'Atacantes', jogadores: ['Borré', 'Luiz Adriano'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '17:00', adversario: 'Chapecoense', competicao: 'Brasileirão', local: 'Fora' },
    ],
  },
  gremio: {
    nome: 'Grêmio',
    slug: 'gremio',
    cidade: 'Porto Alegre',
    estado: 'RS',
    fundacao: '15/09/1903',
    estadio: 'Arena do Grêmio',
    capacidade: '60.540',
    cores: 'Azul, Preto e Branco',
    mascote: 'Imortal',
    presidente: 'Alberto Guerra',
    tecnico: 'Mano Menezes',
    descricao: 'Grêmio Foot-Ball Porto Alegrense é um dos clubes mais tradicionais do Brasil. Fundado em 1903, possui 3 títulos da Libertadores. Em 2026, o Grêmio争na o Brasileirão com um elenco competitivo.',
    titulos: {
      brasileirao: 3,
      copaDoBrasil: 5,
      libertadores: 3,
      copaDoMundo: 1,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Marchesín', 'Adriel'] },
      { posicao: 'Laterais', jogadores: ['Ferreira', 'Reinaldo'] },
      { posicao: 'Zagueiros', jogadores: ['Kannemann', 'Geromel'] },
      { posicao: 'Volantes', jogadores: ['Maicon', 'Thiago Santos'] },
      { posicao: 'Meias', jogadores: ['Bitello', 'Villasanti'] },
      { posicao: 'Atacantes', jogadores: ['Grenal', 'Luis Suárez'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '16:00', adversario: 'Vasco', competicao: 'Brasileirão', local: 'Casa' },
    ],
  },
  cruzeiro: {
    nome: 'Cruzeiro',
    slug: 'cruzeiro',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    fundacao: '02/01/1921',
    estadio: 'Mineirão',
    capacidade: '58.170',
    cores: 'Azul e Branco',
    mascote: 'Raposa',
    presidente: 'Sérgio Santos Rodrigues',
    tecnico: 'Fernando Diniz',
    descricao: 'Cruzeiro Esporte Clube é um dos clubes mais vitoriosos de Minas Gerais. Fundado em 1921, possui 4 títulos brasileiros. Em 2026, o Cruzeiro争na o Brasileirão com um elenco renovado.',
    titulos: {
      brasileirao: 4,
      copaDoBrasil: 6,
      libertadores: 2,
      copaDoMundo: 0,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Cássio', 'Rafael'] },
      { posicao: 'Laterais', jogadores: ['Wesley', 'Marquinhos'] },
      { posicao: 'Zagueiros', jogadores: ['Murilo', 'Heleno'] },
      { posicao: 'Volantes', jogadores: ['Julio', 'Filipe'] },
      { posicao: 'Meias', jogadores: ['Nikão', 'Machado'] },
      { posicao: 'Atacantes', jogadores: ['Rafael Sobis', 'Edu'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '21:00', adversario: 'Santos', competicao: 'Brasileirão', local: 'Fora' },
    ],
  },
  'atletico-mg': {
    nome: 'Atlético-MG',
    slug: 'atletico-mg',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    fundacao: '26/03/1908',
    estadio: 'Arena Independência',
    capacidade: '23.018',
    cores: 'Preto e Branco',
    mascote: 'Galo',
    presidente: 'Sérgio Coelho',
    tecnico: 'Eduardo Coudet',
    descricao: 'Clube Atlético Mineiro é um dos clubes mais tradicionais de Minas Gerais. Fundado em 1908, possui 2 títulos brasileiros. Em 2026, o Atlético-MG争na o Brasileirão e a Copa do Brasil.',
    titulos: {
      brasileirao: 2,
      copaDoBrasil: 2,
      libertadores: 1,
      copaDoMundo: 0,
    },
    elenco: [
      { posicao: 'Goleiros', jogadores: ['Everson', 'Matheus Mendes'] },
      { posicao: 'Laterais', jogadores: ['Saravia', 'Cairo'] },
      { posicao: 'Zagueiros', jogadores: ['Junior Alonso', 'Benítez'] },
      { posicao: 'Volantes', jogadores: ['Allan', 'Jair'] },
      { posicao: 'Meias', jogadores: ['Zaracho', 'Vargas'] },
      { posicao: 'Atacantes', jogadores: ['Hulk', 'Pedro Raúl'] },
    ],
    proximosJogos: [
      { data: '12/09/2026', horario: '16:00', adversario: 'Fluminense', competicao: 'Brasileirão', local: 'Casa' },
    ],
  },
};

export function getTime(slug: string): Time | undefined {
  return times[slug];
}

export function getAllTimes(): Time[] {
  return Object.values(times);
}
