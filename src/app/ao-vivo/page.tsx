'use client';

import { useEffect, useState } from 'react';
import PlayerStream from '@/components/PlayerStream';
import Script from 'next/script';

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

  useEffect(() => {
    fetch('/api/channels')
      .then(res => res.json())
      .then(data => {
        setChannels(data.channels || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['Todos', ...Array.from(new Set(channels.map(c => c.category)))];
  const filtered = selectedCategory === 'Todos'
    ? channels
    : channels.filter(c => c.category === selectedCategory);

  const aoVivoSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Futebol Ao Vivo - FUT LANCE',
    description: 'Assista aos canais de futebol ao vivo. ESPN, SporTV, Premiere, Band Sports e mais.',
    url: 'https://fut-lance.vercel.app/ao-vivo',
  };

  return (
    <>
      <Script
        id="ao-vivo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aoVivoSchema) }}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-3 h-3 bg-fut-accent rounded-full animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Ao Vivo Agora</h1>
          </div>
          <p className="text-gray-400">Assista aos canais de futebol ao vivo. Selecione um canal para começar.</p>
        </div>

        {/* Player */}
        {selectedChannel && (
          <section className="mb-8">
            <PlayerStream url={selectedChannel.url} titulo={selectedChannel.name} />
          </section>
        )}

        {/* Placeholder */}
        {!selectedChannel && !loading && (
          <section className="mb-8 bg-fut-darker rounded-xl p-10 text-center border border-gray-800">
            <span className="text-5xl block mb-4">📺</span>
            <p className="text-gray-400 text-lg">Selecione um canal abaixo para assistir.</p>
          </section>
        )}

        {/* Loading */}
        {loading && (
          <section className="mb-8 bg-fut-darker rounded-xl p-10 text-center border border-gray-800">
            <div className="inline-block w-8 h-8 border-2 border-fut-green border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">Carregando canais...</p>
          </section>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-fut-accent text-white shadow-lg shadow-fut-accent/20'
                  : 'bg-fut-dark text-gray-400 hover:bg-fut-darker hover:text-white border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((ch, i) => (
            <button
              key={i}
              onClick={() => setSelectedChannel(ch)}
              className={`p-4 rounded-xl text-left transition-all border ${
                selectedChannel?.name === ch.name
                  ? 'bg-fut-accent text-white ring-2 ring-fut-accent border-fut-accent shadow-lg shadow-fut-accent/20'
                  : 'bg-fut-dark text-gray-300 hover:bg-fut-darker hover:text-white border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selectedChannel?.name === ch.name ? 'bg-white/20' : 'bg-fut-darker'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{ch.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ch.quality === 'FHD' ? 'bg-green-500/20 text-green-400' :
                      ch.quality === 'HD' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {ch.quality}
                    </span>
                    <span className="text-xs text-gray-500">{ch.category}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && !loading && (
          <div className="text-center py-12">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-gray-400 text-lg">Nenhum canal encontrado nesta categoria.</p>
          </div>
        )}

        {/* Info */}
        <section className="mt-12 bg-fut-darker rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold text-white mb-3">ℹ️ Informações</h2>
          <div className="text-gray-400 space-y-2 text-sm">
            <p>• Os canais são carregados automaticamente.</p>
            <p>• Funciona melhor no Google Chrome.</p>
            <p>• Caso não carregue, tente outro canal ou recarregue a página.</p>
            <p>• Para melhor experiência, use tela cheia no player.</p>
          </div>
        </section>
      </div>
    </>
  );
}
