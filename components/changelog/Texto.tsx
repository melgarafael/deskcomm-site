import type { ReactNode } from "react";

import type { Bloco } from "@/lib/changelog";

const REPO = "https://github.com/melgarafael/DeskcommCRM";

/**
 * Markdown do CHANGELOG para React, sem `dangerouslySetInnerHTML`.
 *
 * Cobre só o que o arquivo usa (medido em 2026-09-15): `**negrito**`, `*itálico*`,
 * `` `código` ``, `[texto](https://…)` e "PR #123". Texto que parece HTML
 * (`<select>`, `/app/inbox/<id>`) sai como texto — o React escapa. Link que não
 * é http(s) sai como texto, nunca como `href`.
 */
export function Inline({ texto }: { texto: string }) {
  return <>{inline(texto, "i")}</>;
}

function inline(texto: string, chave: string): ReactNode[] {
  const saida: ReactNode[] = [];
  // Ordem importa: código primeiro (nada dentro dele é marcação), depois link, negrito, itálico, PR.
  const padrao = /(`[^`]+`)|\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|\*([^*\s][^*]*?)\*|\bPR #(\d+)/g;
  let fim = 0;
  let n = 0;
  for (const m of texto.matchAll(padrao)) {
    const k = `${chave}.${n++}`;
    if (m.index > fim) saida.push(texto.slice(fim, m.index));
    if (m[1]) {
      saida.push(
        <code key={k} className="rounded-[4px] border border-border bg-surface-elevated px-1 py-px font-mono text-[0.84em] text-text">
          {m[1].slice(1, -1)}
        </code>,
      );
    } else if (m[2]) {
      saida.push(
        /^https?:\/\//.test(m[3]) ? (
          <a key={k} href={m[3]} className="underline decoration-accent-300 underline-offset-4 hover:decoration-accent-600">
            {inline(m[2], k)}
          </a>
        ) : (
          m[2]
        ),
      );
    } else if (m[4]) {
      saida.push(
        <strong key={k} className="font-bold text-text">
          {inline(m[4], k)}
        </strong>,
      );
    } else if (m[5]) {
      saida.push(<em key={k}>{inline(m[5], k)}</em>);
    } else if (m[6]) {
      saida.push(
        <a key={k} href={`${REPO}/pull/${m[6]}`} className="underline decoration-accent-300 underline-offset-4 hover:decoration-accent-600">
          PR #{m[6]}
        </a>,
      );
    }
    fim = m.index + m[0].length;
  }
  if (fim < texto.length) saida.push(texto.slice(fim));
  return saida;
}

export function Blocos({ blocos, denso = false }: { blocos: Bloco[]; denso?: boolean }) {
  return (
    <div className={denso ? "space-y-2.5" : "space-y-4"}>
      {blocos.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="text-pretty leading-relaxed text-text-muted">
                <Inline texto={b.texto} />
              </p>
            );
          case "codigo":
            return (
              <pre key={i} className="overflow-x-auto rounded-[8px] border border-border bg-[#1c1a16] px-4 py-3 font-mono text-[13px] leading-relaxed text-[#ece8df]">
                <code>{b.texto}</code>
              </pre>
            );
          case "citacao":
            return (
              <blockquote key={i} className="border-l-2 border-warn/60 bg-[#fbf6ec] py-3 pl-4 pr-3">
                <Blocos blocos={b.blocos} denso />
              </blockquote>
            );
          case "lista":
            return (
              <ul key={i} className="space-y-2.5">
                {b.itens.map((it, j) => (
                  <li key={j} className="relative pl-5">
                    <span aria-hidden className="absolute left-1 top-[0.72em] h-1.5 w-1.5 rounded-full bg-accent-300" />
                    {it.titulo ? (
                      <p className="font-bold leading-relaxed text-text">
                        <Inline texto={it.titulo} />
                      </p>
                    ) : null}
                    {it.blocos.length ? <Blocos blocos={it.blocos} denso /> : null}
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
