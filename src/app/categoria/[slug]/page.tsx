import CardNoticia from '@/components/CardNoticia';

const noticiasPorCategoria: Record<string, any[]> = {
  brasileirao: [
    {
      slug: 'flamengo-derrota-palmeiras',
      titulo: 'Flamengo goleia Palmeiras e assume liderança do Brasileirão',
      resumo: 'Com gols de Pedro, Gabigol e Arrascaeta, o Mengo venceu por 3 a 0.',
      imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
      categoria: 'Brasileirão',
      data: '07/09/2026',
    },
    {
      slug: 'brasileirao-serie-b',
      titulo: 'Série B: Coritiba e Santos brigam pelo acesso',
      resumo: 'A disputa pelo acesso está acirrada com 5 times na briga.',
      imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      categoria: 'Brasileirão',
      data: '06/09/2026',
    },
  ],
  libertadores: [
    {
      slug: 'libertadores-semifinal',
      titulo: 'Definidas as semifinais da Libertadores',
      resumo: 'Botafogo, Flamengo, River Plate e Boca Juniors na briga.',
      imagem: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=800',
      categoria: 'Libertadores',
      data: '06/09/2026',
    },
  ],
  'champions-league': [
    {
      slug: 'champions-league-grupo',
      titulo: 'Champions League: Real Madrid lidera grupo difícil',
      resumo: 'Merengues vencem Bayern e assumem liderança do Grupo A.',
      imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
      categoria: 'Champions League',
      data: '04/09/2026',
    },
  ],
  transferencias: [
    {
      slug: 'mancity-contrata-midfielder',
      titulo: 'Manchester City fecha contratação de meio-campista francês',
      resumo: 'Clube inglês paga R$ 350 milhões pelo talento do Monaco.',
      imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
      categoria: 'Transferências',
      data: '06/09/2026',
    },
  ],
};

const categoriasInfo: Record<string, { nome: string; descricao: string; icon: string }> = {
  brasileirao: {
    nome: 'Brasileirão',
    descricao: 'Todas as notícias do Campeonato Brasileiro Série A e B.',
    icon: '🏆',
  },
  libertadores: {
    nome: 'Libertadores',
    descricao: 'Cobertura completa da CONMEBOL Libertadores.',
    icon: '🌎',
  },
  'champions-league': {
    nome: 'Champions League',
    descricao: 'Notícias da principal competição europeia.',
    icon: '⭐',
  },
  transferencias: {
    nome: 'Transferências',
    descricao: 'Tudo sobre o mercado de transferências do futebol.',
    icon: '💰',
  },
};

export default async function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  const categoria = categoriasInfo[params.slug] || {
    nome: params.slug.replace(/-/g, ' ').toUpperCase(),
    descricao: 'Notícias desta categoria.',
    icon: '📰',
  };

  const noticias = noticiasPorCategoria[params.slug] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-5xl mb-4 block">{categoria.icon}</span>
        <h1 className="text-4xl font-bold text-white mb-2">{categoria.nome}</h1>
        <p className="text-gray-400">{categoria.descricao}</p>
      </div>

      {noticias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia: any) => (
            <CardNoticia key={noticia.slug} {...noticia} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            Nenhuma notícia encontrada nesta categoria.
          </p>
        </div>
      )}
    </div>
  );
}
