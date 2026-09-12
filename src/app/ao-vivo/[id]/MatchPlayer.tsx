'use client';

import { useState } from 'react';
import PlayerStream from '@/components/PlayerStream';
import { type Match, type MatchChannel } from '@/data/matches';

export default function MatchPlayer({ match }: { match: Match }) {
  const validChannels = match.canais.filter(ch => ch.url && ch.url.trim() !== '');
  const [activeChannel, setActiveChannel] = useState<MatchChannel | null>(
    validChannels.length > 0 ? validChannels[0] : null
  );

  if (validChannels.length === 0) {
    return (
      <div className="bg-fut-darker rounded-2xl border border-gray-800 p-6 mb-6">
        <h2 className="text-white font-bold text-lg mb-4">Onde Assistir</h2>
        <div className="space-y-2">
          {match.canais.map((ch, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-fut-dark rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-fut-darker rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-fut-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm">{ch.nome}</p>
                <p className="text-gray-500 text-xs">Transmissão TV aberta</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {activeChannel && (
        <PlayerStream url={activeChannel.url} titulo={`${match.timeMandante} × ${match.timeVisitante}`} />
      )}
      {validChannels.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {validChannels.map((ch, i) => (
            <button
              key={i}
              onClick={() => setActiveChannel(ch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeChannel?.url === ch.url
                  ? 'bg-fut-green text-white'
                  : 'bg-fut-darker text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {ch.nome}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
