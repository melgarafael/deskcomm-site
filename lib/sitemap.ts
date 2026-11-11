/**
 * As URLs do `sitemap.xml`, com o hreflang de cada uma.
 *
 * Função pura (recebe as versões já lidas) para o teste rodar sem rede. Lista só
 * página que responde 200 no endereço final: o `www`, sem redirecionamento.
 */
import type { MetadataRoute } from "next";

import { INSTALACAO, ORIGEM, ROTAS, ROTAS_CURSO, rotaDaVersao, type PaginaId } from "../conteudo/rotas.ts";
import type { Idioma } from "../conteudo/tipos.ts";

const IDIOMAS: Idioma[] = ["pt-BR", "en", "es"];

function url(caminho: string): string {
  return caminho === "/" ? ORIGEM : `${ORIGEM}${caminho}`;
}

/** Uma entrada por idioma, cada uma apontando as três versões (como o hreflang da página). */
function trio(caminhoDe: (i: Idioma) => string, extra: Partial<MetadataRoute.Sitemap[number]> = {}): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(IDIOMAS.map((i) => [i, url(caminhoDe(i))]));
  return IDIOMAS.map((i) => ({ url: url(caminhoDe(i)), alternates: { languages }, ...extra }));
}

export function entradasDoSitemap(versoes: { versao: string; data: string }[]): MetadataRoute.Sitemap {
  const paginas: PaginaId[] = ["home", "guias", "changelog"];
  const recente = versoes[0]?.data;
  return [
    ...paginas.flatMap((p) =>
      trio((i) => ROTAS[p][i], p === "changelog" && recente ? { lastModified: recente } : {}),
    ),
    { url: url(INSTALACAO) },
    ...trio((i) => ROTAS_CURSO[i]),
    ...versoes.flatMap((v) => trio((i) => rotaDaVersao(i, v.versao), { lastModified: v.data })),
  ];
}
