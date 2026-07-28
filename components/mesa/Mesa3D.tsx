"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group } from "three";

import { CartaoContexto, Conhecimento, Gates, Humano, RegistroVeto, Resumo } from "./estados";
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

/**
 * O progresso vira sete tempos. Cada elemento lê quanto o SEU tempo está ativo,
 * e a mesa nunca troca de imagem: ela muda de estado.
 */
function tempo(p: number, i: number, total = 7) {
  const largura = 1 / total;
  const ini = i * largura;
  // Entra na primeira metade da faixa e permanece até o fim dela.
  return Math.min(1, Math.max(0, (p - ini) / (largura * 0.55)));
}

function Cena({ progresso }: { progresso: { current: number } }) {
  const grupo = useRef<Group>(null);
  const pecas = useRef<Group>(null);
  const leadRef = useRef<Group>(null);
  const suave = useRef(0);
  const [p, setP] = useState(0);

  useFrame((_, dt) => {
    // Amortecimento: a mesa PERSEGUE o progresso em vez de saltar com ele.
    // Sem isso, scroll em trackpad vira tremor.
    // dt*11: a mesa cola no scroll. Abaixo disso ela arrasta e parece
    // pesada; muito acima, trackpad vira tremor.
    suave.current += (progresso.current - suave.current) * Math.min(1, dt * 11);
    const p = suave.current;

    if (grupo.current) {
      // Gira e inclina: você contorna a mesa enquanto desce a página.
      grupo.current.rotation.y = entre(-0.30, 0.26, faixa(p, 0, 1));
      grupo.current.rotation.x = entre(0, -0.09, faixa(p, 0.3, 1));
      
    }
    // O lead percorre o sulco da conversa até o funil no tempo 5.
    if (leadRef.current) {
      const andar = faixa(p, 4 / 7, 4 / 7 + 0.09);
      leadRef.current.position.set(
        entre(-4.75, -0.9, andar),
        entre(0.28, 0.62, andar),
        entre(1.25, -2.05, andar),
      );
    }
    setP(p);
  });

  return (
    <group ref={grupo}>
      {/* Tampo e o degrau embaixo. Topo do tampo em y=0: é o plano onde as
          peças assentam. */}
      <Placa largura={10.4} profundidade={7} espessura={0.3} raio={0.75} cor={CORES.superficie} position={[0, -0.3, 0]} />
      <Placa largura={10.1} profundidade={6.75} espessura={0.14} raio={0.7} cor={CORES.peca} position={[0, -0.46, 0]} />

      {/* Sulcos: o caminho que liga as peças */}
      <Sulco de={[-3.5, 0.9]} para={[-0.2, 0.9]} aceso={p > 4 / 7} />
      <Sulco de={[-0.2, 0.9]} para={[-0.2, -1.1]} aceso={p > 4.6 / 7} />
      <Sulco de={[-3.3, -1.4]} para={[-1.2, -1.4]} />
      <Sulco de={[1.2, 0]} para={[3.4, 0]} />
      <Sulco de={[-0.2, -1.9]} para={[1.5, -1.9]} />

      <Conversa position={[-3.9, 0.2, 0.9]} />
      <Funil position={[-0.9, 0.05, -2.3]} />
      <Agente position={[0.4, 0.02, 0]} />
      <Temporizador position={[3.9, 0.02, 0.3]} />
      <Registro position={[-0.4, 0.1, 2.1]} />

      {/* Os sete tempos da narrativa, na mesma mesa. */}
      <CartaoContexto f={tempo(p, 0)} />
      <Conhecimento f={tempo(p, 1)} />
      <Gates f={tempo(p, 2)} destacarVeto={tempo(p, 3)} />
      <RegistroVeto f={tempo(p, 3)} />
      <Humano f={tempo(p, 5)} />
      <Resumo f={tempo(p, 5)} />

      <group ref={leadRef} position={[-4.75, 0.28, 1.25]}>
        <Lead position={[0, 0, 0]} cor={tempo(p, 6) > 0.4 ? CORES.ambar : CORES.sage} />
      </group>
    </group>
  );
}

export function Mesa3D({ progresso }: { progresso: { current: number } }) {
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
