import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { CONTEUDO, type Idioma } from "@/conteudo";
import { TEXTOS_CHANGELOG, formatarData } from "@/conteudo/changelog";
import { ROTAS, alternatesDe, rotaDaVersao } from "@/conteudo/rotas";
import { CHANGELOG_NO_GITHUB, contarItens, lerChangelog, lerVersao, type Secao } from "@/lib/changelog";

import { ChipSalto, ESTILO_SECAO, IconeSecao } from "./Marcadores";
import { AvisoDeIdioma } from "./PaginaChangelog";
import { Blocos, Inline } from "./Texto";

export async function parametrosDasVersoes() {
  const versoes = await lerChangelog();
  return versoes.map((v) => ({ versao: v.versao }));
}

export async function metadataDaVersao(idioma: Idioma, versao: string): Promise<Metadata> {
  const t = TEXTOS_CHANGELOG[idioma];
  const achada = await lerVersao(versao);
  if (!achada) return { title: t.meta.titulo };
  return {
    title: t.meta.tituloVersao.replace("{v}", versao),
    description: t.meta.descricaoVersao.replace("{v}", versao).replace("{d}", formatarData(achada.atual.data, t.locale)),
    alternates: alternatesDe("changelog", idioma, `/${versao}`),
  };
}

function rotuloDaSecao(s: Secao, idioma: Idioma): string {
  return s.tipo === "outro" ? s.titulo : TEXTOS_CHANGELOG[idioma].secoes[s.tipo];
}

export async function PaginaVersao({ idioma, versao }: { idioma: Idioma; versao: string }) {
  const achada = await lerVersao(versao);
  if (!achada) notFound();
  const { atual: v, anterior, proxima } = achada;
  const todas = await lerChangelog();
  const c = CONTEUDO[idioma];
  const t = TEXTOS_CHANGELOG[idioma];
  const total = v.secoes.reduce((n, s) => n + contarItens(s), 0);
  const idSecao = (s: Secao, i: number) => (s.tipo === "outro" ? `secao-${i + 1}` : s.tipo);

  return (
    <>
      <Cabecalho c={c} idioma={idioma} pagina="changelog" sufixo={`/${v.versao}`} />
      <main className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6">
        <nav aria-label={t.migalha} className="pt-8 sm:pt-10">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
            <li>
              <a href={ROTAS.changelog[idioma]} className="underline decoration-border underline-offset-4 hover:text-text hover:decoration-accent-300">
                {t.sobretitulo}
              </a>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-text">
              v{v.versao}
            </li>
          </ol>
        </nav>

        <header className="border-b border-border pb-8 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <ChipSalto salto={v.salto} rotulo={t.saltos[v.salto]} />
            <time dateTime={v.data} className="font-mono text-xs text-text-muted">
              {formatarData(v.data, t.locale)}
            </time>
            <span className="font-mono text-xs text-text-muted">· {t.itens(total)}</span>
          </div>
          <h1 className="mt-4 font-mono text-[2.6rem] font-medium leading-none tracking-[-0.03em] sm:text-[3.6rem]">
            <span className="sr-only">{t.versao(v.versao)}</span>
            <span aria-hidden>v{v.versao}</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {v.secoes.map((s, i) => (
              <a
                key={s.titulo}
                href={`#${idSecao(s, i)}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold transition-colors duration-150 ease-out-fast hover:ring-1 hover:ring-current ${ESTILO_SECAO[s.tipo].chip}`}
              >
                <IconeSecao tipo={s.tipo} />
                {rotuloDaSecao(s, idioma)}
                <span className="font-mono text-xs font-normal tabular-nums">{contarItens(s)}</span>
              </a>
            ))}
          </div>
        </header>

        {idioma !== "pt-BR" ? (
          <div className="pt-8">
            <AvisoDeIdioma idioma={idioma} caminho={rotaDaVersao(idioma, v.versao)} />
          </div>
        ) : null}

        <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <article lang="pt-BR" className="min-w-0 max-w-[760px]">
            {v.introducao.length ? (
              <section aria-label={t.introducao} className="mb-10 rounded-[12px] border border-border bg-surface p-5 sm:p-6">
                <Blocos blocos={v.introducao} />
              </section>
            ) : null}

            <div className="space-y-12">
              {v.secoes.map((s, i) => (
                <section key={s.titulo} id={idSecao(s, i)} className="scroll-mt-24">
                  <h2 className="flex items-center gap-2.5 text-xl font-bold" lang={s.tipo === "outro" ? "pt-BR" : idioma}>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${ESTILO_SECAO[s.tipo].chip}`}>
                      <IconeSecao tipo={s.tipo} className="h-4 w-4" />
                    </span>
                    {rotuloDaSecao(s, idioma)}
                    <span className="font-mono text-sm font-normal text-text-muted">{contarItens(s)}</span>
                  </h2>
                  {s.tipo === "atencao" ? (
                    <p lang={idioma} className="mt-3 text-sm text-[#7a5520]">
                      {t.atencao}
                    </p>
                  ) : null}

                  <div className="mt-5 space-y-3">
                    {s.blocos.map((b, j) =>
                      b.t === "lista" ? (
                        b.itens.map((it, k) => {
                          // Numeração corrida na seção: a 1.6.0 tem duas listas em "Corrigido", e o id não pode repetir.
                          const antes = s.blocos.slice(0, j).reduce((n, x) => n + (x.t === "lista" ? x.itens.length : 0), 0);
                          const ancora = `${idSecao(s, i)}-${antes + k + 1}`;
                          return (
                            <div
                              key={`${j}-${k}`}
                              id={ancora}
                              className={`group scroll-mt-24 rounded-[12px] border bg-surface p-5 sm:p-6 ${s.tipo === "atencao" ? "border-warn/40" : "border-border"}`}
                            >
                              {/* Flutua fora do `h3`: o cartão tem âncora com ou sem título, e este link é a única
                                  forma de obtê-la pela tela. Dentro do `h3`, o cartão sem título não oferecia link. */}
                              <a
                                href={`#${ancora}`}
                                aria-label={t.linkDoItem}
                                className="float-right ml-3 mt-0.5 rounded-[4px] p-1 text-text-muted opacity-0 transition-opacity duration-150 ease-out-fast hover:text-accent-700 focus:opacity-100 group-hover:opacity-100"
                              >
                                <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round">
                                  <path d="M6.5 9.5 9.5 6.5M7 4.5l1-1a2.8 2.8 0 0 1 4 4l-1 1M9 11.5l-1 1a2.8 2.8 0 0 1-4-4l1-1" />
                                </svg>
                              </a>
                              {it.titulo ? (
                                <h3 className="text-[1.05rem] font-bold leading-snug text-text">
                                  <Inline texto={it.titulo} />
                                </h3>
                              ) : null}
                              {it.blocos.length ? (
                                <div className={it.titulo ? "mt-3" : undefined}>
                                  <Blocos blocos={it.blocos} />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      ) : (
                        <div key={j} className="px-1">
                          <Blocos blocos={[b]} />
                        </div>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>

            <nav aria-label={t.todasAsVersoes} className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2" lang={idioma}>
              {anterior ? (
                <a href={rotaDaVersao(idioma, anterior.versao)} className="group rounded-[12px] border border-border p-4 transition-colors duration-150 ease-out-fast hover:border-accent-300 hover:bg-surface">
                  <span className="block text-xs text-text-muted">← {t.anterior}</span>
                  <span className="mt-1 block font-mono text-lg text-text group-hover:text-accent-700">v{anterior.versao}</span>
                </a>
              ) : (
                <span />
              )}
              {proxima ? (
                <a href={rotaDaVersao(idioma, proxima.versao)} className="group rounded-[12px] border border-border p-4 text-right transition-colors duration-150 ease-out-fast hover:border-accent-300 hover:bg-surface">
                  <span className="block text-xs text-text-muted">{t.proxima} →</span>
                  <span className="mt-1 block font-mono text-lg text-text group-hover:text-accent-700">v{proxima.versao}</span>
                </a>
              ) : null}
            </nav>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">{t.nestaVersao}</p>
                <ul className="mt-3 space-y-1.5">
                  {v.secoes.map((s, i) => (
                    <li key={s.titulo}>
                      <a href={`#${idSecao(s, i)}`} className="flex items-center justify-between gap-2 rounded-[4px] px-2 py-1 text-sm text-text-muted transition-colors duration-150 ease-out-fast hover:bg-surface hover:text-text">
                        <span className="flex items-center gap-2">
                          <IconeSecao tipo={s.tipo} />
                          {rotuloDaSecao(s, idioma)}
                        </span>
                        <span className="font-mono text-xs tabular-nums">{contarItens(s)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href={`${CHANGELOG_NO_GITHUB}#${v.ancoraGithub}`} className="mt-4 inline-flex items-center gap-1.5 px-2 text-sm text-text-muted underline decoration-border underline-offset-4 hover:text-text hover:decoration-accent-300">
                  {t.verNoGithub}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">{t.todasAsVersoes}</p>
                <ul className="mt-3 max-h-[46vh] space-y-0.5 overflow-y-auto overscroll-contain pr-1">
                  {todas.map((x) => (
                    <li key={x.versao}>
                      <a
                        href={rotaDaVersao(idioma, x.versao)}
                        aria-current={x.versao === v.versao ? "page" : undefined}
                        className={[
                          "flex items-baseline justify-between gap-2 rounded-[4px] px-2 py-1 font-mono text-sm transition-colors duration-150 ease-out-fast",
                          x.versao === v.versao ? "bg-accent-50 text-accent-700" : "text-text-muted hover:bg-surface hover:text-text",
                        ].join(" ")}
                      >
                        <span>v{x.versao}</span>
                        <span className="text-[11px]">{formatarData(x.data, t.locale, "curto")}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="pt-10 lg:hidden">
          <a href={ROTAS.changelog[idioma]} className="inline-flex items-center gap-2 rounded-[4px] border border-border px-4 py-2 text-sm font-bold transition-colors duration-150 ease-out-fast hover:border-accent-300 hover:bg-accent-50">
            ← {t.voltar}
          </a>
          <a href={`${CHANGELOG_NO_GITHUB}#${v.ancoraGithub}`} className="ml-3 text-sm text-text-muted underline decoration-border underline-offset-4">
            {t.verNoGithub}
          </a>
        </div>
      </main>
      <Rodape c={c} idioma={idioma} pagina="changelog" atualizadoEm={todas[0].data} />
    </>
  );
}
