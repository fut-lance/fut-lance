import Link from 'next/link';

interface CardNoticiaProps {
  slug: string;
  titulo: string;
  resumo: string;
  imagem: string;
  categoria: string;
  data: string;
  destaque?: boolean;
}

export default function CardNoticia({
  slug,
  titulo,
  resumo,
  imagem,
  categoria,
  data,
  destaque = false,
}: CardNoticiaProps) {
  const categoriaColors: Record<string, string> = {
    'Brasileirão': 'bg-green-600',
    'Libertadores': 'bg-yellow-600',
    'Champions League': 'bg-blue-600',
    'Transferências': 'bg-purple-600',
    'Seleção': 'bg-fut-accent',
    'Premier League': 'bg-red-700',
    'Copa do Brasil': 'bg-orange-600',
    'Flamengo': 'bg-red-800',
    'Palmeiras': 'bg-green-700',
    'Corinthians': 'bg-gray-800',
    'São Paulo': 'bg-red-900',
  };

  const badgeColor = categoriaColors[categoria] || 'bg-gray-600';

  const formatData = (data: string) => {
    if (!data) return '';
    try {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return data;
    }
  };

  return (
    <Link href={`/noticias/${slug}`}>
      <article
        className={`card group cursor-pointer h-full flex flex-col ${
          destaque ? 'lg:col-span-1' : ''
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span
            className={`absolute top-3 left-3 badge text-white ${badgeColor}`}
          >
            {categoria}
          </span>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3
            className={`font-bold text-white group-hover:text-fut-green transition-colors mb-2 leading-snug ${
              destaque ? 'text-xl' : 'text-base'
            }`}
          >
            {titulo}
          </h3>

          {resumo && (
            <p className="text-gray-400 text-sm flex-1 line-clamp-2 leading-relaxed">{resumo}</p>
          )}

          <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
            <span className="text-gray-500 text-xs">{formatData(data)}</span>
            <span className="text-fut-green text-sm font-medium group-hover:underline flex items-center gap-1">
              Ler mais
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
