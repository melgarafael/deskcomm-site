"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progresso do scroll dentro de um elemento.
 *
 * Devolve duas coisas, com propósitos diferentes:
 * - `progresso`: ref com o valor contínuo, para a animação ler no quadro. NÃO
 *   passa por estado — animar via setState dispara um render por quadro.
 * - `passo`: estado, atualizado só quando o índice do passo MUDA. Informação
 *   discreta, algumas vezes por rolagem inteira.
 *
 * POR QUE OUVIR O SCROLL EM VEZ DE MANTER UM LAÇO DE rAF VIVO: a primeira versão
 * era um laço auto-perpetuado, e ele MORRIA no primeiro setState — medido: 21
 * quadros e congelava, com o alvo ainda anexado. Um laço que depende de
 * sobreviver a todo ciclo de render é frágil por construção. Ouvinte de evento
 * é reanexado se o efeito rodar de novo, e o rAF aqui só estrangula a frequência
 * — não é o motor.
 */
export function usarProgresso(passos = 1) {
  const alvo = useRef<HTMLDivElement>(null);
  const progresso = useRef(0);
  const [passo, setPasso] = useState(0);

  useEffect(() => {
    let agendado = false;
    let ultimoPasso = -1;

    const medir = () => {
      agendado = false;
      const el = alvo.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      progresso.current = p;

      const i = Math.min(passos - 1, Math.floor(p * passos));
      if (i !== ultimoPasso) {
        ultimoPasso = i;
        setPasso(i);
      }
    };

    const aoRolar = () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(medir);
    };

    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    medir();
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [passos]);

  return { alvo, progresso, passo };
}
