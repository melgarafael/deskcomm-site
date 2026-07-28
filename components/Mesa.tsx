import Image from "next/image";

/**
 * A mesa do hero, em duas camadas alinhadas.
 *
 * O tampo (mesa vazia, sulcos apagados) fica embaixo; a cena completa (peças e
 * trilhas acesas) revela por cima, da esquerda para a direita. As duas imagens
 * saíram do mesmo enquadramento e batem dentro de 4px — medido, não estimado.
 *
 * O QUE ESSE MOVIMENTO EXPLICA (a regra do §0 do plano): não é a mesa
 * "aparecendo". É a operação ganhando as conexões — as peças e as trilhas que as
 * ligam surgem juntas, que é literalmente a tese da página. Sem elas a mesa
 * continua ali, vazia e inútil, que é o vilão da seção seguinte.
 *
 * Uma passada só, no carregamento. Não repete: laço contínuo viraria enfeite.
 */
export function Mesa() {
  return (
    <div className="relative select-none">
      <Image
        src="/img/mesa-01-tampo.png"
        alt=""
        width={1672}
        height={941}
        priority
        aria-hidden
        className="h-auto w-full"
      />
      <Image
        src="/img/mesa-01-completa.png"
        alt="A operação comercial como uma mesa única: a conversa, o funil, o agente de IA, o follow-up e o registro, todos ligados por trilhas."
        width={1672}
        height={941}
        priority
        className="mesa-revela absolute inset-0 h-auto w-full"
      />
    </div>
  );
}
