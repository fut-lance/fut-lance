'use client';

import { useState } from 'react';

const SENHA = 'futlance2024';
const STRAPI_URL = 'https://fut-lance-cms-v2.onrender.com';

export default function AdminTransmissoesPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senhaInput, setSenhaInput] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaInput === SENHA) {
      setAutenticado(true);
    } else {
      setMensagem('Senha incorreta!');
    }
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-fut-darker flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-fut-dark p-8 rounded-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Transmissoes</h1>
          <input
            type="password"
            value={senhaInput}
            onChange={e => setSenhaInput(e.target.value)}
            placeholder="Digite a senha"
            className="w-full px-4 py-3 rounded bg-fut-darker text-white border border-gray-700 mb-4"
          />
          {mensagem && <p className="text-red-400 text-sm mb-4">{mensagem}</p>}
          <button type="submit" className="w-full bg-fut-accent text-white py-3 rounded font-bold hover:bg-green-600">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fut-darker flex items-center justify-center px-4">
      <div className="bg-fut-dark p-8 rounded-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Transmissoes Ao Vivo</h1>
        <p className="text-gray-300 mb-6 text-sm">
          Para ativar ou desativar as transmissoes, clique no botao abaixo e faca login no Strapi Admin.
        </p>
        <a
          href={`${STRAPI_URL}/admin/content-manager/collection-types/api::configuracao.configuracao`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-fut-accent text-white py-3 rounded font-bold hover:bg-green-600 mb-4"
        >
          Abrir Strapi Admin
        </a>
        <div className="bg-fut-darker rounded-lg p-4 text-left text-sm text-gray-400 space-y-2">
          <p><strong className="text-white">1.</strong> Clique no link acima</p>
          <p><strong className="text-white">2.</strong> Faca login com:</p>
          <p className="pl-4">Email: <span className="text-white">rafaelmelegari86@gmail.com</span></p>
          <p className="pl-4">Senha: <span className="text-white">funil1315rR#$</span></p>
          <p><strong className="text-white">3.</strong> Clique em <span className="text-white">Configuracao</span></p>
          <p><strong className="text-white">4.</strong> Marque ou desmarque <span className="text-white">Transmissoes Ativas</span></p>
          <p><strong className="text-white">5.</strong> Clique em <span className="text-white">Salvar</span></p>
        </div>
      </div>
    </div>
  );
}
