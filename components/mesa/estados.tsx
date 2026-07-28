"use client";

import { RoundedBox } from "@react-three/drei";

import { Clay, CORES } from "./pecas";

/**
 * Os elementos que entram e saem conforme a narrativa avança.
 *
 * Cada um recebe `f` (0 a 1) de quanto o passo dele está ativo, e traduz isso em
 * escala e posição. Escala zero = ausente; não há montagem/desmontagem de nó, o
 * que evita engasgo de GPU quando o visitante rola rápido.
 */

const suave = (f: number) => f * f * (3 - 2 * f); // smoothstep

/** Cartão de contexto: sobe ao lado da conversa quando o lead chega. */
export function CartaoContexto({ f }: { f: number }) {
  const s = suave(f);
  return (
    <group position={[-3.55, 0.3 + s * 0.85, 2.3]} scale={s}>
      <RoundedBox args={[1.5, 0.09, 0.92]} radius={0.05} smoothness={4} castShadow>
        <Clay cor={CORES.peca} />
      </RoundedBox>
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[1.05 - i * 0.22, 0.05, 0.1]}
          radius={0.02}
          position={[-0.16 - i * 0.1, 0.07, -0.24 + i * 0.24]}
        >
          <Clay cor={CORES.sulco} />
        </RoundedBox>
      ))}
    </group>
  );
}

/** Base de conhecimento: placas que o agente consulta antes de falar. */
export function Conhecimento({ f }: { f: number }) {
  const s = suave(f);
  return (
    <group position={[-2.75, 0.1, -0.35]} scale={s}>
      {[0, 1, 2, 3].map((i) => (
        <RoundedBox
          key={i}
          args={[0.86, 0.07, 0.62]}
          radius={0.03}
          smoothness={4}
          position={[i * 0.14, 0.06 + i * 0.1, -i * 0.06]}
          castShadow
        >
          <Clay cor={i === 3 ? CORES.sageClaro : CORES.peca} />
        </RoundedBox>
      ))}
    </group>
  );
}

/**
 * As sete verificações: corredor de blocos entre o agente e a borda.
 * Um deles é âmbar — o que barra. Sobem em fila, com atraso por posição.
 */
export function Gates({ f, destacarVeto = 0 }: { f: number; destacarVeto?: number }) {
  return (
    <group position={[0.95, 0.1, 1.35]}>
      {Array.from({ length: 7 }, (_, i) => {
        const atraso = i * 0.07;
        const s = suave(Math.min(1, Math.max(0, (f - atraso) / (1 - atraso))));
        const veto = i === 3;
        const alturaVeto = veto ? destacarVeto * 0.34 : 0;
        return (
          <RoundedBox
            key={i}
            args={[0.3, 0.42, 0.3]}
            radius={0.05}
            smoothness={4}
            position={[i * 0.42, 0.21 * s + alturaVeto, 0]}
            scale={[s, s, s]}
            castShadow
          >
            <Clay cor={veto ? CORES.ambar : CORES.sage} />
          </RoundedBox>
        );
      })}
    </group>
  );
}

/** O registro do que NÃO foi enviado: sobe ao lado do bloco âmbar. */
export function RegistroVeto({ f }: { f: number }) {
  const s = suave(f);
  return (
    <group position={[1.9, 0.4 + s * 0.7, 2.35]} scale={s}>
      <RoundedBox args={[1.25, 0.08, 0.8]} radius={0.04} smoothness={4} castShadow>
        <Clay cor={CORES.peca} />
      </RoundedBox>
      <RoundedBox args={[0.8, 0.05, 0.09]} radius={0.02} position={[-0.15, 0.06, -0.18]}>
        <Clay cor={CORES.ambar} />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.05, 0.09]} radius={0.02} position={[-0.24, 0.06, 0.06]}>
        <Clay cor={CORES.sulco} />
      </RoundedBox>
    </group>
  );
}

/** O atendente humano: recebe o bastão do agente. */
export function Humano({ f }: { f: number }) {
  const s = suave(f);
  return (
    <group position={[1.95, 0.02, 0]} scale={s}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 1, 64]} />
        <Clay cor={CORES.peca} />
      </mesh>
    </group>
  );
}

/** O resumo que transita do agente para o humano. */
export function Resumo({ f }: { f: number }) {
  const s = suave(f);
  return (
    <group position={[0.4 + s * 1.55, 1.2, 0]} scale={Math.min(1, s * 1.6)} rotation={[0, 0, -0.18]}>
      <RoundedBox args={[0.78, 0.06, 0.55]} radius={0.03} smoothness={4} castShadow>
        <Clay cor={CORES.peca} />
      </RoundedBox>
    </group>
  );
}
