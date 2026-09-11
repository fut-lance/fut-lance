import { Metadata } from 'next';
import Link from 'next/link';
import { getTime, getAllTimes } from '@/data/times';
import Script from 'next/script';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const timesList = getAllTimes();
  return timesList.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const time = getTime(slug);

  if (!time) {
    return { title: 'Time não encontrado' };
  }

  return {
    title: `${time.nome} - Notícias, Jogos e Elenco | FUT LANCE`,
    description: `Fique por dentro de tudo sobre o ${time.nome}. Notícias, próximos jogos, elenco, títulos e muito mais no FUT LANCE.`,
    keywords: `${time.nome}, ${time.nome} notícias, ${time.nome} jogos, ${time.nome} elenco, ${time.nome} ${time.estado}, futebol ${time.cidade}`,
    openGraph: {
      title: `${time.nome} | FUT LANCE`,
      description: `Fique por dentro de tudo sobre o ${time.nome}.`,
      url: `https://fut-lance.vercel.app/times/${time.slug}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'website',
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/times/${time.slug}`,
    },
  };
}

export default async function TimePage({ params }: PageProps) {
  const { slug } = await params;
  const time = getTime(slug);

  if (!time) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Time não encontrado</h1>
        <Link href="/" className="text-fut-green hover:underline">Voltar ao início</Link>
      </div>
    );
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: time.nome,
    description: time.descricao,
    url: `https://fut-lance.vercel.app/times/${time.slug}`,
    location: {
      '@type': 'Place',
      name: `${time.cidade}, ${time.estado}`,
    },
    sport: 'Soccer',
    foundingDate: time.fundacao,
    coach: {
      '@type': 'Person',
      name: time.tecnico,
    },
  };

  return (
    <div>
      <Script
        id={`time-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-fut-darker border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-fut-green">Início</Link>
            <span>/</span>
            <span className="text-white">{time.nome}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-fut-dark via-fut-darker to-fut-dark py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{time.nome}</h1>
          <p className="text-gray-400 mb-4">{time.cidade}, {time.estado} • Fundado em {time.fundacao}</p>
          <p className="text-gray-300 max-w-3xl">{time.descricao}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-fut-dark border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">🏟️ {time.estadio}</span>
            <span className="bg-fut-dark border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">👕 {time.cores}</span>
            <span className="bg-fut-dark border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">👔 {time.tecnico}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Títulos */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Títulos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-fut-darker rounded-xl border border-gray-800 p-4 text-center">
                <span className="text-3xl block mb-2">🏆</span>
                <p className="text-3xl font-extrabold text-fut-green">{time.titulos.brasileirao}</p>
                <p className="text-gray-400 text-sm mt-1">Brasileirão</p>
              </div>
              <div className="bg-fut-darker rounded-xl border border-gray-800 p-4 text-center">
                <span className="text-3xl block mb-2">🥇</span>
                <p className="text-3xl font-extrabold text-fut-green">{time.titulos.copaDoBrasil}</p>
                <p className="text-gray-400 text-sm mt-1">Copa do Brasil</p>
              </div>
              <div className="bg-fut-darker rounded-xl border border-gray-800 p-4 text-center">
                <span className="text-3xl block mb-2">🌎</span>
                <p className="text-3xl font-extrabold text-fut-green">{time.titulos.libertadores}</p>
                <p className="text-gray-400 text-sm mt-1">Libertadores</p>
              </div>
              <div className="bg-fut-darker rounded-xl border border-gray-800 p-4 text-center">
                <span className="text-3xl block mb-2">⭐</span>
                <p className="text-3xl font-extrabold text-fut-green">{time.titulos.copaDoMundo}</p>
                <p className="text-gray-400 text-sm mt-1">Mundial</p>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Informações</h2>
            <div className="bg-fut-darker rounded-xl border border-gray-800 p-6 space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Estádio</p>
                <p className="text-white font-semibold">{time.estadio}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Capacidade</p>
                <p className="text-white font-semibold">{time.capacidade}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Presidente</p>
                <p className="text-white font-semibold">{time.presidente}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Técnico</p>
                <p className="text-white font-semibold">{time.tecnico}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Mascote</p>
                <p className="text-white font-semibold">{time.mascote}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Elenco */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Elenco 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {time.elenco.map((posicao) => (
              <div key={posicao.posicao} className="bg-fut-darker rounded-xl border border-gray-800 p-4">
                <h3 className="text-fut-green font-bold mb-3">{posicao.posicao}</h3>
                <ul className="space-y-2">
                  {posicao.jogadores.map((jogador) => (
                    <li key={jogador} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                      {jogador}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos Jogos */}
        {time.proximosJogos.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Próximos Jogos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {time.proximosJogos.map((jogo, i) => (
                <div key={i} className="bg-fut-darker rounded-xl border border-gray-800 p-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span>{jogo.data}</span>
                    <span className="bg-fut-dark px-2 py-1 rounded">{jogo.horario}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="text-white font-bold text-sm">{jogo.local === 'Casa' ? time.nome : '???  '}</p>
                    </div>
                    <span className="text-fut-green font-bold mx-3">VS</span>
                    <div className="text-center flex-1">
                      <p className="text-white font-bold text-sm">{jogo.local === 'Fora' ? time.nome : jogo.adversario}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">{jogo.competicao} • {jogo.local === 'Casa' ? '🏠 Casa' : '✈️ Fora'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="mt-10 bg-fut-darker rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Acompanhe {time.nome}</h2>
          <div className="flex flex-wrap gap-4">
            <Link href={`/categoria/${time.slug}`} className="bg-fut-accent hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              📰 Notícias do {time.nome}
            </Link>
            <Link href="/ao-vivo" className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              ⚽ Assistir Ao Vivo
            </Link>
            <Link href="/campeonatos/brasileirao" className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              🏆 Brasileirão
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
