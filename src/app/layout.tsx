import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FUT LANCE - Noticias de Futebol',
    template: '%s | FUT LANCE',
  },
  description: 'O melhor blog de noticias de futebol do Brasil. Noticias, videos, transmissoes ao vivo e muito mais.',
  keywords: 'futebol, noticias, brasileirao, libertadores, champions league, transferencias, ao vivo, transmissao',
  authors: [{ name: 'FUT LANCE' }],
  openGraph: {
    title: 'FUT LANCE - Noticias de Futebol',
    description: 'O melhor blog de noticias de futebol do Brasil.',
    url: 'https://fut-lance.vercel.app',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://fut-lance.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V6N0JVT695"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V6N0JVT695');
          `}
        </Script>
      </head>
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
