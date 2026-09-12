import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Sobre o FUT LANCE - Portal de Notícias do Futebol',
  description: 'Conheça o FUT LANCE: seu portal completo de notícias do futebol brasileiro e internacional. Notícias, resultados, ao vivo e muito mais.',
  keywords: 'FUT LANCE, sobre FUT LANCE, portal de futebol, notícias de futebol, futebol brasileiro',
  alternates: { canonical: 'https://fut-lance.vercel.app/sobre' },
  openGraph: {
    title: 'Sobre o FUT LANCE',
    description: 'Conheça o FUT LANCE: seu portal completo de notícias do futebol.',
    url: 'https://fut-lance.vercel.app/sobre',
    siteName: 'FUT LANCE',
    type: 'website',
    images: [{ url: 'https://fut-lance.vercel.app/og-image.png', width: 1200, height: 630, alt: 'Sobre o FUT LANCE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre o FUT LANCE',
    description: 'Conheça o FUT LANCE: seu portal completo de notícias do futebol.',
    images: ['https://fut-lance.vercel.app/og-image.png'],
  },
};

export default function SobrePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://fut-lance.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Sobre', item: 'https://fut-lance.vercel.app/sobre' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <Script
        id="breadcrumb-schema-sobre"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-fut-green transition-colors">Início</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Sobre</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Sobre o FUT LANCE</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
        <p>
          O <strong className="text-white">FUT LANCE</strong> é um portal de notícias do futebol dedicado a oferecer cobertura completa do futebol brasileiro e internacional. Nosso objetivo é manter os torcedores sempre informados sobre tudo o que acontece no mundo da bola.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Nossa Missão</h2>
        <p>
          Entregar notícias rápidas, confiáveis e de qualidade sobre o futebol. Cobrimos os principais campeonatos: Brasileirão, Copa Libertadores, Champions League, Copa do Brasil, transferências e muito mais.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">O Que Oferecemos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-white">Notícias em tempo real</strong> — Fique por dentro de tudo que acontece no futebol</li>
          <li><strong className="text-white">Jogos ao vivo</strong> — Acompanhe as principais partidas do dia</li>
          <li><strong className="text-white">Tabelas e classificações</strong> — Brasileirão, Libertadores e outros campeonatos</li>
          <li><strong className="text-white">Transferências</strong> — Mercado da bola com todas as movimentações</li>
          <li><strong className="text-white">Análises e comentários</strong> — Opiniões sobre os principais jogos e times</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">Transparência</h2>
        <p>
          O FUT LANCE é um portal independente. Nosso conteúdo é produzido com base em fontes jornalísticas e informações públicas. Respeitamos os direitos de imagens e contents de terceiros.
        </p>
        <p>
          Para mais informações, consulte nossas páginas de <Link href="/politica-de-privacidade" className="text-fut-green hover:underline">Política de Privacidade</Link>, <Link href="/politica-de-cookies" className="text-fut-green hover:underline">Política de Cookies</Link> e <Link href="/termos-de-uso" className="text-fut-green hover:underline">Termos de Uso</Link>.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Contato</h2>
        <p>
          Tem alguma sugestão, dúvida ou quer entrar em contato conosco? Acesse nossa <Link href="/contato" className="text-fut-green hover:underline">página de contato</Link>.
        </p>
      </div>
    </div>
  );
}
