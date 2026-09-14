'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [senhaInput, setSenhaInput] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    setEnviando(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: senhaInput }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.refresh();
      } else {
        setMensagem(data.error || 'Senha incorreta!');
      }
    } catch {
      setMensagem('Erro de conexão. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-fut-darker flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-fut-dark p-8 rounded-xl w-full max-w-sm border border-gray-800">
        <div className="text-center mb-6">
          <span className="text-4xl block mb-3">🔐</span>
          <h1 className="text-2xl font-bold text-white">Admin Transmissões</h1>
        </div>
        <input
          type="password"
          value={senhaInput}
          onChange={e => setSenhaInput(e.target.value)}
          placeholder="Digite a senha"
          className="w-full px-4 py-3 rounded-lg bg-fut-darker text-white border border-gray-700 mb-4 focus:outline-none focus:border-fut-green"
        />
        {mensagem && <p className="text-red-400 text-sm mb-4">{mensagem}</p>}
        <button type="submit" disabled={enviando} className="w-full bg-fut-accent text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-colors disabled:opacity-50">
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
