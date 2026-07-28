/**
 * A virada: a categoria é nomeada E definida por critérios verificáveis.
 *
 * Categoria sem critério é adjetivo; com critério, é padrão. Cada uma das cinco
 * regras vem com COMO SE VERIFICA, porque é isso que separa posicionamento de
 * promessa — e é o formato que motores de busca generativos extraem e citam.
 */
const REGRAS = [
  {
    n: "01",
    regra: "Nada é ilha",
    prova: "Toda peça tem entrada e saída. O mapa de arquitetura é público no repositório.",
  },
  {
    n: "02",
    regra: "Nenhum lead morre sem diagnóstico",
    prova: "Demanda parada aparece no Radar, classificada por risco — antes de virar prejuízo.",
  },
  {
    n: "03",
    regra: "Toda ação da IA é auditável",
    prova: "Sete verificações antes de cada envio. Cada uma vira registro — inclusive as que barram.",
  },
  {
    n: "04",
    regra: "Log invisível é log morto",
    prova: "Toda mutação relevante vira atividade na linha do tempo, visível na tela.",
  },
  {
    n: "05",
    regra: "Follow-up é o anti-morte",
    prova: "Demanda aberta sem próximo passo definido é tratada como vazamento do sistema.",
  },
];

export function Virada() {
  return (
    <section className="border-t border-border/70">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
        <div className="max-w-[52ch]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">
            A categoria
          </p>
          <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
            Um sistema operacional comercial{" "}
            <span className="text-accent-600">vivo</span>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Vivo tem definição — e a definição estava escrita no repositório antes de
            estar nesta página. São cinco regras que toda parte do sistema precisa
            cumprir para entrar.
          </p>
        </div>

        <ol className="mt-14 border-t border-border">
          {REGRAS.map((r) => (
            <li
              key={r.n}
              className="grid gap-x-8 gap-y-2 border-b border-border py-7 md:grid-cols-[auto_minmax(0,20rem)_minmax(0,1fr)] md:items-baseline"
            >
              <span className="regra-num font-mono text-sm text-text-muted">{r.n}</span>
              <h3 className="text-lg font-bold tracking-tight">{r.regra}</h3>
              <p className="leading-relaxed text-text-muted">{r.prova}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-[62ch] leading-relaxed text-text-muted">
          Isso não é o que a gente promete — é o critério que uma mudança precisa
          passar para entrar no sistema. Está em{" "}
          <a
            href="https://github.com/melgarafael/DeskcommCRM/blob/main/docs/doctrine/sistema-vivo.md"
            className="font-mono text-sm text-text underline decoration-accent-300 underline-offset-4 transition-colors duration-120 ease-out-fast hover:decoration-accent-600"
          >
            docs/doctrine/sistema-vivo.md
          </a>
          , e o checklist de sete perguntas é respondido antes de cada merge.
        </p>
      </div>
    </section>
  );
}
