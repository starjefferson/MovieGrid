/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverSourceMaps: false,
  },
  productionBrowserSourceMaps: false,

  turbopack: {
    // 👇 Point this to your actual project root
    root: "C:/Users/DELL PC/Documents/my-movie-grid/my-app",
  },
};

export default nextConfig;