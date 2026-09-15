/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/jogadores', destination: '/noticias', permanent: true },
      { source: '/jogadores/:path*', destination: '/noticias', permanent: true },
      { source: '/onde-assistir', destination: '/ao-vivo', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/ao-vivo/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=300, stale-while-revalidate=600' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
