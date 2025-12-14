/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbotrace: { sourceMap: false },
    serverSourceMaps: false,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
