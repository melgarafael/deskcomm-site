import type { NextConfig } from "next";
import { lerCapturasEspanhol } from "./lib/curso-capturas.mjs";

// Valide os arquivos antes de compilar. A home recebe só a capa: importar o
// validador nela faz o rastreador incluir todos os JPGs na função do servidor.
const capturasEspanhol = lerCapturasEspanhol();
const capaEspanhol = capturasEspanhol ? {
  foto: capturasEspanhol.capturas["inbox--assumir-e-responder--p1"].foto,
  largura: capturasEspanhol.largura,
  altura: capturasEspanhol.altura,
} : null;

const config: NextConfig = {
  reactStrictMode: true,
  // O Next incorpora esta constante no build; não é configuração do operador.
  env: { CURSO_CAPTURAS_ES: JSON.stringify(capaEspanhol) },
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
