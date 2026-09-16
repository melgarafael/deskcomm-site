import { Suspense } from "react";

import type { Conteudo, Idioma } from "@/conteudo";
import { IDIOMAS } from "@/conteudo";
import { ROTAS, ancoraDaHome, type PaginaId } from "@/conteudo/rotas";

import { Logotipo } from "./Marca";
import { StarCount } from "./StarCount";

export const GITHUB = "https://github.com/melgarafael/DeskcommCRM";

/**
 * O cabeçalho de todas as páginas.
 *
 * Saiu de dentro de `Pagina.tsx` quando o site ganhou páginas além da home, e com
 * três consertos medidos (Playwright, 360–1280 px, nos três idiomas):
 *   - a nav de âncoras só aparece a partir de 1024 px (era 768). Entre 768 e ~900
 *     px os links já quebravam em duas e três linhas, e em espanhol o botão de
 *     instalar ficava mais alto que o próprio cabeçalho;
 *   - âncoras e seletor de idioma funcionam fora da home (`/#instalar`; a mesma
 *     página no outro idioma);
 *   - o botão dos guias para devs: texto inteiro a partir de 1280 px, rótulo
 *     curto entre 640 e 1280, e só o ícone abaixo disso. Com o texto inteiro já em
 *     1024 px, o cabeçalho em espanhol passava 29 px da tela; e abaixo de 640 só o
 *     ícone cabe ao lado do botão de instalar num celular de 360 px.
 *
 * Não importa `Jornada` nem nada de `mesa/`: páginas que usam o cabeçalho não
 * carregam o Three.js da home.
 */
/** `sufixo`: o resto do caminho depois da página (`/1.27.2` numa versão), para o seletor de idioma
 *  levar à mesma versão, e não à lista — o mesmo sufixo que `alternatesDe` põe no hreflang. */
export function Cabecalho({ c, idioma, pagina, sufixo = "" }: { c: Conteudo; idioma: Idioma; pagina: PaginaId; sufixo?: string }) {
  const naHome = pagina === "home";
  const ancora = (frag: string) => ancoraDaHome(idioma, frag, naHome);
  const guiasAtiva = pagina === "guias";

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-bg/90 backdrop-blur-[2px]">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-5 sm:gap-8 sm:px-6">
        <a href={ROTAS.home[idioma]} className="flex shrink-0 items-center" aria-label="DeskcommCRM">
          <Logotipo className="h-7 w-auto" />
        </a>
        <nav className="hidden flex-1 items-center gap-6 lg:flex">
          {[
            [ancora("#como-funciona"), c.nav.comoFunciona],
            [ancora("#jornada"), c.nav.prova],
            [ancora("#instalar"), c.nav.instalar],
            [ancora("#preco"), c.nav.preco],
          ].map(([h, l]) => (
            <a key={h} href={h} className="whitespace-nowrap text-sm text-text-muted transition-colors duration-150 ease-out-fast hover:text-text">
              {l}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
          {/* Troca de idioma: links de verdade, não estado. Cada idioma tem URL
              própria — e aponta para a MESMA página no outro idioma. */}
          <nav aria-label={c.nav.idioma} className="hidden items-center gap-1 md:flex">
            {IDIOMAS.map((i) => (
              <a
                key={i.codigo}
                href={`${ROTAS[pagina][i.codigo]}${sufixo}`}
                hrefLang={i.codigo}
                aria-current={i.codigo === idioma ? "true" : undefined}
                className={[
                  "rounded-[4px] px-2 py-1 font-mono text-xs uppercase transition-colors duration-150 ease-out-fast",
                  i.codigo === idioma ? "bg-accent-50 text-accent-700" : "text-text-muted hover:text-text",
                ].join(" ")}
              >
                {i.codigo === "pt-BR" ? "pt" : i.codigo}
              </a>
            ))}
          </nav>
          <a
            href={ROTAS.guias[idioma]}
            aria-label={c.nav.guias}
            aria-current={guiasAtiva ? "page" : undefined}
            className={[
              "flex h-9 items-center gap-2 rounded-[4px] border px-2.5 text-sm transition-colors duration-150 ease-out-fast sm:px-3",
              guiasAtiva ? "border-accent-300 bg-accent-50 text-accent-700" : "border-border hover:border-accent-300 hover:bg-accent-50",
            ].join(" ")}
          >
            <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 shrink-0 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 4.5 5.5 8l-3 3.5" />
              <path d="M7.5 11.5h6" />
            </svg>
            <span className="hidden whitespace-nowrap sm:inline xl:hidden">{c.nav.guiasCurto}</span>
            <span className="hidden whitespace-nowrap xl:inline">{c.nav.guias}</span>
          </a>
          <a href={GITHUB} className="hidden h-9 items-center gap-2 rounded-[4px] border border-border px-3 text-sm transition-colors duration-150 ease-out-fast hover:border-accent-300 hover:bg-accent-50 md:flex">
            <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span>GitHub</span>
            <Suspense fallback={null}>
              <StarCount />
            </Suspense>
          </a>
          <a href={ancora("#instalar")} className="flex h-9 items-center whitespace-nowrap rounded-[4px] bg-accent-600 px-3 text-sm font-bold text-white transition-colors duration-150 ease-out-fast hover:bg-accent-700 sm:px-4">
            {c.nav.ctaInstalar}
          </a>
        </div>
      </div>
    </header>
  );
}
