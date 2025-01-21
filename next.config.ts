import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://to-do-list-59r7.onrender.com/api/tasks/*', // Cambia esto por la URL de tu backend
      },
    ];
  },
};

export default nextConfig;
