import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-fut-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">⚽</span>
            <span className="text-2xl font-bold">
              <span className="text-fut-green">FUT</span>
              <span className="text-white">LANCE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-fut-green transition-colors font-medium"
            >
              Início
            </Link>
            <Link
              href="/noticias"
              className="text-gray-300 hover:text-fut-green transition-colors font-medium"
            >
              Notícias
            </Link>
            <Link
              href="/categoria/brasileirao"
              className="text-gray-300 hover:text-fut-green transition-colors font-medium"
            >
              Brasileirão
            </Link>
            <Link
              href="/categoria/libertadores"
              className="text-gray-300 hover:text-fut-green transition-colors font-medium"
            >
              Libertadores
            </Link>
            <Link
              href="/ao-vivo"
              className="bg-fut-accent hover:bg-red-600 text-white px-4 py-2 rounded font-bold transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              AO VIVO
            </Link>
          </nav>

          <button className="md:hidden text-gray-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
