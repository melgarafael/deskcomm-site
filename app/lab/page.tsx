"use client";

import dynamic from "next/dynamic";

import { usarProgresso } from "@/components/mesa/usarProgresso";

const Mesa3D = dynamic(() => import("@/components/mesa/Mesa3D").then((m) => m.Mesa3D), {
  ssr: false,
});

export default function Lab() {
  const { alvo, progresso } = usarProgresso();

  return (
    <main>
      {/* Bloco alto: o scroll dentro dele é o que dirige a mesa. */}
      <div ref={alvo} className="relative h-[250vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto w-full max-w-[1100px] px-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
              laboratório · progresso {progresso.toFixed(2)}
            </p>
            <Mesa3D progresso={progresso} />
          </div>
        </div>
      </div>
    </main>
  );
}
