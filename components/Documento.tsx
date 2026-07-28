import { Atkinson_Hyperlegible, IBM_Plex_Mono } from "next/font/google";

import type { Idioma } from "@/conteudo";

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

/**
 * Casca do documento, compartilhada pelos três layouts raiz.
 *
 * Existe um layout raiz POR IDIOMA (grupos de rota) porque só o layout raiz
 * emite <html>, e o atributo `lang` precisa ser o do idioma da página. Com um
 * layout só, /en e /es se declaravam pt-BR — contradizendo o próprio hreflang e
 * fazendo leitor de tela pronunciar o texto na língua errada.
 */
export function Documento({ lang, children }: { lang: Idioma; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${atkinson.variable} ${plexMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
