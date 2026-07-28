import Image from "next/image";

import { CenaSticky } from "./CenaSticky";

/**
 * A vida de um lead — o scrollytelling.
 *
 * Formato: texto rolando à esquerda, cena FIXA à direita mudando de estado.
 * A mesa não some e volta entre os passos; ela EVOLUI. É a continuidade espacial
 * que 07-motion-language.md valoriza, aplicada ao formato de página.
 *
 * O trilho numerado à esquerda vem da referência do Twenty: sem ele, sticky longo
 * vira desorientação — o visitante não sabe em que passo está nem quantos faltam.
 *
 * ALINHAMENTO: as cenas foram alinhadas por correlação de fase contra a base
 * (scripts/alinhar.py) e recortadas com uma janela única. Quatro das cinco já
 * vieram com deslocamento ZERO — a fórmula "change ONLY..." segura o
 * enquadramento em cenas de close. Resíduo máximo: 3px, abaixo do piso de ruído
 * da medição.
 *
 * PENDÊNCIAS: o passo 01 usa a cena base (a esfera já está na conversa e os
 * sulcos estão apagados, o que serve, mas falta o cartão de contexto subindo).
 * O passo 06 reusa a cena do 05 porque a imagem de handoff saiu em 1536x1024
 * contra 1672x941 das demais — câmera diferente, pularia no sticky.
 */
const PASSOS = [
  {
    n: "01",
    titulo: "09:41 — chega uma mensagem",
    texto:
      "“Vocês entregam em Salvador?” Antes de qualquer resposta, o sistema já sabe quem é: histórico, pedidos, o que ficou combinado da última vez.",
    img: "/img/cena-00-base.png",
    alt: "O módulo da conversa acende, e um cartão de contexto sobe ao lado com os dados do contato.",
  },
  {
    n: "02",
    titulo: "O agente lê antes de falar",
    texto:
      "Ele busca na base de conhecimento da sua empresa — seu prazo, sua política, seu catálogo. Não inventa.",
    img: "/img/cena-02.png",
    alt: "Uma linha liga o agente à base de conhecimento; os documentos acendem em sequência.",
  },
  {
    n: "03",
    titulo: "Sete verificações antes de enviar",
    texto:
      "Descadastro, LGPD, anti-banimento, variação de texto, promessa determinística, promessa semântica e aviso de automação. Nessa ordem, sempre.",
    img: "/img/cena-03.png",
    alt: "Sete blocos formam um corredor entre o agente e a borda da mesa. Seis passam em verde; um barra em âmbar.",
  },
  {
    n: "04",
    titulo: "Inclusive o que ele decidiu não enviar",
    texto:
      "O agente ia prometer entrega em 24h. A verificação barrou: esse prazo não existe no seu catálogo. Fica registrado o que ele ia dizer — e por que não disse.",
    img: "/img/cena-04.png",
    alt: "Aproximação no bloco âmbar; um registro se materializa ao lado com a razão da recusa.",
  },
  {
    n: "05",
    titulo: "O lead se move sozinho",
    texto:
      "Qualificado, ele muda de etapa no funil. A etiqueta entra, o responsável é definido — e cada movimento tem motivo registrado.",
    img: "/img/cena-05.png",
    alt: "A esfera do lead percorre a trilha até o funil e assenta numa coluna nova.",
  },
  {
    n: "06",
    titulo: "Quando é a vez do humano, ele recebe contexto",
    texto:
      "Não a conversa crua: resumo do que aconteceu, o que foi combinado, quais objeções apareceram e qual é o próximo passo.",
    img: "/img/cena-05.png",
    alt: "O módulo do agente passa o bastão para o do atendente; um cartão de resumo transita entre os dois.",
  },
  {
    n: "07",
    titulo: "E se ninguém responder, não morre",
    texto:
      "Follow-up agendado. Se esfriar, o lead aparece no Radar classificado por risco — antes de virar prejuízo.",
    img: "/img/cena-07.png",
    alt: "O módulo do temporizador acende e o lead ganha um anel âmbar de risco.",
  },
];

export function Jornada() {
  return (
    <section id="jornada" className="border-t border-border/70 bg-surface-elevated/40">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
        <div className="max-w-[46ch]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-600">
            A vida de um lead
          </p>
          <h2 className="mt-5 text-pretty text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">
            O que acontece entre a mensagem e a venda.
          </h2>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-16">
          {/* Coluna do texto: cada passo ocupa uma altura de tela, para o passo
              visível casar com o estado exibido ao lado. */}
          <ol className="min-w-0">
            {PASSOS.map((p) => (
              <li
                key={p.n}
                id={`passo-${p.n}`}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 py-10 lg:min-h-[78vh] lg:content-center"
              >
                <span className="passo-num pt-1 font-mono text-sm text-text-muted">
                  {p.n}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {p.titulo}
                  </h3>
                  <p className="mt-3 max-w-[42ch] leading-relaxed text-text-muted">
                    {p.texto}
                  </p>

                  {/* No mobile o sticky não funciona bem: a cena vira imagem
                      inline do próprio passo. A história é a mesma. */}
                  <div className="mt-6 overflow-hidden rounded-[12px] border border-border bg-bg lg:hidden">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      width={1594}
                      height={941}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* A cena fixa. Uma mesa, sete estados — ela não some e volta. */}
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center">
              <div className="w-full overflow-hidden rounded-[16px] border border-border bg-bg p-4">
                <CenaSticky cenas={PASSOS.map(({ n, img, alt }) => ({ n, img, alt }))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
