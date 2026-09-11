import { Metadata } from 'next';
import Link from 'next/link';
import { matches, type Match } from '@/data/matches';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return matches.map((match) => ({
    id: match.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const match = matches.find((m) => m.id === params.id);
  if (!match) return { title: 'Jogo não encontrado' };

  const title = `${match.timeMandante} x ${match.timeVisitante} ao vivo hoje — ${match.competicao} | Fut-Lance`;
  const description = `${match.timeMandante} x ${match.timeVisitante} ao vivo pelo ${match.competicao}. Horário: ${match.horario} - ${match.data}. Acompanhe no Fut-Lance.`;

  return {
    title,
    description,
    keywords: `${match.timeMandante}, ${match.timeVisitante}, ${match.competicao}, futebol ao vivo, jogos de hoje`,
    openGraph: {
      title,
      description,
      url: `https://fut-lance.vercel.app/ao-vivo/${match.id}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/ao-vivo/${match.id}`,
    },
  };
}

function getMatchStatus(match: { data: string; horario: string }): string {
  const now = new Date();
  const [d, m, y] = match.data.split('/').map(Number);
  const [h, min] = match.horario.split(':').map(Number);
  const matchStart = new Date(y, m - 1, d, h, min);
  const matchEnd = new Date(matchStart.getTime() + 2 * 60 * 60 * 1000);

  if (now < matchStart) return 'Em breve';
  if (now >= matchStart && now <= matchEnd) return 'AO VIVO';
  return 'Encerrado';
}

function getEventStatus(match: { data: string; horario: string }): string {
  const now = new Date();
  const [d, m, y] = match.data.split('/').map(Number);
  const [h, min] = match.horario.split(':').map(Number);
  const matchStart = new Date(y, m - 1, d, h, min);
  const matchEnd = new Date(matchStart.getTime() + 2 * 60 * 60 * 1000);

  if (now < matchStart) return 'https://schema.org/EventScheduled';
  if (now >= matchStart && now <= matchEnd) return 'https://schema.org/EventLive';
  return 'https://schema.org/EventCompleted';
}

export default function JogoPage({
  params,
}: {
  params: { id: string };
}) {
  const match = matches.find((m) => m.id === params.id);
  if (!match) notFound();

  const [d, m, y] = match.data.split('/').map(Number);
  const [h, min] = match.horario.split(':').map(Number);
  const startDate = new Date(y, m - 1, d, h, min);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  const status = getMatchStatus(match);

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${match.timeMandante} x ${match.timeVisitante}`,
    description: `${match.competicao} - ${match.timeMandante} x ${match.timeVisitante} no dia ${match.data} às ${match.horario}.`,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    eventStatus: getEventStatus(match),
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://fut-lance.vercel.app/ao-vivo',
    },
    organizer: {
      '@type': 'Organization',
      name: 'FUT LANCE',
      url: 'https://fut-lance.vercel.app',
    },
    performer: [
      { '@type': 'SportsTeam', name: match.timeMandante },
      { '@type': 'SportsTeam', name: match.timeVisitante },
    ],
    superEvent: {
      '@type': 'SportsLeague',
      name: match.competicao,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Futebol Ao Vivo', item: 'https://fut-lance.vercel.app/ao-vivo' },
      { '@type': 'ListItem', position: 3, name: `${match.timeMandante} x ${match.timeVisitante}`, item: `https://fut-lance.vercel.app/ao-vivo/${match.id}` },
    ],
  };

  const relatedMatches = matches
    .filter((m) => m.id !== match.id && m.competicao === match.competicao)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-6 md:py-8">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span className="text-gray-600">/</span>
          <Link href="/ao-vivo" className="hover:text-white transition-colors">Futebol Ao Vivo</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">{match.timeMandante} x {match.timeVisitante}</span>
        </nav>

        <div className="mb-6 md:mb-8">
          <span className="inline-block bg-fut-green text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            {match.competicao}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {match.timeMandante} x {match.timeVisitante} ao vivo
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {match.competicao} • {match.data} às {match.horario}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Placar visual */}
            <div className="bg-fut-darker rounded-2xl border border-gray-800 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-fut-green text-xs font-bold uppercase tracking-wider">{match.competicao}</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                  status === 'AO VIVO' ? 'bg-red-600 text-white animate-pulse' :
                  status === 'Encerrado' ? 'bg-gray-600 text-gray-300' :
                  'bg-yellow-600/80 text-white'
                }`}>
                  {status === 'AO VIVO' && <span className="w-2 h-2 bg-white rounded-full" />}
                  {status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-3 overflow-hidden">
                    <img
                      src={match.logoTimeMandante}
                      alt={`Escudo do ${match.timeMandante}`}
                      className="w-14 h-14 md:w-18 md:h-18 object-contain"
                    />
                  </div>
                  <p className="text-white font-bold text-base md:text-lg">{match.timeMandante}</p>
                  <p className="text-gray-500 text-xs">Mandante</p>
                </div>

                <div className="flex flex-col items-center px-4">
                  <span className="text-gray-500 text-2xl font-bold">vs</span>
                </div>

                <div className="flex-1 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-3 overflow-hidden">
                    <img
                      src={match.logoTimeVisitante}
                      alt={`Escudo do ${match.timeVisitante}`}
                      className="w-14 h-14 md:w-18 md:h-18 object-contain"
                    />
                  </div>
                  <p className="text-white font-bold text-base md:text-lg">{match.timeVisitante}</p>
                  <p className="text-gray-500 text-xs">Visitante</p>
                </div>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <p>{match.data} às {match.horario}</p>
              </div>
            </div>

            {/* Conteúdo editorial */}
            <div className="bg-fut-darker rounded-2xl border border-gray-800 p-6 mb-6">
              <h2 className="text-white font-bold text-lg mb-4">Sobre a Partida</h2>
              <div className="text-gray-400 text-sm space-y-3">
                <p>
                  Confira informações de <strong className="text-white">{match.timeMandante} x {match.timeVisitante}</strong>, válido pelo <strong className="text-white">{match.competicao}</strong>. Veja horário, competição, situação da partida e outras informações.
                </p>
                <p>
                  O jogo entre {match.timeMandante} e {match.timeVisitante} está marcado para {match.data} às {match.horario}, pela {match.competicao}.
                  {status === 'Em breve' && ' A partida ainda não começou. Fique atento para acompanhar ao vivo.'}
                  {status === 'AO VIVO' && ' A partida está acontecendo neste momento! Acompanhe ao vivo.'}
                  {status === 'Encerrado' && ' A partida já foi encerrada. Confira o resultado abaixo.'}
                </p>
                <p>
                  Acesse as notícias do <Link href={`/categoria/${match.competicao.toLowerCase().replace(/\s+/g, '-')}`} className="text-fut-green hover:underline">{match.competicao}</Link> para ficar por dentro de tudo o que acontece no campeonato.
                </p>
              </div>
            </div>

            {/* Canais de transmissão */}
            <div className="bg-fut-darker rounded-2xl border border-gray-800 p-6">
              <h2 className="text-white font-bold text-lg mb-4">Onde Assistir</h2>
              <div className="space-y-2">
                {match.canais.map((ch, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-fut-dark rounded-xl border border-gray-800">
                    <div className="w-10 h-10 bg-fut-darker rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-fut-green" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm">{ch.nome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
              <h2 className="text-white font-bold mb-3">Informações da Partida</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Competição</span>
                  <span className="text-white font-medium">{match.competicao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data</span>
                  <span className="text-white font-medium">{match.data}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Horário</span>
                  <span className="text-white font-medium">{match.horario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mandante</span>
                  <span className="text-white font-medium">{match.timeMandante}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Visitante</span>
                  <span className="text-white font-medium">{match.timeVisitante}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`font-medium ${
                    status === 'AO VIVO' ? 'text-red-400' :
                    status === 'Encerrado' ? 'text-gray-400' :
                    'text-yellow-400'
                  }`}>{status}</span>
                </div>
              </div>
            </div>

            {relatedMatches.length > 0 && (
              <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
                <h2 className="text-white font-bold mb-3">Próximos Jogos</h2>
                <div className="space-y-3">
                  {relatedMatches.map((m) => (
                    <Link
                      key={m.id}
                      href={`/ao-vivo/${m.id}`}
                      className="block p-3 bg-fut-dark rounded-lg hover:bg-fut-dark/80 border border-gray-800 hover:border-fut-green/30 transition-all"
                    >
                      <p className="text-fut-green text-xs font-bold">{m.competicao}</p>
                      <p className="text-white text-sm font-medium">{m.timeMandante} x {m.timeVisitante}</p>
                      <p className="text-gray-500 text-xs">{m.data} • {m.horario}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
              <h2 className="text-white font-bold mb-3">Notícias Relacionadas</h2>
              <Link
                href={`/categoria/${match.competicao.toLowerCase().replace(/\s+/g, '-')}`}
                className="block p-3 bg-fut-dark rounded-lg hover:bg-fut-dark/80 border border-gray-800 hover:border-fut-green/30 transition-all text-center"
              >
                <p className="text-fut-green text-sm font-bold">Ver notícias de {match.competicao}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
