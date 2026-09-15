"use client";

import { useMemo, useState } from "react";

import { TEXTOS_CHANGELOG, formatarData } from "@/conteudo/changelog";
import { rotaDaVersao } from "@/conteudo/rotas";
import type { Idioma } from "@/conteudo/tipos";
import type { Salto, TipoSecao } from "@/lib/changelog";

import { ChipSalto, ChipSecao, ESTILO_SECAO, IconeSecao } from "./Marcadores";

/** O resumo de uma versão que a listagem precisa — só títulos, nunca o corpo inteiro. */
export type ResumoVersao = {
  versao: string;
  data: string;
  salto: Salto;
  secoes: { tipo: TipoSecao; titulo: string; titulos: string[] }[];
};

const FILTROS: Exclude<TipoSecao, "outro" | "seguranca">[] = ["atencao", "adicionado", "alterado", "corrigido"];
const TITULOS_VISIVEIS = 4;

/** Busca sem acento e sem caixa: "instalacao" acha "instalação". */
function normalizar(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function ListaDeVersoes({ idioma, versoes }: { idioma: Idioma; versoes: ResumoVersao[] }) {
  const t = TEXTOS_CHANGELOG[idioma];
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<TipoSecao | null>(null);

  const indice = useMemo(
    () => versoes.map((v) => normalizar([v.versao, ...v.secoes.flatMap((s) => [s.titulo, ...s.titulos])].join(" \n "))),
    [versoes],
  );

  const termos = normalizar(busca).split(/\s+/).filter(Boolean);
  const visiveis = versoes.filter((v, i) => {
    if (filtro && !v.secoes.some((s) => s.tipo === filtro || (filtro === "atencao" && s.tipo === "seguranca"))) return false;
    return termos.every((termo) => indice[i].includes(termo));
  });

  // Agrupa por mês, na ordem em que as versões já vêm (mais nova primeiro).
  const grupos: { mes: string; versoes: ResumoVersao[] }[] = [];
  for (const v of visiveis) {
    const mes = v.data.slice(0, 7);
    const ultimo = grupos[grupos.length - 1];
    if (ultimo?.mes === mes) ultimo.versoes.push(v);
    else grupos.push({ mes, versoes: [v] });
  }

  const rotuloSecao = (tipo: TipoSecao, titulo: string) => (tipo === "outro" ? titulo : t.secoes[tipo]);

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-5 border-b border-border bg-bg/95 px-5 py-4 backdrop-blur-[2px] sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block lg:w-[420px]">
            <span className="sr-only">{t.filtros.busca}</span>
            <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-text-muted" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder={t.filtros.busca}
              className="h-10 w-full rounded-[6px] border border-border bg-surface pl-9 pr-3 text-sm text-text placeholder:text-text-muted/80 focus:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-100"
            />
          </label>
          <div role="group" aria-label={t.filtros.rotulo} className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5">
            <button
              type="button"
              aria-pressed={filtro === null}
              onClick={() => setFiltro(null)}
              className={[
                "h-8 shrink-0 rounded-full border px-3 text-xs font-bold transition-colors duration-150 ease-out-fast",
                filtro === null ? "border-text bg-text text-bg" : "border-border bg-surface text-text-muted hover:text-text",
              ].join(" ")}
            >
              {t.filtros.todas}
            </button>
            {FILTROS.map((tipo) => (
              <button
                key={tipo}
                type="button"
                aria-pressed={filtro === tipo}
                onClick={() => setFiltro(filtro === tipo ? null : tipo)}
                className={[
                  "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors duration-150 ease-out-fast",
                  filtro === tipo ? ESTILO_SECAO[tipo].chip + " ring-1 ring-current" : "border-border bg-surface text-text-muted hover:text-text",
                ].join(" ")}
              >
                <IconeSecao tipo={tipo} />
                {t.secoes[tipo]}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 font-mono text-xs text-text-muted" aria-live="polite">
          {t.filtros.resultado(visiveis.length)}
        </p>
      </div>

      {visiveis.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-text-muted">{t.filtros.nenhuma}</p>
          <button
            type="button"
            onClick={() => {
              setBusca("");
              setFiltro(null);
            }}
            className="mt-4 rounded-[4px] border border-border px-4 py-2 text-sm font-bold transition-colors duration-150 ease-out-fast hover:border-accent-300 hover:bg-accent-50"
          >
            {t.filtros.limpar}
          </button>
        </div>
      ) : (
        <div className="pt-6">
          {grupos.map((g) => (
            <section key={g.mes} className="grid gap-x-10 pb-4 md:grid-cols-[150px_minmax(0,1fr)]">
              <h2 className="pb-3 pt-4 font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                {formatarData(`${g.mes}-01`, t.locale, "mes")}
              </h2>
              <ol className="relative border-l border-border">
                {g.versoes.map((v) => {
                  const destaque = v.secoes.find((s) => s.tipo === "atencao");
                  const titulos = v.secoes.flatMap((s) => s.titulos.map((titulo) => ({ tipo: s.tipo, titulo })));
                  return (
                    <li key={v.versao} className="relative pb-3 pl-6 sm:pl-8">
                      <span aria-hidden className={`absolute -left-[5px] top-[26px] h-[9px] w-[9px] rounded-full ring-4 ring-bg ${v.salto === "patch" ? "bg-accent-300" : "bg-accent-600"}`} />
                      <a
                        href={rotaDaVersao(idioma, v.versao)}
                        className="group block rounded-[12px] border border-transparent p-4 transition-colors duration-150 ease-out-fast hover:border-border hover:bg-surface sm:p-5"
                      >
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="font-mono text-lg font-medium tabular-nums text-text group-hover:text-accent-700">v{v.versao}</span>
                          <ChipSalto salto={v.salto} rotulo={t.saltos[v.salto]} />
                          <time dateTime={v.data} className="font-mono text-xs text-text-muted">
                            {formatarData(v.data, t.locale)}
                          </time>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {v.secoes.map((s) => (
                            <ChipSecao key={s.titulo} tipo={s.tipo} rotulo={rotuloSecao(s.tipo, s.titulo)} contagem={s.titulos.length} />
                          ))}
                        </div>
                        {titulos.length ? (
                          <ul lang="pt-BR" className="mt-3.5 space-y-1.5">
                            {titulos.slice(0, TITULOS_VISIVEIS).map((x, i) => (
                              <li key={i} className="flex gap-2 text-sm leading-snug text-text-muted">
                                <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${ESTILO_SECAO[x.tipo].ponto}`} aria-hidden />
                                <span className={destaque && x.tipo === "atencao" ? "text-text" : undefined}>{x.titulo}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-accent-700">
                          {titulos.length > TITULOS_VISIVEIS ? <span className="font-normal text-text-muted">{t.mais(titulos.length - TITULOS_VISIVEIS)} ·</span> : null}
                          <span className="underline decoration-accent-300 underline-offset-4 group-hover:decoration-accent-600">{t.lerCompleta}</span>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
