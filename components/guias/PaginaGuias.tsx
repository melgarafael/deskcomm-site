import type { Metadata } from "next";

import { Cabecalho, GITHUB } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { CONTEUDO, type Idioma } from "@/conteudo";
import { COMANDOS, GUIAS_ATUALIZADO_EM, TEXTOS_GUIAS, type Assistente, type Guia, type TextosGuias } from "@/conteudo/guias";
import { alternatesDe } from "@/conteudo/rotas";

import { AbasDosAssistentes, Comando, FiltroDePublico } from "./Interativos";

export function metadataDosGuias(idioma: Idioma): Metadata {
  const t = TEXTOS_GUIAS[idioma];
  return { title: t.meta.titulo, description: t.meta.descricao, alternates: alternatesDe("guias", idioma) };
}

/** Rótulo pequeno em caixa-alta que abre cada seção — o mesmo ritmo da home. */
function Sobretitulo({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">{children}</p>;
}

function Terminal({ t }: { t: TextosGuias }) {
  return (
    <div aria-hidden className="relative">
      <div className="absolute -inset-3 -z-10 rounded-[26px] bg-accent-50" />
      <div className="overflow-hidden rounded-[16px] border border-[#3a362e] bg-[#1c1a16] text-[#ece8df] shadow-lg">
        <div className="flex items-center gap-1.5 border-b border-[#3a362e] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a463d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a463d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a463d]" />
          <span className="ml-3 font-mono text-[11px] text-[#8f8a7e]">{t.terminal.pasta}</span>
        </div>
        <div className="space-y-4 px-5 py-5 font-mono text-[13px] leading-relaxed sm:px-6 sm:py-6">
          <p>
            <span className="text-[#8f8a7e]">{t.terminal.voce} ›</span> <span className="text-white">{t.terminal.pedido}</span>
          </p>
          <p className="flex items-center gap-2 text-accent-300">
            <span className="inline-block h-2 w-2 rounded-full bg-accent-300" />
            {t.terminal.usando}
          </p>
          <ol className="space-y-2 border-l border-[#3a362e] pl-4">
            {t.terminal.passos.map((p, i) => (
              <li key={p} className="flex gap-3 text-[#cfc9bc]">
                <span className="text-[#8f8a7e]">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
          </ol>
          <p className="flex items-center gap-1 text-[#8f8a7e]">
            <span className="inline-block h-4 w-2 animate-pulse bg-accent-300/80 motion-reduce:animate-none" />
          </p>
        </div>
      </div>
    </div>
  );
}

function CartaoDoGuia({ g, t }: { g: Guia; t: TextosGuias }) {
  return (
    <article id={g.id} className="flex h-full scroll-mt-24 flex-col rounded-[12px] border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug">{g.titulo}</h3>
          <p className="mt-1 break-all font-mono text-[13px] text-accent-700">/{g.id}</p>
        </div>
        <span
          className={[
            "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
            g.publico === "opera" ? "border-accent-200 bg-accent-50 text-accent-700" : "border-border bg-bg text-text-muted",
          ].join(" ")}
        >
          {g.publico === "opera" ? t.catalogo.filtros.opera : t.catalogo.filtros.programa}
        </span>
      </div>
      <p className="mt-4 text-pretty leading-relaxed text-text-muted">{g.resumo}</p>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">{t.catalogo.faz}</p>
      <ul className="mt-2 space-y-1.5">
        {g.faz.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm leading-snug">
            <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-none stroke-accent-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 8.5 3 3 7-7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">{t.catalogo.pecaAssim}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {g.frases.map((f) => (
          <li key={f} className="rounded-[6px] border border-border bg-bg px-2.5 py-1 text-[13px] leading-snug text-text">
            “{f}”
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <div className="space-y-2 border-t border-border pt-4">
          <p className="text-xs leading-snug text-text-muted">
            <span className="font-bold text-text">{t.catalogo.paraQuem}:</span> {g.paraQuem}
          </p>
          <a href={`${GITHUB}/blob/main/.agents/skills/${g.id}/SKILL.md`} className="inline-block text-xs font-bold text-accent-700 underline decoration-accent-300 underline-offset-4 hover:decoration-accent-600">
            {t.catalogo.oficial}
          </a>
        </div>
      </div>
    </article>
  );
}

const NO_TERMINAL = /^(agy|opencode) /;

function PainelDoAssistente({ a, t }: { a: Assistente; t: TextosGuias }) {
  const linha = "grid gap-2 border-t border-border py-5 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8";
  const rotulo = "font-mono text-xs uppercase tracking-[0.14em] text-text-muted md:pt-0.5";
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
      <dl className="min-w-0 border-b border-border">
        <div className={linha}>
          <dt className={rotulo}>{t.assistentes.onde}</dt>
          <dd className="min-w-0">
            <p className="leading-relaxed">{a.onde}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.pastas.map((p) => (
                <li key={p.caminho} className="inline-flex items-center overflow-hidden rounded-[6px] border border-border text-[13px]">
                  <span className="bg-surface-elevated px-2 py-1 text-xs text-text-muted">{p.rotulo}</span>
                  <code className="px-2 py-1 font-mono">{p.caminho}</code>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={linha}>
          <dt className={rotulo}>{t.assistentes.sozinho}</dt>
          <dd className="leading-relaxed">{a.sozinho}</dd>
        </div>
        <div className={linha}>
          <dt className={rotulo}>{t.assistentes.peloNome}</dt>
          <dd className="min-w-0">
            <p className="leading-relaxed">{a.peloNome.texto}</p>
            <div className="mt-3">
              <Comando comando={a.peloNome.exemplo} copiar={t.copiar} copiado={t.copiado} selecionado={t.selecionado} prefixo="›" />
            </div>
          </dd>
        </div>
        <div className={linha}>
          <dt className={rotulo}>{t.assistentes.lista}</dt>
          <dd className="min-w-0">
            <p className="leading-relaxed">{a.lista.texto}</p>
            {a.lista.exemplo ? (
              <div className="mt-3">
                <Comando comando={a.lista.exemplo} copiar={t.copiar} copiado={t.copiado} selecionado={t.selecionado} prefixo={NO_TERMINAL.test(a.lista.exemplo) ? "$" : "›"} />
              </div>
            ) : null}
          </dd>
        </div>
      </dl>
      <aside className="h-fit rounded-[12px] border border-border bg-surface p-5">
        <p className="flex items-center gap-2 text-sm font-bold">
          <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 fill-none stroke-warn" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="8" cy="8" r="6.2" />
            <path d="M8 7.2v4M8 4.8v.1" />
          </svg>
          {t.assistentes.bomSaber}
        </p>
        <ul className="mt-3 space-y-3">
          {a.bomSaber.map((b) => (
            <li key={b} className="text-pretty text-sm leading-relaxed text-text-muted">
              {b}
            </li>
          ))}
        </ul>
        <a href={a.doc} className="mt-5 inline-block text-sm font-bold text-accent-700 underline decoration-accent-300 underline-offset-4 hover:decoration-accent-600">
          {t.assistentes.doc}
        </a>
      </aside>
    </div>
  );
}

export function PaginaGuias({ idioma }: { idioma: Idioma }) {
  const c = CONTEUDO[idioma];
  const t = TEXTOS_GUIAS[idioma];
  const opera = t.guias.filter((g) => g.publico === "opera").length;

  return (
    <>
      <Cabecalho c={c} idioma={idioma} pagina="guias" />
      <main>
        {/* HERO */}
        <section className="overflow-x-clip">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,470px)] lg:gap-16 lg:pb-20">
            <div className="min-w-0">
              <Sobretitulo>{t.sobretitulo}</Sobretitulo>
              <h1 className="mt-5 max-w-[20ch] text-balance text-[2.3rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[3.1rem]">{t.titulo}</h1>
              <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-text-muted">{t.subtitulo}</p>
              <div className="mt-8 max-w-[640px]">
                <Comando comando={COMANDOS.instalar} copiar={t.copiar} copiado={t.copiado} selecionado={t.selecionado} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#instalar" className="rounded-[4px] bg-accent-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 ease-out-fast hover:bg-accent-700">
                  {t.ctaInstalar}
                </a>
                <a href="#guias" className="rounded-[4px] border border-border px-5 py-3 text-sm font-bold transition-colors duration-150 ease-out-fast hover:border-accent-300 hover:bg-accent-50">
                  {t.ctaCatalogo}
                </a>
              </div>
            </div>
            <Terminal t={t} />
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6">
            <h2 className="sr-only">{t.passos.titulo}</h2>
            <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
              {t.passos.itens.map((p, i) => (
                <li key={p.titulo} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-200 bg-accent-50 font-mono text-sm text-accent-700">{i + 1}</span>
                  <div>
                    <p className="font-bold">{p.titulo}</p>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-text-muted">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CATÁLOGO */}
        <section id="guias" className="scroll-mt-16">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6">
            <Sobretitulo>{t.catalogo.sobretitulo}</Sobretitulo>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.015em] sm:text-4xl">{t.catalogo.titulo}</h2>
            <p className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-text-muted">{t.catalogo.texto}</p>
            <div className="mt-8">
              <FiltroDePublico
                rotulo={t.catalogo.sobretitulo}
                rotulos={[
                  { id: "todos", texto: t.catalogo.filtros.todos, total: t.guias.length },
                  { id: "opera", texto: t.catalogo.filtros.opera, total: opera },
                  { id: "programa", texto: t.catalogo.filtros.programa, total: t.guias.length - opera },
                ]}
                cartoes={t.guias.map((g) => ({ id: g.id, publico: g.publico, no: <CartaoDoGuia g={g} t={t} /> }))}
              />
            </div>
          </div>
        </section>

        {/* ASSISTENTES */}
        <section id="assistentes" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6">
            <Sobretitulo>{t.assistentes.sobretitulo}</Sobretitulo>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.015em] sm:text-4xl">{t.assistentes.titulo}</h2>
            <p className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-text-muted">{t.assistentes.texto}</p>
            <div className="mt-10">
              <AbasDosAssistentes abas={t.lista.map((a) => ({ id: a.id, nome: a.nome, painel: <PainelDoAssistente a={a} t={t} /> }))} />
            </div>
            <p className="mt-10 max-w-[80ch] text-pretty text-sm leading-relaxed text-text-muted">{t.assistentes.outros}</p>
          </div>
        </section>

        {/* INSTALAR */}
        <section id="instalar" className="scroll-mt-16 border-t border-border bg-surface">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6">
            <Sobretitulo>{t.instalar.sobretitulo}</Sobretitulo>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.015em] sm:text-4xl">{t.instalar.titulo}</h2>
            <p className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-text-muted">{t.instalar.texto}</p>

            <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <div className="min-w-0 rounded-[12px] border border-accent-200 bg-bg p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold">{t.instalar.opcaoA.titulo}</h3>
                  <span className="rounded-full bg-accent-600 px-2.5 py-0.5 text-[11px] font-bold text-white">{t.instalar.opcaoA.selo}</span>
                </div>
                <p className="mt-2 text-pretty leading-relaxed text-text-muted">{t.instalar.opcaoA.texto}</p>
                <div className="mt-5">
                  <Comando comando={COMANDOS.instalar} copiar={t.copiar} copiado={t.copiado} selecionado={t.selecionado} escuro />
                </div>
                <ul className="mt-5 space-y-2">
                  {t.instalar.opcaoA.detalhes.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-300" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm font-bold">{t.instalar.opcaoA.atualizar}</p>
                <p className="mt-3 text-sm text-text-muted">{t.instalar.opcaoA.remover}</p>
                <div className="mt-2">
                  <Comando comando={COMANDOS.remover} copiar={t.copiar} copiado={t.copiado} selecionado={t.selecionado} />
                </div>
              </div>

              <div className="min-w-0 rounded-[12px] border border-border bg-bg p-6 sm:p-7">
                <h3 className="text-xl font-bold">{t.instalar.opcaoB.titulo}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-text-muted">{t.instalar.opcaoB.texto}</p>
                <div className="mt-5">
                  <Comando comando={COMANDOS.clonar} copiar={t.copiar} copiado={t.copiado} selecionado={t.selecionado} />
                </div>
                <ul className="mt-5 space-y-2">
                  {t.instalar.opcaoB.detalhes.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 max-w-[80ch] text-pretty text-sm leading-relaxed text-text-muted">{t.instalar.windows}</p>
          </div>
        </section>

        {/* CONTRIBUIR */}
        <section id="contribuir" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
              <div>
                <Sobretitulo>{t.contribuir.sobretitulo}</Sobretitulo>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.015em] sm:text-4xl">{t.contribuir.titulo}</h2>
                <p className="mt-4 text-pretty leading-relaxed text-text-muted">{t.contribuir.texto}</p>
              </div>
              <ol className="space-y-6">
                {t.contribuir.passos.map((p, i) => (
                  <li key={p.titulo} className="grid grid-cols-[32px_minmax(0,1fr)] gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border font-mono text-sm text-text-muted">{i + 1}</span>
                    <div className="min-w-0">
                      <p className="font-bold">{p.titulo}</p>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-text-muted">{p.texto}</p>
                      {p.comando ? (
                        <div className="mt-3">
                          <Comando comando={p.comando} copiar={t.copiar} copiado={t.copiado} selecionado={t.selecionado} />
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[860px] px-5 py-20 sm:px-6">
            <h2 className="text-balance text-3xl font-bold tracking-[-0.015em] sm:text-4xl">{t.faq.titulo}</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {t.faq.itens.map((f) => (
                <details key={f.p} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold [&::-webkit-details-marker]:hidden">
                    {f.p}
                    <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 shrink-0 fill-none stroke-text-muted transition-transform duration-150 ease-out-fast group-open:rotate-45" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </summary>
                  <p className="pb-5 pr-8 text-pretty leading-relaxed text-text-muted">{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Rodape c={c} idioma={idioma} pagina="guias" atualizadoEm={GUIAS_ATUALIZADO_EM} />
    </>
  );
}
