import { Metadata } from 'next';
import Link from 'next/link';
import { matches } from '@/data/matches';

export const metadata: Metadata = {
  title: 'Brasileirão Ao Vivo — Jogos Hoje, Classificação e Onde Assistir | Fut-Lance',
  description: 'Brasileirão ao vivo hoje: acompanhe todos os jogos do Campeonato Brasileiro Série A ao vivo, classificação atualizada, artilhários e onde assistir. Resultados em tempo real.',
  keywords: 'brasileirão ao vivo, brasileirão ao vivo hoje, campeonato brasileiro ao vivo, série a ao vivo, jogos do brasileirão hoje, brasileirão ao vivo grátis, assistir brasileirão ao vivo, futebol brasileiro ao vivo',
  openGraph: {
    title: 'Brasileirão Ao Vivo — Jogos Hoje e Classificação | Fut-Lance',
    description: 'Acompanhe o Brasileirão ao vivo: jogos de hoje, classificação, artilhários e onde assistir. Tudo sobre o Campeonato Brasileiro Série A.',
    url: 'https://fut-lance.vercel.app/brasileirao-ao-vivo',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brasileirão Ao Vivo — Jogos Hoje | Fut-Lance',
    description: 'Acompanhe o Brasileirão ao vivo: jogos de hoje, classificação e onde assistir.',
  },
  alternates: {
    canonical: 'https://fut-lance.vercel.app/brasileirao-ao-vivo',
  },
};

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

export default function BrasileiraoAoVivoPage() {
  const brasileiraoMatches = matches.filter(m => m.competicao.toLowerCase().includes('brasileir'));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Brasileirão Ao Vivo', item: 'https://fut-lance.vercel.app/brasileirao-ao-vivo' },
    ],
  };

  const eventSchemas = brasileiraoMatches.map((match) => {
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
      location: { '@type': 'VirtualLocation', url: 'https://fut-lance.vercel.app/brasileirao-ao-vivo' },
      organizer: { '@type': 'Organization', name: 'FUT LANCE', url: 'https://fut-lance.vercel.app' },
      performer: [
        { '@type': 'SportsTeam', name: match.timeMandante },
        { '@type': 'SportsTeam', name: match.timeVisitante },
      ],
      superEvent: { '@type': 'SportsLeague', name: 'Brasileirão Série A' },
    };
  });

  const ranking = [
    { pos: 1, time: 'Flamengo', pts: 54, j: 26, v: 16, e: 6, d: 4, gp: 51, gc: 21, sg: 30 },
    { pos: 2, time: 'Palmeiras', pts: 53, j: 26, v: 15, e: 8, d: 3, gp: 45, gc: 21, sg: 24 },
    { pos: 3, time: 'Athletico-PR', pts: 45, j: 26, v: 13, e: 6, d: 7, gp: 38, gc: 28, sg: 10 },
    { pos: 4, time: 'Fluminense', pts: 45, j: 26, v: 12, e: 9, d: 5, gp: 40, gc: 32, sg: 8 },
    { pos: 5, time: 'Bahia', pts: 43, j: 26, v: 11, e: 10, d: 5, gp: 40, gc: 32, sg: 8 },
    { pos: 6, time: 'Cruzeiro', pts: 42, j: 26, v: 12, e: 6, d: 8, gp: 38, gc: 37, sg: 1 },
    { pos: 7, time: 'Coritiba', pts: 37, j: 26, v: 10, e: 7, d: 9, gp: 34, gc: 35, sg: -1 },
    { pos: 8, time: 'Atlético-MG', pts: 36, j: 25, v: 10, e: 6, d: 9, gp: 32, gc: 30, sg: 2 },
    { pos: 9, time: 'Bragantino', pts: 35, j: 25, v: 10, e: 5, d: 10, gp: 31, gc: 28, sg: 3 },
    { pos: 10, time: 'São Paulo', pts: 33, j: 25, v: 9, e: 6, d: 10, gp: 31, gc: 28, sg: 3 },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {eventSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="container mx-auto px-4 py-6 md:py-8">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">Brasileirão Ao Vivo</span>
        </nav>

        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-3 h-3 bg-fut-accent rounded-full animate-pulse" />
            <h1 className="text-2xl md:text-4xl font-bold text-white">Brasileirão Ao Vivo Hoje</h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Acompanhe o <strong className="text-white">Campeonato Brasileiro Série A ao vivo</strong> no Fut-Lance. Aqui você encontra todos os jogos do Brasileirão de hoje com horários, canais de transmissão e placar em tempo real. Confira também a classificação atualizada do Brasileirão 2026.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-fut-green">⚽</span> Jogos do Brasileirão Hoje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brasileiraoMatches.map((match, i) => {
              const [d, m, y] = match.data.split('/').map(Number);
              const [h, min] = match.horario.split(':').map(Number);
              const startDate = new Date(y, m - 1, d, h, min);
              const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
              const now = new Date();
              const isLive = now >= startDate && now <= endDate;
              const isFinished = now > endDate;

              return (
                <Link
                  key={i}
                  href={`/ao-vivo/${match.slug}`}
                  className={`rounded-xl p-4 border transition-all hover:shadow-lg ${
                    isLive
                      ? 'bg-red-900/20 border-red-500/50 animate-pulse'
                      : isFinished
                      ? 'bg-gray-900/50 border-gray-700'
                      : 'bg-fut-darker border-gray-800 hover:border-fut-green/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{match.competicao}</span>
                    {isLive && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">AO VIVO</span>}
                    {isFinished && <span className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded">ENCERRADO</span>}
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">{match.timeMandante} x {match.timeVisitante}</div>
                    <div className="text-gray-400 text-sm mt-1">{match.data} às {match.horario}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-fut-green">🏆</span> Classificação Brasileirão 2026
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 py-2 px-2">#</th>
                  <th className="text-left text-gray-400 py-2 px-2">Time</th>
                  <th className="text-center text-gray-400 py-2 px-2">P</th>
                  <th className="text-center text-gray-400 py-2 px-2">J</th>
                  <th className="text-center text-gray-400 py-2 px-2">V</th>
                  <th className="text-center text-gray-400 py-2 px-2">E</th>
                  <th className="text-center text-gray-400 py-2 px-2">D</th>
                  <th className="text-center text-gray-400 py-2 px-2">SG</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((team) => (
                  <tr key={team.pos} className="border-b border-gray-800 hover:bg-fut-dark/50">
                    <td className="py-2 px-2 text-gray-400">{team.pos}º</td>
                    <td className="py-2 px-2 text-white font-medium">{team.time}</td>
                    <td className="py-2 px-2 text-fut-green font-bold text-center">{team.pts}</td>
                    <td className="py-2 px-2 text-gray-400 text-center">{team.j}</td>
                    <td className="py-2 px-2 text-gray-400 text-center">{team.v}</td>
                    <td className="py-2 px-2 text-gray-400 text-center">{team.e}</td>
                    <td className="py-2 px-2 text-gray-400 text-center">{team.d}</td>
                    <td className="py-2 px-2 text-gray-400 text-center">{team.sg > 0 ? `+${team.sg}` : team.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/campeonatos/brasileirao" className="text-fut-green hover:underline text-sm mt-3 block">
            Ver classificação completa →
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
            <h3 className="text-white font-bold mb-2">📺 Onde Assistir</h3>
            <p className="text-gray-400 text-sm">Brasileirão ao vivo na: SporTV, Premiere, Globo, CazéTV (jogos selecionados)</p>
          </div>
          <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
            <h3 className="text-white font-bold mb-2">📊 Rodada Atual</h3>
            <p className="text-gray-400 text-sm">Rodada 27 do Brasileirão Série A 2026 em andamento</p>
          </div>
          <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
            <h3 className="text-white font-bold mb-2">⚽ Artilheiro</h3>
            <p className="text-gray-400 text-sm">Kevin Rodallega (17 gols) é o artilheiro do Brasileirão 2026</p>
          </div>
        </section>

        <section className="mt-8 bg-fut-darker rounded-2xl p-5 md:p-6 border border-gray-800">
          <h2 className="text-base font-bold text-white mb-3">Brasileirão Ao Vivo — Como Assistir no Fut-Lance</h2>
          <div className="text-gray-400 text-sm space-y-2">
            <p>
              O Fut-Lance é o melhor lugar para acompanhar o <strong className="text-white">Brasileirão ao vivo</strong>. Se você procura jogos do Campeonato Brasileiro Série A ao vivo, gratuitos ou na TV, está no site certo. Oferecemos horários, canais de transmissão e informações detalhadas de cada partida.
            </p>
            <p>
              Acompanhe partidas como <strong className="text-white">Flamengo x Palmeiras ao vivo</strong>, <strong className="text-white">Corinthians ao vivo hoje</strong>, <strong className="text-white">Santos ao vivo</strong> e muito mais. Nosso conteúdo é atualizado constantemente para garantir que você não perca nenhum lance do seu time do coração.
            </p>
            <p>
              Para ver a classificação completa, acesse nossa <Link href="/campeonatos/brasileirao" className="text-fut-green hover:underline">página do Brasileirão</Link>. Para ver todos os jogos do dia, acesse nossa <Link href="/ao-vivo" className="text-fut-green hover:underline">seção de jogos ao vivo</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
