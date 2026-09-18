import type { Metadata } from "next";

import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { CONTEUDO, type Idioma } from "@/conteudo";
import { EXTENSOES_ATUALIZADO_EM, TEXTOS_EXTENSOES } from "@/conteudo/extensoes";
import { alternatesDe } from "@/conteudo/rotas";
import { COMO_CRIAR_URL, lerCatalogo, REVALIDAR_SEGUNDOS, type Extensao } from "@/lib/extensoes";

export const revalidate = REVALIDAR_SEGUNDOS;

export function metadataDasExtensoes(idioma: Idioma): Metadata {
  const t = TEXTOS_EXTENSOES[idioma];
  return {
    title: t.meta.titulo,
    description: t.meta.descricao,
    alternates: alternatesDe("extensoes", idioma),
  };
}

function Sobretitulo({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">{children}</p>
  );
}

/**
 * O cartão de uma extensão.
 *
 * Mostra as PORTAS que ela abre com o mesmo destaque do título, e não como letra
 * miúda: é a informação que decide se a pessoa aceita instalar, e na tela do CRM
 * ela aparece antes do aceite. Esconder aqui e mostrar lá seria vender uma coisa
 * e entregar outra.
 */
function Cartao({ e, t }: { e: Extensao; t: (typeof TEXTOS_EXTENSOES)["pt-BR"] }) {
  return (
    <article className="flex flex-col rounded-[6px] border border-border bg-surface p-6">
      <h3 className="text-lg font-bold leading-snug">{e.titulo}</h3>
      {e.autor ? (
        <p className="mt-1 text-xs text-text-muted">
          {t.catalogo.por} {e.autor}
        </p>
      ) : null}
      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-text-muted">{e.resumo}</p>

      {e.portas.length > 0 ? (
        <p className="mt-4 text-sm">
          <span className="text-text-muted">{t.catalogo.abre} </span>
          <span className="font-semibold">{e.portas.join(", ")}</span>
        </p>
      ) : null}

      {e.etiquetas.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {e.etiquetas.map((etiqueta) => (
            <li
              key={etiqueta}
              className="rounded-[3px] border border-border px-2 py-0.5 text-[11px] text-text-muted"
            >
              {etiqueta}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 border-t border-border pt-4">
        <code className="block break-all rounded-[4px] bg-surface-elevated px-3 py-2 font-mono text-[13px]">
          {e.id}
        </code>
        {e.repositorio ? (
          <a
            href={e.repositorio}
            className="mt-3 inline-block text-sm font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800"
            rel="noreferrer"
          >
            {e.versao}
          </a>
        ) : (
          <p className="mt-3 text-sm text-text-muted">{e.versao}</p>
        )}
      </div>
    </article>
  );
}

export async function PaginaExtensoes({ idioma }: { idioma: Idioma }) {
  const c = CONTEUDO[idioma];
  const t = TEXTOS_EXTENSOES[idioma];
  // `lerCatalogo` LANÇA quando a fonte não responde — de propósito. Ver lib/extensoes.ts:
  // uma vitrine que publica "nenhuma extensão" por cima da página boa não tem um buraco,
  // tem um anúncio errado de que o produto não tem nada.
  const catalogo = await lerCatalogo();

  return (
    <>
      <Cabecalho c={c} idioma={idioma} pagina="extensoes" />
      <main>
        <section className="overflow-x-clip">
          <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-12 sm:px-6 sm:pt-16">
            <Sobretitulo>{t.sobretitulo}</Sobretitulo>
            <h1 className="mt-5 max-w-[22ch] text-balance text-[2.3rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[3.1rem]">
              {t.titulo}
            </h1>
            <p className="mt-5 max-w-[62ch] text-pretty text-lg leading-relaxed text-text-muted">
              {t.subtitulo}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="rounded-[4px] bg-accent-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-accent-700"
              >
                {t.ctaCatalogo}
              </a>
              <a
                href={COMO_CRIAR_URL}
                rel="noreferrer"
                className="rounded-[4px] border border-border px-5 py-3 text-sm font-bold transition-colors duration-150 hover:border-accent-300 hover:bg-accent-50"
              >
                {t.ctaCriar}
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.01em]">{t.oQueE.titulo}</h2>
              {t.oQueE.paragrafos.map((p) => (
                <p key={p} className="mt-4 text-pretty leading-relaxed text-text-muted">
                  {p}
                </p>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.01em]">{t.limites.titulo}</h2>
              <ul className="mt-4 space-y-3">
                {t.limites.itens.map((item) => (
                  <li key={item} className="flex gap-3 text-pretty leading-relaxed text-text-muted">
                    <span aria-hidden className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="catalogo" className="scroll-mt-20">
          <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-[-0.01em]">{t.catalogo.titulo}</h2>
            <p className="mt-2 text-text-muted">{t.catalogo.subtitulo}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catalogo.extensoes.map((e) => (
                <Cartao key={e.id} e={e} t={t} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-[-0.01em]">{t.instalar.titulo}</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
              {t.instalar.passos.map((passo, i) => (
                <li key={passo.titulo} className="rounded-[6px] border border-border bg-bg p-5">
                  <span className="text-xs font-bold text-accent-700">{i + 1}</span>
                  <h3 className="mt-2 font-bold">{passo.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{passo.texto}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-text-muted">
              {t.instalar.nota}
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-[-0.01em]">{t.criar.titulo}</h2>
            <p className="mt-4 max-w-[70ch] text-pretty leading-relaxed text-text-muted">
              {t.criar.texto}
            </p>
            <a
              href={COMO_CRIAR_URL}
              rel="noreferrer"
              className="mt-6 inline-block rounded-[4px] bg-accent-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-accent-700"
            >
              {t.criar.cta}
            </a>
          </div>
        </section>
      </main>
      <Rodape c={c} idioma={idioma} pagina="extensoes" atualizadoEm={EXTENSOES_ATUALIZADO_EM} />
    </>
  );
}
