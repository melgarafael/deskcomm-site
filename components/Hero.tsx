import { Mesa } from "./Mesa";

export function Hero() {
  return (
    <section className="overflow-x-clip">
      <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-14 sm:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
            Desk + comm — o comercial de mesa
          </p>

          <h1 className="mt-5 text-pretty text-[2.6rem] font-bold leading-[1.06] tracking-[-0.022em] sm:text-[3.4rem]">
            Sua operação comercial numa mesa só.
            <br />
            <span className="text-accent-600">E nada morre em cima dela.</span>
          </h1>

          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-text-muted">
            Agentes de IA atendem no WhatsApp, qualificam o lead e movem o funil —
            com tudo registrado e auditável. No seu servidor, sem mensalidade por
            usuário.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#instalar"
              className="rounded-[4px] bg-accent-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-120 ease-out-fast hover:bg-accent-700"
            >
              Instalar na minha VPS
            </a>
            <a
              href="https://github.com/melgarafael/DeskcommCRM"
              className="rounded-[4px] border border-border px-5 py-3 text-sm font-bold transition-colors duration-120 ease-out-fast hover:border-accent-300 hover:bg-accent-50"
            >
              Ver o código no GitHub
            </a>
          </div>

          <p className="mt-5 font-mono text-xs text-text-muted">
            Licença MIT · sem versão paga · roda numa VPS de 2 GB
          </p>
        </div>

        {/* A mesa sangra para fora da margem direita de propósito: sugere que a
            operação continua além do que cabe na tela. */}
        <div className="min-w-0 lg:-mr-[8vw]">
          <Mesa />
        </div>
      </div>
      </div>
    </section>
  );
}
