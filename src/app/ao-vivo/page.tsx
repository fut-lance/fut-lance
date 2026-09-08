import PlayerStream from '@/components/PlayerStream';
import { getTransmissoesAoVivo } from '@/lib/api';

export const revalidate = 60;

export default async function AoVivoPage() {
  let transmissoes: any[] = [];

  try {
    const data = await getTransmissoesAoVivo();
    transmissoes = data?.data || [];
  } catch (error) {
    console.error('Erro ao buscar transmissões:', error);
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const jogoAoVivo = transmissoes.find((t: any) => t.status_jogo === 'ao_vivo');
  const jogosAgendados = transmissoes.filter((t: any) => t.status_jogo === 'agendado');
  const jogosEncerrados = transmissoes.filter((t: any) => t.status_jogo === 'encerrado');

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
          <PlayerStream
            url={jogoAoVivo.link_m3u}
            titulo={jogoAoVivo.nome_jogo}
          />
        </section>
      )}

      {!jogoAoVivo && transmissoes.length === 0 && (
        <section className="mb-12 bg-fut-darker rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Nenhuma transmissão disponível</h2>
          <p className="text-gray-400">
            Cadastre transmissões no Strapi para que apareçam aqui.
          </p>
        </section>
      )}

      {jogosAgendados.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Próximos Jogos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jogosAgendados.map((jogo: any) => (
              <div key={jogo.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge bg-blue-600 text-white">{jogo.competicao}</span>
                  <span className="badge bg-gray-600 text-gray-300">Agendado</span>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-fut-dark rounded-full flex items-center justify-center text-2xl mb-2 mx-auto">
                        ⚽
                      </div>
                      <p className="text-white font-bold text-sm">{jogo.time_casa}</p>
                    </div>

                    <span className="text-gray-500 text-xl font-bold">VS</span>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-fut-dark rounded-full flex items-center justify-center text-2xl mb-2 mx-auto">
                        ⚽
                      </div>
                      <p className="text-white font-bold text-sm">{jogo.time_fora}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-400 text-sm">
                  <p>📅 {jogo.data_hora}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {jogosEncerrados.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-400 mb-4">Jogos Encerrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jogosEncerrados.map((jogo: any) => (
              <div key={jogo.id} className="card p-4 opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge bg-gray-700 text-gray-400">{jogo.competicao}</span>
                  <span className="badge bg-gray-700 text-gray-400">Encerrado</span>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 font-bold text-sm">
                    {jogo.time_casa} vs {jogo.time_fora}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{jogo.data_hora}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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