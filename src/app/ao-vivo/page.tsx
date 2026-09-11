import { Metadata } from 'next';
import Link from 'next/link';
import AoVivoClient from './AoVivoClient';
import { matches } from '@/data/matches';

export const metadata: Metadata = {
  title: 'Futebol Ao Vivo Hoje — Jogos de Futebol ao Vivo | Fut-Lance',
  description: 'Futebol ao vivo hoje: confira os principais jogos, horários, competições e informações das partidas. Acompanhe a programação de futebol ao vivo no Fut-Lance.',
  keywords: 'futebol ao vivo, futebol ao vivo hoje, jogos de futebol ao vivo, jogos de hoje, assistir futebol ao vivo, futebol na TV, onde assistir futebol hoje, Brasileirão ao vivo, Libertadores ao vivo, Champions League ao vivo',
  openGraph: {
    title: 'Futebol Ao Vivo Hoje — Jogos de Futebol ao Vivo | Fut-Lance',
    description: 'Futebol ao vivo hoje: confira os principais jogos, horários, competições e informações das partidas.',
    url: 'https://fut-lance.vercel.app/ao-vivo',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Futebol Ao Vivo Hoje — Jogos de Futebol ao Vivo | Fut-Lance',
    description: 'Futebol ao vivo hoje: confira os principais jogos, horários, competições e informações das partidas.',
  },
  alternates: {
    canonical: 'https://fut-lance.vercel.app/ao-vivo',
  },
};

function getMatchStatusServer(match: { data: string; horario: string }): string {
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

export default function AoVivoPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Futebol Ao Vivo', item: 'https://fut-lance.vercel.app/ao-vivo' },
    ],
  };

  const eventSchemas = matches.map((match) => {
    const [d, m, y] = match.data.split('/').map(Number);
    const [h, min] = match.horario.split(':').map(Number);
    const startDate = new Date(y, m - 1, d, h, min);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    return {
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: `${match.timeMandante} x ${match.timeVisitante}`,
      description: `${match.competicao} - ${match.timeMandante} x ${match.timeVisitante} no dia ${match.data} às ${match.horario}.`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      eventStatus: getEventStatus(match),
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: { '@type': 'VirtualLocation', url: 'https://fut-lance.vercel.app/ao-vivo' },
      organizer: { '@type': 'Organization', name: 'FUT LANCE', url: 'https://fut-lance.vercel.app' },
      performer: [
        { '@type': 'SportsTeam', name: match.timeMandante },
        { '@type': 'SportsTeam', name: match.timeVisitante },
      ],
      superEvent: { '@type': 'SportsLeague', name: match.competicao },
    };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {eventSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container mx-auto px-4 py-6 md:py-8">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">Futebol Ao Vivo</span>
        </nav>

        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-3 h-3 bg-fut-accent rounded-full animate-pulse" />
            <h1 className="text-2xl md:text-4xl font-bold text-white">Futebol Ao Vivo Hoje</h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Confira os principais jogos de futebol ao vivo hoje, com horários, competições, times e informações das partidas. Acompanhe os principais campeonatos, incluindo Brasileirão, Libertadores, Champions League e outros torneios.
          </p>
        </div>

        {/* Lista de jogos renderizada no servidor para SEO */}
        <section className="mb-8" aria-label="Jogos de hoje">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {matches.map((match) => {
              const status = getMatchStatusServer(match);
              return (
                <Link
                  key={match.id}
                  href={`/ao-vivo/${match.id}`}
                  className="block bg-fut-darker rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-black/20"
                >
                  <div className="px-4 pt-4 pb-2">
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
                    <div className="text-center text-gray-500 text-xs mb-4">
                      {match.data} • {match.horario}
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex-1 text-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-2 overflow-hidden">
                          <img
                            src={match.logoTimeMandante}
                            alt={`Escudo do ${match.timeMandante}`}
                            className="w-10 h-10 md:w-12 md:h-12 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-white font-bold text-sm md:text-base leading-tight">{match.timeMandante}</p>
                      </div>
                      <div className="flex flex-col items-center px-2">
                        <span className="text-gray-500 text-xl font-bold">×</span>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-2 overflow-hidden">
                          <img
                            src={match.logoTimeVisitante}
                            alt={`Escudo do ${match.timeVisitante}`}
                            className="w-10 h-10 md:w-12 md:h-12 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-white font-bold text-sm md:text-base leading-tight">{match.timeVisitante}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className={`w-full py-3 rounded-xl text-center font-bold text-sm ${
                      status === 'AO VIVO' ? 'bg-fut-green text-white' :
                      status === 'Encerrado' ? 'bg-gray-700 text-gray-400' :
                      'bg-fut-darker text-gray-300 border border-gray-700'
                    }`}>
                      {status === 'AO VIVO' ? 'ASSISTIR AO VIVO' :
                       status === 'Encerrado' ? 'Partida encerrada' :
                       'Ver informações'}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <AoVivoClient />

        <section className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/categoria/brasileirao" className="bg-fut-darker rounded-xl p-5 border border-gray-800 hover:border-fut-green/50 transition-all group">
            <span className="text-2xl block mb-2">🏆</span>
            <h2 className="text-white font-bold group-hover:text-fut-green transition-colors">Brasileirão</h2>
            <p className="text-gray-500 text-sm mt-1">Notícias e jogos do Brasileirão Série A</p>
          </Link>
          <Link href="/categoria/libertadores" className="bg-fut-darker rounded-xl p-5 border border-gray-800 hover:border-fut-green/50 transition-all group">
            <span className="text-2xl block mb-2">🌎</span>
            <h2 className="text-white font-bold group-hover:text-fut-green transition-colors">Libertadores</h2>
            <p className="text-gray-500 text-sm mt-1">Notícias e jogos da Copa Libertadores</p>
          </Link>
          <Link href="/categoria/champions-league" className="bg-fut-darker rounded-xl p-5 border border-gray-800 hover:border-fut-green/50 transition-all group">
            <span className="text-2xl block mb-2">⭐</span>
            <h2 className="text-white font-bold group-hover:text-fut-green transition-colors">Champions League</h2>
            <p className="text-gray-500 text-sm mt-1">Notícias e jogos da Liga dos Campeões</p>
          </Link>
        </section>

        <section className="mt-6 bg-fut-darker rounded-2xl p-5 md:p-6 border border-gray-800">
          <h2 className="text-base font-bold text-white mb-3">Sobre o Futebol Ao Vivo no Fut-Lance</h2>
          <div className="text-gray-400 text-sm space-y-2">
            <p>
              O Fut-Lance é sua fonte completa para acompanhar futebol ao vivo. Reunimos todos os jogos do dia com horários oficiais, canais de transmissão e informações detalhadas de cada partida. Se você procura por jogos de hoje, resultados ao vivo ou próximos confrontos, está no lugar certo.
            </p>
            <p>
              Acesse nossa seção de notícias para ficar por dentro de tudo o que acontece no Brasileirão, Libertadores, Champions League, transferências e muito mais. Todo conteúdo é atualizado diariamente para garantir que você não perca nada.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
