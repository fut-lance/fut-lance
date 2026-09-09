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
                <Link href="/categoria/brasileirao" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Brasileirão
                </Link>
              </li>
              <li>
                <Link href="/categoria/libertadores" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Libertadores
                </Link>
              </li>
              <li>
                <Link href="/categoria/champions-league" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Champions League
                </Link>
              </li>
              <li>
                <Link href="/categoria/transferencias" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Transferências
                </Link>
              </li>
              <li>
                <Link href="/categoria/copa-do-brasil" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Copa do Brasil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Times</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/flamengo" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Flamengo
                </Link>
              </li>
              <li>
                <Link href="/categoria/palmeiras" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Palmeiras
                </Link>
              </li>
              <li>
                <Link href="/categoria/corinthians" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Corinthians
                </Link>
              </li>
              <li>
                <Link href="/categoria/sao-paulo" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  São Paulo
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
                <Link href="/noticias" className="text-gray-400 hover:text-fut-green text-sm transition-colors">
                  Notícias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} FUT LANCE. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
