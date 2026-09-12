import { ligas, getLiga } from '@/data/ligas';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return ligas.map((liga) => ({ slug: liga.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const liga = getLiga(params.slug);
  if (!liga) return {};

  return {
    title: `${liga.nome} Ao Vivo — Classificação, Jogos e Resultados | Fut-Lance`,
    description: `${liga.nome} ao vivo: classificação atualizada, jogos do dia, resultados, artilharia e cobertura completa da ${liga.pais} ${liga.nome} ${liga.estatisticas.temporada}.`,
    keywords: `${liga.nome.toLowerCase()} ao vivo, ${liga.nome} classificação, jogos ${liga.nome}, ${liga.pais} futebol, ${liga.nome} resultados`,
    openGraph: {
      title: `${liga.nome} Ao Vivo — Classificação, Jogos e Resultados | Fut-Lance`,
      description: `${liga.nome} ao vivo: classificação, jogos e resultados.`,
      url: `https://fut-lance.vercel.app/ligas/${liga.slug}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${liga.nome} Ao Vivo | Fut-Lance`,
      description: `${liga.nome} ao vivo: classificação, jogos e resultados.`,
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/ligas/${liga.slug}`,
    },
  };
}

export default function LigaPage({ params }: { params: { slug: string } }) {
  const liga = getLiga(params.slug);
  if (!liga) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl text-white font-bold">Liga não encontrada</h1>
        <Link href="/" className="text-fut-green hover:underline mt-4 block">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const leagueSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsLeague',
    name: liga.nome,
    description: liga.descricao,
    url: `https://fut-lance.vercel.app/ligas/${liga.slug}`,
    sport: 'Soccer',
    location: {
      '@type': 'Country',
      name: liga.pais,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Ligas', item: 'https://fut-lance.vercel.app/ligas' },
      { '@type': 'ListItem', position: 3, name: liga.nome, item: `https://fut-lance.vercel.app/ligas/${liga.slug}` },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(leagueSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        <Link href="/ligas" className="hover:text-white transition-colors">Ligas</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300">{liga.nome}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img src={liga.logo} alt={`Logo ${liga.nome}`} className="w-16 h-16 object-contain" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{liga.nome}</h1>
            <p className="text-gray-400">{liga.pais} • Temporada {liga.estatisticas.temporada}</p>
          </div>
        </div>
        <p className="text-gray-300 max-w-3xl">{liga.descricao}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-fut-darker rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">📊 Estatísticas da Temporada</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Líder</span>
              <span className="text-fut-green font-bold">{liga.estatisticas.lider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pontos</span>
              <span className="text-white font-bold">{liga.estatisticas.liderPontos}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Artilheiro</span>
              <span className="text-white font-bold">{liga.estatisticas.artilheiro}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gols do Artilheiro</span>
              <span className="text-white font-bold">{liga.estatisticas.artilheiroGols}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total de Gols</span>
              <span className="text-white font-bold">{liga.estatisticas.totalGols}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Média de Gols</span>
              <span className="text-white font-bold">{liga.estatisticas.mediaGols}</span>
            </div>
          </div>
        </div>

        <div className="bg-fut-darker rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">⚽ Times</h2>
          <div className="grid grid-cols-2 gap-2">
            {liga.times.map((time) => (
              <div key={time} className="bg-fut-dark rounded-lg p-2 text-center border border-gray-700">
                <span className="text-white text-sm font-medium">{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-fut-darker rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">📅 Próximos Jogos</h2>
          <div className="space-y-3">
            {liga.proximosJogos.map((jogo, i) => (
              <div key={i} className="bg-fut-dark rounded-lg p-3 border border-gray-700">
                <div className="text-fut-green text-xs font-bold">{jogo.data} • {jogo.horario}</div>
                <div className="text-white text-sm font-medium mt-1">
                  {jogo.mandante} x {jogo.visitante}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-fut-darker rounded-xl p-6 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">📺 Onde Assistir</h2>
        <p className="text-gray-300 mb-4">
          Para assistir {liga.nome} ao vivo no Brasil, confira os canais de transmissão:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-fut-dark rounded-lg p-4 border border-gray-700">
            <h3 className="text-fut-green font-bold mb-2">ESPN / Star+</h3>
            <p className="text-gray-400 text-sm">Transmissão de jogos selecionados da Premier League e La Liga.</p>
          </div>
          <div className="bg-fut-dark rounded-lg p-4 border border-gray-700">
            <h3 className="text-fut-green font-bold mb-2">CazéTV</h3>
            <p className="text-gray-400 text-sm">Jogos gratuitos da Premier League e outros campeonatos.</p>
          </div>
          <div className="bg-fut-dark rounded-lg p-4 border border-gray-700">
            <h3 className="text-fut-green font-bold mb-2">Premiere</h3>
            <p className="text-gray-400 text-sm">Seleção de jogos das principais ligas europeias.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
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
        <Link
          href="/onde-assistir"
          className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          📺 Onde Assistir
        </Link>
      </div>
    </div>
  );
}
