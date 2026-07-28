import Image from "next/image";
import { Suspense } from "react";

import type { Conteudo, Idioma } from "@/conteudo";
import { IDIOMAS } from "@/conteudo";

import { Jornada } from "./Jornada";
import { Mesa } from "./mesa/MesaEstatica";
import { StarCount } from "./StarCount";

const GITHUB = "https://github.com/melgarafael/DeskcommCRM";
const VILOES_IMG = ["/img/viloes-01-planilha.png", "/img/viloes-02-robo.png"];

export function Pagina({ c, idioma }: { c: Conteudo; idioma: Idioma }) {
  const base = IDIOMAS.find((i) => i.codigo === idioma)!.caminho;
  const href = (frag: string) => `${base === "/" ? "" : base}${frag}`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-transparent bg-bg/90 backdrop-blur-[2px]">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-8 px-6">
          <a href={base} className="flex items-center gap-2.5 font-bold tracking-tight">
            <span aria-hidden className="h-3.5 w-3.5 rounded-[4px] bg-accent-600" />
            DeskcommCRM
          </a>
          <nav className="hidden flex-1 items-center gap-6 md:flex">
            {[
              [href("#como-funciona"), c.nav.comoFunciona],
              [href("#jornada"), c.nav.prova],
              [href("#instalar"), c.nav.instalar],
              [href("#preco"), c.nav.preco],
            ].map(([h, l]) => (
              <a key={h} href={h} className="text-sm text-text-muted transition-colors duration-120 ease-out-fast hover:text-text">
                {l}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            {/* Troca de idioma: links de verdade, não estado. Cada idioma tem
                URL própria — é o que permite indexar e citar cada versão. */}
            <nav aria-label="Idioma" className="hidden items-center gap-1 sm:flex">
              {IDIOMAS.map((i) => (
                <a
                  key={i.codigo}
                  href={i.caminho}
                  hrefLang={i.codigo}
                  aria-current={i.codigo === idioma ? "true" : undefined}
                  className={[
                    "rounded-[4px] px-2 py-1 font-mono text-xs uppercase transition-colors duration-120 ease-out-fast",
                    i.codigo === idioma ? "bg-accent-50 text-accent-700" : "text-text-muted hover:text-text",
                  ].join(" ")}
                >
                  {i.codigo === "pt-BR" ? "pt" : i.codigo}
                </a>
              ))}
            </nav>
            <a href={GITHUB} className="hidden items-center gap-2 rounded-[4px] border border-border px-3 py-1.5 text-sm transition-colors duration-120 ease-out-fast hover:border-accent-300 hover:bg-accent-50 sm:flex">
              <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 fill-current">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              <span>GitHub</span>
              <Suspense fallback={null}>
                <StarCount />
              </Suspense>
            </a>
            <a href={href("#instalar")} className="rounded-[4px] bg-accent-600 px-4 py-2 text-sm font-bold text-white transition-colors duration-120 ease-out-fast hover:bg-accent-700">
              {c.nav.ctaInstalar}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="overflow-x-clip">
          <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-14 sm:pt-20">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-4">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">{c.hero.sobretitulo}</p>
                <h1 className="mt-5 text-pretty text-[2.6rem] font-bold leading-[1.06] tracking-[-0.022em] sm:text-[3.4rem]">
                  {c.hero.h1a}
                  <br />
                  <span className="text-accent-600">{c.hero.h1b}</span>
                </h1>
                <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-text-muted">{c.hero.sub}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a href={href("#instalar")} className="rounded-[4px] bg-accent-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-120 ease-out-fast hover:bg-accent-700">
                    {c.hero.ctaPrimario}
                  </a>
                  <a href={GITHUB} className="rounded-[4px] border border-border px-5 py-3 text-sm font-bold transition-colors duration-120 ease-out-fast hover:border-accent-300 hover:bg-accent-50">
                    {c.hero.ctaSecundario}
                  </a>
                </div>
                <p className="mt-5 font-mono text-xs text-text-muted">{c.hero.microcopy}</p>
              </div>
              <div className="min-w-0 lg:-mr-[8vw]">
                <Mesa />
              </div>
            </div>
          </div>
        </section>

        {/* VILÕES */}
        <section id="como-funciona" className="border-t border-border/70 bg-surface-elevated/40">
          <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
            <h2 className="max-w-[18ch] text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
              {c.viloes.titulo}
            </h2>
            <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
              {c.viloes.itens.map((v, i) => (
                <article key={v.titulo} className="group min-w-0">
                  <div className="flex aspect-[8/5] items-center justify-center overflow-hidden rounded-[12px] border border-border bg-bg p-3 transition-[border-color,transform] duration-200 ease-out-slow group-hover:-translate-y-px group-hover:border-accent-300">
                    <Image src={VILOES_IMG[i]!} alt={v.alt} width={1180} height={720} className="h-full w-full object-contain" />
                  </div>
                  <h3 className="mt-7 text-xl font-bold tracking-tight">{v.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-text-muted">{v.texto}</p>
                </article>
              ))}
            </div>
            <p className="mt-16 max-w-[46ch] border-l-2 border-accent-500 pl-5 text-lg leading-relaxed">
              {c.viloes.fecho.antes}
              <strong className="font-bold">{c.viloes.fecho.forte}</strong>
            </p>
          </div>
        </section>

        {/* A VIRADA */}
        <section className="border-t border-border/70">
          <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
            <div className="max-w-[52ch]">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">{c.virada.sobretitulo}</p>
              <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
                {c.virada.tituloA}
                <span className="text-accent-600">{c.virada.tituloDestaque}</span>.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">{c.virada.sub}</p>
            </div>
            <ol className="mt-14 border-t border-border">
              {c.virada.regras.map((r, i) => (
                <li key={r.regra} className="grid gap-x-8 gap-y-2 border-b border-border py-7 md:grid-cols-[auto_minmax(0,20rem)_minmax(0,1fr)] md:items-baseline">
                  <span className="font-mono text-sm text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-bold tracking-tight">{r.regra}</h3>
                  <p className="leading-relaxed text-text-muted">{r.prova}</p>
                </li>
              ))}
            </ol>
            <p className="mt-12 max-w-[62ch] leading-relaxed text-text-muted">
              {c.virada.fecho.antes}
              <a href={`${GITHUB}/blob/main/docs/doctrine/sistema-vivo.md`} className="font-mono text-sm text-text underline decoration-accent-300 underline-offset-4 transition-colors duration-120 ease-out-fast hover:decoration-accent-600">
                {c.virada.fecho.link}
              </a>
              {c.virada.fecho.depois}
            </p>
          </div>
        </section>

        <Jornada c={c} />

        {/* INSTALAR */}
        <section id="instalar" className="border-t border-border/70">
          <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:gap-16">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">{c.instalar.sobretitulo}</p>
                <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">{c.instalar.titulo}</h2>
                <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-text-muted">{c.instalar.sub}</p>
                <dl className="mt-10 space-y-6">
                  {c.instalar.apoio.map((a) => (
                    <div key={a.titulo}>
                      <dt className="font-bold tracking-tight">{a.titulo}</dt>
                      <dd className="mt-1.5 max-w-[46ch] leading-relaxed text-text-muted">{a.texto}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="min-w-0">
                <div className="overflow-hidden rounded-[12px] border border-border bg-surface">
                  <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} aria-hidden className="h-2 w-2 rounded-full bg-border" />
                    ))}
                    <span className="ml-1.5 font-mono text-xs text-text-muted">vps · bash</span>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.9]">
                    <code>
                      <span className="text-text-muted">{c.instalar.comentario1}{"\n"}</span>
                      git clone {GITHUB}.git{"\n"}
                      cd DeskcommCRM/hostgator-setup-kit{"\n\n"}
                      <span className="text-text-muted">{c.instalar.comentario2}{"\n"}</span>
                      <span className="text-accent-600">bash install.sh</span>
                    </code>
                  </pre>
                </div>
                <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-text-muted">{c.instalar.depois}</p>
                <div className="mt-8 rounded-[12px] border border-border bg-surface-elevated/60 p-5">
                  <p className="font-bold tracking-tight">{c.instalar.atualizarTitulo}</p>
                  <p className="mt-2 max-w-[52ch] leading-relaxed text-text-muted">
                    <code className="font-mono text-sm">bash update.sh</code> {c.instalar.atualizarTexto}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREÇO */}
        <section id="preco" className="border-t border-border/70 bg-surface-elevated/40">
          <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
            <div className="max-w-[54ch]">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">{c.preco.sobretitulo}</p>
              <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">{c.preco.titulo}</h2>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">{c.preco.sub}</p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border sm:grid-cols-3">
              {c.preco.cartoes.map((x) => (
                <div key={x.t} className="bg-bg p-7">
                  <p className="font-bold tracking-tight">{x.t}</p>
                  <p className="mt-2 leading-relaxed text-text-muted">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-[58ch] border-l-2 border-accent-500 pl-5 leading-relaxed">{c.preco.fecho}</p>
          </div>
        </section>

        {/* BANNER DA PARCERIA */}
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[20px] bg-[#03263c] text-white">
            <div aria-hidden className="h-1.5 w-full bg-[linear-gradient(90deg,#F67922_0%,#FFCF00_52%,#F67922_100%)]" />
            <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#FFCF00]">{c.banner.sobretitulo}</p>
                <h2 className="mt-4 text-pretty text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]">{c.banner.titulo}</h2>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-[#AFC6D6]">{c.banner.texto}</p>
              </div>
              <div className="lg:text-right">
                <a href="https://www.hostgator.com.br/52708-141-3-52.html" className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#F67922] px-6 py-4 font-bold text-white transition-colors duration-150 ease-out-fast hover:bg-[#FF8E3C]">
                  {c.banner.cta}
                  <span aria-hidden>→</span>
                </a>
                <p className="mt-3 text-xs text-[#AFC6D6]">{c.banner.microcopy}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
