import Image from "next/image";

/**
 * A mesa do hero.
 *
 * ESTÁTICA POR DECISÃO, não por falta de tentativa. A primeira versão tinha uma
 * camada SVG com a esfera do lead percorrendo os sulcos. Duas coisas quebraram:
 *
 * 1. Os sulcos são segmentos ANGULARES que seguem os eixos isométricos. Derivei
 *    o traçado dos pontos médios do mascaramento e escrevi uma bézier lisa — ela
 *    atravessava o desenho em diagonal em vez de acompanhá-lo. Visível a olho nu
 *    ampliando a mesa.
 * 2. A esfera do lead já vem embutida no render. O SVG criava uma segunda.
 *
 * O orçamento de movimento foi para a seção de scrollytelling, onde cada estado é
 * uma CENA COMPLETA — formato que o gerador acerta e que não depende de eu
 * reproduzir geometria isométrica em vetor.
 */
export function Mesa() {
  return (
    <div className="relative select-none">
      <Image
        src="/img/mesa-01-completa.png"
        alt="A operação comercial como uma mesa única: a conversa, o funil, o agente de IA, o follow-up e o registro — todos ligados por trilhas."
        width={1672}
        height={941}
        priority
        className="h-auto w-full"
      />
    </div>
  );
}
