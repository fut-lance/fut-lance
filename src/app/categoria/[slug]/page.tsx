import CardNoticia from '@/components/CardNoticia';
import { getNoticiasByCategoria } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const categorySeoData: Record<string, { title: string; description: string; keywords: string }> = {
  'brasileirao': {
    title: 'Brasileirão — Notícias, Jogos e Futebol ao Vivo | Fut-Lance',
    description: 'Todas as notícias do Brasileirão Série A 2026. Classificação, resultados, jogos, transferências e cobertura completa do campeonato brasileiro.',
    keywords: 'brasileirão, brasileirão série a, campeonato brasileiro, futebol brasileiro, notícias brasileirão, classificação brasileirão, jogos brasileirão',
  },
  'libertadores': {
    title: 'Libertadores — Notícias, Jogos e Futebol ao Vivo | Fut-Lance',
    description: 'Cobertura completa da Copa Libertadores 2026. Notícias, resultados, classificação, confrontos e jogos ao vivo dos clubes brasileiros.',
    keywords: 'libertadores, copa libertadores, libertadores 2026, futebol sul-americano, notícias libertadores, jogos libertadores',
  },
  'champions-league': {
    title: 'Champions League — Notícias, Jogos e Futebol ao Vivo | Fut-Lance',
    description: 'Todas as notícias da UEFA Champions League 2026/27. Resultados, classificação, confrontos e cobertura completa da Liga dos Campeões.',
    keywords: 'champions league, liga dos campeões, uefa champions league, futebol europeu, notícias champions league',
  },
  'transferencias': {
    title: 'Mercado da Bola e Transferências | Fut-Lance',
    description: 'Fique por dentro de todas as transferências do futebol brasileiro e internacional. Rumores, confirmadas e negociações do mercado da bola.',
    keywords: 'transferências, mercado da bola, contratações, futebol, negociações, reforços',
  },
  'selecao': {
    title: 'Seleção Brasileira — Notícias e Jogos | Fut-Lance',
    description: 'Todas as notícias da Seleção Brasileira de Futebol. Convocações, jogos, eliminatórias e cobertura completa da Amarelinha.',
    keywords: 'seleção brasileira, seleção, canarinho, hexa, eliminarórias, jogos seleção',
  },
  'copa-do-brasil': {
    title: 'Copa do Brasil — Notícias e Jogos | Fut-Lance',
    description: 'Cobertura completa da Copa do Brasil 2026. Resultados, confrontos, classificação e notícias do torneio nacional.',
    keywords: 'copa do brasil, copa do brasil 2026, futebol, notícias copa do brasil',
  },
  'premier-league': {
    title: 'Premier League — Notícias e Futebol | Fut-Lance',
    description: 'Todas as notícias da Premier League inglesa. Resultados, classificação, transferências e cobertura do futebol inglês.',
    keywords: 'premier league, futebol inglês, liga inglesa, notícias premier league',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const seoData = categorySeoData[params.slug];
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
  let noticias: any[] = [];
  let categoriaNome = params.slug.replace(/-/g, ' ').toUpperCase();
  let categoriaDescricao = 'Notícias desta categoria.';

  try {
    const data = await getNoticiasByCategoria(params.slug);
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

  const icon = categoriaIcons[params.slug] || '📰';

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
    </div>
  );
}
