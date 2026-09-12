import { Metadata } from 'next';
import { matches } from '@/data/matches';
import BrasileiraoAoVivoClient from './BrasileiraoAoVivoClient';

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {eventSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <BrasileiraoAoVivoClient />
    </>
  );
}
