import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso - FUT LANCE',
  description: 'Termos de Uso do FUT LANCE. Conheça as regras e condições para utilização do site.',
  alternates: { canonical: 'https://fut-lance.vercel.app/termos-de-uso' },
  openGraph: {
    title: 'Termos de Uso - FUT LANCE',
    description: 'Termos de Uso do FUT LANCE.',
    url: 'https://fut-lance.vercel.app/termos-de-uso',
    siteName: 'FUT LANCE',
    type: 'website',
  },
};

export default function TermosPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-fut-green transition-colors">Início</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Termos de Uso</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Termos de Uso</h1>
      <p className="text-gray-500 text-sm mb-8">Última atualização: setembro de 2026</p>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
        <p>
          Ao acessar e utilizar o site <strong className="text-white">FUT LANCE</strong> (https://fut-lance.vercel.app), você concorda com os seguintes Termos de Uso. Caso não concorde com algum dos termos, por favor, não utilize o site.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">1. Uso do Site</h2>
        <p>
          O FUT LANCE é um portal de notícias do futebol destinado a fins informativos e jornalísticos. O conteúdo disponibilizado é de caráter público e gratuito.
        </p>
        <p>Ao utilizar o site, você concorda em:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Não utilizar o site para fins ilícitos ou que violem direitos de terceiros</li>
          <li>Não tentar acessar áreas restritas do site sem autorização</li>
          <li>Não interferir no funcionamento do site ou em seus servidores</li>
          <li>Não reproduzir, copiar ou distribuir o conteúdo sem autorização prévia</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">2. Conteúdo</h2>
        <p>
          Todo o conteúdo disponibilizado no FUT LANCE, incluindo textos, imagens, logotipos e gráficos, é protegido por direitos autorais. O conteúdo é produzido com base em fontes jornalísticas públicas e informações de domínio público.
        </p>
        <p>
          É permitido compartilhar links para as páginas do site em redes sociais e outros meios de comunicação, desde que o link leve diretamente para a página original do FUT LANCE.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">3. Comentários</h2>
        <p>
          O FUT LANCE disponibiliza sistema de comentários em suas notícias. Ao postar comentários, você concorda em:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Não publicar conteúdo ofensivo, discriminatório ou difamatório</li>
          <li>Não publicar spam ou conteúdo irrelevante</li>
          <li>Não impersonificar outras pessoas</li>
          <li>Não publicar informações falsas ou enganosas</li>
        </ul>
        <p>
          O FUT LANCE reserva-se o direito de remover comentários que violem estas regras.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">4. Publicidade</h2>
        <p>
          O FUT LANCE pode exibir anúncios de parceiros publicitários. Esses anúncios são identificados como conteúdo patrocinado ou publicitário.
        </p>
        <p>
          O FUT LANCE não se responsabiliza pelo conteúdo de anúncios de terceiros, produtos ou serviços oferecidos por parceiros publicitários.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">5. Links Externos</h2>
        <p>
          O site pode conter links para sites de terceiros. Esses links são fornecidos apenas para conveniência do usuário. O FUT LANCE não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas de sites externos.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">6. Isenção de Responsabilidade</h2>
        <p>
          O conteúdo do FUT LANCE é disponibilizado &quot;como está&quot;, sem garantias de qualquer natureza. Embora nos esforcemos para manter as informações precisas e atualizadas, não garantimos a completude ou precisão do conteúdo.
        </p>
        <p>
          O FUT LANCE não se responsabiliza por eventuais danos diretos ou indiretos decorrentes do uso do site ou de seu conteúdo.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">7. Privacidade</h2>
        <p>
          O tratamento de dados pessoais é regido pela nossa <Link href="/politica-de-privacidade" className="text-fut-green hover:underline">Política de Privacidade</Link>, que faz parte integrante destes Termos de Uso.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">8. Alterações nestes Termos</h2>
        <p>
          O FUT LANCE reserva-se o direito de alterar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente após a publicação nesta página.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">9. Legislação Aplicável</h2>
        <p>
          Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer controvérsia decorrente destes termos será resolvida pelos tribunais competentes do Brasil.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">10. Contato</h2>
        <p>
          Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail <strong className="text-white">contato@fut-lance.com.br</strong> ou acesse nossa <Link href="/contato" className="text-fut-green hover:underline">página de contato</Link>.
        </p>
      </div>
    </div>
  );
}
