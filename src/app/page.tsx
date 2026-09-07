import Link from 'next/link';
import CardNoticia from '@/components/CardNoticia';
import { getNoticias, getTransmissoesAoVivo } from '@/lib/api';

export const revalidate = 60;

export default async function Home() {
  let noticiasDestaque: any[] = [];
  let ultimasNoticias: any[] = [];
  let transmissoes: any[] = [];

  try {
    const data = await getNoticias(1, 4);
    const allNoticias = data?.data || [];
    noticiasDestaque = allNoticias.slice(0, 3);
    ultimasNoticias = allNoticias.slice(3, 7);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }

  try {
    const data = await getTransmissoesAoVivo();
    transmissoes = data?.data || [];
  } catch (error) {
    console.error('Erro ao buscar transmissões:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-fut-green">
          <span className="text-fut-accent">⚡</span> Destaques
        </h2>
        {noticiasDestaque.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {noticiasDestaque.map((noticia: any) => (
              <CardNoticia
                key={noticia.id}
                slug={noticia.slug}
                titulo={noticia.titulo}
                resumo={noticia.resumo}
                imagem={noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800'}
                categoria={noticia.categoria?.nome || 'Geral'}
                data={noticia.data_publicacao}
                destaque
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CardNoticia slug="placeholder" titulo="Nenhuma notícia encontrada" resumo="Cadastre notícias no Strapi" imagem="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800" categoria="Geral" data="07/09/2026" destaque />
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            Últimas Notícias
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
                slug={noticia.slug}
                titulo={noticia.titulo}
                resumo={noticia.resumo}
                imagem={noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'}
                categoria={noticia.categoria?.nome || 'Geral'}
                data={noticia.data_publicacao}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardNoticia slug="placeholder2" titulo="Nenhuma notícia" resumo="Cadastre no Strapi" imagem="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800" categoria="Geral" data="07/09/2026" />
          </div>
        )}
      </section>

      {transmissoes.length > 0 && (
        <section className="mt-12 bg-fut-darker rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-fut-accent">
            Assistir Ao Vivo
          </h2>
          <p className="text-gray-300 mb-6">
            {transmissoes.length} transmissão(ões) ao vivo disponível(is)
          </p>
          <Link href="/ao-vivo" className="btn-accent inline-block">
            Assistir Agora
          </Link>
        </section>
      )}

      {transmissoes.length === 0 && (
        <section className="mt-12 bg-fut-darker rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-fut-accent">
            Assistir Ao Vivo
          </h2>
          <p className="text-gray-300 mb-6">
            Confira as transmissões ao vivo dos principais jogos do futebol mundial.
          </p>
          <Link href="/ao-vivo" className="btn-accent inline-block">
            Assistir Agora
          </Link>
        </section>
      )}
    </div>
  );
}