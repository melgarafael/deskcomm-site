/**
 * Instalação.
 *
 * NÃO declara tempo de instalação em lugar nenhum: o kit não mede isso, e o
 * gargalo real é criar a conta do banco e o DNS propagar, não o script.
 * Prometer "30 segundos" seria a primeira promessa quebrada do produto.
 */
const APOIO = [
  {
    titulo: "2 GB de RAM bastam",
    texto:
      "O servidor não compila nada — baixa uma imagem pronta e executa. Isso mantém a oferta no plano de entrada da VPS.",
  },
  {
    titulo: "HTTPS automático",
    texto: "O certificado é emitido no primeiro acesso. Você não configura TLS na mão.",
  },
  {
    titulo: "Travou? Tem assistente",
    texto:
      "Abra o Claude Code dentro da VPS e ele conduz a instalação por conversa, com nove armadilhas de ambiente já mapeadas e diagnóstico pronto.",
  },
];

export function Instalar() {
  return (
    <section id="instalar" className="border-t border-border/70">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">
              Instalação
            </p>
            <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
              Um comando. E o sistema é seu.
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-text-muted">
              O script confere as dependências, gera todos os segredos, aplica o banco,
              cria o primeiro administrador, sobe os contêineres e liga a tarefa que
              dispara as automações.
            </p>

            <dl className="mt-10 space-y-6">
              {APOIO.map((a) => (
                <div key={a.titulo}>
                  <dt className="font-bold tracking-tight">{a.titulo}</dt>
                  <dd className="mt-1.5 max-w-[46ch] leading-relaxed text-text-muted">
                    {a.texto}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-[12px] border border-border bg-surface">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span aria-hidden className="h-2 w-2 rounded-full bg-border" />
                <span aria-hidden className="h-2 w-2 rounded-full bg-border" />
                <span aria-hidden className="h-2 w-2 rounded-full bg-border" />
                <span className="ml-1.5 font-mono text-xs text-text-muted">
                  sua-vps · bash
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.9]">
                <code>
                  <span className="text-text-muted">
                    # 1. baixa o projeto{"\n"}
                  </span>
                  git clone https://github.com/melgarafael/DeskcommCRM.git{"\n"}
                  cd DeskcommCRM/hostgator-setup-kit{"\n\n"}
                  <span className="text-text-muted"># 2. instala{"\n"}</span>
                  <span className="text-accent-600">bash install.sh</span>
                </code>
              </pre>
            </div>

            <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-text-muted">
              Depois disso: acessar o domínio, cadastrar a verificação em duas etapas do
              administrador e escanear o QR do WhatsApp. Tudo pela tela.
            </p>

            <div className="mt-8 rounded-[12px] border border-border bg-surface-elevated/60 p-5">
              <p className="font-bold tracking-tight">Atualizar não quebra</p>
              <p className="mt-2 max-w-[52ch] leading-relaxed text-text-muted">
                <code className="font-mono text-sm">bash update.sh</code> faz backup do
                banco antes, reaplica o schema de forma idempotente e confere a saúde no
                fim. O caminho de atualização é testado no CI — não é só documentado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
