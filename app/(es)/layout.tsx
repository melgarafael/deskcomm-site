import type { Metadata } from "next";

import { Documento } from "@/components/Documento";
import { CONTEUDO } from "@/conteudo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deskcomm.com.br"),
  title: CONTEUDO.es.meta.titulo,
  description: CONTEUDO.es.meta.descricao,
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "es_419", siteName: "DeskcommCRM" },
  alternates: {
    canonical: "/es",
    languages: {
      "pt-BR": "/",
      en: "/en",
      es: "/es",
      // x-default é o inglês: a versão para quem não casa com nenhum dos três.
      "x-default": "/en",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Documento lang="es">{children}</Documento>;
}
