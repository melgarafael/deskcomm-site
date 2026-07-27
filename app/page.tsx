export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-24">
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-4 w-4 rounded-[4px] bg-accent-600" />
        <span className="text-xl font-bold tracking-tight">DeskcommCRM</span>
      </div>

      <p className="mt-8 text-pretty text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
        Sua operação comercial numa mesa só.
        <br />
        <span className="text-accent-600">E nada morre em cima dela.</span>
      </p>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
        Agentes de IA que atendem no WhatsApp, qualificam o lead e movem o funil —
        com tudo registrado e auditável. No seu servidor, sem mensalidade por usuário.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="https://github.com/melgarafael/DeskcommCRM"
          className="rounded-[4px] bg-accent-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 ease-out-fast hover:bg-accent-700"
        >
          Ver o projeto no GitHub
        </a>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
          licença MIT · sem plano pago
        </span>
      </div>
    </main>
  );
}
