import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.REACT_APP_API_URL}/api/:path*`, // Cambia esto por la URL de tu backend
      },
    ];
  },
};

export default nextConfig;
