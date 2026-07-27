import type { MetadataRoute } from "next";

/**
 * Permitimos explicitamente os bots de BUSCA das IAs (distintos dos de treino).
 * A doc da OpenAI é clara: site que sai do OAI-SearchBot não aparece nas
 * respostas do ChatGPT Search. O `noindex` do layout é que segura a indexação
 * enquanto a página é provisória — bloquear no robots.txt ensinaria os
 * rastreadores a pular o host, e isso não se desfaz rápido.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    host: "https://deskcomm.com.br",
  };
}
