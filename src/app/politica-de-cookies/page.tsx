import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies - FUT LANCE',
  description: 'Política de Cookies do FUT LANCE. Saiba como utilizamos cookies e tecnologias semelhantes no site.',
  alternates: { canonical: 'https://fut-lance.vercel.app/politica-de-cookies' },
  openGraph: {
    title: 'Política de Cookies - FUT LANCE',
    description: 'Política de Cookies do FUT LANCE.',
    url: 'https://fut-lance.vercel.app/politica-de-cookies',
    siteName: 'FUT LANCE',
    type: 'website',
  },
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-fut-green transition-colors">Início</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Política de Cookies</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Política de Cookies</h1>
      <p className="text-gray-500 text-sm mb-8">Última atualização: setembro de 2026</p>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
        <p>
          Esta Política de Cookies explica como o <strong className="text-white">FUT LANCE</strong> utiliza cookies e tecnologias semelhantes quando você acessa o site <strong className="text-white">https://fut-lance.vercel.app</strong>.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">1. O que são Cookies?</h2>
        <p>
          Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou celular) quando você visita um site. Eles permitem que o site reconheça seu dispositivo e armazene informações sobre suas preferências ou ações anteriores.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">2. Como Utilizamos Cookies</h2>
        <p>Utilizamos cookies para:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">Cookies essenciais:</strong> necessários para o funcionamento correto do site</li>
          <li><strong className="text-white">Cookies de preferências:</strong> para lembrar suas configurações e idioma</li>
          <li><strong className="text-white">Cookies de análise:</strong> para entender como os usuários interagem com o site</li>
          <li><strong className="text-white">Cookies de publicidade:</strong> para exibir anúncios relevantes (quando configurado)</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">3. Tipos de Cookies Utilizados</h2>

        <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
          <h3 className="text-white font-bold mb-2">Cookies Essenciais</h3>
          <p className="text-gray-400 text-sm">Necessários para o funcionamento básico do site. Sem esses cookies, o site pode não funcionar corretamente.</p>
        </div>

        <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
          <h3 className="text-white font-bold mb-2">Cookies de Análise (Google Analytics)</h3>
          <p className="text-gray-400 text-sm">Coletam informações sobre como os usuários utilizam o site, como páginas mais visitadas e tempo de permanência. Esses dados são anônimos e ajudam a melhorar o site.</p>
        </div>

        <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
          <h3 className="text-white font-bold mb-2">Cookies de Publicidade</h3>
          <p className="text-gray-400 text-sm">Podem ser utilizados por parceiros de publicidade para exibir anúncios relevantes com base em seus interesses. Esses cookies podem rastrear sua navegação entre diferentes sites.</p>
        </div>

        <h2 className="text-xl font-bold text-white mt-8">4. Cookies de Terceiros</h2>
        <p>Alguns cookies são definidos por serviços de terceiros que aparecem em nossas páginas:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">Google Analytics:</strong> para análise de tráfego. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-fut-green hover:underline">Política de Privacidade do Google</a></li>
          <li><strong className="text-white">Google AdSense / Adcash:</strong> para exibição de anúncios (quando configurado)</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">5. Gerenciando Cookies</h2>
        <p>
          Você pode controlar e/ou deletar cookies conforme desejar. A maioria dos navegadores permite que você recuse ou aceite cookies. Abaixo, links para instruções nos navegadores mais populares:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-fut-green hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/pt-BR/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-fut-green hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-fut-green hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-fut-green hover:underline">Microsoft Edge</a></li>
        </ul>
        <p>
          <strong className="text-white">Nota:</strong> Desabilitar alguns cookies pode afetar o funcionamento correto do site.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">6. Alterações nesta Política</h2>
        <p>
          Esta Política de Cookies pode ser atualizada periodicamente. Quaisquer alterações serão publicadas nesta página.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">7. Contato</h2>
        <p>
          Em caso de dúvidas sobre esta Política de Cookies, entre em contato pelo e-mail <strong className="text-white">contato@fut-lance.com.br</strong> ou acesse nossa <Link href="/contato" className="text-fut-green hover:underline">página de contato</Link>.
        </p>
      </div>
    </div>
  );
}
