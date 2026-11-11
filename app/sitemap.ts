import type { MetadataRoute } from "next";

import { lerChangelog } from "@/lib/changelog";
import { entradasDoSitemap } from "@/lib/sitemap";

// = REVALIDAR_SEGUNDOS (lib/changelog.ts). Literal porque o Next lê a configuração do segmento estaticamente.
// Mesmo ritmo das páginas de versão: release nova entra no sitemap junto com a página dela.
export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return entradasDoSitemap(await lerChangelog());
}
