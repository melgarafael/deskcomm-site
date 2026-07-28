"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { usarProgresso } from "./mesa/usarProgresso";

const Mesa3D = dynamic(() => import("./mesa/Mesa3D").then((m) => m.Mesa3D), { ssr: false });

/**
 * A vida de um lead.
 *
 * Uma mesa só, mudando de estado conforme o scroll — não sete imagens trocando.
 * O progresso da seção dirige a geometria E o trilho numerado: uma fonte de
 * verdade para "qual passo está em vista", porque com duas elas desencontram e
 * o visitante lê um passo enquanto a cena mostra outro.
 *
 * No celular a mesa 3D não entra: sete estados em WebGL durante scroll é caro
 * demais para o aparelho e para a bateria. Lá cada passo carrega a imagem
 * estática do próprio estado — os renders que serviram de direção de arte.
 */
const PASSOS = [
  {
    n: "01",
    titulo: "09:41 — chega uma mensagem",
    texto:
      "“Vocês entregam em Salvador?” Antes de qualquer resposta, o sistema já sabe quem é: histórico, pedidos, o que ficou combinado da última vez.",
    img: "/img/cena-00-base.png",
  },
  {
    n: "02",
    titulo: "O agente lê antes de falar",
    texto:
      "Ele busca na base de conhecimento da sua empresa — seu prazo, sua política, seu catálogo. Não inventa.",
    img: "/img/cena-02.png",
  },
  {
    n: "03",
    titulo: "Sete verificações antes de enviar",
    texto:
      "Descadastro, LGPD, anti-banimento, variação de texto, promessa determinística, promessa semântica e aviso de automação. Nessa ordem, sempre.",
    img: "/img/cena-03.png",
  },
  {
    n: "04",
    titulo: "Inclusive o que ele decidiu não enviar",
    texto:
      "O agente ia prometer entrega em 24h. A verificação barrou: esse prazo não existe no seu catálogo. Fica registrado o que ele ia dizer — e por que não disse.",
    img: "/img/cena-04.png",
  },
  {
    n: "05",
    titulo: "O lead se move sozinho",
    texto:
      "Qualificado, ele muda de etapa no funil. A etiqueta entra, o responsável é definido — e cada movimento tem motivo registrado.",
    img: "/img/cena-05.png",
  },
  {
    n: "06",
    titulo: "Quando é a vez do humano, ele recebe contexto",
    texto:
      "Não a conversa crua: resumo do que aconteceu, o que foi combinado, quais objeções apareceram e qual é o próximo passo.",
    img: "/img/cena-05.png",
  },
  {
    n: "07",
    titulo: "E se ninguém responder, não morre",
    texto:
      "Follow-up agendado. Se esfriar, o lead aparece no Radar classificado por risco — antes de virar prejuízo.",
    img: "/img/cena-07.png",
  },
];

export function Jornada() {
  // Uma medição, dois usos: o ref contínuo alimenta a geometria, o passo
  // discreto alimenta o texto. Mesma fonte de verdade, sem render por quadro.
  const { alvo, progresso, passo: ativo } = usarProgresso(PASSOS.length);

  return (
    <section id="jornada" className="border-t border-border/70 bg-surface-elevated/40">
      <div className="mx-auto max-w-[1200px] px-6 pt-20 sm:pt-28">
        <div className="max-w-[46ch]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">
            A vida de um lead
          </p>
          <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
            O que acontece entre a mensagem e a venda.
          </h2>
        </div>
      </div>

      {/* DESKTOP: a mesa fica presa e muda de estado; o texto rola ao lado. */}
      <div ref={alvo} className="relative hidden lg:block lg:h-[340vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,38%)_minmax(0,62%)] items-center gap-10 px-6">
            <ol className="min-w-0">
              {PASSOS.map((p, i) => (
                <li
                  key={p.n}
                  className={[
                    "grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 py-2.5 transition-opacity duration-300 ease-base",
                    i === ativo ? "opacity-100" : "opacity-30",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "pt-1 font-mono text-sm transition-colors duration-200 ease-base",
                      i === ativo ? "text-accent-600" : "text-text-muted",
                    ].join(" ")}
                  >
                    {p.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">{p.titulo}</h3>
                    {i === ativo && (
                      <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-text-muted">
                        {p.texto}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="min-w-0">
              <Mesa3D progresso={progresso} />
            </div>
          </div>
        </div>
      </div>

      {/* CELULAR: sequência simples com a imagem de cada estado. */}
      <ol className="mx-auto max-w-[1200px] px-6 pb-20 lg:hidden">
        {PASSOS.map((p) => (
          <li key={p.n} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-8">
            <span className="pt-1 font-mono text-sm text-accent-600">{p.n}</span>
            <div className="min-w-0">
              <h3 className="text-xl font-bold tracking-tight">{p.titulo}</h3>
              <p className="mt-3 leading-relaxed text-text-muted">{p.texto}</p>
              <div className="mt-5 overflow-hidden rounded-[12px] border border-border bg-bg">
                <Image
                  src={p.img}
                  alt={`Estado ${p.n} da mesa: ${p.titulo.toLowerCase()}.`}
                  width={1594}
                  height={941}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
