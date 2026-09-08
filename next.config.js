/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/stream/:path*',
        destination: 'http://xigfh01.site/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
