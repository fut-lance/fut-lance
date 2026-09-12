import { jogadores, getJogador } from '@/data/jogadores';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return jogadores.map((jogador) => ({ slug: jogador.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const jogador = getJogador(params.slug);
  if (!jogador) return {};

  return {
    title: `${jogador.nome} — Carreira, Estatísticas e Notícias | Fut-Lance`,
    description: `${jogador.nomeCompleto}, ${jogador.posicao} do ${jogador.timeAtual}. Carreira, estatísticas, títulos e últimas notícias de ${jogador.nome}.`,
    keywords: `${jogador.nome.toLowerCase()}, ${jogador.nomeCompleto.toLowerCase()}, ${jogador.posicao.toLowerCase()} ${jogador.timeAtual.toLowerCase()}, ${jogador.nome.toLowerCase()} estatísticas`,
    openGraph: {
      title: `${jogador.nome} — Carreira e Estatísticas | Fut-Lance`,
      description: `${jogador.nomeCompleto}, ${jogador.posicao} do ${jogador.timeAtual}.`,
      url: `https://fut-lance.vercel.app/jogadores/${jogador.slug}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${jogador.nome} | Fut-Lance`,
      description: `${jogador.nomeCompleto}, ${jogador.posicao} do ${jogador.timeAtual}.`,
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/jogadores/${jogador.slug}`,
    },
  };
}

export default function JogadorPage({ params }: { params: { slug: string } }) {
  const jogador = getJogador(params.slug);
  if (!jogador) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl text-white font-bold">Jogador não encontrado</h1>
        <Link href="/" className="text-fut-green hover:underline mt-4 block">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const playerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: jogador.nomeCompleto,
    alternateName: jogador.nome,
    jobTitle: jogador.posicao,
    description: jogador.descricao,
    url: `https://fut-lance.vercel.app/jogadores/${jogador.slug}`,
    image: jogador.foto,
   memberOf: {
      '@type': 'SportsTeam',
      name: jogador.timeAtual,
    },
    nationality: {
      '@type': 'Country',
      name: jogador.selecao,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Jogadores', item: 'https://fut-lance.vercel.app/jogadores' },
      { '@type': 'ListItem', position: 3, name: jogador.nome, item: `https://fut-lance.vercel.app/jogadores/${jogador.slug}` },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(playerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        <Link href="/jogadores" className="hover:text-white transition-colors">Jogadores</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300">{jogador.nome}</span>
      </nav>

      <div className="bg-fut-darker rounded-2xl border border-gray-800 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-fut-dark border-4 border-fut-green flex items-center justify-center overflow-hidden">
              <img
                src={jogador.foto}
                alt={`Foto de ${jogador.nome}`}
                className="w-28 h-28 object-contain"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{jogador.nome}</h1>
              <p className="text-gray-400 text-lg mb-4">{jogador.nomeCompleto}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="bg-fut-green text-white px-3 py-1 rounded-full text-sm font-bold">
                  {jogador.posicao}
                </span>
                <span className="bg-fut-dark text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700">
                  {jogador.timeAtual}
                </span>
                <span className="bg-fut-dark text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700">
                  {jogador.selecao}
                </span>
              </div>

              <p className="text-gray-300 max-w-2xl">{jogador.descricao}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-fut-darker rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">📊 Estatísticas</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Gols</span>
              <span className="text-fut-green font-bold text-xl">{jogador.estatisticas.gols}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Assistências</span>
              <span className="text-white font-bold text-xl">{jogador.estatisticas.assistencias}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Jogos</span>
              <span className="text-white font-bold text-xl">{jogador.estatisticas.jogos}</span>
            </div>
          </div>
        </div>

        <div className="bg-fut-darker rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">🏆 Títulos</h2>
          <div className="space-y-2">
            {jogador.estatisticas.titulos.map((titulo) => (
              <div key={titulo} className="bg-fut-dark rounded-lg p-2 text-center border border-gray-700">
                <span className="text-white text-sm font-medium">{titulo}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-fut-darker rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">📰 Últimas Notícias</h2>
          <div className="space-y-3">
            {jogador.noticias.map((noticia) => (
              <div key={noticia.titulo} className="bg-fut-dark rounded-lg p-3 border border-gray-700">
                <p className="text-white text-sm font-medium">{noticia.titulo}</p>
                <p className="text-fut-green text-xs mt-1">{noticia.data}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-fut-darker rounded-xl p-6 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">⚽ Carreira</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 py-3 px-4">Time</th>
                <th className="text-left text-gray-400 py-3 px-4">Período</th>
                <th className="text-center text-gray-400 py-3 px-4">Jogos</th>
                <th className="text-center text-gray-400 py-3 px-4">Gols</th>
              </tr>
            </thead>
            <tbody>
              {jogador.carreira.map((clube) => (
                <tr key={clube.time} className="border-b border-gray-800 hover:bg-fut-dark/50 transition-colors">
                  <td className="text-white py-3 px-4 font-medium">{clube.time}</td>
                  <td className="text-gray-400 py-3 px-4">{clube.periodo}</td>
                  <td className="text-white py-3 px-4 text-center">{clube.jogos}</td>
                  <td className="text-fut-green py-3 px-4 text-center font-bold">{clube.gols}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/jogadores"
          className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          👥 Ver Todos os Jogadores
        </Link>
        <Link
          href="/ao-vivo"
          className="bg-fut-green hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          ⚽ Futebol Ao Vivo
        </Link>
        <Link
          href="/noticias"
          className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          📰 Notícias
        </Link>
      </div>
    </div>
  );
}
