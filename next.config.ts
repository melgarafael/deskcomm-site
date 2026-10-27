import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // Imagens da LP são estáticas e servidas do próprio domínio; sem remote patterns.
  images: { formats: ["image/avif", "image/webp"] },
  // beforeFiles é necessário na Vercel: o /curso/index.html canônico pode
  // resolver /curso automaticamente e ganhar de um rewrite após o filesystem.
  async rewrites() {
    return { beforeFiles: [
      { source: "/curso", destination: "/curso/pt-BR/index.html" },
      { source: "/en/course", destination: "/curso/en/index.html" },
      { source: "/es/curso", destination: "/curso/es/index.html" },
    ] };
  },
};

export default config;
