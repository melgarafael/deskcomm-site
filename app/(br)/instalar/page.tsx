import type { Metadata } from "next";

import { PaginaInstalacao } from "@/components/instalacao/PaginaInstalacao";
import { INSTALACAO } from "@/conteudo/rotas";

export const metadata: Metadata = {
  title: "Como instalar o DeskcommCRM na sua VPS — guia passo a passo",
  description: "Do servidor ao WhatsApp conectado: instale o DeskcommCRM com HostGator e Supabase, usando um token de acesso para preparar o banco automaticamente.",
  alternates: { canonical: INSTALACAO, languages: { "pt-BR": INSTALACAO } },
  openGraph: {
    title: "Seu CRM no ar. Um passo de cada vez.",
    description: "Guia de instalação do DeskcommCRM: VPS, token do Supabase, domínio, WhatsApp e IA.",
    url: INSTALACAO,
    locale: "pt_BR",
    type: "article",
  },
};

export default function Instalar() {
  return <PaginaInstalacao />;
}
