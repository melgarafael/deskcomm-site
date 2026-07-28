"use client";

import { RoundedBox } from "@react-three/drei";
import { Shape } from "three";
import type { ReactNode } from "react";

/**
 * As peças da mesa, em geometria de verdade.
 *
 * Reproduz o vocabulário de forma dos renders de referência com primitivas:
 * a maquete é geométrica, não orgânica, então cilindro + caixa arredondada +
 * anel dão conta. O material é o mesmo em todas — clay fosco, sem brilho, sem
 * metal — porque é o que faz as peças lerem como um conjunto só.
 */

export const CORES = {
  superficie: "#f4f2ec",
  peca: "#fbfaf7",
  sulco: "#e4e0d6",
  sage: "#5f7d54",
  sageClaro: "#82a077",
  ambar: "#b8863b",
} as const;

/** Clay fosco: rugosidade alta, zero metal. Nada de verniz. */
export function Clay({ cor, ...props }: { cor: string } & Record<string, unknown>) {
  return <meshStandardMaterial color={cor} roughness={0.86} metalness={0} {...props} />;
}

type PecaProps = { position: [number, number, number]; children?: ReactNode };

/** Conversa: três placas arredondadas empilhadas, levemente deslocadas. */
export function Conversa({ position }: PecaProps) {
  return (
    <group position={position}>
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[1.7 - i * 0.16, 0.13, 1.05 - i * 0.09]}
          radius={0.06}
          smoothness={5}
          position={[i * 0.07, 0.07 + i * 0.15, -i * 0.05]}
          castShadow
          receiveShadow
        >
          <Clay cor={CORES.peca} />
        </RoundedBox>
      ))}
    </group>
  );
}

/** Funil: quatro colunas de blocos, de alturas diferentes. */
export function Funil({ position }: PecaProps) {
  const alturas = [1, 3, 5, 2];
  return (
    <group position={position}>
      {alturas.map((n, c) =>
        Array.from({ length: n }, (_, i) => (
          <RoundedBox
            key={`${c}-${i}`}
            args={[0.3, 0.17, 0.3]}
            radius={0.035}
            smoothness={4}
            position={[c * 0.42, 0.09 + i * 0.18, 0]}
            castShadow
            receiveShadow
          >
            <Clay cor={CORES.peca} />
          </RoundedBox>
        )),
      )}
    </group>
  );
}

/** Agente: o cilindro sage, a peça mais alta da mesa. */
export function Agente({ position }: PecaProps) {
  return (
    <group position={position}>
      {/* Rebaixo circular em volta: anel fino no nível do tampo, com o miolo
          um fio abaixo. Lido de cima, isso é o sulco circular da referência. */}
      <mesh position={[0, -0.008, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.86, 1.06, 64]} />
        <Clay cor={CORES.sulco} side={2} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 1, 64]} />
        <Clay cor={CORES.sage} />
      </mesh>
    </group>
  );
}

/** Follow-up: disco com anéis concêntricos. */
export function Temporizador({ position }: PecaProps) {
  return (
    <group position={position}>
      {[
        [0.92, 0.11, 0],
        [0.72, 0.13, 0.09],
        [0.5, 0.1, 0.18],
      ].map(([r, h, y], i) => (
        <mesh key={i} position={[0, y + h / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[r, r, h, 64]} />
          <Clay cor={CORES.peca} />
        </mesh>
      ))}
    </group>
  );
}

/** Registro: barras paralelas — o log. */
export function Registro({ position }: PecaProps) {
  return (
    <group position={position}>
      <RoundedBox args={[3.1, 0.1, 1.5]} radius={0.04} smoothness={4} castShadow receiveShadow>
        <Clay cor={CORES.peca} />
      </RoundedBox>
      {Array.from({ length: 6 }, (_, i) => (
        <RoundedBox
          key={i}
          args={[2.9, 0.09, 0.11]}
          radius={0.03}
          smoothness={4}
          position={[0, 0.09, -0.6 + i * 0.24]}
          castShadow
        >
          <Clay cor={CORES.peca} />
        </RoundedBox>
      ))}
    </group>
  );
}

/** O lead. */
export function Lead({ position, cor = CORES.sage }: PecaProps & { cor?: string }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.19, 32, 32]} />
      <Clay cor={cor} />
    </mesh>
  );
}

/**
 * Placa: retângulo de cantos arredondados EXTRUDADO.
 *
 * Por que não RoundedBox: ele arredonda todas as arestas com um raio único, e
 * quando o raio passa de metade da espessura a caixa incha e vira travesseiro —
 * foi o que aconteceu com o tampo (raio 0,5 numa placa de 0,34). Tampo de mesa
 * precisa de canto redondo EM PLANTA e topo plano; extrusão de Shape dá isso.
 */
export function Placa({
  largura,
  profundidade,
  espessura,
  raio,
  cor,
  position = [0, 0, 0],
}: {
  largura: number;
  profundidade: number;
  espessura: number;
  raio: number;
  cor: string;
  position?: [number, number, number];
}) {
  const forma = new Shape();
  const w = largura / 2;
  const d = profundidade / 2;
  const r = Math.min(raio, w, d);
  forma.moveTo(-w + r, -d);
  forma.lineTo(w - r, -d);
  forma.quadraticCurveTo(w, -d, w, -d + r);
  forma.lineTo(w, d - r);
  forma.quadraticCurveTo(w, d, w - r, d);
  forma.lineTo(-w + r, d);
  forma.quadraticCurveTo(-w, d, -w, d - r);
  forma.lineTo(-w, -d + r);
  forma.quadraticCurveTo(-w, -d, -w + r, -d);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <extrudeGeometry
        args={[forma, { depth: espessura, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 3, curveSegments: 24 }]}
      />
      <Clay cor={cor} />
    </mesh>
  );
}
