"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/** Comando com botão de copiar. Sem a API de área de transferência, seleciona o texto para o Ctrl+C. */
/** `prefixo`: `$` para o terminal, `›` para o que se digita dentro do chat do assistente. */
export function Comando({
  comando,
  copiar,
  copiado,
  selecionado,
  escuro = false,
  prefixo = "$",
}: {
  comando: string;
  copiar: string;
  copiado: string;
  /** O que o leitor de tela ouve quando a cópia falha e o texto fica só selecionado. */
  selecionado: string;
  escuro?: boolean;
  prefixo?: "$" | "›";
}) {
  const [estado, setEstado] = useState<"parado" | "copiado" | "selecionado">("parado");
  const ok = estado === "copiado";
  const pre = useRef<HTMLPreElement>(null);

  async function copiarComando() {
    try {
      await navigator.clipboard.writeText(comando);
      setEstado("copiado");
      window.setTimeout(() => setEstado("parado"), 1800);
    } catch {
      const sel = window.getSelection();
      if (pre.current && sel) {
        const r = document.createRange();
        r.selectNodeContents(pre.current);
        sel.removeAllRanges();
        sel.addRange(r);
        setEstado("selecionado");
        window.setTimeout(() => setEstado("parado"), 1800);
      }
    }
  }

  return (
    <div
      className={[
        "flex items-stretch overflow-hidden rounded-[8px] border",
        escuro ? "border-[#3a362e] bg-[#1c1a16] text-[#ece8df]" : "border-border bg-surface text-text",
      ].join(" ")}
    >
      <span aria-hidden className={`select-none py-3 pl-3.5 pr-1 font-mono text-[13px] ${escuro ? "text-accent-300" : "text-accent-600"}`}>
        {prefixo}
      </span>
      <pre ref={pre} className="min-w-0 flex-1 whitespace-pre-wrap break-all py-3 pl-1.5 pr-3 font-mono text-[13px] leading-relaxed">
        <code>{comando}</code>
      </pre>
      <button
        type="button"
        onClick={copiarComando}
        aria-label={`${copiar}: ${comando}`}
        className={[
          "flex shrink-0 items-center gap-1.5 border-l px-3 text-xs font-bold transition-colors duration-150 ease-out-fast",
          escuro ? "border-[#3a362e] hover:bg-[#2a2721]" : "border-border hover:bg-accent-50",
          ok ? (escuro ? "text-accent-300" : "text-accent-700") : "",
        ].join(" ")}
      >
        {ok ? (
          <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 8.5 3 3 7-7" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6" strokeLinejoin="round">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 3.5V3a1.5 1.5 0 0 0-1.5-1.5H3.5A1.5 1.5 0 0 0 2 3v5.5A1.5 1.5 0 0 0 3.5 10H4" />
          </svg>
        )}
        <span className="hidden sm:inline">{ok ? copiado : copiar}</span>
      </button>
      {/* O aviso não pode morar no rótulo visível: abaixo de 640 px ele é display:none, e
          região fora da árvore de acessibilidade não anuncia nada. */}
      <span className="sr-only" aria-live="polite">
        {estado === "copiado" ? copiado : estado === "selecionado" ? selecionado : ""}
      </span>
    </div>
  );
}

/** Filtro de público do catálogo. Os cartões vêm prontos do servidor; aqui só se esconde. */
export function FiltroDePublico({
  rotulo,
  rotulos,
  cartoes,
}: {
  rotulo: string;
  rotulos: { id: "todos" | "opera" | "programa"; texto: string; total: number }[];
  cartoes: { publico: "opera" | "programa"; no: ReactNode; id: string }[];
}) {
  const [filtro, setFiltro] = useState<"todos" | "opera" | "programa">("todos");
  return (
    <div>
      <div role="group" aria-label={rotulo} className="inline-flex max-w-full flex-wrap gap-1 rounded-[8px] border border-border bg-surface p-1">
        {rotulos.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={filtro === r.id}
            onClick={() => setFiltro(r.id)}
            className={[
              "flex h-9 items-center gap-2 rounded-[6px] px-3 text-sm transition-colors duration-150 ease-out-fast",
              filtro === r.id ? "bg-text font-bold text-bg" : "text-text-muted hover:bg-bg hover:text-text",
            ].join(" ")}
          >
            {r.texto}
            <span className={`font-mono text-xs tabular-nums ${filtro === r.id ? "text-bg/70" : "text-text-muted"}`}>{r.total}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cartoes.map((c) => (
          <div key={c.id} hidden={filtro !== "todos" && filtro !== c.publico} className="min-w-0">
            {c.no}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Abas dos assistentes, com o teclado do padrão WAI-ARIA (setas, Home, End).
 * Todos os painéis estão no HTML — sem JavaScript, o primeiro fica visível e os
 * outros continuam no documento para buscador e leitor.
 */
export function AbasDosAssistentes({ abas }: { abas: { id: string; nome: string; painel: ReactNode }[] }) {
  const [ativa, setAtiva] = useState(0);
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);

  function teclado(e: KeyboardEvent<HTMLButtonElement>) {
    const destino =
      e.key === "ArrowRight" ? (ativa + 1) % abas.length : e.key === "ArrowLeft" ? (ativa - 1 + abas.length) % abas.length : e.key === "Home" ? 0 : e.key === "End" ? abas.length - 1 : null;
    if (destino === null) return;
    e.preventDefault();
    setAtiva(destino);
    botoes.current[destino]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-orientation="horizontal" className="-mx-5 flex gap-1 overflow-x-auto border-b border-border px-5 sm:mx-0 sm:px-0">
        {abas.map((a, i) => (
          <button
            key={a.id}
            ref={(el) => {
              botoes.current[i] = el;
            }}
            id={`aba-${a.id}`}
            role="tab"
            type="button"
            aria-selected={ativa === i}
            aria-controls={`painel-${a.id}`}
            tabIndex={ativa === i ? 0 : -1}
            onClick={() => setAtiva(i)}
            onKeyDown={teclado}
            className={[
              "relative -mb-px shrink-0 whitespace-nowrap border-b-2 px-4 pb-3 pt-2 text-[15px] transition-colors duration-150 ease-out-fast",
              ativa === i ? "border-accent-600 font-bold text-text" : "border-transparent text-text-muted hover:text-text",
            ].join(" ")}
          >
            {a.nome}
          </button>
        ))}
      </div>
      {abas.map((a, i) => (
        <div key={a.id} id={`painel-${a.id}`} role="tabpanel" aria-labelledby={`aba-${a.id}`} hidden={ativa !== i} className="pt-8">
          {a.painel}
        </div>
      ))}
    </div>
  );
}
