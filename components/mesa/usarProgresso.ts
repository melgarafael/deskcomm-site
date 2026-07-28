"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progresso do scroll DENTRO de um elemento: 0 quando o topo dele encosta no topo
 * da tela, 1 quando o fim dele sai por cima.
 *
 * Lê no rAF em vez de no evento de scroll: o evento dispara mais que a taxa de
 * quadros e o cálculo repetido não vira quadro nenhum. Assim o valor é lido uma
 * vez por quadro, que é exatamente quando ele é usado.
 */
export function usarProgresso() {
  const alvo = useRef<HTMLDivElement>(null);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    let vivo = true;
    let ultimo = -1;

    const passo = () => {
      if (!vivo) return;
      const el = alvo.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        // Só re-renderiza quando o valor muda de forma perceptível.
        if (Math.abs(p - ultimo) > 0.001) {
          ultimo = p;
          setProgresso(p);
        }
      }
      requestAnimationFrame(passo);
    };
    const id = requestAnimationFrame(passo);
    return () => {
      vivo = false;
      cancelAnimationFrame(id);
    };
  }, []);

  return { alvo, progresso };
}
