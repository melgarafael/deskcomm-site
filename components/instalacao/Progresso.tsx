"use client";

import { useEffect, useState } from "react";

import { ETAPAS_INSTALACAO } from "@/conteudo/instalacao";

/** Só ids de etapas ficam neste navegador; nenhuma credencial passa pela página. */
const CHAVE = "deskcomm-guia-instalacao-v1";

export function ProgressoInstalacao() {
  const [concluidas, setConcluidas] = useState<string[]>([]);
  const [atual, setAtual] = useState<string>(ETAPAS_INSTALACAO[0].id);

  useEffect(() => {
    try {
      const salvo: unknown = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
      if (Array.isArray(salvo)) {
        setConcluidas(salvo.filter((id): id is string => typeof id === "string" && ETAPAS_INSTALACAO.some((e) => e.id === id)));
      }
    } catch { /* A leitura do guia continua com armazenamento desativado. */ }

    // Seções longas podem cruzar o viewport ao mesmo tempo. A etapa atual é
    // a última cujo início passou pela linha de leitura abaixo do cabeçalho.
    let quadro: number | null = null;
    function atualizar() {
      const anteriores = ETAPAS_INSTALACAO.filter(({ id }) => {
        const secao = document.getElementById(id);
        return secao && secao.getBoundingClientRect().top <= 140;
      });
      setAtual(anteriores.at(-1)?.id ?? ETAPAS_INSTALACAO[0].id);
    }
    function aoRolar() {
      if (quadro !== null) return;
      quadro = requestAnimationFrame(() => { quadro = null; atualizar(); });
    }
    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (quadro !== null) cancelAnimationFrame(quadro);
    };
  }, []);

  function marcar(id: string) {
    const proximas = concluidas.includes(id) ? concluidas.filter((e) => e !== id) : [...concluidas, id];
    setConcluidas(proximas);
    try { localStorage.setItem(CHAVE, JSON.stringify(proximas)); } catch { /* Marcar ainda funciona nesta visita. */ }
  }

  return (
    <nav aria-label="Etapas da instalação" className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="font-bold">Seu passo a passo</p>
        <span aria-live="polite" className="text-xs tabular-nums text-text-muted">{concluidas.length} de {ETAPAS_INSTALACAO.length}</span>
      </div>
      <progress aria-label="Etapas concluídas" value={concluidas.length} max={ETAPAS_INSTALACAO.length} className="mt-3 h-1.5 w-full accent-accent-600" />
      <ol className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
        {ETAPAS_INSTALACAO.map((e, i) => (
          <li key={e.id} className={`flex items-center gap-2 rounded-md pr-2 ${atual === e.id ? "bg-accent-50" : ""}`}>
            <a href={`#${e.id}`} aria-current={atual === e.id ? "step" : undefined} onClick={() => setAtual(e.id)} className={`flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-md px-2 text-sm ${atual === e.id ? "font-bold text-accent-700" : "text-text-muted hover:text-text"}`}>
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${concluidas.includes(e.id) ? "bg-accent-600 text-white" : "border border-border bg-bg"}`}>
                {concluidas.includes(e.id) ? <span aria-label="Concluída">✓</span> : i + 1}
              </span>
              {e.curto}
            </a>
            <label className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md">
              <input type="checkbox" checked={concluidas.includes(e.id)} onChange={() => marcar(e.id)} aria-label={`Marcar etapa ${i + 1} como concluída: ${e.curto}`} className="h-4 w-4 cursor-pointer accent-accent-600" />
            </label>
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-text-muted">Marque o que já fez. Seu progresso fica salvo neste navegador.</p>
      <a href="#aprender-a-usar" className="mt-4 flex min-h-11 items-center rounded-md bg-accent-50 px-3 py-2 text-sm font-bold text-accent-700 hover:bg-accent-100">Depois de instalar: curso visual →</a>
      <a href="#ajuda" className="mt-4 inline-flex min-h-9 items-center text-sm font-bold text-accent-700 underline decoration-accent-200 underline-offset-4">Travou em algum passo? →</a>
    </nav>
  );
}
