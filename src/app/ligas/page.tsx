import { ligas } from '@/data/ligas';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ligas Internacionais Ao Vivo — Premier League, La Liga, Bundesliga | Fut-Lance',
  description: 'Acompanhe as ligas internacionais ao vivo: Premier League, La Liga, Bundesliga, Serie A e Ligue 1. Classificação, jogos, resultados e notícias.',
  keywords: 'premier league ao vivo, la liga ao vivo, bundesliga ao vivo, serie a ao vivo, ligue 1 ao vivo, futebol europeu',
  openGraph: {
    title: 'Ligas Internacionais Ao Vivo | Fut-Lance',
    description: 'Acompanhe as ligas internacionais ao vivo.',
    url: 'https://fut-lance.vercel.app/ligas',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://fut-lance.vercel.app/og-image.png', width: 1200, height: 630, alt: 'Ligas Internacionais - FUT LANCE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ligas Internacionais Ao Vivo | Fut-Lance',
    description: 'Acompanhe as ligas internacionais ao vivo.',
    images: ['https://fut-lance.vercel.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://fut-lance.vercel.app/ligas',
  },
};

export default function LigasPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Ligas Internacionais - Futebol Ao Vivo',
    description: 'Acompanhe as principais ligas internacionais de futebol ao vivo.',
    url: 'https://fut-lance.vercel.app/ligas',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Ligas', item: 'https://fut-lance.vercel.app/ligas' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300">Ligas Internacionais</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Ligas Internacionais</h1>
        <p className="text-gray-400">Acompanhe as principais ligas de futebol do mundo ao vivo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ligas.map((liga) => (
          <Link
            key={liga.id}
            href={`/ligas/${liga.slug}`}
            className="bg-fut-darker rounded-2xl border border-gray-800 overflow-hidden hover:border-fut-green/30 transition-all hover:shadow-lg hover:shadow-black/20"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={liga.logo} alt={`Logo ${liga.nome}`} className="w-12 h-12 object-contain" />
                <div>
                  <h2 className="text-xl font-bold text-white">{liga.nome}</h2>
                  <p className="text-gray-400 text-sm">{liga.pais}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-fut-dark rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-fut-green text-xs font-bold uppercase">Líder</div>
                  <div className="text-white text-sm font-bold mt-1">{liga.estatisticas.lider}</div>
                </div>
                <div className="bg-fut-dark rounded-lg p-3 text-center border border-gray-700">
                  <div className="text-fut-green text-xs font-bold uppercase">Artilheiro</div>
                  <div className="text-white text-sm font-bold mt-1">{liga.estatisticas.artilheiro}</div>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Temporada {liga.estatisticas.temporada}</span>
                <span className="text-fut-green font-bold">{liga.estatisticas.totalGols} gols</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-fut-darker rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">📺 Onde Assistir Ligas Internacionais</h2>
        <p className="text-gray-300 mb-4">
          As principais ligas internacionais são transmitidas no Brasil pelos seguintes canais:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-fut-dark rounded-lg p-4 border border-gray-700">
            <h3 className="text-fut-green font-bold mb-2">Premier League</h3>
            <p className="text-gray-400 text-sm">ESPN / Star+ / CazéTV (jogos selecionados)</p>
          </div>
          <div className="bg-fut-dark rounded-lg p-4 border border-gray-700">
            <h3 className="text-fut-green font-bold mb-2">La Liga</h3>
            <p className="text-gray-400 text-sm">ESPN / Star+</p>
          </div>
          <div className="bg-fut-dark rounded-lg p-4 border border-gray-700">
            <h3 className="text-fut-green font-bold mb-2">Bundesliga</h3>
            <p className="text-gray-400 text-sm">ESPN / Star+</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/ao-vivo"
          className="bg-fut-green hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
        >
          ⚽ Ver Jogos Ao Vivo
        </Link>
      </div>
    </div>
  );
}
