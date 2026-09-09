'use client';

import { useEffect, useState } from 'react';
import PlayerStream from '@/components/PlayerStream';

interface Channel {
  name: string;
  url: string;
  category: string;
  quality: string;
}

export default function AoVivoPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [transmissoesAtivas, setTransmissoesAtivas] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/configuracao')
      .then(res => res.json())
      .then(data => {
        const ativas = data.transmissoes_ativas !== false;
        setTransmissoesAtivas(ativas);
        
        if (ativas) {
          fetch('/api/channels')
            .then(res2 => res2.json())
            .then(data2 => {
              setChannels(data2.channels || []);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setTransmissoesAtivas(true);
        fetch('/api/channels')
          .then(res => res.json())
          .then(data => {
            setChannels(data.channels || []);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, []);

  const categories = ['Todos', ...Array.from(new Set(channels.map(c => c.category)))];
  const filtered = selectedCategory === 'Todos'
    ? channels
    : channels.filter(c => c.category === selectedCategory);

  if (transmissoesAtivas === false) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">Ao Vivo</h1>
        <p className="text-gray-400 mb-8">Assista aos canais de futebol ao vivo.</p>
        <section className="bg-fut-darker rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">As transmissoes estao temporariamente indisponiveis.</p>
          <p className="text-gray-500 text-sm mt-2">Volte em breve!</p>
        </section>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-2">Ao Vivo</h1>
      <p className="text-gray-400 mb-8">Assista aos canais de futebol ao vivo.</p>

      {selectedChannel && (
        <section className="mb-8">
          <PlayerStream url={selectedChannel.url} titulo={selectedChannel.name} />
        </section>
      )}

      {!selectedChannel && !loading && (
        <section className="mb-8 bg-fut-darker rounded-lg p-8 text-center">
          <p className="text-gray-400">Selecione um canal abaixo para assistir.</p>
        </section>
      )}

      {loading && (
        <section className="mb-8 bg-fut-darker rounded-lg p-8 text-center">
          <p className="text-gray-400">Carregando canais...</p>
        </section>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-fut-accent text-white'
                : 'bg-fut-dark text-gray-400 hover:bg-fut-darker hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((ch, i) => (
          <button
            key={i}
            onClick={() => setSelectedChannel(ch)}
            className={`p-3 rounded-lg text-left transition-all ${
              selectedChannel?.name === ch.name
                ? 'bg-fut-accent text-white ring-2 ring-fut-accent'
                : 'bg-fut-dark text-gray-300 hover:bg-fut-darker hover:text-white'
            }`}
          >
            <p className="font-bold text-sm truncate">{ch.name}</p>
            <p className="text-xs text-gray-500 mt-1">{ch.quality}</p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-8">Nenhum canal encontrado.</p>
      )}

      <section className="mt-12 bg-fut-darker rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Sobre</h2>
        <div className="text-gray-300 space-y-2 text-sm">
          <p>• Os canais sao carregados automaticamente.</p>
          <p>• Funciona melhor no Google Chrome.</p>
          <p>• Caso nao carregue, tente outro canal ou recarregue a pagina.</p>
        </div>
      </section>
    </div>
  );
}
