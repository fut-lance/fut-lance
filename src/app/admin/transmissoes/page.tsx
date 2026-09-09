'use client';

import { useEffect, useState } from 'react';

const SENHA = 'futlance2024';

export default function AdminTransmissoesPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senhaInput, setSenhaInput] = useState('');
  const [ativas, setAtivas] = useState(true);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (autenticado) {
      fetch('/api/configuracao')
        .then(res => res.json())
        .then(data => {
          setAtivas(data.transmissoes_ativas !== false);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [autenticado]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaInput === SENHA) {
      setAutenticado(true);
    } else {
      setMensagem('Senha incorreta!');
    }
  };

  const handleToggle = async () => {
    setSalvando(true);
    setMensagem('');
    try {
      const res = await fetch('/api/configuracao', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transmissoes_ativas: !ativas }),
      });
      if (res.ok) {
        setAtivas(!ativas);
        setMensagem(!ativas ? 'Transmissoes ATIVADAS!' : 'Transmissoes DESATIVADAS!');
      } else {
        setMensagem('Erro ao salvar.');
      }
    } catch {
      setMensagem('Erro de conexao.');
    }
    setSalvando(false);
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
      <div className="bg-fut-dark p-8 rounded-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Transmissoes Ao Vivo</h1>
        {loading ? (
          <p className="text-gray-400">Carregando...</p>
        ) : (
          <>
            <p className="text-gray-300 mb-6">
              Status: <span className={`font-bold ${ativas ? 'text-green-400' : 'text-red-400'}`}>
                {ativas ? 'ATIVADAS' : 'DESATIVADAS'}
              </span>
            </p>
            <button
              onClick={handleToggle}
              disabled={salvando}
              className={`w-full py-3 rounded font-bold text-white ${
                ativas
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              } disabled:opacity-50`}
            >
              {salvando ? 'Salvando...' : ativas ? 'DESATIVAR TRANSMISSOES' : 'ATIVAR TRANSMISSOES'}
            </button>
            {mensagem && (
              <p className={`mt-4 text-sm ${mensagem.includes('Erro') ? 'text-red-400' : 'text-green-400'}`}>
                {mensagem}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
