import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // Imagens da LP são estáticas e servidas do próprio domínio; sem remote patterns.
  images: { formats: ["image/avif", "image/webp"] },
  // O curso é localizado no prebuild, mantendo um só conjunto de capturas.
  async rewrites() {
    return [
      { source: "/curso", destination: "/curso/pt-BR/index.html" },
      { source: "/en/course", destination: "/curso/en/index.html" },
      { source: "/es/curso", destination: "/curso/es/index.html" },
    ];
  },
};

export default config;
