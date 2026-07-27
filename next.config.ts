import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // Imagens da LP são estáticas e servidas do próprio domínio; sem remote patterns.
  images: { formats: ["image/avif", "image/webp"] },
};

export default config;
