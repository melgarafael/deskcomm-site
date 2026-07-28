import Image from "next/image";

/** A mesa do hero: render estático, sem 3D. O 3D vive na jornada. */
export function Mesa() {
  return (
    <div className="relative select-none">
      <Image src="/img/mesa-01-tampo.png" alt="" width={1672} height={941} priority aria-hidden className="h-auto w-full" />
      <Image
        src="/img/mesa-01-completa.png"
        alt="A operação comercial como uma mesa única: conversa, funil, agente de IA, follow-up e registro, ligados por trilhas."
        width={1672}
        height={941}
        priority
        className="mesa-revela absolute inset-0 h-auto w-full"
      />
    </div>
  );
}
