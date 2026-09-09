'use client';

import { useState, useEffect } from 'react';

interface Comentario {
  id: number;
  nome: string;
  texto: string;
  data: string;
}

interface ComentariosProps {
  noticiaId?: number;
  noticiaSlug: string;
}

export default function Comentarios({ noticiaId, noticiaSlug }: ComentariosProps) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nome, setNome] = useState('');
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  useEffect(() => {
    if (noticiaId) {
      fetch(`${apiUrl}/api/comentarios?filters[noticia][id][$eq]=${noticiaId}&sort=data:desc`)
        .then((res) => res.json())
        .then((data) => {
          const items = (data?.data || []).map((item: any) => ({
            id: item.id,
            nome: item.nome,
            texto: item.texto,
            data: item.data || new Date(item.createdAt).toLocaleString('pt-BR'),
          }));
          setComentarios(items);
        })
        .catch((err) => console.error('Erro ao buscar comentários:', err))
        .finally(() => setCarregando(false));
    } else {
      setCarregando(false);
    }
  }, [noticiaId, apiUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !texto.trim()) return;

    setEnviando(true);

    if (noticiaId) {
      try {
        const res = await fetch(`${apiUrl}/api/comentarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              nome: nome.trim(),
              email: '',
              texto: texto.trim(),
              noticia: noticiaId,
            },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const novoComentario: Comentario = {
            id: data.data.id,
            nome: nome.trim(),
            texto: texto.trim(),
            data: new Date().toLocaleString('pt-BR'),
          };
          setComentarios((prev) => [novoComentario, ...prev]);
        }
      } catch (err) {
        console.error('Erro ao enviar comentário:', err);
      }
    } else {
      const novoComentario: Comentario = {
        id: Date.now(),
        nome: nome.trim(),
        texto: texto.trim(),
        data: new Date().toLocaleString('pt-BR'),
      };
      setComentarios((prev) => [novoComentario, ...prev]);
    }

    setNome('');
    setTexto('');
    setEnviando(false);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        💬 Comentários ({comentarios.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8 bg-fut-darker p-6 rounded-xl border border-gray-800">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-300 mb-2 font-medium text-sm">
            Seu nome
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-fut-dark border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-fut-green transition-colors"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="texto" className="block text-gray-300 mb-2 font-medium text-sm">
            Comentário
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full bg-fut-dark border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-fut-green h-24 resize-none transition-colors"
            placeholder="Deixe seu comentário..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando ? 'Enviando...' : 'Enviar Comentário'}
        </button>
      </form>

      {carregando && (
        <div className="text-center text-gray-400 py-4">
          <div className="inline-block w-6 h-6 border-2 border-fut-green border-t-transparent rounded-full animate-spin mr-2" />
          Carregando comentários...
        </div>
      )}

      {!carregando && comentarios.length === 0 && (
        <div className="text-center text-gray-400 py-8 bg-fut-darker rounded-xl border border-gray-800">
          <span className="text-3xl block mb-2">💬</span>
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </div>
      )}

      <div className="space-y-4">
        {comentarios.map((comentario) => (
          <div
            key={comentario.id}
            className="bg-fut-darker p-4 rounded-xl border border-gray-800"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-fut-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                {comentario.nome.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{comentario.nome}</p>
                <p className="text-gray-500 text-xs">{comentario.data}</p>
              </div>
            </div>
            <p className="text-gray-300 ml-13 leading-relaxed">{comentario.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
