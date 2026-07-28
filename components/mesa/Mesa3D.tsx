"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

import { Agente, CORES, Clay, Conversa, Funil, Lead, Placa, Registro, Temporizador } from "./pecas";

/**
 * A mesa em 3D de verdade — geometria, não foto.
 *
 * POR QUE 3D E NÃO IMAGEM: o efeito pedido é uma peça ÚNICA que se transforma
 * conforme o scroll (a referência é o cubo do CodeWiki e as animações da Apple).
 * Gerador de imagem entrega quadros isolados; cada um é uma cena nova. Trocar
 * fotos alinhadas produz carrossel, não transformação — são coisas diferentes em
 * natureza, não em acabamento.
 *
 * Com geometria: a mesa gira, as peças se separam e voltam, tudo amarrado à
 * posição do scroll. E somem de uma vez os problemas de alinhamento,
 * enquadramento e recorte, que só existiam porque a base era foto.
 */

/** Um sulco: caixa fina rebaixada no tampo, com o piso sage. */
function Sulco({
  de,
  para,
  aceso = false,
}: {
  de: [number, number];
  para: [number, number];
  aceso?: boolean;
}) {
  const [x1, z1] = de;
  const [x2, z2] = para;
  const cx = (x1 + x2) / 2;
  const cz = (z1 + z2) / 2;
  const comp = Math.hypot(x2 - x1, z2 - z1);
  const ang = Math.atan2(z2 - z1, x2 - x1);
  // Rebaixado: o piso do sulco fica ABAIXO do tampo (y=0) e a caixa é rasa,
  // então de cima lê como canal escavado. Em relevo — que era o caso antes —
  // ele virava um trilho colado por cima, e a mesa perdia a leitura de maquete.
  return (
    <mesh position={[cx, -0.035, cz]} rotation={[0, -ang, 0]} receiveShadow>
      <boxGeometry args={[comp, 0.07, 0.15]} />
      <Clay cor={aceso ? CORES.sage : CORES.sulco} />
    </mesh>
  );
}

/** Interpola suave entre a e b. */
const entre = (a: number, b: number, k: number) => a + (b - a) * Math.min(1, Math.max(0, k));
/** Recorta uma faixa do progresso e normaliza para 0–1. */
const faixa = (p: number, ini: number, fim: number) =>
  Math.min(1, Math.max(0, (p - ini) / (fim - ini)));

function Cena({ progresso }: { progresso: number }) {
  const grupo = useRef<Group>(null);
  const pecas = useRef<Group>(null);
  const suave = useRef(0);

  useFrame((_, dt) => {
    // Amortecimento: a mesa PERSEGUE o progresso em vez de saltar com ele.
    // Sem isso, scroll em trackpad vira tremor.
    // dt*11: a mesa cola no scroll. Abaixo disso ela arrasta e parece
    // pesada; muito acima, trackpad vira tremor.
    suave.current += (progresso - suave.current) * Math.min(1, dt * 11);
    const p = suave.current;

    if (grupo.current) {
      // Gira e inclina: você contorna a mesa enquanto desce a página.
      grupo.current.rotation.y = entre(-0.42, 0.5, faixa(p, 0, 1));
      grupo.current.rotation.x = entre(0, -0.18, faixa(p, 0.3, 1));
      grupo.current.position.y = entre(0, 0.6, faixa(p, 0.35, 1));
    }
    if (pecas.current) {
      // As peças SOBEM e se afastam do tampo — a mesa se abre nas próprias
      // camadas, que é a leitura do cubo do CodeWiki aplicada aqui.
      const abrir = faixa(p, 0.22, 0.8);
      pecas.current.children.forEach((filho, i) => {
        const base = filho.userData.base as [number, number, number];
        const dir = filho.userData.dir as [number, number];
        filho.position.set(
          base[0] + dir[0] * abrir * 1.5,
          base[1] + abrir * (0.5 + i * 0.34),
          base[2] + dir[1] * abrir * 1.5,
        );
      });
    }
  });

  return (
    <group ref={grupo}>
      {/* Tampo e o degrau embaixo. Topo do tampo em y=0: é o plano onde as
          peças assentam. */}
      <Placa largura={10.4} profundidade={7} espessura={0.3} raio={0.75} cor={CORES.superficie} position={[0, -0.3, 0]} />
      <Placa largura={10.1} profundidade={6.75} espessura={0.14} raio={0.7} cor={CORES.peca} position={[0, -0.46, 0]} />

      {/* Sulcos: o caminho que liga as peças */}
      <Sulco de={[-3.5, 0.9]} para={[-0.2, 0.9]} />
      <Sulco de={[-0.2, 0.9]} para={[-0.2, -1.1]} />
      <Sulco de={[-3.3, -1.4]} para={[-1.2, -1.4]} />
      <Sulco de={[1.2, 0]} para={[3.4, 0]} />
      <Sulco de={[-0.2, -1.9]} para={[1.5, -1.9]} />

      {/* Cada peça guarda sua posição de repouso e a direção para onde se
          afasta quando a mesa abre. userData em vez de estado do React: isto
          muda a cada quadro e não pode passar pelo ciclo de render. */}
      <group ref={pecas}>
        {(
          [
            [Conversa, [-3.9, 0.2, 0.9], [-1, 0.2]],
            [Funil, [-0.9, 0.05, -2.3], [-0.2, -1]],
            [Agente, [0.4, 0.02, 0], [0.1, 0]],
            [Temporizador, [3.9, 0.02, 0.3], [1, 0.15]],
            [Registro, [-0.4, 0.1, 2.1], [-0.15, 1]],
          ] as const
        ).map(([Peca, base, dir], i) => (
          <group
            key={i}
            position={base as [number, number, number]}
            userData={{ base, dir }}
          >
            <Peca position={[0, 0, 0]} />
          </group>
        ))}
      </group>
      <Lead position={[-4.75, 0.28, 1.25]} />
    </group>
  );
}

export function Mesa3D({ progresso = 0 }: { progresso?: number }) {
  return (
    <div className="relative aspect-[16/9] w-full">
      <Canvas
        shadows
        orthographic
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [9, 7.5, 9], zoom: 66, near: -100, far: 200 }}
      >
        {/* Luz de estúdio de cima à esquerda, sombra macia e quente. */}
        <ambientLight intensity={1.35} />
        <directionalLight
          position={[-6, 9, 5]}
          intensity={2.1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
        />
        <directionalLight position={[7, 4, -4]} intensity={0.5} />
        <Cena progresso={progresso} />
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.28}
          scale={18}
          blur={2.6}
          far={4}
          color="#141210"
        />
      </Canvas>
    </div>
  );
}
