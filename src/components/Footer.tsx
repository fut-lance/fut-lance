import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-fut-dark border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚽</span>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-fut-green">FUT</span>
                <span className="text-white">LANCE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              O melhor portal de notícias de futebol do Brasil. Notícias, vídeos, transmissões ao vivo e muito mais.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Campeonatos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/campeonatos/brasileirao" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Brasileirão
                </Link>
              </li>
              <li>
                <Link href="/campeonatos/libertadores" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Libertadores
                </Link>
              </li>
              <li>
                <Link href="/campeonatos/champions-league" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Champions League
                </Link>
              </li>
              <li>
                <Link href="/campeonatos/copa-do-brasil" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Copa do Brasil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/ao-vivo" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Ao Vivo
                </Link>
              </li>
              <li>
                <Link href="/brasileirao-ao-vivo" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Brasileirão Ao Vivo
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/onde-assistir" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Onde Assistir
                </Link>
              </li>
              <li>
                <Link href="/ligas" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Ligas Internacionais
                </Link>
              </li>
              <li>
                <Link href="/jogadores" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Jogadores
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/politica-de-cookies" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-gray-500 text-xs space-y-2 mb-6">
            <p>
              <strong className="text-gray-400">FUT LANCE</strong> — Assistir futebol ao vivo online grátis. Acompanhe jogos ao vivo do Brasileirão, Libertadores, Champions League, Premier League e outros campeonatos. Horários, resultados, classificação e notícias de futebol atualizados diariamente.
            </p>
            <p>
              Futebol ao vivo hoje · Jogos de futebol ao vivo · Onde assistir futebol · Futebol na TV · Jogos de hoje · Brasileirão ao vivo · Libertadores ao vivo · Champions League ao vivo · Transferências do futebol · Mercado da bola
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} FUT LANCE. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="/politica-de-privacidade" className="hover:text-fut-green transition-colors">Privacidade</Link>
              <Link href="/politica-de-cookies" className="hover:text-fut-green transition-colors">Cookies</Link>
              <Link href="/termos-de-uso" className="hover:text-fut-green transition-colors">Termos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
