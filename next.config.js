/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/pages/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=600, stale-while-revalidate=60",
          },
        ],
      },
      {
        // matching all static assets
        source: "/a/fibr/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
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
