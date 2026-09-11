import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Onde Assistir Futebol ao Vivo - Guia Completo de TV e Streaming | FUT LANCE',
  description: 'Guia completo de onde assistir futebol ao vivo no Brasil. ESPN, SporTV, Premiere, HBO Max, Paramount+, Disney+ e mais. Confira a programação completa.',
  keywords: 'onde assistir futebol, futebol na TV, ESPN, SporTV, Premiere, HBO Max, Paramount+, Disney+, futebol ao vivo, programação futebol',
  openGraph: {
    title: 'Onde Assistir Futebol ao Vivo | FUT LANCE',
    description: 'Guia completo de onde assistir futebol ao vivo no Brasil.',
    url: 'https://fut-lance.vercel.app/onde-assistir',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fut-lance.vercel.app/onde-assistir',
  },
};

export default function OndeAssistirPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Onde Assistir Futebol ao Vivo',
    description: 'Guia completo de onde assistir futebol ao vivo no Brasil.',
    url: 'https://fut-lance.vercel.app/onde-assistir',
  };

  const canais = [
    {
      nome: 'ESPN',
      tipo: 'TV Fechada',
      competicoes: ['Premier League', 'La Liga', 'Champions League', 'Copa do Brasil'],
      plano: 'Globoplay com HBO Max ou ESPN no pacote de TV fechada',
      preco: 'A partir de R$ 69,90/mês (Globoplay)',
      site: 'https://www.globoplay.com',
    },
    {
      nome: 'SporTV',
      tipo: 'TV Fechada',
      competicoes: ['Brasileirão', 'Libertadores', 'Copa do Brasil', 'Champions League'],
      plano: 'TV por assinatura (Claro, Sky, etc.)',
      preco: 'Variável por operadora',
      site: 'https://ge.globo.com/sporetv/',
    },
    {
      nome: 'Premiere',
      tipo: 'TV Fechada / Streaming',
      competicoes: ['Brasileirão', 'Série B', 'Copa do Brasil'],
      plano: 'TV por assinatura ou Globoplay',
      preco: 'Incluído no Globoplay',
      site: 'https://www.globoplay.com',
    },
    {
      nome: 'HBO Max',
      tipo: 'Streaming',
      competicoes: ['Champions League', 'Europa League', 'Conference League'],
      plano: 'Assinatura digital',
      preco: 'A partir de R$ 34,90/mês',
      site: 'https://www.max.com',
    },
    {
      nome: 'Paramount+',
      tipo: 'Streaming',
      competicoes: ['Sul-Americana', 'Conference League', 'Campeonato Italiano'],
      plano: 'Assinatura digital',
      preco: 'A partir de R$ 24,90/mês',
      site: 'https://www.paramountplus.com',
    },
    {
      nome: 'Disney+',
      tipo: 'Streaming',
      competicoes: ['Champions League', 'Premier League', 'La Liga'],
      plano: 'Assinatura digital',
      preco: 'A partir de R$ 27,90/mês',
      site: 'https://www.disneyplus.com',
    },
    {
      nome: 'Amazon Prime Video',
      tipo: 'Streaming',
      competicoes: ['Premier League', 'Champions League'],
      plano: 'Assinatura digital',
      preco: 'R$ 14,90/mês',
      site: 'https://www.amazon.com/primevideo',
    },
    {
      nome: 'Band',
      tipo: 'TV Aberta',
      competicoes: ['Brasileirão (selecionados)', 'Libertadores (selecionados)'],
      plano: 'Gratuito (TV aberta)',
      preco: 'Gratuito',
      site: 'https://www.band.uol.com.br',
    },
  ];

  const porCompeticao = [
    {
      competicao: 'Brasileirão Série A',
      canais: ['SporTV', 'Premiere', 'Band'],
      streaming: ['Globoplay'],
    },
    {
      competicao: 'Copa Libertadores',
      canais: ['SporTV', 'ESPN'],
      streaming: ['Globoplay', 'Disney+'],
    },
    {
      competicao: 'Champions League',
      canais: ['ESPN', 'Space'],
      streaming: ['HBO Max', 'Disney+', 'Amazon Prime'],
    },
    {
      competicao: 'Copa do Brasil',
      canais: ['SporTV', 'Premiere', 'ESPN'],
      streaming: ['Globoplay', 'Disney+'],
    },
    {
      competicao: 'Premier League',
      canais: ['ESPN'],
      streaming: ['Disney+', 'Amazon Prime'],
    },
    {
      competicao: 'La Liga',
      canais: ['ESPN'],
      streaming: ['Disney+'],
    },
    {
      competicao: 'Sul-Americana',
      canais: ['Paramount+'],
      streaming: ['Paramount+'],
    },
  ];

  return (
    <div>
      <Script
        id="onde-assistir-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-fut-darker border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-fut-green">Início</Link>
            <span>/</span>
            <span className="text-white">Onde Assistir</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-fut-dark via-fut-darker to-fut-dark py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Onde Assistir Futebol ao Vivo</h1>
          <p className="text-gray-300 max-w-3xl">Guia completo de onde assistir futebol ao vivo no Brasil. Confira todos os canais, plataformas de streaming e como não perder nenhum jogo.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Por Competição */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Por Competição</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {porCompeticao.map((comp) => (
              <div key={comp.competicao} className="bg-fut-darker rounded-xl border border-gray-800 p-5">
                <h3 className="text-white font-bold text-lg mb-3">{comp.competicao}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-400 text-sm">📺 TV:</p>
                    <p className="text-gray-300 text-sm">{comp.canais.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">💻 Streaming:</p>
                    <p className="text-gray-300 text-sm">{comp.streaming.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Canais */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Canais e Plataformas</h2>
          <div className="space-y-4">
            {canais.map((canal) => (
              <div key={canal.nome} className="bg-fut-darker rounded-xl border border-gray-800 p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-lg">{canal.nome}</h3>
                      <span className="bg-fut-dark text-gray-400 text-xs px-2 py-1 rounded">{canal.tipo}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Competições: {canal.competicoes.join(', ')}</p>
                    <p className="text-gray-300 text-sm">{canal.plano}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-fut-green font-bold text-lg">{canal.preco}</p>
                    <a href={canal.site} target="_blank" rel="noopener noreferrer" className="text-fut-green hover:underline text-sm">Saiba mais →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dicas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Dicas para Não Perder Nenhum Jogo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-fut-darker rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold text-lg mb-3">📱 Use o FUT LANCE</h3>
              <p className="text-gray-300 text-sm">Acompanhe todos os jogos ao vivo pelo nosso site. Tenha acesso a transmissões gratuitas e informações em tempo real.</p>
            </div>
            <div className="bg-fut-darker rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold text-lg mb-3">🔔 Ative Notificações</h3>
              <p className="text-gray-300 text-sm">Receba alertas antes dos jogos do seu time favorito. Não perca nenhum lance importante.</p>
            </div>
            <div className="bg-fut-darker rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold text-lg mb-3">📊 Confira a Agenda</h3>
              <p className="text-gray-300 text-sm">Veja a programação completa da semana e planeje seus horários para assistir os jogos.</p>
            </div>
            <div className="bg-fut-darker rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold text-lg mb-3">💰 Compare Preços</h3>
              <p className="text-gray-300 text-sm">Cada plataforma tem suas vantagens. Compare e escolha a melhor opção para seu bolso.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-fut-accent/10 border border-fut-accent/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Pronto para Assistir?</h2>
          <p className="text-gray-300 mb-6">Acesse nossa seção de jogos ao vivo e comece a assistir agora mesmo!</p>
          <Link href="/ao-vivo" className="inline-flex items-center gap-2 bg-fut-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Assistir Ao Vivo
          </Link>
        </section>
      </div>
    </div>
  );
}
