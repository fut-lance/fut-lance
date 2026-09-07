import PlayerStream from '@/components/PlayerStream';

const transmissoesAoVivo = [
  {
    id: 1,
    nomeJogo: 'Flamengo x Corinthians',
    timeCasa: 'Flamengo',
    timeFora: 'Corinthians',
    dataHora: '07/09/2026 - 21h30',
    competicao: 'Brasileirão',
    status: 'ao_vivo',
    linkM3u: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400',
  },
  {
    id: 2,
    nomeJogo: 'Palmeiras x São Paulo',
    timeCasa: 'Palmeiras',
    timeFora: 'São Paulo',
    dataHora: '08/09/2026 - 16h00',
    competicao: 'Brasileirão',
    status: 'agendado',
    linkM3u: '',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
  },
  {
    id: 3,
    nomeJogo: 'Liverpool x Arsenal',
    timeCasa: 'Liverpool',
    timeFora: 'Arsenal',
    dataHora: '08/09/2026 - 13h30',
    competicao: 'Premier League',
    status: 'agendado',
    linkM3u: '',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=400',
  },
  {
    id: 4,
    nomeJogo: 'Real Madrid x Barcelona',
    timeCasa: 'Real Madrid',
    timeFora: 'Barcelona',
    dataHora: '09/09/2026 - 16h00',
    competicao: 'La Liga',
    status: 'agendado',
    linkM3u: '',
    thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'ao_vivo') {
    return (
      <span className="badge bg-red-600 text-white flex items-center gap-1">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        AO VIVO
      </span>
    );
  }
  return <span className="badge bg-gray-600 text-gray-300">Agendado</span>;
};

export default function AoVivoPage() {
  const jogoAoVivo = transmissoesAoVivo.find((t) => t.status === 'ao_vivo');
  const jogosAgendados = transmissoesAoVivo.filter((t) => t.status === 'agendado');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        📺 Transmissões Ao Vivo
      </h1>
      <p className="text-gray-400 mb-8">
        Assista aos jogos ao vivo diretamente pelo FUT LANCE.
      </p>

      {jogoAoVivo && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-fut-accent mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Assistir Agora
          </h2>
          <PlayerStream url={jogoAoVivo.linkM3u} titulo={jogoAoVivo.nomeJogo} />
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Próximos Jogos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jogosAgendados.map((jogo) => (
            <div
              key={jogo.id}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="badge bg-blue-600 text-white">{jogo.competicao}</span>
                <StatusBadge status={jogo.status} />
              </div>

              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-fut-dark rounded-full flex items-center justify-center text-2xl mb-2 mx-auto">
                      ⚽
                    </div>
                    <p className="text-white font-bold text-sm">{jogo.timeCasa}</p>
                  </div>

                  <span className="text-gray-500 text-xl font-bold">VS</span>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-fut-dark rounded-full flex items-center justify-center text-2xl mb-2 mx-auto">
                      ⚽
                    </div>
                    <p className="text-white font-bold text-sm">{jogo.timeFora}</p>
                  </div>
                </div>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <p>📅 {jogo.dataHora}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-fut-darker rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          ℹ️ Sobre as Transmissões
        </h2>
        <div className="text-gray-300 space-y-2">
          <p>• As transmissões ao vivo são de conteúdo público e aberto.</p>
          <p>• O player funciona melhor no navegador Google Chrome.</p>
          <p>• Caso o stream não carregue, tente recarregar a página.</p>
          <p>• Para melhor experiência, use uma conexão de internet estável.</p>
        </div>
      </section>
    </div>
  );
}
