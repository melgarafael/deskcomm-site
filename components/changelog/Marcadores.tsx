import type { Salto, TipoSecao } from "@/lib/changelog";

/**
 * A cor e o ícone de cada tipo de mudança. Paleta do produto (sálvia + âmbar de
 * aviso): o tipo se distingue pelo ÍCONE e pelo texto, não só pela cor — quem não
 * distingue verde de cinza lê a mesma coisa.
 */
export const ESTILO_SECAO: Record<TipoSecao, { chip: string; ponto: string }> = {
  atencao: { chip: "border-warn/40 bg-[#fbf3e4] text-[#7a5520]", ponto: "bg-warn" },
  adicionado: { chip: "border-accent-200 bg-accent-50 text-accent-700", ponto: "bg-accent-600" },
  alterado: { chip: "border-border bg-surface text-text", ponto: "bg-text-muted" },
  corrigido: { chip: "border-accent-100 bg-surface text-accent-700", ponto: "bg-accent-300" },
  seguranca: { chip: "border-warn/40 bg-[#fbf3e4] text-[#7a5520]", ponto: "bg-warn" },
  outro: { chip: "border-border bg-surface text-text-muted", ponto: "bg-border" },
};

export function IconeSecao({ tipo, className = "h-3.5 w-3.5" }: { tipo: TipoSecao; className?: string }) {
  const comum = { viewBox: "0 0 16 16", "aria-hidden": true, className: `${className} shrink-0 fill-none stroke-current`, strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (tipo) {
    case "atencao":
    case "seguranca":
      return (
        <svg {...comum}>
          <path d="M8 2.2 14.2 13H1.8L8 2.2Z" />
          <path d="M8 6.5v3" />
          <path d="M8 11.4v.1" />
        </svg>
      );
    case "adicionado":
      return (
        <svg {...comum}>
          <path d="M8 3v10M3 8h10" />
        </svg>
      );
    case "alterado":
      return (
        <svg {...comum}>
          <path d="M3 5.5h9.5L10 3" />
          <path d="M13 10.5H3.5L6 13" />
        </svg>
      );
    case "corrigido":
      return (
        <svg {...comum}>
          <path d="m3 8.5 3 3 7-7" />
        </svg>
      );
    default:
      return (
        <svg {...comum}>
          <circle cx="8" cy="8" r="2.5" />
        </svg>
      );
  }
}

export function ChipSecao({ tipo, rotulo, contagem }: { tipo: TipoSecao; rotulo: string; contagem?: number }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-bold ${ESTILO_SECAO[tipo].chip}`}>
      <IconeSecao tipo={tipo} />
      {rotulo}
      {contagem !== undefined ? <span className="font-mono font-normal tabular-nums opacity-80">{contagem}</span> : null}
    </span>
  );
}

export function ChipSalto({ salto, rotulo }: { salto: Salto; rotulo: string }) {
  const estilo = salto === "major" ? "bg-text text-bg" : salto === "minor" ? "bg-accent-600 text-white" : "bg-surface-elevated text-text-muted";
  return <span className={`inline-flex items-center whitespace-nowrap rounded-[4px] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] ${estilo}`}>{rotulo}</span>;
}
