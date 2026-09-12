'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import PlayerStream from '@/components/PlayerStream';
import { matches as initialMatches, type Match, type MatchChannel } from '@/data/matches';

function getMatchStatus(match: Match): 'em-breve' | 'ao-vivo' | 'encerrado' | 'expirado' {
  const now = new Date();
  const [d, m, y] = match.data.split('/').map(Number);
  const [h, min] = match.horario.split(':').map(Number);
  const matchStart = new Date(y, m - 1, d, h, min);
  const playerStart = new Date(matchStart.getTime() - 10 * 60 * 1000);
  const matchEnd = new Date(matchStart.getTime() + 2 * 60 * 60 * 1000);
  const removeAfter = new Date(matchEnd.getTime() + 20 * 60 * 1000);

  if (now < playerStart) return 'em-breve';
  if (now >= playerStart && now <= matchEnd) return 'ao-vivo';
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
    <div className="bg-fut-darker rounded-2xl border border-gray-800 overflow-hidden hover:border-fut-green/30 transition-all hover:shadow-lg hover:shadow-black/20">
      <Link href={`/ao-vivo/${match.slug}`} className="block px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-fut-green text-xs font-bold uppercase tracking-wider">{match.competicao}</span>
          <StatusBadge status={matchStatus} />
        </div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-2 overflow-hidden">
              <img
                src={match.logoTimeMandante}
                alt={`Escudo do ${match.timeMandante}`}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
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
            <span className="text-gray-500 text-2xl font-bold">×</span>
            <span className="text-gray-600 text-xs mt-1">{match.data}</span>
            <span className="text-fut-green text-xs font-bold">{match.horario}</span>
          </div>

          <div className="flex-1 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-fut-dark rounded-full flex items-center justify-center border border-gray-700 mb-2 overflow-hidden">
              <img
                src={match.logoTimeVisitante}
                alt={`Escudo do ${match.timeVisitante}`}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
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
      </Link>

      <div className="px-4 pb-4">
        {matchStatus === 'encerrado' ? (
          <Link
            href={`/ao-vivo/${match.slug}`}
            className="block w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold text-sm text-center transition-colors"
          >
            Ver resultado
          </Link>
        ) : matchStatus === 'em-breve' ? (
          <Link
            href={`/ao-vivo/${match.slug}`}
            className="block w-full py-3 rounded-xl bg-fut-darker hover:bg-gray-800 text-gray-300 font-bold text-sm text-center transition-colors border border-gray-700"
          >
            Ver transmissões
          </Link>
        ) : (
          <button
            onClick={() => onWatch(match)}
            className="w-full py-3 rounded-xl bg-fut-green hover:bg-green-600 text-white font-bold text-sm transition-colors shadow-lg shadow-fut-green/20 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            ASSISTIR AO VIVO
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');

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

  const competitions = useMemo(() => {
    const comps = new Set(initialMatches.map(m => m.competicao));
    return ['all', ...Array.from(comps)];
  }, []);

  const visibleMatches = useMemo(() => {
    return initialMatches.filter((m) => {
      const status = liveStatuses[m.id];
      if (status === 'encerrado' || status === 'expirado') return false;
      if (selectedCompetition !== 'all' && m.competicao !== selectedCompetition) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          m.timeMandante.toLowerCase().includes(query) ||
          m.timeVisitante.toLowerCase().includes(query) ||
          m.competicao.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [liveStatuses, searchQuery, selectedCompetition]);

  const handleWatch = (match: Match) => {
    if (match.canais.length > 0) {
      setActiveChannel(match.canais[0]);
      setWatchingMatch(match);
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
        <section className="mb-6 md:mb-8 bg-fut-darker rounded-2xl p-6 md:p-8 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por time ou campeonato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-fut-dark border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-fut-green transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {competitions.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompetition(comp)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCompetition === comp
                      ? 'bg-fut-green text-white'
                      : 'bg-fut-dark text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {comp === 'all' ? 'Todos' : comp}
                </button>
              ))}
            </div>
          </div>
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
