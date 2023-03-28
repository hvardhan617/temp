/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/a/fibr/_next/static/:path*',
        destination: '/_next/static/:path*',
      },
      {
        source: '/a/fibr/:path*',
        destination: '/:path*',
      },  
    ];
  },
  
  reactStrictMode: true,
  distDir: '/a/fibr',
  assetPrefix: '/a/fibr',
};

module.exports = nextConfig;
