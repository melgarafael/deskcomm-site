/**
 * Preço.
 *
 * Sem tabela de planos, porque não há planos. O contraste com plataforma fechada
 * é feito pela ESTRUTURA de cobrança (por usuário vs. custo fixo), sem citar
 * produto nenhum: nomear concorrente aqui convidaria à comparação de features,
 * que é a briga que um projeto novo perde.
 */
export function Preco() {
  return (
    <section id="preco" className="border-t border-border/70 bg-surface-elevated/40">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
        <div className="max-w-[54ch]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">
            Quanto custa
          </p>
          <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
            O software é grátis. Você paga o servidor.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Não existe versão paga, não existe funcionalidade travada, não existe
            cobrança por usuário. O que você paga é a VPS onde ele roda e as chaves de
            IA que consumir.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border sm:grid-cols-3">
          {[
            {
              t: "Licença MIT",
              d: "Use, modifique, revenda. Inclusive comercialmente, sem pedir permissão.",
            },
            {
              t: "Sem plano pago",
              d: "O que você instala hoje é o produto completo. Não há tier esperando você crescer.",
            },
            {
              t: "Sua conta não cresce com o time",
              d: "Cinco pessoas no comercial ou cinquenta custam a mesma VPS.",
            },
          ].map((c) => (
            <div key={c.t} className="bg-bg p-7">
              <p className="font-bold tracking-tight">{c.t}</p>
              <p className="mt-2 leading-relaxed text-text-muted">{c.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[58ch] border-l-2 border-accent-500 pl-5 leading-relaxed">
          Plataforma fechada cobra por atendente: o custo sobe junto com o time, no ano
          em que você contrata. Aqui o custo é do servidor, e ele não sabe quantas
          pessoas usam.
        </p>
      </div>
    </section>
  );
}
