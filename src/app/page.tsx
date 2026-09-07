import Link from 'next/link';
import CardNoticia from '@/components/CardNoticia';

const noticiasDestaque = [
  {
    slug: 'flamengo-derrota-palmeiras',
    titulo: 'Flamengo goleia Palmeiras eassume liderança do Brasileirão',
    resumo: 'Com gols de Pedro, Gabigol e Arrascaeta, o Mengo venceu por 3 a 0 e abriu 5 pontos de vantagem no campeonato.',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    categoria: 'Brasileirão',
    data: '07/09/2026',
  },
  {
    slug: 'neymar-retorna-selecao',
    titulo: 'Neymar é convocado paraeliminatórias da Copa',
    resumo: 'Tite convoca Neymar para os jogos contra Argentina e Uruguai naseliminatórias sul-americanas.',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    categoria: 'Seleção',
    data: '07/09/2026',
  },
  {
    slug: 'libertadores-semifinal',
    titulo: 'Definidas as semifinais daLibertadores',
    resumo: 'Botafogo, Flamengo, River Plate e Boca Juniors disputam as vagas na grande final.',
    imagem: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=800',
    categoria: 'Libertadores',
    data: '06/09/2026',
  },
];

const ultimasNoticias = [
  {
    slug: 'mancity-contrata-midfielder',
    titulo: 'Manchester City fecha contratação de meio-campista francês',
    resumo: 'Clube inglês paga R$ 350 milhões pelo talento do Monaco.',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    categoria: 'Transferências',
    data: '06/09/2026',
  },
  {
    slug: 'brasileirao-serie-b',
    titulo: 'Série B: Coritiba e Santos brigam pelo acesso',
    resumo: 'A争 rondomata do acesso ao返 Premier League brasileiro está acirrada.',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    categoria: 'Brasileirão',
    data: '06/09/2026',
  },
  {
    slug: 'premier-league-rodada',
    titulo: 'Premier League: Liverpool goleia Manchester United',
    resumo: 'Salah faz hat-trick na vitória por 4 a 0 no Old Trafford.',
    imagem: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=800',
    categoria: 'Premier League',
    data: '05/09/2026',
  },
  {
    slug: 'copa-do-brasil',
    titulo: 'Copa do Brasil: Atlético-MG elimina São Paulo',
    resumo: 'Galo vence nos pênaltis e avança para semifinal.',
    imagem: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    categoria: 'Copa do Brasil',
    data: '05/09/2026',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-fut-green">
          <span className="text-fut-accent">⚡</span> Destaques
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {noticiasDestaque.map((noticia) => (
            <CardNoticia key={noticia.slug} {...noticia} destaque />
          ))}
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ultimasNoticias.map((noticia) => (
            <CardNoticia key={noticia.slug} {...noticia} />
          ))}
        </div>
      </section>

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
    </div>
  );
}
