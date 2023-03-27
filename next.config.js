/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const rewrites = [
      // {
      //   "source": "/:path*",
      //   "destination": "/_next/:path*",
      //   "has": [
      //     {
      //       "type": "query",
      //       "key": "pathname",
      //       "value": "/_next/"
      //     }
      //   ]
      // },
      {
        source: '/a/fibr/_next/static/:path*',
        destination: '/_next/static/:path*',
      },
      {
        source: '/a/fibr/:path*',
        destination: '/:path*',
      },  
    ];
  
    // Loop through each rewrite and log input/output
    rewrites.forEach((rewrite) => {
      const { source, destination } = rewrite;
      console.log(`Rewriting "${source}" to "${destination}"`);
    });
  
    return rewrites;
  },
  
  reactStrictMode: true,
  distDir: '/a/fibr',
  assetPrefix: '/a/fibr',
};

module.exports = nextConfig;