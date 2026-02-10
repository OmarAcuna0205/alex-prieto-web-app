import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Esto permite cualquier proyecto de Supabase
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Por si usamos fotos de prueba
      },
    ],
  },
};

export default nextConfig;