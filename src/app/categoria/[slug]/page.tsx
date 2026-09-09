import CardNoticia from '@/components/CardNoticia';
import { getNoticiasByCategoria } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const nomeFormatado = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `Notícias de ${nomeFormatado}`,
    description: `Todas as notícias de ${nomeFormatado}. Fique por dentro do que acontece no ${nomeFormatado}.`,
    keywords: `${nomeFormatado.toLowerCase()}, futebol, notícias`,
    alternates: {
      canonical: `https://fut-lance.vercel.app/categoria/${params.slug}`,
    },
  };
}

const tabelaBrasileirao = [
  { pos: 1, time: 'Palmeiras', pts: 52, j: 25, v: 15, e: 7, d: 3, gp: 45, gc: 21, sg: 24 },
  { pos: 2, time: 'Flamengo', pts: 51, j: 25, v: 15, e: 6, d: 4, gp: 50, gc: 21, sg: 29 },
  { pos: 3, time: 'Athletico-PR', pts: 45, j: 25, v: 13, e: 6, d: 6, gp: 37, gc: 25, sg: 12 },
  { pos: 4, time: 'Fluminense', pts: 45, j: 26, v: 12, e: 9, d: 5, gp: 40, gc: 32, sg: 8 },
  { pos: 5, time: 'Bahia', pts: 43, j: 26, v: 11, e: 10, d: 5, gp: 40, gc: 32, sg: 8 },
  { pos: 6, time: 'Cruzeiro', pts: 39, j: 25, v: 11, e: 6, d: 8, gp: 35, gc: 36, sg: -1 },
  { pos: 7, time: 'Coritiba', pts: 37, j: 25, v: 10, e: 7, d: 8, gp: 33, gc: 33, sg: 0 },
  { pos: 8, time: 'Atlético-MG', pts: 36, j: 25, v: 10, e: 6, d: 9, gp: 32, gc: 30, sg: 2 },
  { pos: 9, time: 'Bragantino', pts: 35, j: 25, v: 10, e: 5, d: 10, gp: 31, gc: 28, sg: 3 },
  { pos: 10, time: 'Corinthians', pts: 32, j: 25, v: 8, e: 8, d: 9, gp: 26, gc: 25, sg: 1 },
  { pos: 11, time: 'Santos', pts: 32, j: 25, v: 8, e: 8, d: 9, gp: 37, gc: 38, sg: -1 },
  { pos: 12, time: 'Botafogo', pts: 31, j: 25, v: 8, e: 7, d: 10, gp: 37, gc: 40, sg: -3 },
  { pos: 13, time: 'São Paulo', pts: 30, j: 24, v: 8, e: 6, d: 10, gp: 29, gc: 28, sg: 1 },
  { pos: 14, time: 'Vitória', pts: 29, j: 25, v: 8, e: 5, d: 12, gp: 24, gc: 37, sg: -13 },
  { pos: 15, time: 'Grêmio', pts: 28, j: 24, v: 7, e: 7, d: 10, gp: 27, gc: 32, sg: -5 },
  { pos: 16, time: 'Mirassol', pts: 28, j: 26, v: 7, e: 7, d: 12, gp: 29, gc: 40, sg: -11 },
  { pos: 17, time: 'Vasco', pts: 25, j: 25, v: 6, e: 7, d: 12, gp: 27, gc: 40, sg: -13 },
  { pos: 18, time: 'Internacional', pts: 25, j: 26, v: 5, e: 10, d: 11, gp: 28, gc: 34, sg: -6 },
  { pos: 19, time: 'Remo', pts: 23, j: 26, v: 5, e: 8, d: 13, gp: 30, gc: 43, sg: -13 },
  { pos: 20, time: 'Chapecoense', pts: 14, j: 24, v: 2, e: 8, d: 14, gp: 25, gc: 49, sg: -24 },
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

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
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
              <p className="text-gray-500 text-[10px]">Rodada 26 • Atualizado em 09/09/2026</p>
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
