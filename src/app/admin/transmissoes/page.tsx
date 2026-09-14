import { cookies } from 'next/headers';
import LoginForm from './LoginForm';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-auth';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';

export default function AdminTransmissoesPage() {
  const store = cookies();
  const autenticado = verifySessionToken(store.get(ADMIN_COOKIE)?.value);

  if (!autenticado) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-fut-darker flex items-center justify-center px-4">
      <div className="bg-fut-dark p-8 rounded-xl w-full max-w-md text-center border border-gray-800">
        <span className="text-4xl block mb-3">📺</span>
        <h1 className="text-2xl font-bold text-white mb-4">Transmissões Ao Vivo</h1>
        <p className="text-gray-300 mb-6 text-sm">
          Para ativar ou desativar as transmissões, clique no botão abaixo e faça login no Strapi Admin.
        </p>
        <a
          href={`${STRAPI_URL}/admin/content-manager/collection-types/api::configuracao.configuracao`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-fut-accent text-white py-3 rounded-lg font-bold hover:bg-red-600 mb-4 transition-colors"
        >
          Abrir Strapi Admin
        </a>
        <div className="bg-fut-darker rounded-lg p-4 text-left text-sm text-gray-400 space-y-2 border border-gray-800">
          <p><strong className="text-white">1.</strong> Clique no link acima</p>
          <p><strong className="text-white">2.</strong> Faça login no Strapi</p>
          <p><strong className="text-white">3.</strong> Clique em <span className="text-white">Configuração</span></p>
          <p><strong className="text-white">4.</strong> Marque ou desmarque <span className="text-white">Transmissões Ativas</span></p>
          <p><strong className="text-white">5.</strong> Clique em <span className="text-white">Salvar</span></p>
        </div>
      </div>
    </div>
  );
}
