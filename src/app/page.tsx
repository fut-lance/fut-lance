import Link from 'next/link';
import CardNoticia from '@/components/CardNoticia';
import { getNoticias, getTransmissoesAoVivo } from '@/lib/api';
import Script from 'next/script';
import { AdContainer } from '@/components/ads';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FUT LANCE - Notícias de Futebol ao Vivo | Brasileirão, Libertadores, Champions',
  description: 'O melhor blog de notícias de futebol do Brasil. Acompanhe o Brasileirão, Libertadores, Champions League, Seleção Brasileira ao vivo. Notícias, classificação, artilharia e transmissões ao vivo.',
  keywords: 'futebol ao vivo, brasileirão ao vivo, libertadores, champions league, notícias de futebol, FUT LANCE, futebol brasileiro, transmissão ao vivo, classificação do brasileirão',
  alternates: {
    canonical: 'https://fut-lance.vercel.app',
  },
  openGraph: {
    title: 'FUT LANCE - Notícias de Futebol ao Vivo',
    description: 'O melhor blog de notícias de futebol do Brasil. Brasileirão, Libertadores, Champions League e muito mais.',
    url: 'https://fut-lance.vercel.app',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://fut-lance.vercel.app/og-image.png', width: 1200, height: 630, alt: 'FUT LANCE - Futebol ao Vivo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUT LANCE - Notícias de Futebol ao Vivo',
    description: 'O melhor blog de notícias de futebol do Brasil.',
    images: ['https://fut-lance.vercel.app/og-image.png'],
  },
};

export default async function Home() {
  let noticiasDestaque: any[] = [];
  let ultimasNoticias: any[] = [];
  let transmissoes: any[] = [];

  try {
    const data = await getNoticias(1, 8);
    const allNoticias = data?.data || [];
    noticiasDestaque = allNoticias.slice(0, 1);
    ultimasNoticias = allNoticias.slice(1, 7);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }

  try {
    const data = await getTransmissoesAoVivo();
    transmissoes = data?.data || [];
  } catch (error) {
    console.error('Erro ao buscar transmissões:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FUT LANCE - Notícias de Futebol',
    description: 'O melhor blog de notícias de futebol do Brasil. Notícias, vídeos, transmissões ao vivo e muito mais.',
    url: 'https://fut-lance.vercel.app',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: noticiasDestaque.length + ultimasNoticias.length,
      itemListElement: [...noticiasDestaque, ...ultimasNoticias].slice(0, 7).map((n: any, i: number) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://fut-lance.vercel.app/noticias/${n.slug}`,
        name: n.titulo,
      })),
    },
  };

  const principalNoticia = noticiasDestaque[0];

  return (
    <div>
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* Hero / Destaque Principal */}
      <section className="relative bg-gradient-to-br from-fut-dark via-fut-darker to-fut-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-fut-darker via-transparent to-transparent z-10" />
        {principalNoticia ? (
          <div className="relative">
            <div className="h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
              <img
                src={principalNoticia.imagem_url || (principalNoticia.imagem_capa?.url ? `${apiUrl}${principalNoticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=80')}
                alt={principalNoticia.titulo}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 lg:p-16">
              <div className="container mx-auto">
                <span className="inline-block bg-fut-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                  {principalNoticia.categoria?.nome || 'Destaque'}
                </span>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight max-w-4xl">
                  {principalNoticia.titulo}
                </h1>
                {principalNoticia.resumo && (
                  <p className="text-gray-300 text-base md:text-lg mb-6 max-w-3xl line-clamp-2 md:line-clamp-3">
                    {principalNoticia.resumo}
                  </p>
                )}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                  {principalNoticia.autor && <span>Por <strong className="text-white">{principalNoticia.autor}</strong></span>}
                  {principalNoticia.data_publicacao && (
                    <time dateTime={principalNoticia.data_publicacao}>
                      {new Date(principalNoticia.data_publicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </time>
                  )}
                </div>
                <Link
                  href={`/noticias/${principalNoticia.slug}`}
                  className="inline-flex items-center gap-2 bg-fut-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm md:text-base"
                >
                  Ler notícia
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[50vh] flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl mb-4 block">⚽</span>
              <h1 className="text-4xl font-extrabold text-white mb-4">FUT LANCE</h1>
              <p className="text-gray-400 text-lg">O melhor portal de notícias de futebol</p>
            </div>
          </div>
        )}
      </section>

      {/* Ad: Abaixo do hero */}
      <div className="container mx-auto px-4">
        <AdContainer position="header" className="my-6" />
      </div>

      {/* Últimas Notícias */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Últimas Notícias
            </h2>
            <p className="text-gray-500 text-sm mt-1">Fique por dentro de tudo</p>
          </div>
          <Link
            href="/noticias"
            className="text-fut-green hover:text-green-400 font-semibold text-sm flex items-center gap-1"
          >
            Ver todas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {ultimasNoticias.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ultimasNoticias.map((noticia: any) => (
              <CardNoticia
                key={noticia.id}
                slug={noticia.slug}
                titulo={noticia.titulo}
                resumo={noticia.resumo}
                imagem={noticia.imagem_url || (noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800')}
                categoria={noticia.categoria?.nome || 'Geral'}
                data={noticia.data_publicacao}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardNoticia slug="placeholder" titulo="Nenhuma notícia encontrada" resumo="Cadastre notícias no Strapi" imagem="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800" categoria="Geral" data="09/09/2026" />
          </div>
        )}
      </section>

      {/* Futebol Ao Vivo */}
      <section className="bg-gradient-to-r from-fut-accent/10 via-fut-darker to-fut-accent/10 border-y border-fut-accent/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-fut-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Futebol Ao Vivo
                </h2>
                <p className="text-gray-400 text-sm md:text-base mt-1">
                  Assista ESPN, SporTV, Premiere, Band Sports e mais. Grátis e ao vivo.
                </p>
              </div>
            </div>
            <Link
              href="/ao-vivo"
              className="inline-flex items-center gap-2 bg-fut-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Assistir Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Ad: Entre notícias e campeonatos */}
      <div className="container mx-auto px-4">
        <AdContainer position="content" className="my-6" />
      </div>

      {/* Campeonatos */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Campeonatos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/campeonatos/brasileirao" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-fut-green/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">🏆</span>
            <h3 className="text-white font-bold group-hover:text-fut-green transition-colors">Brasileirão</h3>
          </Link>
          <Link href="/campeonatos/libertadores" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-yellow-500/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">🌎</span>
            <h3 className="text-white font-bold group-hover:text-yellow-400 transition-colors">Libertadores</h3>
          </Link>
          <Link href="/campeonatos/champions-league" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-blue-500/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">⭐</span>
            <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">Champions League</h3>
          </Link>
          <Link href="/campeonatos/copa-do-brasil" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-yellow-500/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">🥇</span>
            <h3 className="text-white font-bold group-hover:text-yellow-400 transition-colors">Copa do Brasil</h3>
          </Link>
        </div>
      </section>

      {/* Times */}
      <section className="container mx-auto px-4 py-10 border-t border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Times
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/times/flamengo" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-red-500/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">🔴⚫</span>
            <h3 className="text-white font-bold group-hover:text-red-400 transition-colors">Flamengo</h3>
          </Link>
          <Link href="/times/palmeiras" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-green-500/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">🟢🟢</span>
            <h3 className="text-white font-bold group-hover:text-green-400 transition-colors">Palmeiras</h3>
          </Link>
          <Link href="/times/corinthians" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-black/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">⚫⚪</span>
            <h3 className="text-white font-bold group-hover:text-white transition-colors">Corinthians</h3>
          </Link>
          <Link href="/times/sao-paulo" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-red-600/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">🔴⚪⚫</span>
            <h3 className="text-white font-bold group-hover:text-red-400 transition-colors">São Paulo</h3>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Link href="/times/santos" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-white/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">⚫⚪</span>
            <h3 className="text-white font-bold group-hover:text-white transition-colors">Santos</h3>
          </Link>
          <Link href="/times/vasco" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-white/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">⚫⚪</span>
            <h3 className="text-white font-bold group-hover:text-white transition-colors">Vasco</h3>
          </Link>
          <Link href="/times/botafogo" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-white/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">⚫⚪</span>
            <h3 className="text-white font-bold group-hover:text-white transition-colors">Botafogo</h3>
          </Link>
          <Link href="/times/fluminense" className="group bg-fut-darker hover:bg-fut-dark border border-gray-800 hover:border-red-500/50 rounded-xl p-6 text-center transition-all">
            <span className="text-4xl block mb-3">🔴🟢⚪</span>
            <h3 className="text-white font-bold group-hover:text-red-400 transition-colors">Fluminense</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
