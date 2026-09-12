import CardNoticia from '@/components/CardNoticia';
import { getNoticias } from '@/lib/api';
import { Metadata } from 'next';
import Script from 'next/script';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Todas as Notícias de Futebol',
  description: 'Confira todas as últimas notícias de futebol do Brasil e do mundo. Brasileirão, Libertadores, Champions League, transferências e muito mais.',
  keywords: 'notícias de futebol, brasileirão, libertadores, champions league, transferências, mercado da bola',
  alternates: {
    canonical: 'https://fut-lance.vercel.app/noticias',
  },
  openGraph: {
    title: 'Todas as Notícias de Futebol | FUT LANCE',
    description: 'Confira todas as últimas notícias de futebol do Brasil e do mundo.',
    url: 'https://fut-lance.vercel.app/noticias',
    images: [{ url: 'https://fut-lance.vercel.app/og-image.png', width: 1200, height: 630, alt: 'Notícias de Futebol - FUT LANCE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todas as Notícias de Futebol | FUT LANCE',
    description: 'Confira todas as últimas notícias de futebol do Brasil e do mundo.',
    images: ['https://fut-lance.vercel.app/og-image.png'],
  },
};

export default async function NoticiasPage() {
  let noticias: any[] = [];

  try {
    const data = await getNoticias(1, 100);
    noticias = data?.data || [];
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Todas as Notícias de Futebol',
    description: 'Confira todas as últimas notícias de futebol do Brasil e do mundo.',
    url: 'https://fut-lance.vercel.app/noticias',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Notícias', item: 'https://fut-lance.vercel.app/noticias' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Script
        id="noticias-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Script
        id="breadcrumb-schema-noticias"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Todas as Notícias
        </h1>
        <p className="text-gray-400">
          Fique por dentro de tudo que acontece no mundo do futebol.
        </p>
      </div>

      {noticias.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <span className="text-5xl block mb-4">📰</span>
          <p className="text-gray-400 text-lg">Nenhuma notícia encontrada.</p>
          <p className="text-gray-500 mt-2">Volte em breve para conferir as últimas notícias.</p>
        </div>
      )}
    </div>
  );
}
