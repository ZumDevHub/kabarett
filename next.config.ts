import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com", // Storyblok entrega imágenes desde aquí
      },
    ],
  },
};

export default nextConfig;
