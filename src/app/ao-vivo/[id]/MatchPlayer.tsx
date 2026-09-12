'use client';

import { useState } from 'react';
import PlayerStream from '@/components/PlayerStream';
import { type Match, type MatchChannel } from '@/data/matches';

export default function MatchPlayer({ match }: { match: Match }) {
  const [activeChannel, setActiveChannel] = useState<MatchChannel | null>(
    match.canais.length > 0 ? match.canais[0] : null
  );

  if (match.canais.length === 0) {
    return (
      <div className="bg-fut-darker rounded-2xl border border-gray-800 p-6 mb-6">
        <h2 className="text-white font-bold text-lg mb-4">Onde Assistir</h2>
        <p className="text-gray-400 text-sm">Nenhuma transmissão disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {activeChannel && (
        <PlayerStream url={activeChannel.url} titulo={`${match.timeMandante} × ${match.timeVisitante}`} />
      )}
      {match.canais.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {match.canais.map((ch, i) => (
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
