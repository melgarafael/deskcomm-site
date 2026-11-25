/**
 * Dados estruturados (JSON-LD, schema.org) da home: o que o produto é e quem o publica.
 *
 * ── Por quê ─────────────────────────────────────────────────────────────────
 * Buscador e resposta de IA leem a página como texto; o JSON-LD diz, sem
 * interpretação, que "DeskcommCRM" é um software de negócio, gratuito, sob MIT,
 * com o código no GitHub. Medido em 2026-11-25: a home não emitia nenhum bloco
 * `application/ld+json`.
 *
 * ── O que fica de fora, de propósito ────────────────────────────────────────
 * - `softwareVersion`: a home é estática; uma versão fixa aqui fica velha na
 *   release seguinte (sai uma por dia). A versão está no /changelog.
 * - `aggregateRating`/`review`: não temos avaliações publicadas; inventar dá
 *   ação manual do Google e é mentira.
 *
 * Toda afirmação aqui confere com a `main` do DeskcommCRM: licença MIT
 * (`LICENSE`), sem versão paga (FAQ do próprio site), instalação por Docker numa
 * VPS (`hostgator-setup-kit/install.sh`).
 *
 * Só tem `import type`, para o teste importar com `node --experimental-strip-types`.
 */
import type { Idioma } from "../conteudo/tipos";

/** O host que responde 200 (`deskcomm.com.br` dá 308 para o `www`). Mesmo valor do `ORIGEM` do #17. */
export const ORIGEM_LD = "https://www.deskcomm.com.br";
export const REPOSITORIO_LD = "https://github.com/melgarafael/DeskcommCRM";

const CAMINHO: Record<Idioma, string> = { "pt-BR": "/", en: "/en", es: "/es" };

export function dadosEstruturados(idioma: Idioma, descricao: string) {
  const url = CAMINHO[idioma] === "/" ? `${ORIGEM_LD}/` : `${ORIGEM_LD}${CAMINHO[idioma]}`;
  const organizacao = `${ORIGEM_LD}/#organizacao`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizacao,
        name: "DeskcommCRM",
        url: `${ORIGEM_LD}/`,
        logo: `${ORIGEM_LD}/apple-icon.png`,
        sameAs: [REPOSITORIO_LD],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: "DeskcommCRM",
        description: descricao,
        url,
        inLanguage: idioma,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "CRM",
        operatingSystem: "Linux (Docker)",
        isAccessibleForFree: true,
        license: "https://opensource.org/licenses/MIT",
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        sameAs: [REPOSITORIO_LD],
        publisher: { "@id": organizacao },
      },
    ],
  };
}

/** Serializa para dentro de <script>: `<` vira `<`, então nenhum texto fecha a tag. */
export function serializarLd(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, "\\u003c");
}
