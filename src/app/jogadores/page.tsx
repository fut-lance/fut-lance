import { jogadores } from '@/data/jogadores';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jogadores Brasileiros — Carreira, Estatísticas e Notícias | Fut-Lance',
  description: 'Acompanhe os principais jogadores brasileiros: Neymar, Vinícius Jr, Endrick, Rodrygo, Casemiro e mais. Carreira, estatísticas e últimas notícias.',
  keywords: 'jogadores brasileiros, neymar, vinicius jr, endrick, rodrigo, casemiro, futebol brasileiro',
  openGraph: {
    title: 'Jogadores Brasileiros | Fut-Lance',
    description: 'Acompanhe os principais jogadores brasileiros.',
    url: 'https://fut-lance.vercel.app/jogadores',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fut-lance.vercel.app/jogadores',
  },
};

export default function JogadoresPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Jogadores Brasileiros - Futebol',
    description: 'Acompanhe os principais jogadores brasileiros do futebol mundial.',
    url: 'https://fut-lance.vercel.app/jogadores',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300">Jogadores</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Jogadores Brasileiros</h1>
        <p className="text-gray-400">Acompanhe os principais jogadores brasileiros do futebol mundial.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jogadores.map((jogador) => (
          <Link
            key={jogador.id}
            href={`/jogadores/${jogador.slug}`}
            className="bg-fut-darker rounded-2xl border border-gray-800 overflow-hidden hover:border-fut-green/30 transition-all hover:shadow-lg hover:shadow-black/20"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-fut-dark border-2 border-gray-700 flex items-center justify-center overflow-hidden">
                  <img
                    src={jogador.foto}
                    alt={`Foto de ${jogador.nome}`}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{jogador.nome}</h2>
                  <p className="text-gray-400 text-sm">{jogador.posicao}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-fut-green text-white px-2 py-1 rounded-full text-xs font-bold">
                  {jogador.timeAtual}
                </span>
                <span className="bg-fut-dark text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-700">
                  {jogador.selecao}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-fut-dark rounded-lg p-2 border border-gray-700">
                  <div className="text-fut-green text-lg font-bold">{jogador.estatisticas.gols}</div>
                  <div className="text-gray-400 text-xs">Gols</div>
                </div>
                <div className="bg-fut-dark rounded-lg p-2 border border-gray-700">
                  <div className="text-white text-lg font-bold">{jogador.estatisticas.assistencias}</div>
                  <div className="text-gray-400 text-xs">Assists</div>
                </div>
                <div className="bg-fut-dark rounded-lg p-2 border border-gray-700">
                  <div className="text-white text-lg font-bold">{jogador.estatisticas.jogos}</div>
                  <div className="text-gray-400 text-xs">Jogos</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-fut-darker rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">⚽ Os Maiores Jogadores Brasileiros</h2>
        <p className="text-gray-300 mb-4">
          O Brasil é conhecido por ser o maior exportador de talentos do futebol mundial. Desde Pelé e Garrincha até Neymar e Vinícius Jr, o país sempre produziu jogadores de classe mundial.
        </p>
        <p className="text-gray-300">
          Acompanhe aqui as estatísticas, carreira e últimas notícias dos principais jogadores brasileiros atuando no futebol europeu e brasileiro.
        </p>
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
