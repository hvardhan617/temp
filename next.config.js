/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/a/fibr/:path*',
        destination: '/:path*',
      },
    ];
  },
  reactStrictMode: true,
  distDir: 'a/fibr',
  // basePath: '/a/fibr',
  assetPrefix: 'a/fibr',
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Add a rule to handle custom fonts and change the output path
  //   config.module.rules.push({
  //     test: /\.(woff|woff2|eot|ttf|otf)$/,
  //     use: {
  //       loader: 'file-loader',
  //       options: {
  //         publicPath: '/_next/static/media/',
  //         outputPath: '/a/fibr/_next/static/media/',
  //         name: '[name]-[hash].[ext]',
  //       },
  //     },
  //   });

  //   return config;
  // },
}

module.exports = nextConfig
