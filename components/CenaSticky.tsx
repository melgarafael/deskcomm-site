"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Cena = { n: string; img: string; alt: string };

/**
 * A cena fixa que troca de estado conforme o passo em vista.
 *
 * As SETE imagens ficam no HTML servido — requisito de GEO, já que nenhum crawler
 * de IA executa JavaScript. O script só decide qual está opaca. Se ele não rodar,
 * a última da pilha aparece e o conteúdo continua todo lá.
 *
 * Observa os passos pelo id em vez de calcular posição de scroll: sobrevive a
 * mudança de altura das seções, a zoom e a mudança de fonte do usuário.
 */
export function CenaSticky({ cenas }: { cenas: Cena[] }) {
  const [ativo, setAtivo] = useState(0);
  const refPreso = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alvos = cenas
      .map((c) => document.getElementById(`passo-${c.n}`))
      .filter((e): e is HTMLElement => e !== null);
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visivel) return;
        const i = alvos.indexOf(visivel.target as HTMLElement);
        if (i < 0) return;
        setAtivo(i);
        // Marca o passo em vista para o trilho numerado. Uma fonte de verdade
        // só: antes o número dependia de animation-timeline: view(), que não
        // aplicou no navegador de teste — dois mecanismos para o mesmo estado,
        // e um deles calado. Agora o observador manda nos dois.
        alvos.forEach((a, j) => a.toggleAttribute("data-ativo", j === i));
      },
      // Faixa central da tela: o passo "em vista" é o que está no meio, não o
      // que encostou na borda — senão a cena troca cedo demais e desencontra
      // do texto que o visitante está lendo.
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    alvos.forEach((a) => obs.observe(a));
    return () => obs.disconnect();
  }, [cenas]);

  return (
    <div ref={refPreso} className="relative">
      {cenas.map((c, i) => (
        <Image
          key={c.n}
          src={c.img}
          alt={i === 0 ? c.alt : ""}
          aria-hidden={i !== 0}
          width={1594}
          height={941}
          priority={i === 0}
          className={[
            "h-auto w-full transition-opacity duration-[320ms] ease-out-slow motion-reduce:transition-none",
            i === 0 ? "" : "absolute inset-0",
            i === ativo ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
