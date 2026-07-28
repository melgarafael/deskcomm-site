import type { Metadata } from "next";

import { Documento } from "@/components/Documento";
import { CONTEUDO } from "@/conteudo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deskcomm.com.br"),
  title: CONTEUDO.en.meta.titulo,
  description: CONTEUDO.en.meta.descricao,
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "en_US", siteName: "DeskcommCRM" },
  alternates: {
    canonical: "/en",
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
  return <Documento lang="en">{children}</Documento>;
}
