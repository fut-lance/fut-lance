import { Metadata } from 'next';
import Link from 'next/link';
import { matches, type Match } from '@/data/matches';
import { notFound } from 'next/navigation';
import AoVivoClient from '../AoVivoClient';

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

  const title = `${match.timeMandante} x ${match.timeVisitante} ao vivo — ${match.competicao} | Fut-Lance`;
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

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${match.timeMandante} x ${match.timeVisitante}`,
    description: `${match.competicao} - ${match.timeMandante} x ${match.timeVisitante}`,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
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
            <AoVivoClient />
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
              </div>
            </div>

            <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
              <h2 className="text-white font-bold mb-3">Canais de Transmissão</h2>
              <div className="space-y-2">
                {match.canais.map((ch, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-fut-green rounded-full" />
                    <span className="text-gray-300">{ch.nome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
              <h2 className="text-white font-bold mb-3">Próximos Jogos</h2>
              <div className="space-y-3">
                {matches
                  .filter((m) => m.id !== match.id)
                  .slice(0, 3)
                  .map((m) => (
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
          </div>
        </div>
      </div>
    </>
  );
}
