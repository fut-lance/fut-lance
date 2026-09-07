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
  };

  const badgeColor = categoriaColors[categoria] || 'bg-gray-600';

  return (
    <Link href={`/noticia/${slug}`}>
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
          />
          <span
            className={`absolute top-2 left-2 badge text-white ${badgeColor}`}
          >
            {categoria}
          </span>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3
            className={`font-bold text-white group-hover:text-fut-green transition-colors mb-2 ${
              destaque ? 'text-xl' : 'text-lg'
            }`}
          >
            {titulo}
          </h3>

          <p className="text-gray-400 text-sm flex-1 line-clamp-3">{resumo}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-500 text-xs">{data}</span>
            <span className="text-fut-green text-sm font-medium group-hover:underline">
              Ler mais →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
