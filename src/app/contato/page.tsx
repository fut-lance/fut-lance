import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contato - FUT LANCE',
  description: 'Entre em contato com o FUT LANCE. Envie sugestões, dúvidas ou reporte problemas no portal.',
  alternates: { canonical: 'https://fut-lance.vercel.app/contato' },
  openGraph: {
    title: 'Contato - FUT LANCE',
    description: 'Entre em contato com o FUT LANCE.',
    url: 'https://fut-lance.vercel.app/contato',
    siteName: 'FUT LANCE',
    type: 'website',
  },
};

export default function ContatoPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-fut-green transition-colors">Início</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Contato</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Contato</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
        <p>
          Quer entrar em contato com a equipe do <strong className="text-white">FUT LANCE</strong>? Estamos à disposição para ouvir suas sugestões, dúvidas, elogios ou reportar qualquer problema no site.
        </p>

        <div className="bg-fut-darker rounded-2xl p-6 md:p-8 border border-gray-800 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Formas de Contato</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-fut-green text-xl mt-0.5">✉</span>
              <div>
                <p className="text-white font-semibold">E-mail</p>
                <p className="text-gray-400">contato@fut-lance.com.br</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-fut-green text-xl mt-0.5">✉</span>
              <div>
                <p className="text-white font-semibold">E-mail para Anúncios</p>
                <p className="text-gray-400">publicidade@fut-lance.com.br</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mt-8">Sobre o Site</h2>
        <p>
          O FUT LANCE é um portal de notícias do futebol brasileiro e internacional. Não somos afiliados a nenhuma emissora de TV, confederação ou clube de futebol.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Tempo de Resposta</h2>
        <p>
          Respondemos todas as mensagens recebidas. O tempo médio de resposta é de até 48 horas úteis.
        </p>

        <div className="bg-fut-darker/50 rounded-xl p-5 border border-gray-800 mt-8">
          <p className="text-gray-400 text-sm">
            <strong className="text-white">Nota:</strong> Não envie dados pessoais sensíveis por e-mail. Para solicitações relacionadas a privacidade de dados, consulte nossa <Link href="/politica-de-privacidade" className="text-fut-green hover:underline">Política de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
