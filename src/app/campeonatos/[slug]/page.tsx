import { Metadata } from 'next';
import Link from 'next/link';
import { getCampeonato, getAllCampeonatos } from '@/data/campeonatos';
import { getNoticiasByCategoria } from '@/lib/api';
import CardNoticia from '@/components/CardNoticia';
import Script from 'next/script';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const campeonatos = getAllCampeonatos();
  return campeonatos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campeonato = getCampeonato(slug);

  if (!campeonato) {
    return { title: 'Campeonato não encontrado' };
  }

  return {
    title: `${campeonato.nome} 2026 - Classificação, Jogos e Notícias | FUT LANCE`,
    description: `${campeonato.descricao} Acompanhe classificação, próximos jogos, artilheiros e muito mais no FUT LANCE.`,
    keywords: `${campeonato.nome}, ${campeonato.nome} 2026, ${campeonato.nome} classificação, ${campeonato.nome} jogos, ${campeonato.nome} ao vivo, futebol ${campeonato.pais}`,
    openGraph: {
      title: `${campeonato.nome} 2026 | FUT LANCE`,
      description: campeonato.descricao,
      url: `https://fut-lance.vercel.app/campeonatos/${campeonato.slug}`,
      siteName: 'FUT LANCE',
      locale: 'pt_BR',
      type: 'website',
    },
    alternates: {
      canonical: `https://fut-lance.vercel.app/campeonatos/${campeonato.slug}`,
    },
  };
}

export default async function CampeonatoPage({ params }: PageProps) {
  const { slug } = await params;
  const campeonato = getCampeonato(slug);

  let noticias: any[] = [];
  try {
    const slugMap: Record<string, string> = {
      'brasileirao': 'brasileirao',
      'libertadores': 'libertadores',
      'champions-league': 'champions-league',
    };
    const catSlug = slugMap[slug] || slug;
    const data = await getNoticiasByCategoria(catSlug);
    noticias = (data?.data || []).slice(0, 8);
  } catch {}

  if (!campeonato) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Campeonato não encontrado</h1>
        <Link href="/" className="text-fut-green hover:underline">Voltar ao início</Link>
      </div>
    );
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${campeonato.nome} 2026`,
    description: campeonato.descricao,
    url: `https://fut-lance.vercel.app/campeonatos/${campeonato.slug}`,
    location: {
      '@type': 'Country',
      name: campeonato.pais,
    },
    organizer: {
      '@type': 'Organization',
      name: campeonato.continente === 'América do Sul' ? 'CONMEBOL' : 'UEFA',
    },
  };

  return (
    <div>
      <Script
        id={`campeonato-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-fut-darker border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-fut-green">Início</Link>
            <span>/</span>
            <span className="text-white">{campeonato.nome}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-fut-dark via-fut-darker to-fut-dark py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{campeonato.logo}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">{campeonato.nome}</h1>
              <p className="text-gray-400 mt-1">{campeonato.periodo} • {campeonato.times} times</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl mt-4">{campeonato.descricao}</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <span className="bg-fut-green/20 text-fut-green px-3 py-1 rounded-full text-sm font-semibold">{campeonato.fase}</span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{campeonato.formato}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Classificação */}
          {campeonato.classificacao.length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">Classificação</h2>
              <div className="bg-fut-darker rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-fut-dark border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">#</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Time</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">P</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">J</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">V</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">E</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">D</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">SG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campeonato.classificacao.map((time) => (
                        <tr key={time.pos} className="border-b border-gray-800/50 hover:bg-fut-dark/50 transition-colors">
                          <td className="py-3 px-4 text-gray-400 font-semibold">{time.pos}º</td>
                          <td className="py-3 px-4 text-white font-semibold">{time.time}</td>
                          <td className="py-3 px-4 text-fut-green font-bold text-center">{time.pts}</td>
                          <td className="py-3 px-4 text-gray-400 text-center">{time.j}</td>
                          <td className="py-3 px-4 text-gray-400 text-center">{time.v}</td>
                          <td className="py-3 px-4 text-gray-400 text-center">{time.e}</td>
                          <td className="py-3 px-4 text-gray-400 text-center">{time.d}</td>
                          <td className="py-3 px-4 text-gray-400 text-center">{time.sg > 0 ? `+${time.sg}` : time.sg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Próximos Jogos */}
          <div className={campeonato.classificacao.length > 0 ? '' : 'lg:col-span-2'}>
            <h2 className="text-2xl font-bold text-white mb-6">Próximos Jogos</h2>
            <div className="space-y-4">
              {campeonato.proximosJogos.map((jogo, i) => (
                <div key={i} className="bg-fut-darker rounded-xl border border-gray-800 p-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span>{jogo.data}</span>
                    <span className="bg-fut-dark px-2 py-1 rounded">{jogo.horario}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="text-white font-bold text-sm">{jogo.mandante}</p>
                    </div>
                    <span className="text-fut-green font-bold mx-3">VS</span>
                    <div className="text-center flex-1">
                      <p className="text-white font-bold text-sm">{jogo.visitante}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">{jogo.local}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Artilheiros */}
        {campeonato.artilheiros.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Artilharia</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {campeonato.artilheiros.map((art) => (
                <div key={art.pos} className="bg-fut-darker rounded-xl border border-gray-800 p-4 flex items-center gap-4">
                  <span className="text-2xl font-extrabold text-fut-green w-8 text-center">{art.pos}º</span>
                  <div className="flex-1">
                    <p className="text-white font-bold">{art.jogador}</p>
                    <p className="text-gray-400 text-sm">{art.time}</p>
                  </div>
                  <span className="text-2xl font-extrabold text-fut-accent">{art.gols}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notícias */}
        {noticias.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Notícias</h2>
              <Link href={`/categoria/${slug}`} className="text-fut-green hover:text-green-400 text-sm font-semibold">
                Ver todas →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {noticias.map((noticia: any) => (
                <CardNoticia
                  key={noticia.id}
                  slug={noticia.slug}
                  titulo={noticia.titulo}
                  resumo={noticia.resumo}
                  imagem={noticia.imagem_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'}
                  categoria={noticia.categoria?.nome || campeonato.nome}
                  data={noticia.data_publicacao}
                />
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="mt-10 bg-fut-darker rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Acompanhe também</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/ao-vivo" className="bg-fut-accent hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              ⚽ Assistir Ao Vivo
            </Link>
            <Link href={`/categoria/${campeonato.slug}`} className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              📰 Notícias
            </Link>
            {campeonato.slug !== 'brasileirao' && (
              <Link href="/campeonatos/brasileirao" className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                🏆 Brasileirão
              </Link>
            )}
            {campeonato.slug !== 'libertadores' && (
              <Link href="/campeonatos/libertadores" className="bg-fut-dark hover:bg-fut-darker border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                🌎 Libertadores
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
