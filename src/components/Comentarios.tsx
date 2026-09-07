'use client';

import { useState } from 'react';

interface Comentario {
  id: number;
  nome: string;
  texto: string;
  data: string;
}

interface ComentariosProps {
  noticiaSlug: string;
}

const comentariosIniciais: Comentario[] = [
  {
    id: 1,
    nome: 'Carlos Silva',
    texto: 'Jogo incrível! O Flamengo jogou demais.',
    data: '07/09/2026 14:30',
  },
  {
    id: 2,
    nome: 'Ana Santos',
    texto: 'Espero que continue assim até o fim do campeonato!',
    data: '07/09/2026 15:10',
  },
];

export default function Comentarios({ noticiaSlug }: ComentariosProps) {
  const [comentarios, setComentarios] = useState<Comentario[]>(comentariosIniciais);
  const [nome, setNome] = useState('');
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !texto.trim()) return;

    setEnviando(true);

    const novoComentario: Comentario = {
      id: Date.now(),
      nome: nome.trim(),
      texto: texto.trim(),
      data: new Date().toLocaleString('pt-BR'),
    };

    setComentarios((prev) => [novoComentario, ...prev]);
    setNome('');
    setTexto('');
    setEnviando(false);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-white mb-6">
        💬 Comentários ({comentarios.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8 bg-fut-darker p-6 rounded-lg">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-300 mb-2 font-medium">
            Seu nome
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-fut-dark border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-fut-green"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="texto" className="block text-gray-300 mb-2 font-medium">
            Comentário
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full bg-fut-dark border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-fut-green h-24 resize-none"
            placeholder="Deixe seu comentário..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="btn-primary disabled:opacity-50"
        >
          {enviando ? 'Enviando...' : 'Enviar Comentário'}
        </button>
      </form>

      <div className="space-y-4">
        {comentarios.map((comentario) => (
          <div
            key={comentario.id}
            className="bg-fut-darker p-4 rounded-lg border border-gray-800"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-fut-green rounded-full flex items-center justify-center text-white font-bold">
                {comentario.nome.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium">{comentario.nome}</p>
                <p className="text-gray-500 text-xs">{comentario.data}</p>
              </div>
            </div>
            <p className="text-gray-300 ml-13">{comentario.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
