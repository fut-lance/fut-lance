import Comentarios from '@/components/Comentarios';
import { getNoticiaBySlug, getRelatedNoticias } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';
import { AdContainer } from '@/components/ads';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const noticia = await getNoticiaBySlug(params.slug);
  if (!noticia) return { title: 'Notícia não encontrada' };

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';
  const imagemUrl = noticia.imagem_url || (noticia.imagem_capa?.url
    ? `${apiUrl}${noticia.imagem_capa.url}`
    : 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200');

  const categoryKeywords = noticia.categoria?.nome || 'Futebol';
  const newsKeywords = `${noticia.titulo}, ${categoryKeywords}, FUT LANCE, futebol brasileiro, notícias de futebol`;

  return {
    title: noticia.titulo,
    description: noticia.resumo || noticia.conteudo?.replace(/<[^>]*>/g, '').substring(0, 160) || noticia.titulo,
    keywords: newsKeywords,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo || noticia.titulo,
      url: `https://fut-lance.vercel.app/noticias/${params.slug}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: noticia.data_publicacao,
      authors: noticia.autor ? [noticia.autor] : ['FUT LANCE'],
      images: [{ url: imagemUrl, width: 1200, height: 630, alt: noticia.titulo }],
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.titulo,
      description: noticia.resumo || noticia.titulo,
      images: [imagemUrl],
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/noticias/${params.slug}`,
    },
    other: {
      'news_keywords': newsKeywords,
      'article:published_time': noticia.data_publicacao || '',
      'article:section': categoryKeywords,
    },
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: { slug: string };
}) {
  const noticia = await getNoticiaBySlug(params.slug);
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  if (!noticia) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">📄</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Notícia não encontrada</h1>
        <p className="text-gray-400 mb-6">Esta notícia não existe ou foi removida.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-fut-green hover:text-green-400 font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const relatedNoticias = noticia.categoria?.id
    ? await getRelatedNoticias(noticia.categoria.id, params.slug, 4)
    : [];

  const imagemUrl = noticia.imagem_url || (noticia.imagem_capa?.url
    ? `${apiUrl}${noticia.imagem_capa.url}`
    : 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200');

  const formatData = (data: string) => {
    if (!data) return '';
    try {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return data;
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: noticia.titulo,
    description: noticia.resumo || noticia.titulo,
    image: imagemUrl,
    datePublished: noticia.data_publicacao,
    dateModified: noticia.updatedAt || noticia.data_publicacao,
    author: {
      '@type': 'Organization',
      name: noticia.autor || 'FUT LANCE',
      url: 'https://fut-lance.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FUT LANCE',
      url: 'https://fut-lance.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&q=80',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fut-lance.vercel.app/noticias/${params.slug}`,
    },
    articleSection: noticia.categoria?.nome || 'Futebol',
    keywords: [noticia.categoria?.nome || 'Futebol', 'FUT LANCE', 'futebol', 'notícias'],
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.prose'],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://fut-lance.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: noticia.categoria?.nome || 'Notícias',
        item: `https://fut-lance.vercel.app/categoria/${noticia.categoria?.slug || 'noticias'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: noticia.titulo,
        item: `https://fut-lance.vercel.app/noticias/${params.slug}`,
      },
    ],
  };

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        {noticia.categoria?.nome && (
          <>
            <Link href={`/categoria/${noticia.categoria.slug || ''}`} className="hover:text-white transition-colors">
              {noticia.categoria.nome}
            </Link>
            <span className="text-gray-600">/</span>
          </>
        )}
        <span className="text-gray-300 line-clamp-1">{noticia.titulo}</span>
      </nav>

      <div className="mb-4">
        <span className="inline-block bg-fut-green text-white text-xs font-bold px-3 py-1 rounded-full">
          {noticia.categoria?.nome || 'Geral'}
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{noticia.titulo}</h1>

      <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
        {noticia.autor && <span>Por <strong className="text-gray-300">{noticia.autor}</strong></span>}
        {noticia.autor && <span className="text-gray-600">•</span>}
        <time dateTime={noticia.data_publicacao}>{formatData(noticia.data_publicacao)}</time>
      </div>

      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
        <img
          src={imagemUrl}
          alt={noticia.titulo}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {noticia.resumo && (
        <div className="bg-fut-darker rounded-lg p-6 mb-8 border-l-4 border-fut-green">
          <p className="text-gray-300 text-lg italic leading-relaxed">{noticia.resumo}</p>
        </div>
      )}

      {noticia.video_url && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Vídeo</h2>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              src={noticia.video_url}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title={`Vídeo: ${noticia.titulo}`}
            />
          </div>
        </div>
      )}

      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: noticia.conteudo || '<p>Conteúdo não disponível.</p>' }}
      />

      {/* Ad: Após conteúdo da notícia */}
      <AdContainer position="content" className="my-8" />

      {relatedNoticias.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Notícias Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedNoticias.map((rel: any) => (
              <Link
                key={rel.id}
                href={`/noticias/${rel.documentId}`}
                className="flex gap-4 p-4 bg-fut-darker rounded-lg hover:bg-fut-dark border border-gray-800 hover:border-gray-700 transition-all"
              >
                <img
                  src={rel.imagem_url || (rel.imagem_capa?.url ? `${apiUrl}${rel.imagem_capa.url}` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400')}
                  alt={rel.titulo}
                  className="w-24 h-24 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h3 className="text-white font-semibold line-clamp-2">{rel.titulo}</h3>
                  <p className="text-gray-400 text-sm mt-1">{rel.categoria?.nome || 'Futebol'}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link href="/noticias" className="inline-flex items-center gap-2 text-fut-green hover:text-green-400 font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para notícias
        </Link>
      </div>

      <Comentarios noticiaId={noticia.id} noticiaSlug={params.slug} />
    </article>
  );
}
