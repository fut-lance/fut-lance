import CardNoticia from '@/components/CardNoticia';

const todasNoticias = [
  {
    slug: 'flamengo-derrota-palmeiras',
    titulo: 'Flamengo goleia Palmeiras e assume liderança do Brasileirão',
    resumo: 'Com gols de Pedro, Gabigol e Arrascaeta, o Mengo venceu por 3 a 0 e abriu 5 pontos de vantagem no campeonato.',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    categoria: 'Brasileirão',
    data: '07/09/2026',
  },
  {
    slug: 'neymar-retorna-selecao',
    titulo: 'Neymar é convocado para eliminatórias da Copa',
    resumo: 'Tite convoca Neymar para os jogos contra Argentina e Uruguai nas eliminatórias sul-americanas.',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    categoria: 'Seleção',
    data: '07/09/2026',
  },
  {
    slug: 'libertadores-semifinal',
    titulo: 'Definidas as semifinais da Libertadores',
    resumo: 'Botafogo, Flamengo, River Plate e Boca Juniors disputam as vagas na grande final.',
    imagem: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=800',
    categoria: 'Libertadores',
    data: '06/09/2026',
  },
  {
    slug: 'mancity-contrata-midfielder',
    titulo: 'Manchester City fecha contratação de meio-campista francês',
    resumo: 'Clube inglês paga R$ 350 milhões pelo talento do Monaco.',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    categoria: 'Transferências',
    data: '06/09/2026',
  },
  {
    slug: 'brasileirao-serie-b',
    titulo: 'Série B: Coritiba e Santos brigam pelo acesso',
    resumo: 'A disputa rondomata do acesso ao Premier League brasileiro está acirrada.',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    categoria: 'Brasileirão',
    data: '06/09/2026',
  },
  {
    slug: 'premier-league-rodada',
    titulo: 'Premier League: Liverpool goleia Manchester United',
    resumo: 'Salah faz hat-trick na vitória por 4 a 0 no Old Trafford.',
    imagem: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=800',
    categoria: 'Premier League',
    data: '05/09/2026',
  },
  {
    slug: 'copa-do-brasil',
    titulo: 'Copa do Brasil: Atlético-MG elimina São Paulo',
    resumo: 'Galo vence nos pênaltis e avança para semifinal.',
    imagem: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    categoria: 'Copa do Brasil',
    data: '05/09/2026',
  },
  {
    slug: 'champions-league-grupo',
    titulo: 'Champions League: Real Madrid lidera grupo difícil',
    resumo: 'Merengues vencem Bayern e assumem liderança do Grupo A.',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    categoria: 'Champions League',
    data: '04/09/2026',
  },
];

export default function NoticiasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        📰 Todas as Notícias
      </h1>
      <p className="text-gray-400 mb-8">
        Fique por dentro de tudo que acontece no mundo do futebol.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {todasNoticias.map((noticia) => (
          <CardNoticia key={noticia.slug} {...noticia} />
        ))}
      </div>
    </div>
  );
}
