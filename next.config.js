/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: "edge",
  },

  // output: 'export',
  //   images: {
  //     unoptimized: true
  // }
};

module.exports = nextConfig;
