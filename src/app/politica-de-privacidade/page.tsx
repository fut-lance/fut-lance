import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade - FUT LANCE',
  description: 'Política de Privacidade do FUT LANCE. Saiba como seus dados são coletados, utilizados e protegidos.',
  alternates: { canonical: 'https://fut-lance.vercel.app/politica-de-privacidade' },
  openGraph: {
    title: 'Política de Privacidade - FUT LANCE',
    description: 'Política de Privacidade do FUT LANCE.',
    url: 'https://fut-lance.vercel.app/politica-de-privacidade',
    siteName: 'FUT LANCE',
    type: 'website',
  },
};

export default function PrivacidadePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-fut-green transition-colors">Início</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Política de Privacidade</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Política de Privacidade</h1>
      <p className="text-gray-500 text-sm mb-8">Última atualização: setembro de 2026</p>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
        <p>
          A sua privacidade é importante para nós. Esta Política de Privacidade descreve como o <strong className="text-white">FUT LANCE</strong> coleta, utiliza, armazena e protege informações dos usuários que acessam o site <strong className="text-white">https://fut-lance.vercel.app</strong>.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">1. Informações Coletadas</h2>
        <p>Podemos coletar os seguintes tipos de informações:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">Dados de navegação:</strong> endereço IP, tipo de navegador, sistema operacional, páginas visitadas, tempo de permanência</li>
          <li><strong className="text-white">Dados fornecidos pelo usuário:</strong> nome e e-mail enviados através de formulários de contato ou comentários</li>
          <li><strong className="text-white">Cookies e tecnologias semelhantes:</strong> informações armazenadas no seu dispositivo para melhorar a experiência de navegação</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">2. Uso das Informações</h2>
        <p>As informações coletadas são utilizadas para:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Melhorar a experiência de navegação no site</li>
          <li>Exibir conteúdo relevante e personalizado</li>
          <li>Responder a mensagens e solicitações enviadas pelo usuário</li>
          <li>Gerar estatísticas de acesso para aprimorar o conteúdo</li>
          <li>Exibir publicidade de parceiros, quando aplicável</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">3. Cookies</h2>
        <p>
          O FUT LANCE utiliza cookies para melhorar a experiência do usuário. Cookies são pequenos arquivos armazenados no seu dispositivo que permitem ao site reconhecer sua visita e personalizar o conteúdo.
        </p>
        <p>
          Para mais detalhes, consulte nossa <Link href="/politica-de-cookies" className="text-fut-green hover:underline">Política de Cookies</Link>.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">4. Serviços de Terceiros</h2>
        <p>Podemos utilizar serviços de terceiros para:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">Google Analytics:</strong> para análise de tráfego e comportamento dos usuários</li>
          <li><strong className="text-white">Plataformas de publicidade:</strong> para exibir anúncios relevantes (quando configurado)</li>
          <li><strong className="text-white">Google Search Console:</strong> para otimização e indexação do site</li>
        </ul>
        <p>
          Esses serviços podem coletar dados de acordo com suas próprias políticas de privacidade. Recomendamos que consulte as políticas de cada serviço.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">5. Armazenamento e Segurança</h2>
        <p>
          Os dados fornecidos pelos usuários são armazenados em servidores seguros e protegidos. Adotamos medidas de segurança para proteger informações contra acesso não autorizado, alteração, divulgação ou destruição.
        </p>
        <p>
          Dados de navegação são armazenados por período máximo de 12 meses para fins estatísticos.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">6. Direitos do Usuário</h2>
        <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Solicitar acesso aos seus dados pessoais</li>
          <li>Solicitar correção de dados incompletos ou desatualizados</li>
          <li>Solicitar a exclusão dos seus dados pessoais</li>
          <li>Solicitar a portabilidade dos seus dados</li>
          <li>Revogar o consentimento a qualquer momento</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">7. Menores de Idade</h2>
        <p>
          O FUT LANCE não é direcionado a menores de 16 anos. Não coletamos intencionalmente dados pessoais de menores. Se você é menor de 16 anos, não envie informações pessoais sem a supervisão de um responsável.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">8. Alterações nesta Política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações serão publicadas nesta página com a data da última atualização.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">9. Contato</h2>
        <p>
          Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato conosco pelo e-mail <strong className="text-white">contato@fut-lance.com.br</strong> ou acesse nossa <Link href="/contato" className="text-fut-green hover:underline">página de contato</Link>.
        </p>
      </div>
    </div>
  );
}
