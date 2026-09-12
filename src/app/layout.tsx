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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'FUT LANCE - Notícias de Futebol ao Vivo',
    description: 'O melhor blog de notícias de futebol do Brasil. Notícias, vídeos, transmissões ao vivo e muito mais.',
    url: 'https://fut-lance.vercel.app',
    siteName: 'FUT LANCE',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FUT LANCE - Notícias de Futebol ao Vivo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUT LANCE - Notícias de Futebol ao Vivo',
    description: 'O melhor blog de notícias de futebol do Brasil.',
    images: ['/og-image.png'],
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://fut-lance.vercel.app/logo.png',
        width: 800,
        height: 400,
      },
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FUT LANCE',
    url: 'https://fut-lance.vercel.app',
    logo: {
      '@type': 'ImageObject',
      url: 'https://fut-lance.vercel.app/logo.png',
      width: 800,
      height: 400,
    },
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
        {/* ADCASH - Biblioteca */}
        <Script
          id="aclib"
          type="text/javascript"
          src="//acscdn.com/script/aclib.js"
          strategy="afterInteractive"
        />
        {/* ADCASH - AutoTag */}
        <Script
          id="adcash-autotag"
          type="text/javascript"
          strategy="afterInteractive"
        >
          {`
            function initAdcash() {
              if (typeof aclib !== 'undefined' && typeof aclib.runAutoTag === 'function') {
                aclib.runAutoTag({zoneId: 'cktkhqd7xx'});
              } else {
                setTimeout(initAdcash, 500);
              }
            }
            initAdcash();
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
        <meta name="theme-color" content="#00E676" />
        <meta name="google-site-verification" content="q8QifoOx5_Pxx91Cm7CY-rhcleJ5xoeHzFbF65LV7Js" />
      </head>
      <body className={inter.className}>
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
