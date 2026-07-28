import Image from "next/image";

/**
 * Os dois vilões.
 *
 * Nomeia SITUAÇÕES que o visitante reconhece na própria operação, nunca produtos
 * concorrentes. Isso reposiciona o adversário de "outro CRM" para "o jeito que
 * você trabalha hoje" — e ninguém defende o jeito que trabalha hoje.
 */
const VILOES = [
  {
    img: "/img/viloes-01-planilha.png",
    alt: "Uma mesa com as peças desconectadas, sulcos que terminam sem chegar a lugar nenhum, e um buraco retangular por onde um lead está caindo.",
    titulo: "O CRM que é planilha bonita",
    texto:
      "O lead entra, alguém cadastra, e nada acontece. Quando você percebe, ele sumiu — e ninguém sabe dizer em que momento, nem por quê. O sistema guardou o nome dele e perdeu a história.",
  },
  {
    img: "/img/viloes-02-robo.png",
    alt: "Um módulo isolado emitindo ondas sonoras sobre um fragmento de mesa que termina abruptamente, com sulcos que não levam a lugar nenhum.",
    titulo: "O robô que responde e some",
    texto:
      "Atende rápido, responde qualquer coisa, e some. Se prometeu prazo que não existe, você descobre pelo cliente. Não dá para auditar o que ele disse — muito menos por que ele disse.",
  },
];

export function Viloes() {
  return (
    <section id="como-funciona" className="border-t border-border/70 bg-surface-elevated/40">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
        <h2 className="max-w-[18ch] text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
          Você não perde venda por falta de lead.
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {VILOES.map((v) => (
            <article key={v.titulo} className="group min-w-0">
              {/* Proporção fixa + contain: as imagens saem do gerador com
                  proporções diferentes (1,64 e 1,58 aqui), e sem isso os
                  cartões ficam com alturas distintas e os títulos deixam de
                  alinhar na mesma linha de base. */}
              <div className="flex aspect-[8/5] items-center justify-center overflow-hidden rounded-[12px] border border-border bg-bg p-3 transition-[border-color,transform] duration-200 ease-out-slow group-hover:-translate-y-px group-hover:border-accent-300">
                <Image
                  src={v.img}
                  alt={v.alt}
                  width={1180}
                  height={720}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-7 text-xl font-bold tracking-tight">{v.titulo}</h3>
              <p className="mt-3 leading-relaxed text-text-muted">{v.texto}</p>
            </article>
          ))}
        </div>

        <p className="mt-16 max-w-[46ch] border-l-2 border-accent-500 pl-5 text-lg leading-relaxed">
          Os dois têm a mesma raiz:{" "}
          <strong className="font-bold">
            o sistema não é responsável pelo que acontece depois.
          </strong>
        </p>
      </div>
    </section>
  );
}
