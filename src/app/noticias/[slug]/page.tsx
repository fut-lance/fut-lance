import Comentarios from '@/components/Comentarios';
import { getNoticiaBySlug } from '@/lib/api';
import Link from 'next/link';

export const revalidate = 60;

export default async function NoticiaPage({
  params,
}: {
  params: { slug: string };
}) {
  const noticia = await getNoticiaBySlug(params.slug);
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  if (!noticia) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Notícia não encontrada</h1>
        <p className="text-gray-400 mb-6">Esta notícia não existe ou foi removida.</p>
        <Link href="/" className="text-fut-green hover:text-green-400 font-semibold">
          ← Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const imagemUrl = noticia.imagem_url || (noticia.imagem_capa?.url
    ? `${apiUrl}${noticia.imagem_capa.url}`
    : 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200');

  const formatData = (data: string) => {
    if (!data) return '';
    try {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return data;
    }
  };

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <span className="badge bg-fut-green text-white">
          {noticia.categoria?.nome || 'Geral'}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-white mb-4">{noticia.titulo}</h1>

      <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
        {noticia.autor && <span>Por {noticia.autor}</span>}
        {noticia.autor && <span>•</span>}
        <span>{formatData(noticia.data_publicacao)}</span>
      </div>

      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <img
          src={imagemUrl}
          alt={noticia.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      {noticia.video_url && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">📹 Vídeo</h3>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              src={noticia.video_url}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {noticia.resumo && (
        <div className="bg-fut-darker rounded-lg p-6 mb-8">
          <p className="text-gray-300 text-lg italic">{noticia.resumo}</p>
        </div>
      )}

      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: noticia.conteudo || '<p>Conteúdo não disponível.</p>' }}
      />

      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link href="/" className="text-fut-green hover:text-green-400 font-semibold">
          ← Voltar para notícias
        </Link>
      </div>

      <Comentarios noticiaId={noticia.id} noticiaSlug={params.slug} />
    </article>
  );
}