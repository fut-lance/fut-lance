import Link from 'next/link';
import CardNoticia from '@/components/CardNoticia';
import { getNoticias, getTransmissoesAoVivo } from '@/lib/api';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let noticiasDestaque: any[] = [];
  let ultimasNoticias: any[] = [];
  let transmissoes: any[] = [];

  try {
    const data = await getNoticias(1, 8);
    const allNoticias = data?.data || [];
    noticiasDestaque = allNoticias.slice(0, 3);
    ultimasNoticias = allNoticias.slice(3, 7);
  } catch (error) {
    console.error('Erro ao buscar noticias:', error);
  }

  try {
    const data = await getTransmissoesAoVivo();
    transmissoes = data?.data || [];
  } catch (error) {
    console.error('Erro ao buscar transmissoes:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FUT LANCE - Noticias de Futebol',
    description: 'O melhor blog de noticias de futebol do Brasil.',
    url: 'https://fut-lance.vercel.app',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: noticiasDestaque.length + ultimasNoticias.length,
      itemListElement: [...noticiasDestaque, ...ultimasNoticias].slice(0, 7).map((n: any, i: number) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://fut-lance.vercel.app/noticias/${n.documentId}`,
        name: n.titulo,
      })),
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6 text-fut-green">
          <span className="text-fut-accent">⚡</span> Destaques
        </h1>
        {noticiasDestaque.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {noticiasDestaque.map((noticia: any) => (
              <CardNoticia
                key={noticia.id}
                slug={noticia.documentId}
                titulo={noticia.titulo}
                resumo={noticia.resumo}
                imagem={noticia.imagem_url || (noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800')}
                categoria={noticia.categoria?.nome || 'Geral'}
                data={noticia.data_publicacao}
                destaque
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CardNoticia slug="placeholder" titulo="Nenhuma noticia encontrada" resumo="Cadastre noticias no Strapi" imagem="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800" categoria="Geral" data="07/09/2026" destaque />
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            Ultimas Noticias
          </h2>
          <Link
            href="/noticias"
            className="text-fut-green hover:text-green-400 font-semibold"
          >
            Ver todas →
          </Link>
        </div>
        {ultimasNoticias.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ultimasNoticias.map((noticia: any) => (
              <CardNoticia
                key={noticia.id}
                slug={noticia.documentId}
                titulo={noticia.titulo}
                resumo={noticia.resumo}
                imagem={noticia.imagem_url || (noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800')}
                categoria={noticia.categoria?.nome || 'Geral'}
                data={noticia.data_publicacao}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardNoticia slug="placeholder2" titulo="Nenhuma noticia" resumo="Cadastre no Strapi" imagem="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800" categoria="Geral" data="07/09/2026" />
          </div>
        )}
      </section>

      <section className="mt-12 bg-fut-darker rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-fut-accent">
          Assistir Ao Vivo
        </h2>
        <p className="text-gray-300 mb-6">
          Confira as transmissoes ao vivo dos principais jogos de futebol. ESPN, SporTV, Premiere, Band Sports e mais.
        </p>
        <Link href="/ao-vivo" className="btn-accent inline-block">
          Assistir Agora
        </Link>
      </section>
    </div>
  );
}
