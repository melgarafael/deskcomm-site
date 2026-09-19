import type { Conteudo, Idioma } from "@/conteudo";
import { TEXTOS_CHANGELOG, formatarData } from "@/conteudo/changelog";
import { ROTAS, ancoraDaHome, type PaginaId } from "@/conteudo/rotas";

import { GITHUB } from "./Cabecalho";
import { Simbolo } from "./Marca";

/**
 * Resolve o `href` de um item do rodapé (ver o tipo em `conteudo/tipos.ts`).
 *
 * O rodapé tratava tudo que não começasse com `#` como caminho do GitHub —
 * `/changelog` viraria `github.com/…/changelog`. Página do site agora é marcada
 * com `@`, e não se confunde com os caminhos do repositório, que também começam
 * com `/`.
 */
function resolver(href: string, idioma: Idioma, naHome: boolean): string {
  if (href.startsWith("#")) return ancoraDaHome(idioma, href, naHome);
  if (href === "@guias") return ROTAS.guias[idioma];
  if (href === "@changelog") return ROTAS.changelog[idioma];
  if (href === "@extensoes") return ROTAS.extensoes[idioma];
  return `${GITHUB}${href}`;
}

/** `atualizadoEm` (AAAA-MM-DD) é de cada página: uma data só para o site inteiro fazia /guias e
 *  /changelog, criadas em setembro, dizerem que foram atualizadas em julho. */
export function Rodape({ c, idioma, pagina, atualizadoEm }: { c: Conteudo; idioma: Idioma; pagina: PaginaId; atualizadoEm: string }) {
  const naHome = pagina === "home";
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {c.rodape.colunas.map((col) => (
            <div key={col.titulo} className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">{col.titulo}</p>
              <ul className="mt-4 space-y-2.5">
                {col.itens.map((i) => (
                  <li key={i.rotulo}>
                    <a href={resolver(i.href, idioma, naHome)} className="text-sm transition-colors duration-150 ease-out-fast hover:text-accent-600">
                      {i.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex items-center gap-3">
            <Simbolo className="h-6 w-6" />
            <p className="font-mono text-xs text-text-muted">{c.rodape.nota}</p>
          </div>
          {/* Data VISÍVEL na página, não só no schema: a pesquisa mediu que 75%
              das páginas citadas por IA foram atualizadas nos últimos 12 meses,
              e a data de atualização discrimina melhor que a de publicação. */}
          <p className="font-mono text-xs text-text-muted">
            {c.rodape.atualizado} <time dateTime={atualizadoEm}>{formatarData(atualizadoEm, TEXTOS_CHANGELOG[idioma].locale, "numerico")}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
