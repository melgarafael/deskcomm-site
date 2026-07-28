/**
 * Banner da parceria — a conversão que paga a conta do projeto.
 *
 * Reconstruído responsivo: o original era 1680x600 FIXO e quebrava no celular.
 * Mantém os sinais visuais da HostGator (laranja e navy) como bloco de PARCEIRO
 * claramente delimitado — a ruptura de paleta vira intencional em vez de
 * acidental, com respiro antes e depois.
 */
export function BannerHostGator() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[20px] bg-[#03263c] text-white">
        {/* Faixa de acento da marca parceira, no topo. */}
        <div
          aria-hidden
          className="h-1.5 w-full bg-[linear-gradient(90deg,#F67922_0%,#FFCF00_52%,#F67922_100%)]"
        />
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#FFCF00]">
              Parceiro oficial
            </p>
            <h2 className="mt-4 text-pretty text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]">
              Soberania com IA é na HostGator
            </h2>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-[#AFC6D6]">
              Datacenter no Brasil, sem transferência internacional de dados. É onde o
              DeskcommCRM foi feito para rodar — e a VPS de entrada já dá conta.
            </p>
          </div>

          <div className="lg:text-right">
            <a
              href="https://www.hostgator.com.br/52708-141-3-52.html"
              className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#F67922] px-6 py-4 font-bold text-white transition-colors duration-150 ease-out-fast hover:bg-[#FF8E3C]"
            >
              Assinar a VPS com desconto
              <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-xs text-[#AFC6D6]">
              link de parceria — assinar por ele apoia o projeto
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
