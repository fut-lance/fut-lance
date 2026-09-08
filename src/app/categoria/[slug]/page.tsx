import CardNoticia from '@/components/CardNoticia';
import { getNoticiasByCategoria } from '@/lib/api';
import Link from 'next/link';

export const revalidate = 60;

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
  };

  const icon = categoriaIcons[params.slug] || '📰';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-5xl mb-4 block">{icon}</span>
        <h1 className="text-4xl font-bold text-white mb-2">{categoriaNome}</h1>
        <p className="text-gray-400">{categoriaDescricao}</p>
      </div>

      {noticias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia: any) => (
            <CardNoticia
              key={noticia.id}
              slug={noticia.documentId}
              titulo={noticia.titulo}
              resumo={noticia.resumo}
              imagem={noticia.imagem_capa?.url ? `${apiUrl}${noticia.imagem_capa.url}` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800'}
              categoria={noticia.categoria?.nome || 'Geral'}
              data={noticia.data_publicacao}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            Nenhuma notícia encontrada nesta categoria.
          </p>
          <Link href="/" className="text-fut-green hover:text-green-400 font-semibold mt-4 inline-block">
            ← Voltar para a página inicial
          </Link>
        </div>
      )}
    </div>
  );
}