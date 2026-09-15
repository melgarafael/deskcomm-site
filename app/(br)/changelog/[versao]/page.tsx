import { PaginaVersao, metadataDaVersao, parametrosDasVersoes } from "@/components/changelog/PaginaVersao";

// = REVALIDAR_SEGUNDOS (lib/changelog.ts). Literal porque o Next lê a configuração do segmento estaticamente.
export const revalidate = 600;
// Versão nova que ainda não existia no build é gerada no primeiro acesso.
export const dynamicParams = true;
export const generateStaticParams = parametrosDasVersoes;

type Props = { params: Promise<{ versao: string }> };

export async function generateMetadata({ params }: Props) {
  return metadataDaVersao("pt-BR", (await params).versao);
}

export default async function P({ params }: Props) {
  return <PaginaVersao idioma="pt-BR" versao={(await params).versao} />;
}
