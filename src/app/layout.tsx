import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FUT LANCE - Notícias de Futebol ao Vivo',
    template: '%s | FUT LANCE',
  },
  description: 'FUT LANCE - O melhor blog de notícias de futebol do Brasil. Notícias do Brasileirão, Libertadores, Champions League, transferências, vídeos e transmissões ao vivo.',
  keywords: 'futebol, notícias, brasileirão, libertadores, champions league, transferências, ao vivo, transmissão, gol, jogo, time, jogador, futebol ao vivo, jogos de hoje, resultados de futebol, mercado da bola',
  authors: [{ name: 'FUT LANCE' }],
  creator: 'FUT LANCE',
  publisher: 'FUT LANCE',
  metadataBase: new URL('https://fut-lance.vercel.app'),
  openGraph: {
    title: 'FUT LANCE - Notícias de Futebol ao Vivo',
    description: 'O melhor blog de notícias de futebol do Brasil. Notícias, vídeos, transmissões ao vivo e muito mais.',
    url: 'https://fut-lance.vercel.app',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'FUT LANCE - Notícias de Futebol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUT LANCE - Notícias de Futebol ao Vivo',
    description: 'O melhor blog de notícias de futebol do Brasil.',
    images: ['https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FUT LANCE',
    url: 'https://fut-lance.vercel.app',
    description: 'O melhor blog de notícias de futebol do Brasil.',
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: 'FUT LANCE',
      url: 'https://fut-lance.vercel.app',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FUT LANCE',
    url: 'https://fut-lance.vercel.app',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&q=80',
    sameAs: [],
    description: 'Blog de notícias de futebol brasileiro e internacional.',
  };

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
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
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#00E676" />
        <meta name="google-site-verification" content="q8QifoOx5_Pxx91Cm7CY-rhcleJ5xoeHzFbF65LV7Js" />
      </head>
      <body className={inter.className}>
        {/*
          ADCASH: Inserir script oficial aqui após aprovação do domínio.
          Exemplo:
          <Script
            id="adcash-script"
            strategy="afterInteractive"
            src="https://www.adcash.com/script/SEU_SCRIPT_ID.js"
          />
        */}
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
