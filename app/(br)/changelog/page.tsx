import { PaginaChangelog, metadataDoChangelog } from "@/components/changelog/PaginaChangelog";

// = REVALIDAR_SEGUNDOS (lib/changelog.ts). Literal porque o Next lê a configuração do segmento estaticamente.
export const revalidate = 600;

export const metadata = metadataDoChangelog("pt-BR");

export default function P() {
  return <PaginaChangelog idioma="pt-BR" />;
}
