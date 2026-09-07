import Comentarios from '@/components/Comentarios';

const noticiasData: Record<string, any> = {
  'flamengo-derrota-palmeiras': {
    titulo: 'Flamengo goleia Palmeiras e assume liderança do Brasileirão',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200',
    categoria: 'Brasileirão',
    data: '07/09/2026',
    autor: 'João Silva',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    conteudo: `
      <p>O Flamengo assumiu a liderança do Brasileirão de forma autoritária, goleando o Palmeiras por 3 a 0 neste domingo, em partida válida pela 25ª rodada do campeonato.</p>
      
      <p>Pedro abriu o placar aos 12 minutos do primeiro tempo, aproveitando cruzamento de Everton Ribeiro. Gabigol ampliou aos 35, em cobrança de falta precisa. No segundo tempo, Arrascaeta selou a goleia aos 20 minutos.</p>
      
      <p>Com a vitória, o Flamengo chega a 58 pontos, abrindo 5 de vantagem sobre o Palmeiras, que tem 53. O campeonato ainda tem 13 rodadas, mas o Mengo agora comanda a reta final.</p>
      
      <p>"É uma conquista importante, mas o campeonato está longe de acabar. Precisamos manter a concentração", disse o técnico Dorival Júnior.</p>
      
      <h2>Análise Tática</h2>
      
      <p>O Flamengo jogou com um 4-2-3-1 que dominou o meio-campo. Gerson e Thiago Maio fizeram a transição enquanto David Luiz comandou a defesa. A equipe criou diversas chances e mostrou eficácia na finalização.</p>
      
      <p>O Palmeiras, por sua vez, não conseguiu impor seu jogo. Abel Ferreira viu sua equipe ser superada em todas as fases do jogo e admitiu a derrota após o apito final.</p>
    `,
  },
  'neymar-retorna-selecao': {
    titulo: 'Neymar é convocado para eliminatórias da Copa',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200',
    categoria: 'Seleção',
    data: '07/09/2026',
    autor: 'Maria Souza',
    videoUrl: null,
    conteudo: `
      <p>O técnico Tite convocou Neymar para os próximos jogos das eliminatórias sul-americanas para a Copa do Mundo de 2026. O atacante retorna à seleção após se recuperar de uma lesão no tornozelo.</p>
      
      <p>Neymar, que atualmente defende o Al-Hilal, da Arábia Saudita, fará parte do grupo que enfrentará Argentina e Uruguai nas próximas semanas.</p>
      
      <p>"O Neymar está em condições de jogar e é fundamental para nossa equipe. Ele traz criatividade e experiência que são essenciais em jogos decisivos", explicou Tite.</p>
      
      <h2>Convocados</h2>
      
      <p>A lista completa de convocados inclui: Alisson, Ederson, Weverton; Danilo, Marquinhos, Thiago Silva, Eder Militão, Alexandro; Casemiro, Fabinho, Bruno Guimarães, Lucas Paquetá, Neymar; Vinícius Júnior, Rodrygo, Richarlison, Gabriel Jesus, Raphinha.</p>
      
      <p>O Brasil enfrentará a Argentina em 12 de outubro, em Buenos Aires, e depois receberá o Uruguai, em 17 do mesmo mês, em São Paulo.</p>
    `,
  },
};

export default async function NoticiaPage({
  params,
}: {
  params: { slug: string };
}) {
  const noticia = noticiasData[params.slug] || {
    titulo: 'Notícia não encontrada',
    imagem: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200',
    categoria: 'Geral',
    data: '07/09/2026',
    autor: 'FUT LANCE',
    videoUrl: null,
    conteudo: '<p>Esta notícia está em construção. Volte em breve!</p>',
  };

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <span className="badge bg-fut-green text-white">{noticia.categoria}</span>
      </div>

      <h1 className="text-4xl font-bold text-white mb-4">{noticia.titulo}</h1>

      <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
        <span>Por {noticia.autor}</span>
        <span>•</span>
        <span>{noticia.data}</span>
      </div>

      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <img
          src={noticia.imagem}
          alt={noticia.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      {noticia.videoUrl && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">📹 Vídeo</h3>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              src={noticia.videoUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
      />

      <Comentarios noticiaSlug={params.slug} />
    </article>
  );
}
