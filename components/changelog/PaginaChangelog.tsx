import type { Metadata } from "next";

import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { CONTEUDO, type Idioma } from "@/conteudo";
import { TEXTOS_CHANGELOG, formatarData } from "@/conteudo/changelog";
import { ROTAS, alternatesDe, rotaDaVersao } from "@/conteudo/rotas";
import { contarItens, lerChangelog, textoSimples, titulosDaSecao, type Versao } from "@/lib/changelog";

import { ChipSalto, ChipSecao } from "./Marcadores";
import { ListaDeVersoes, type ResumoVersao } from "./ListaDeVersoes";

export function metadataDoChangelog(idioma: Idioma): Metadata {
  const t = TEXTOS_CHANGELOG[idioma];
  return { title: t.meta.titulo, description: t.meta.descricao, alternates: alternatesDe("changelog", idioma) };
}

function resumir(v: Versao): ResumoVersao {
  return {
    versao: v.versao,
    data: v.data,
    salto: v.salto,
    secoes: v.secoes.map((s) => ({ tipo: s.tipo, titulo: s.titulo, titulos: titulosDaSecao(s) })),
  };
}

/** Link do Google Tradutor para a própria página — a saída para quem não lê português. */
export function linkDeTraducao(caminho: string, idioma: Idioma): string {
  const alvo = idioma === "es" ? "es" : "en";
  return `https://www-deskcomm-com-br.translate.goog${caminho}?_x_tr_sl=pt&_x_tr_tl=${alvo}&_x_tr_hl=${alvo}`;
}

export function AvisoDeIdioma({ idioma, caminho }: { idioma: Idioma; caminho: string }) {
  const aviso = TEXTOS_CHANGELOG[idioma].aviso;
  if (!aviso) return null;
  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-border bg-surface px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
        <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 fill-none stroke-accent-600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6.2" />
          <path d="M1.8 8h12.4M8 1.8c1.7 1.8 2.5 3.8 2.5 6.2S9.7 12.4 8 14.2C6.3 12.4 5.5 10.4 5.5 8S6.3 3.6 8 1.8Z" />
        </svg>
        {aviso.texto}
      </p>
      <a
        href={linkDeTraducao(caminho, idioma)}
        className="shrink-0 self-start rounded-[4px] border border-border px-3 py-1.5 text-sm font-bold transition-colors duration-150 ease-out-fast hover:border-accent-300 hover:bg-accent-50 sm:self-auto"
      >
        {aviso.traduzir}
      </a>
    </div>
  );
}

export async function PaginaChangelog({ idioma }: { idioma: Idioma }) {
  const c = CONTEUDO[idioma];
  const t = TEXTOS_CHANGELOG[idioma];
  const versoes = await lerChangelog();
  const ultima = versoes[0];
  const totalMudancas = versoes.reduce((n, v) => n + v.secoes.reduce((m, s) => m + contarItens(s), 0), 0);
  const primeira = versoes[versoes.length - 1];
  const destaques = ultima.secoes.flatMap((s) => s.blocos.flatMap((b) => (b.t === "lista" ? b.itens.filter((it) => it.titulo).map((it) => ({ s, it })) : []))).slice(0, 3);

  return (
    <>
      <Cabecalho c={c} idioma={idioma} pagina="changelog" />
      <main className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6">
        <section className="grid gap-10 pb-12 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">{t.sobretitulo}</p>
            <h1 className="mt-5 max-w-[18ch] text-balance text-[2.3rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[3.1rem]">{t.titulo}</h1>
            <p className="mt-5 max-w-[56ch] text-pretty text-lg leading-relaxed text-text-muted">{t.subtitulo}</p>
            <dl className="mt-8 grid max-w-[520px] grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                [String(versoes.length), t.estatisticas.versoes],
                [String(totalMudancas), t.estatisticas.mudancas],
                [formatarData(primeira.data, t.locale, "mes"), t.estatisticas.desde],
              ].map(([valor, rotulo]) => (
                <div key={rotulo} className="min-w-0">
                  <dt className="sr-only">{rotulo}</dt>
                  <dd className="font-mono text-xl tabular-nums text-text sm:text-2xl">{valor}</dd>
                  <dd className="mt-1 text-xs leading-snug text-text-muted">{rotulo}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={rotaDaVersao(idioma, ultima.versao)}
            className="group relative block overflow-hidden rounded-[20px] border border-accent-200 bg-surface p-6 transition-colors duration-150 ease-out-fast hover:border-accent-300 sm:p-7"
          >
            <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-50" />
            <div className="relative">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-300 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-600" />
                </span>
                {t.maisRecente}
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <span className="font-mono text-4xl font-medium tabular-nums tracking-[-0.02em] text-text">v{ultima.versao}</span>
                <ChipSalto salto={ultima.salto} rotulo={t.saltos[ultima.salto]} />
              </div>
              <time dateTime={ultima.data} className="mt-1 block font-mono text-xs text-text-muted">
                {formatarData(ultima.data, t.locale)}
              </time>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ultima.secoes.map((s) => (
                  <ChipSecao key={s.titulo} tipo={s.tipo} rotulo={s.tipo === "outro" ? s.titulo : t.secoes[s.tipo]} contagem={contarItens(s)} />
                ))}
              </div>
              {destaques.length ? (
                <ul lang="pt-BR" className="mt-5 space-y-2 border-t border-border pt-5">
                  {destaques.map(({ it }, i) => (
                    <li key={i} className="line-clamp-2 text-sm font-bold leading-snug text-text">
                      {textoSimples(it.titulo ?? "", 200)}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent-700">
                <span className="underline decoration-accent-300 underline-offset-4 group-hover:decoration-accent-600">{t.lerCompleta}</span>
                <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 fill-none stroke-current transition-transform duration-150 ease-out-fast group-hover:translate-x-0.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </p>
            </div>
          </a>
        </section>

        {idioma !== "pt-BR" ? (
          <div className="pb-8">
            <AvisoDeIdioma idioma={idioma} caminho={ROTAS.changelog[idioma]} />
          </div>
        ) : null}

        <ListaDeVersoes idioma={idioma} versoes={versoes.map(resumir)} />
      </main>
      <Rodape c={c} idioma={idioma} pagina="changelog" />
    </>
  );
}
