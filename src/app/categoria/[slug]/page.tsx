import CardNoticia from '@/components/CardNoticia';
import { getNoticiasByCategoria } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const categorySeoData: Record<string, { title: string; description: string; keywords: string }> = {
  'brasileirao': {
    title: 'Brasileirão Ao Vivo — Notícias, Jogos e Classificação | Fut-Lance',
    description: 'Acompanhe o Brasileirão ao vivo: notícias, jogos do dia, classificação atualizada, resultados e tudo sobre o Campeonato Brasileiro Série A 2026.',
    keywords: 'brasileirão ao vivo, brasileirão série a, campeonato brasileiro, futebol brasileiro, jogos brasileirão, classificação brasileirão, resultados brasileirão',
  },
  'libertadores': {
    title: 'Libertadores Ao Vivo — Notícias, Jogos e Confrontos | Fut-Lance',
    description: 'Copa Libertadores ao vivo: notícias, jogos, resultados, confrontos e cobertura completa dos clubes brasileiros na Libertadores 2026.',
    keywords: 'libertadores ao vivo, copa libertadores, libertadores 2026, jogos libertadores, resultados libertadores, futebol sul-americano',
  },
  'champions-league': {
    title: 'Champions League Ao Vivo — Notícias, Jogos e Resultados | Fut-Lance',
    description: 'UEFA Champions League ao vivo: notícias, jogos, resultados, classificação e cobertura completa da Liga dos Campeões 2026/27.',
    keywords: 'champions league ao vivo, liga dos campeões, uefa champions league, jogos champions league, resultados champions league, futebol europeu',
  },
  'transferencias': {
    title: 'Transferências e Mercado da Bola | Fut-Lance',
    description: 'Fique por dentro de todas as transferências do futebol brasileiro e internacional. Rumores, contratações confirmadas e negociações do mercado da bola.',
    keywords: 'transferências, mercado da bola, contratações, futebol, negociações, reforços, rumores transferências',
  },
  'selecao': {
    title: 'Seleção Brasileira — Notícias, Convocações e Jogos | Fut-Lance',
    description: 'Todas as notícias da Seleção Brasileira: convocações, jogos ao vivo, eliminatórias, resultados e cobertura completa da Amarelinha.',
    keywords: 'seleção brasileira, seleção, canarinho, hexa, eliminarórias, jogos seleção, convocações seleção',
  },
  'copa-do-brasil': {
    title: 'Copa do Brasil Ao Vivo — Notícias, Jogos e Resultados | Fut-Lance',
    description: 'Copa do Brasil ao vivo: notícias, jogos, resultados, confrontos e cobertura completa do torneio por eliminação do futebol brasileiro.',
    keywords: 'copa do brasil ao vivo, copa do brasil 2026, jogos copa do brasil, resultados copa do brasil, futebol brasileiro',
  },
  'premier-league': {
    title: 'Premier League Ao Vivo — Notícias, Jogos e Resultados | Fut-Lance',
    description: 'Premier League ao vivo: notícias, jogos, resultados, classificação e cobertura completa do Campeonato Inglês.',
    keywords: 'premier league ao vivo, futebol inglês, liga inglesa, jogos premier league, resultados premier league',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  const slugNormalizado = normalize(params.slug);
  const seoData = categorySeoData[slugNormalizado];
  const nomeFormatado = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: seoData?.title || `${nomeFormatado} — Notícias de Futebol | Fut-Lance`,
    description: seoData?.description || `Todas as notícias de ${nomeFormatado}. Fique por dentro do que acontece no ${nomeFormatado}.`,
    keywords: seoData?.keywords || `${nomeFormatado.toLowerCase()}, futebol, notícias`,
    openGraph: {
      title: seoData?.title || `${nomeFormatado} — Notícias de Futebol | Fut-Lance`,
      description: seoData?.description || `Todas as notícias de ${nomeFormatado}.`,
      url: `https://fut-lance.vercel.app/categoria/${params.slug}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData?.title || `${nomeFormatado} — Notícias de Futebol | Fut-Lance`,
      description: seoData?.description || `Todas as notícias de ${nomeFormatado}.`,
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/categoria/${params.slug}`,
    },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  const slugNormalizado = normalize(params.slug);

  let noticias: any[] = [];
  let categoriaNome = params.slug.replace(/-/g, ' ').toUpperCase();
  let categoriaDescricao = 'Notícias desta categoria.';

  try {
    const data = await getNoticiasByCategoria(slugNormalizado);
    noticias = data?.data || [];

    if (noticias.length > 0 && noticias[0].categoria) {
      categoriaNome = noticias[0].categoria.nome || categoriaNome;
      categoriaDescricao = noticias[0].categoria.descricao || categoriaDescricao;
    }
  } catch (error) {
    console.error('Erro ao buscar notícias por categoria:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const categoriaIcons: Record<string, string> = {
    'brasileirao': '🏆',
    'libertadores': '🌎',
    'champions-league': '⭐',
    'transferencias': '💰',
    'premier-league': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'selecao': '🇧🇷',
    'copa-do-brasil': '🏆',
    'flamengo': '🔴⚫',
    'palmeiras': '🟢🟢',
    'corinthians': '⚫⚪',
    'sao-paulo': '🔴⚪⚫',
  };

  const icon = categoriaIcons[slugNormalizado] || '📰';

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoriaNome} - Notícias de Futebol`,
    description: categoriaDescricao,
    url: `https://fut-lance.vercel.app/categoria/${params.slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'FUT LANCE',
      url: 'https://fut-lance.vercel.app',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: categoriaNome, item: `https://fut-lance.vercel.app/categoria/${params.slug}` },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300">{categoriaNome}</span>
      </nav>

      <div className="mb-8">
        <span className="text-5xl mb-4 block">{icon}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{categoriaNome}</h1>
        <p className="text-gray-400">{categoriaDescricao}</p>
        {slugNormalizado === 'brasileirao' && (
          <Link href="/campeonatos/brasileirao" className="inline-flex items-center gap-2 mt-3 bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
            📊 Ver classificação do Brasileirão
          </Link>
        )}
        {slugNormalizado === 'libertadores' && (
          <Link href="/campeonatos/libertadores" className="inline-flex items-center gap-2 mt-3 bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
            📊 Ver informações da Libertadores
          </Link>
        )}
        {slugNormalizado === 'champions-league' && (
          <Link href="/campeonatos/champions-league" className="inline-flex items-center gap-2 mt-3 bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
            📊 Ver informações da Champions League
          </Link>
        )}
      </div>

      {noticias.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia: any) => (
            <CardNoticia
              key={noticia.id}
              slug={noticia.slug}
              titulo={noticia.titulo}
              resumo={noticia.resumo}
              imagem={noticia.imagem_url || (noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800')}
              categoria={noticia.categoria?.nome || 'Geral'}
              data={noticia.data_publicacao}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">{icon}</span>
          <p className="text-gray-400 text-lg">
            Nenhuma notícia encontrada nesta categoria.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-fut-green hover:text-green-400 font-semibold mt-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para a página inicial
          </Link>
        </div>
      )}

      {/* Links para partidas e ao vivo */}
      <div className="mt-10 bg-fut-darker rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Acompanhe ao Vivo</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/ao-vivo" className="bg-fut-accent hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
            ⚽ Futebol Ao Vivo
          </Link>
          <Link href={`/campeonatos/${params.slug}`} className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
            📊 Classificação e Detalhes
          </Link>
          <Link href="/onde-assistir" className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
            📺 Onde Assistir
          </Link>
        </div>
      </div>
    </div>
  );
}
