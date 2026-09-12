'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/ao-vivo', label: 'Ao Vivo', live: true },
  { href: '/brasileirao-ao-vivo', label: 'Brasileirão Ao Vivo' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/campeonatos/brasileirao', label: 'Brasileirão' },
  { href: '/campeonatos/libertadores', label: 'Libertadores' },
  { href: '/campeonatos/champions-league', label: 'Champions' },
  { href: '/ligas', label: 'Ligas' },
  { href: '/jogadores', label: 'Jogadores' },
  { href: '/onde-assistir', label: 'Onde Assistir' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-fut-dark/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="FUT LANCE" className="h-12 md:h-14 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.live ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-fut-accent hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 text-sm ml-2"
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {link.label.toUpperCase()}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-fut-green hover:bg-fut-darker/50 px-3 py-2 rounded-lg transition-all font-medium text-sm"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <button
            className="lg:hidden text-gray-300 p-2 hover:bg-fut-darker rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-800 pt-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium py-3 px-4 rounded-lg ${
                  link.live
                    ? 'bg-fut-accent text-white flex items-center gap-2'
                    : 'text-gray-300 hover:text-fut-green hover:bg-fut-darker/50'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.live && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                {link.live ? link.label.toUpperCase() : link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
