'use client';

import { useEffect, useState, useMemo } from 'react';
import PlayerStream from '@/components/PlayerStream';
import { matches as initialMatches, type Match, type MatchChannel } from '@/data/matches';

function getMatchStatus(match: Match): 'em-breve' | 'ao-vivo' | 'encerrado' | 'expirado' {
  const now = new Date();
  const [d, m, y] = match.data.split('/').map(Number);
  const [h, min] = match.horario.split(':').map(Number);
  const matchStart = new Date(y, m - 1, d, h, min);
  const matchEnd = new Date(matchStart.getTime() + 2 * 60 * 60 * 1000);
  const removeAfter = new Date(matchEnd.getTime() + 20 * 60 * 1000);

  if (now < matchStart) return 'em-breve';
  if (now >= matchStart && now <= matchEnd) return 'ao-vivo';
  if (now > matchEnd && now <= removeAfter) return 'encerrado';
  return 'expirado';
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'ao-vivo') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
        <span className="w-2 h-2 bg-white rounded-full" />
        AO VIVO
      </span>
    );
  }
  if (status === 'encerrado') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-gray-600 text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
        Encerrado
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-yellow-600/80 text-white text-xs font-bold px-3 py-1 rounded-full">
      Em breve
    </span>
  );
}

function MatchCard({
  match,
  onWatch,
}: {
  match: Match;
  status: string;
  onWatch: (match: Match) => void;
}) {
  const matchStatus = getMatchStatus(match);

  return (
    <div className="bg-fut-darker rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-black/20">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <span className="text-fut-green text-xs font-bold uppercase tracking-wider">{match.competicao}</span>
          <StatusBadge status={matchStatus} />
        </div>

        <div className="text-center text-gray-500 text-xs mb-4">
          {match.data} • {match.horario}
        </div>

        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex-1 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-2 overflow-hidden">
              <img
                src={match.logoTimeMandante}
                alt={`Escudo do ${match.timeMandante}`}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg md:text-xl font-bold text-gray-500">${match.timeMandante.substring(0, 3).toUpperCase()}</span>`;
                }}
              />
            </div>
            <p className="text-white font-bold text-sm md:text-base leading-tight">{match.timeMandante}</p>
          </div>

          <div className="flex flex-col items-center px-2">
            <span className="text-gray-500 text-xl font-bold">×</span>
          </div>

          <div className="flex-1 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-2 overflow-hidden">
              <img
                src={match.logoTimeVisitante}
                alt={`Escudo do ${match.timeVisitante}`}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg md:text-xl font-bold text-gray-500">${match.timeVisitante.substring(0, 3).toUpperCase()}</span>`;
                }}
              />
            </div>
            <p className="text-white font-bold text-sm md:text-base leading-tight">{match.timeVisitante}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        {matchStatus === 'encerrado' ? (
          <button disabled className="w-full py-3 rounded-xl bg-gray-700 text-gray-400 font-bold text-sm cursor-not-allowed">
            Partida encerrada
          </button>
        ) : matchStatus === 'em-breve' ? (
          <button
            onClick={() => onWatch(match)}
            className="w-full py-3 rounded-xl bg-fut-darker hover:bg-gray-800 text-gray-300 font-bold text-sm transition-colors border border-gray-700 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Ver informações
          </button>
        ) : (
          <button
            onClick={() => onWatch(match)}
            className="w-full py-3 rounded-xl bg-fut-green hover:bg-green-600 text-white font-bold text-sm transition-colors shadow-lg shadow-fut-green/20 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            ASSISTIR AGORA AO VIVO
          </button>
        )}
      </div>
    </div>
  );
}

function ChannelSelector({
  match,
  onSelect,
  onClose,
}: {
  match: Match;
  onSelect: (channel: MatchChannel) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-fut-darker w-full md:max-w-md md:rounded-2xl rounded-t-2xl border border-gray-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-base">Escolha uma transmissão</h3>
            <p className="text-gray-400 text-xs mt-0.5">
              {match.timeMandante} × {match.timeVisitante}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-2 max-h-[50vh] overflow-y-auto">
          {match.canais.map((ch, i) => (
            <button
              key={i}
              onClick={() => onSelect(ch)}
              className="w-full flex items-center gap-3 p-3 bg-fut-dark hover:bg-fut-dark/80 rounded-xl border border-gray-800 hover:border-fut-green/50 transition-all text-left"
            >
              <div className="w-10 h-10 bg-fut-darker rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-fut-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm">{ch.nome}</p>
                <p className="text-gray-500 text-xs">Clique para assistir</p>
              </div>
              <svg className="w-4 h-4 text-gray-500 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <div className="px-4 pb-4">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white text-sm font-medium transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AoVivoClient() {
  const [liveStatuses, setLiveStatuses] = useState<Record<string, string>>({});
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeChannel, setActiveChannel] = useState<MatchChannel | null>(null);
  const [watchingMatch, setWatchingMatch] = useState<Match | null>(null);

  useEffect(() => {
    const update = () => {
      const statuses: Record<string, string> = {};
      for (const m of initialMatches) {
        statuses[m.id] = getMatchStatus(m);
      }
      setLiveStatuses(statuses);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const visibleMatches = useMemo(() => {
    return initialMatches.filter((m) => {
      const status = liveStatuses[m.id];
      if (!status) return true;
      return status !== 'encerrado' && status !== 'expirado';
    });
  }, [liveStatuses]);

  const handleWatch = (match: Match) => {
    if (match.canais.length === 1) {
      setActiveChannel(match.canais[0]);
      setWatchingMatch(match);
    } else {
      setSelectedMatch(match);
    }
  };

  const handleSelectChannel = (channel: MatchChannel) => {
    if (selectedMatch) {
      setActiveChannel(channel);
      setWatchingMatch(selectedMatch);
      setSelectedMatch(null);
    }
  };

  const handleClosePlayer = () => {
    setActiveChannel(null);
    setWatchingMatch(null);
  };

  return (
    <>
      {activeChannel && watchingMatch && (
        <section className="mb-6 md:mb-8">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-fut-green font-bold text-sm">{watchingMatch.competicao}</p>
              <p className="text-white font-semibold">
                {watchingMatch.timeMandante} × {watchingMatch.timeVisitante}
              </p>
            </div>
            <button
              onClick={handleClosePlayer}
              className="text-gray-400 hover:text-white p-2 hover:bg-fut-darker rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <PlayerStream url={activeChannel.url} titulo={`${watchingMatch.timeMandante} × ${watchingMatch.timeVisitante}`} />
          {watchingMatch.canais.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {watchingMatch.canais.map((ch, i) => (
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
        </section>
      )}

      {!activeChannel && (
        <section className="mb-6 md:mb-8 bg-fut-darker rounded-2xl p-8 md:p-10 text-center border border-gray-800">
          <span className="text-4xl md:text-5xl block mb-3">📺</span>
          <p className="text-gray-400 text-base md:text-lg">Selecione um jogo abaixo para assistir.</p>
        </section>
      )}

      {visibleMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {visibleMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              status={liveStatuses[match.id] || 'em-breve'}
              onWatch={handleWatch}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <span className="text-5xl block mb-4">⚽</span>
          <p className="text-gray-400 text-lg">Nenhum jogo programado no momento.</p>
          <p className="text-gray-500 text-sm mt-2">Volte mais tarde para conferir as próximas transmissões.</p>
        </div>
      )}

      {selectedMatch && (
        <ChannelSelector
          match={selectedMatch}
          onSelect={handleSelectChannel}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </>
  );
}
