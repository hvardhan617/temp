/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Automatic Static Optimization
  // See: https://nextjs.org/docs/advanced-features/automatic-static-optimization
  target: 'serverless',
  ssg: true,
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