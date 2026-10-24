import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // Imagens da LP são estáticas e servidas do próprio domínio; sem remote patterns.
  images: { formats: ["image/avif", "image/webp"] },
  // O curso em imagens é HTML estático (public/curso/index.html); sem isto, /curso dá 404.
  async rewrites() {
    return [{ source: "/curso", destination: "/curso/index.html" }];
  },
};

export default config;
