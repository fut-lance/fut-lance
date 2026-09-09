import CardNoticia from '@/components/CardNoticia';
import { getNoticiasByCategoria } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const nomeFormatado = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `Notícias de ${nomeFormatado}`,
    description: `Todas as notícias de ${nomeFormatado}. Fique por dentro do que acontece no ${nomeFormatado}.`,
    keywords: `${nomeFormatado.toLowerCase()}, futebol, notícias`,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
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
              slug={noticia.documentId}
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
