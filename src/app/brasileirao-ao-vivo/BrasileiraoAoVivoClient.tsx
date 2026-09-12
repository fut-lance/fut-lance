'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { matches } from '@/data/matches';
import { getCampeonato } from '@/data/campeonatos';

const teamSlugMap: Record<string, string> = {
  'Flamengo': 'flamengo', 'Palmeiras': 'palmeiras', 'Athletico-PR': 'atletico-pr',
  'Fluminense': 'fluminense', 'Bahia': 'bahia', 'Cruzeiro': 'cruzeiro',
  'Coritiba': 'coritiba', 'Atlético-MG': 'atletico-mg', 'Bragantino': 'bragantino',
  'São Paulo': 'sao-paulo',
};

export default function BrasileiraoAoVivoClient() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const brasileiraoMatches = matches.filter(m => m.competicao.toLowerCase().includes('brasileir'));
  const brasileirao = getCampeonato('brasileirao');
  const ranking = brasileirao?.classificacao || [];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300">Brasileirão Ao Vivo</span>
      </nav>

      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-3 h-3 bg-fut-accent rounded-full animate-pulse" />
          <h1 className="text-2xl md:text-4xl font-bold text-white">Brasileirão Ao Vivo Hoje</h1>
        </div>
        <p className="text-gray-400 text-sm md:text-base max-w-3xl leading-relaxed">
          Acompanhe o <strong className="text-white">Campeonato Brasileiro Série A ao vivo</strong> no Fut-Lance. Aqui você encontra todos os jogos do Brasileirão de hoje com horários, canais de transmissão e placar em tempo real. Confira também a classificação atualizada do Brasileirão 2026.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-fut-green">⚽</span> Jogos do Brasileirão Hoje
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brasileiraoMatches.map((match, i) => {
            const [d, m, y] = match.data.split('/').map(Number);
            const [h, min] = match.horario.split(':').map(Number);
            const matchStart = new Date(y, m - 1, d, h, min);
            const matchEnd = new Date(matchStart.getTime() + 2 * 60 * 60 * 1000);
            const isLive = now >= matchStart && now <= matchEnd;
            const isFinished = now > matchEnd;
            const isScheduled = now < matchStart;

            return (
              <Link
                key={i}
                href={`/ao-vivo/${match.slug}`}
                className={`rounded-xl p-4 border transition-all hover:shadow-lg ${
                  isLive
                    ? 'bg-red-900/20 border-red-500/50 animate-pulse'
                    : isFinished
                    ? 'bg-gray-900/50 border-gray-700'
                    : 'bg-fut-darker border-gray-800 hover:border-fut-green/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{match.competicao}</span>
                  {isLive && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">AO VIVO</span>}
                  {isFinished && <span className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded">ENCERRADO</span>}
                  {isScheduled && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">EM BREVE</span>}
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg">{match.timeMandante} x {match.timeVisitante}</div>
                  <div className="text-gray-400 text-sm mt-1">{match.data} às {match.horario}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-fut-green">🏆</span> Classificação Brasileirão 2026
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 py-2 px-2">#</th>
                <th className="text-left text-gray-400 py-2 px-2">Time</th>
                <th className="text-center text-gray-400 py-2 px-2">P</th>
                <th className="text-center text-gray-400 py-2 px-2">J</th>
                <th className="text-center text-gray-400 py-2 px-2">V</th>
                <th className="text-center text-gray-400 py-2 px-2">E</th>
                <th className="text-center text-gray-400 py-2 px-2">D</th>
                <th className="text-center text-gray-400 py-2 px-2">SG</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((team) => (
                <tr key={team.pos} className="border-b border-gray-800 hover:bg-fut-dark/50">
                  <td className="py-2 px-2 text-gray-400">{team.pos}º</td>
                  <td className="py-2 px-2 text-white font-medium">
                    {teamSlugMap[team.time] ? (
                      <Link href={`/times/${teamSlugMap[team.time]}`} className="hover:text-fut-green transition-colors">
                        {team.time}
                      </Link>
                    ) : team.time}
                  </td>
                  <td className="py-2 px-2 text-fut-green font-bold text-center">{team.pts}</td>
                  <td className="py-2 px-2 text-gray-400 text-center">{team.j}</td>
                  <td className="py-2 px-2 text-gray-400 text-center">{team.v}</td>
                  <td className="py-2 px-2 text-gray-400 text-center">{team.e}</td>
                  <td className="py-2 px-2 text-gray-400 text-center">{team.d}</td>
                  <td className="py-2 px-2 text-gray-400 text-center">{team.sg > 0 ? `+${team.sg}` : team.sg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/campeonatos/brasileirao" className="text-fut-green hover:underline text-sm mt-3 block">
          Ver classificação completa →
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
          <h3 className="text-white font-bold mb-2">📺 Onde Assistir</h3>
          <p className="text-gray-400 text-sm">Brasileirão ao vivo na: SporTV, Premiere, Globo, CazéTV (jogos selecionados)</p>
        </div>
        <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
          <h3 className="text-white font-bold mb-2">📊 Fase Atual</h3>
          <p className="text-gray-400 text-sm">{brasileirao?.fase || 'Brasileirão Série A'} {brasileirao?.periodo?.split('-')[1]?.trim() || '2026'}</p>
        </div>
        <div className="bg-fut-darker rounded-xl p-5 border border-gray-800">
          <h3 className="text-white font-bold mb-2">⚽ Artilheiro</h3>
          <p className="text-gray-400 text-sm">{brasileirao?.artilheiros?.[0]?.jogador || 'Em atualização'} ({brasileirao?.artilheiros?.[0]?.gols || '-'} gols) é o artilheiro do Brasileirão 2026</p>
        </div>
      </section>

      <section className="mt-8 bg-fut-darker rounded-2xl p-5 md:p-6 border border-gray-800">
        <h2 className="text-base font-bold text-white mb-3">Brasileirão Ao Vivo — Como Assistir no Fut-Lance</h2>
        <div className="text-gray-400 text-sm space-y-2">
          <p>
            O Fut-Lance é o melhor lugar para acompanhar o <strong className="text-white">Brasileirão ao vivo</strong>. Se você procura jogos do Campeonato Brasileiro Série A ao vivo, gratuitos ou na TV, está no site certo. Oferecemos horários, canais de transmissão e informações detalhadas de cada partida.
          </p>
          <p>
            Acompanhe partidas como <strong className="text-white">Flamengo x Palmeiras ao vivo</strong>, <strong className="text-white">Corinthians ao vivo hoje</strong>, <strong className="text-white">Santos ao vivo</strong> e muito mais. Nosso conteúdo é atualizado constantemente para garantir que você não perca nenhum lance do seu time do coração.
          </p>
          <p>
            Para ver a classificação completa, acesse nossa <Link href="/campeonatos/brasileirao" className="text-fut-green hover:underline">página do Brasileirão</Link>. Para ver todos os jogos do dia, acesse nossa <Link href="/ao-vivo" className="text-fut-green hover:underline">seção de jogos ao vivo</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
