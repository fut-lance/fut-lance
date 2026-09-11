import CardNoticia from '@/components/CardNoticia';
import { getNoticiasByCategoria } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

const categorySeoData: Record<string, { title: string; description: string; keywords: string }> = {
  'brasileirao': {
    title: 'Brasileirão — Notícias, Jogos e Futebol ao Vivo | Fut-Lance',
    description: 'Todas as notícias do Brasileirão Série A 2026. Classificação, resultados, jogos, transferências e cobertura completa do campeonato brasileiro.',
    keywords: 'brasileirão, brasileirão série a, campeonato brasileiro, futebol brasileiro, notícias brasileirão, classificação brasileirão, jogos brasileirão',
  },
  'libertadores': {
    title: 'Libertadores — Notícias, Jogos e Futebol ao Vivo | Fut-Lance',
    description: 'Cobertura completa da Copa Libertadores 2026. Notícias, resultados, classificação, confrontos e jogos ao vivo dos clubes brasileiros.',
    keywords: 'libertadores, copa libertadores, libertadores 2026, futebol sul-americano, notícias libertadores, jogos libertadores',
  },
  'champions-league': {
    title: 'Champions League — Notícias, Jogos e Futebol ao Vivo | Fut-Lance',
    description: 'Todas as notícias da UEFA Champions League 2026/27. Resultados, classificação, confrontos e cobertura completa da Liga dos Campeões.',
    keywords: 'champions league, liga dos campeões, uefa champions league, futebol europeu, notícias champions league',
  },
  'transferencias': {
    title: 'Mercado da Bola e Transferências | Fut-Lance',
    description: 'Fique por dentro de todas as transferências do futebol brasileiro e internacional. Rumores, confirmadas e negociações do mercado da bola.',
    keywords: 'transferências, mercado da bola, contratações, futebol, negociações, reforços',
  },
  'selecao': {
    title: 'Seleção Brasileira — Notícias e Jogos | Fut-Lance',
    description: 'Todas as notícias da Seleção Brasileira de Futebol. Convocações, jogos, eliminatórias e cobertura completa da Amarelinha.',
    keywords: 'seleção brasileira, seleção, canarinho, hexa, eliminarórias, jogos seleção',
  },
  'copa-do-brasil': {
    title: 'Copa do Brasil — Notícias e Jogos | Fut-Lance',
    description: 'Cobertura completa da Copa do Brasil 2026. Resultados, confrontos, classificação e notícias do torneio nacional.',
    keywords: 'copa do brasil, copa do brasil 2026, futebol, notícias copa do brasil',
  },
  'premier-league': {
    title: 'Premier League — Notícias e Futebol | Fut-Lance',
    description: 'Todas as notícias da Premier League inglesa. Resultados, classificação, transferências e cobertura do futebol inglês.',
    keywords: 'premier league, futebol inglês, liga inglesa, notícias premier league',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const seoData = categorySeoData[params.slug];
  const nomeFormatado = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: seoData?.title || `${nomeFormatado} — Notícias de Futebol | Fut-Lance`,
    description: seoData?.description || `Todas as notícias de ${nomeFormatado}. Fique por dentro do que acontece no ${nomeFormatado}.`,
    keywords: seoData?.keywords || `${nomeFormatado.toLowerCase()}, futebol, notícias`,
    openGraph: {
      title: seoData?.title || `${nomeFormatado} — Notícias de Futebol | Fut-Lance`,
      description: seoData?.description || `Todas as notícias de ${nomeFormatado}.`,
      url: `https://fut-lance.vercel.app/categoria/${params.slug}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData?.title || `${nomeFormatado} — Notícias de Futebol | Fut-Lance`,
      description: seoData?.description || `Todas as notícias de ${nomeFormatado}.`,
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/categoria/${params.slug}`,
    },
  };
}

const tabelaBrasileirao = [
  { pos: 1, time: 'Flamengo', pts: 54, j: 26, v: 16, e: 6, d: 4, gp: 51, gc: 21, sg: 30 },
  { pos: 2, time: 'Palmeiras', pts: 53, j: 26, v: 15, e: 8, d: 3, gp: 45, gc: 21, sg: 24 },
  { pos: 3, time: 'Athletico-PR', pts: 45, j: 26, v: 13, e: 6, d: 7, gp: 38, gc: 28, sg: 10 },
  { pos: 4, time: 'Fluminense', pts: 45, j: 26, v: 12, e: 9, d: 5, gp: 40, gc: 32, sg: 8 },
  { pos: 5, time: 'Bahia', pts: 43, j: 26, v: 11, e: 10, d: 5, gp: 40, gc: 32, sg: 8 },
  { pos: 6, time: 'Cruzeiro', pts: 42, j: 26, v: 12, e: 6, d: 8, gp: 38, gc: 37, sg: 1 },
  { pos: 7, time: 'Coritiba', pts: 37, j: 25, v: 10, e: 7, d: 9, gp: 34, gc: 35, sg: -1 },
  { pos: 8, time: 'Atlético-MG', pts: 36, j: 25, v: 10, e: 6, d: 9, gp: 32, gc: 30, sg: 2 },
  { pos: 9, time: 'Bragantino', pts: 35, j: 25, v: 10, e: 5, d: 10, gp: 31, gc: 28, sg: 3 },
  { pos: 10, time: 'São Paulo', pts: 33, j: 26, v: 9, e: 6, d: 11, gp: 25, gc: 37, sg: -12 },
  { pos: 11, time: 'Vitória', pts: 32, j: 26, v: 8, e: 8, d: 10, gp: 27, gc: 27, sg: 0 },
  { pos: 12, time: 'Corinthians', pts: 32, j: 25, v: 8, e: 8, d: 9, gp: 37, gc: 38, sg: -1 },
  { pos: 13, time: 'Santos', pts: 32, j: 26, v: 8, e: 8, d: 10, gp: 27, gc: 27, sg: 0 },
  { pos: 14, time: 'Botafogo', pts: 31, j: 25, v: 8, e: 7, d: 10, gp: 37, gc: 40, sg: -3 },
  { pos: 15, time: 'Grêmio', pts: 28, j: 26, v: 7, e: 7, d: 12, gp: 27, gc: 33, sg: -6 },
  { pos: 16, time: 'Mirassol', pts: 28, j: 26, v: 7, e: 7, d: 12, gp: 29, gc: 40, sg: -11 },
  { pos: 17, time: 'Vasco', pts: 25, j: 26, v: 5, e: 10, d: 11, gp: 28, gc: 34, sg: -6 },
  { pos: 18, time: 'Internacional', pts: 25, j: 26, v: 5, e: 8, d: 13, gp: 30, gc: 43, sg: -13 },
  { pos: 19, time: 'Remo', pts: 23, j: 25, v: 3, e: 8, d: 14, gp: 27, gc: 50, sg: -23 },
  { pos: 20, time: 'Chapecoense', pts: 17, j: 26, v: 5, e: 2, d: 19, gp: 23, gc: 51, sg: -28 },
];

function getZonaColor(pos: number): string {
  if (pos <= 4) return 'bg-green-500/10 text-green-400';
  if (pos === 5) return 'bg-blue-500/10 text-blue-400';
  if (pos >= 6 && pos <= 9) return 'bg-yellow-500/10 text-yellow-400';
  if (pos >= 17) return 'bg-red-500/10 text-red-400';
  return '';
}

function getZonaLabel(pos: number): string {
  if (pos <= 4) return 'Libertadores';
  if (pos === 5) return 'Libertadores ( Prévia )';
  if (pos >= 6 && pos <= 9) return 'Sul-Americana';
  if (pos >= 17) return 'Rebaixamento';
  return '';
}

export default async function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  let noticias: any[] = [];
  let categoriaNome = params.slug.replace(/-/g, ' ').toUpperCase();
  let categoriaDescricao = 'Notícias desta categoria.';

  try {
    const data = await getNoticiasByCategoria(params.slug);
    noticias = data?.data || [];

    if (noticias.length > 0 && noticias[0].categoria) {
      categoriaNome = noticias[0].categoria.nome || categoriaNome;
      categoriaDescricao = noticias[0].categoria.descricao || categoriaDescricao;
    }
  } catch (error) {
    console.error('Erro ao buscar notícias por categoria:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const categoriaIcons: Record<string, string> = {
    'brasileirao': '🏆',
    'libertadores': '🌎',
    'champions-league': '⭐',
    'transferencias': '💰',
    'premier-league': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'selecao': '🇧🇷',
    'copa-do-brasil': '🏆',
    'flamengo': '🔴⚫',
    'palmeiras': '🟢🟢',
    'corinthians': '⚫⚪',
    'sao-paulo': '🔴⚪⚫',
  };

  const icon = categoriaIcons[params.slug] || '📰';
  const isBrasileirao = params.slug === 'brasileirao';

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoriaNome} - Notícias de Futebol`,
    description: categoriaDescricao,
    url: `https://fut-lance.vercel.app/categoria/${params.slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'FUT LANCE',
      url: 'https://fut-lance.vercel.app',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: categoriaNome, item: `https://fut-lance.vercel.app/categoria/${params.slug}` },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300">{categoriaNome}</span>
      </nav>

      <div className="mb-8">
        <span className="text-5xl mb-4 block">{icon}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{categoriaNome}</h1>
        <p className="text-gray-400">{categoriaDescricao}</p>
      </div>

      {isBrasileirao && (
        <section className="mb-10 bg-fut-darker rounded-xl border border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <div>
              <h2 className="text-base font-bold text-white">Classificação do Brasileirão 2026</h2>
              <p className="text-gray-500 text-[10px]">Rodada 26 • Atualizado em 09/09/2026 • Fonte: ESPN</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 text-[10px] uppercase border-b border-gray-800">
                  <th className="text-left px-2 py-1.5 w-6">#</th>
                  <th className="text-left px-2 py-1.5">Time</th>
                  <th className="text-center px-1.5 py-1.5">P</th>
                  <th className="text-center px-1.5 py-1.5 hidden sm:table-cell">J</th>
                  <th className="text-center px-1.5 py-1.5 hidden sm:table-cell">V</th>
                  <th className="text-center px-1.5 py-1.5 hidden sm:table-cell">E</th>
                  <th className="text-center px-1.5 py-1.5 hidden sm:table-cell">D</th>
                  <th className="text-center px-1.5 py-1.5 hidden md:table-cell">SG</th>
                </tr>
              </thead>
              <tbody>
                {tabelaBrasileirao.map((row) => (
                  <tr
                    key={row.pos}
                    className={`border-b border-gray-800/50 hover:bg-fut-dark/50 transition-colors ${getZonaColor(row.pos)}`}
                  >
                    <td className="px-2 py-1.5 font-bold">{row.pos}</td>
                    <td className="px-2 py-1.5 font-semibold text-white">{row.time}</td>
                    <td className="text-center px-1.5 py-1.5 font-bold text-fut-green">{row.pts}</td>
                    <td className="text-center px-1.5 py-1.5 hidden sm:table-cell text-gray-400">{row.j}</td>
                    <td className="text-center px-1.5 py-1.5 hidden sm:table-cell text-gray-400">{row.v}</td>
                    <td className="text-center px-1.5 py-1.5 hidden sm:table-cell text-gray-400">{row.e}</td>
                    <td className="text-center px-1.5 py-1.5 hidden sm:table-cell text-gray-400">{row.d}</td>
                    <td className={`text-center px-1.5 py-1.5 hidden md:table-cell font-bold ${row.sg > 0 ? 'text-green-400' : row.sg < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {row.sg > 0 ? `+${row.sg}` : row.sg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-gray-800 flex flex-wrap gap-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> Libertadores</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span> Pré-Libertadores</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block"></span> Sul-Americana</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span> Rebaixamento</span>
          </div>
        </section>
      )}

      {noticias.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia: any) => (
            <CardNoticia
              key={noticia.id}
              slug={noticia.documentId}
              titulo={noticia.titulo}
              resumo={noticia.resumo}
              imagem={noticia.imagem_url || (noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800')}
              categoria={noticia.categoria?.nome || 'Geral'}
              data={noticia.data_publicacao}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">{icon}</span>
          <p className="text-gray-400 text-lg">
            Nenhuma notícia encontrada nesta categoria.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-fut-green hover:text-green-400 font-semibold mt-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para a página inicial
          </Link>
        </div>
      )}
    </div>
  );
}
