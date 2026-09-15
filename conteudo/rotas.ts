import type { Metadata } from "next";

import type { Idioma } from "./tipos";

/**
 * As páginas do site e o endereço de cada uma, por idioma.
 *
 * Existe porque o site deixou de ter uma página só. Com a home como única rota,
 * três coisas funcionavam por acaso e quebravam em qualquer página nova:
 *   - a âncora em pt-BR saía relativa (`#instalar`), e em `/guias` virava
 *     `/guias#instalar`, que não existe;
 *   - o seletor de idioma sempre levava para a HOME do outro idioma, e não para
 *     a mesma página;
 *   - o layout de cada idioma declara canonical e hreflang da home, e toda
 *     página-filha herdava — dizendo ao buscador que `/guias` É a home.
 */
export type PaginaId = "home" | "guias" | "changelog";

export const ROTAS: Record<PaginaId, Record<Idioma, string>> = {
  home: { "pt-BR": "/", en: "/en", es: "/es" },
  guias: { "pt-BR": "/guias", en: "/en/guides", es: "/es/guias" },
  changelog: { "pt-BR": "/changelog", en: "/en/changelog", es: "/es/changelog" },
};

/** Âncora de uma seção da home, válida de qualquer página: `/#instalar`, `/en#instalar`. */
export function ancoraDaHome(idioma: Idioma, fragmento: string, naHome: boolean): string {
  if (naHome) return fragmento;
  return `${ROTAS.home[idioma]}${fragmento}`;
}

/** Endereço de uma versão no changelog: `/changelog/1.27.2`, `/en/changelog/1.27.2`. */
export function rotaDaVersao(idioma: Idioma, versao: string): string {
  return `${ROTAS.changelog[idioma]}/${versao}`;
}

/**
 * Canonical e hreflang de UMA página. As páginas-filhas sobrescrevem o que o
 * layout herda — sem isto, canonical apontaria para a home.
 * x-default é o inglês, como na home.
 */
export function alternatesDe(pagina: PaginaId, idioma: Idioma, sufixo = ""): Metadata["alternates"] {
  return {
    canonical: `${ROTAS[pagina][idioma]}${sufixo}`,
    languages: {
      "pt-BR": `${ROTAS[pagina]["pt-BR"]}${sufixo}`,
      en: `${ROTAS[pagina].en}${sufixo}`,
      es: `${ROTAS[pagina].es}${sufixo}`,
      "x-default": `${ROTAS[pagina].en}${sufixo}`,
    },
  };
}
