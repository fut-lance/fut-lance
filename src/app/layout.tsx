import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FUT LANCE - Notícias de Futebol',
  description: 'O melhor blog de notícias de futebol do Brasil. Notícias, vídeos, transmissões ao vivo e muito mais.',
  keywords: 'futebol, notícias, brasileirão, libertadores, champions league, transferências',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
