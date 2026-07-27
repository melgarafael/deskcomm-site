import type { Metadata } from "next";
import { Atkinson_Hyperlegible, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-atkinson",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deskcomm.com.br"),
  title: "DeskcommCRM",
  description:
    "Sistema operacional comercial vivo: agentes de IA que atendem no WhatsApp, qualificam o lead e movem o funil — no seu servidor.",
  // noindex enquanto a página não existe de verdade. Conteúdo fino indexado
  // gasta a primeira impressão do domínio nos rastreadores, e domínio novo
  // tem UMA estreia. Sai junto com o lançamento da LP.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "DeskcommCRM",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${atkinson.variable} ${plexMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
