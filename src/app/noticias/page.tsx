import CardNoticia from '@/components/CardNoticia';
import { getNoticias } from '@/lib/api';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Todas as Noticias de Futebol',
  description: 'Confira todas as ultimas noticias de futebol do Brasil e do mundo. Brasileirao, Libertadores, Champions League, transferencias e mais.',
  alternates: {
    canonical: 'https://fut-lance.vercel.app/noticias',
  },
};

export default async function NoticiasPage() {
  let noticias: any[] = [];

  try {
    const data = await getNoticias(1, 20);
    noticias = data?.data || [];
  } catch (error) {
    console.error('Erro ao buscar noticias:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        Todas as Noticias
      </h1>
      <p className="text-gray-400 mb-8">
        Fique por dentro de tudo que acontece no mundo do futebol.
      </p>

      {noticias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Nenhuma noticia encontrada.</p>
          <p className="text-gray-500 mt-2">Cadastre noticias no Strapi para que aparecam aqui.</p>
        </div>
      )}
    </div>
  );
}
