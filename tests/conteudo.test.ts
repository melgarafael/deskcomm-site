/**
 * As cinco correções de CONTEÚDO da página de guias (c8, c9, c11, d3, d4), nos três idiomas.
 *
 * Elas eram as únicas do PR sem guarda nenhuma: as de código têm cerca de fonte, as do changelog
 * têm o texto fixo, e uma frase de negócio reposta à mão passaria por `pnpm typecheck`, por
 * `pnpm build` e pelo deploy sem nada ficar vermelho. O controle é direto: repondo em
 * `conteudo/guias.ts` a frase que o c8 tirou, este arquivo fica vermelho.
 *
 * Aqui não se testa gosto nem tradução — testa-se a PROPRIEDADE que cada conserto estabeleceu, e
 * sobre o dado, não sobre o texto-fonte: o dicionário é importável por `node --experimental-strip-
 * types` (só tem `import type`), então o que se lê é o que a página renderiza.
 *
 * Correção de conteúdo vale nos três idiomas. Quando um caso só sabe olhar um deles (a frase em
 * inglês do d4, as do espanhol do d3), está escrito por quê.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { TEXTOS_GUIAS, type TextosGuias } from "../conteudo/guias.ts";

const IDIOMAS = ["pt-BR", "en", "es"] as const;
const cada = (f: (t: TextosGuias, idioma: string) => void) => {
  for (const i of IDIOMAS) f(TEXTOS_GUIAS[i], i);
};

/** Toda string do dicionário, em profundidade — para procurar uma afirmação sem saber onde ela mora. */
function frases(x: unknown, saco: string[] = []): string[] {
  if (typeof x === "string") saco.push(x);
  else if (Array.isArray(x)) for (const i of x) frases(i, saco);
  else if (x && typeof x === "object") for (const i of Object.values(x)) frases(i, saco);
  return saco;
}

const CONFIANCA = /confiáve|confiable|trusted|trust /i;

test("os três dicionários têm a mesma estrutura — tradução que encolhe é conteúdo perdido", () => {
  const pt = TEXTOS_GUIAS["pt-BR"];
  cada((t, i) => {
    assert.equal(t.faq.itens.length, pt.faq.itens.length, `${i}: perguntas do FAQ`);
    assert.equal(t.guias.length, pt.guias.length, `${i}: guias do catálogo`);
    assert.equal(t.lista.length, pt.lista.length, `${i}: assistentes`);
    assert.deepEqual(t.guias.map((g) => g.id), pt.guias.map((g) => g.id), `${i}: ids dos guias`);
    assert.deepEqual(t.lista.map((a) => a.id), pt.lista.map((a) => a.id), `${i}: ids dos assistentes`);
  });
});

test("c8: nenhuma língua diz que o Codex precisa de pasta confiável — medido com codex-cli 0.154.0", () => {
  cada((t, i) => {
    const codex = t.lista.find((a) => a.doc.includes("learn.chatgpt.com"));
    assert.ok(codex, `${i}: o cartão do Codex sumiu — reveja a cerca`);
    for (const nota of codex.bomSaber)
      assert.doesNotMatch(nota, CONFIANCA, `${i}: a skill do projeto carregou em pasta "untrusted"; quem repuser a afirmação, meça antes`);
    for (const item of t.faq.itens)
      if (CONFIANCA.test(item.r)) assert.doesNotMatch(item.r, /codex/i, `${i}: o FAQ manda confiar na pasta citando o Codex`);
  });
});

test("c8: a afirmação que FOI medida, a do Antigravity, continua de pé", () => {
  cada((t, i) => {
    const anti = t.lista.find((a) => a.doc.includes("antigravity"));
    assert.ok(anti, `${i}: o cartão do Antigravity sumiu`);
    assert.ok(anti.bomSaber.some((n) => CONFIANCA.test(n)), `${i}: tirar o Codex levou junto o caso que a medição confirmou`);
  });
});

test("c9: a resposta sobre ler conversas fala dos DOIS guias, não só do de métricas", () => {
  cada((t, i) => {
    const item = t.faq.itens.find((f) => /conversas|conversations|conversaciones/i.test(f.p));
    assert.ok(item, `${i}: a pergunta sobre conversas sumiu do FAQ`);
    assert.match(item.r, /métricas|metrics/i, `${i}`);
    assert.match(item.r, /prompt/i, `${i}: o guia de prompt lê uma amostra, e a resposta calava sobre isso`);
  });
});

test("c11: o WSL não está no mesmo pé do Git Bash para instalar no Windows", () => {
  const condicao: Record<string, RegExp> = { "pt-BR": /só se/i, en: /only if/i, es: /solo si/i };
  const alternativa: Record<string, RegExp> = { "pt-BR": /Git Bash ou (o )?WSL/i, en: /Git Bash or WSL/i, es: /Git Bash o WSL/i };
  cada((t, i) => {
    assert.match(t.instalar.windows, /WSL/, `${i}`);
    assert.match(t.instalar.windows, condicao[i], `${i}: o instalador escreve em $HOME, que no WSL é o home do Linux`);
    assert.doesNotMatch(t.instalar.windows, alternativa[i], `${i}: assistente instalado no Windows não lê de lá`);
  });
});

test("d3: em espanhol, VPS é masculino — o cabeçalho da própria página diz `en un VPS`", () => {
  const todas = frases(TEXTOS_GUIAS.es);
  const femininas = todas.filter((s) => /\b(la|una|esa|esta|misma)\s+VPS\b/i.test(s));
  assert.deepEqual(femininas, [], "a página se contradizia entre o título e o corpo");
  assert.ok(todas.some((s) => /\b(el|un)\s+VPS\b/i.test(s)), "a cerca ficaria vazia se a palavra sumisse do dicionário");
});

// As outras quatro correções do d3. Cada caso proíbe a FORMA do defeito que foi corrigido — no campo
// onde ele estava, menos o `bueno (de) saber`, procurado em qualquer string do espanhol — e não
// julga a tradução que o substituiu, que pode mudar à vontade.

test("d3: em espanhol, o rótulo `Sozinho` não é o adjetivo solto — `Sola` concordava com nada", () => {
  assert.doesNotMatch(TEXTOS_GUIAS.es.assistentes.sozinho, /^\s*s[oó]l[oa]s?\s*$/i, "o rótulo nomeia como o assistente aciona o guia por conta própria");
});

test("d3: em espanhol, `Bom saber` não vira o decalque `Bueno saber`", () => {
  const decalques = frases(TEXTOS_GUIAS.es).filter((s) => /\bbuen[oa]?\s+(?:de\s+)?saber\b/i.test(s));
  assert.deepEqual(decalques, [], "decalque do português, não é como se diz em espanhol");
});

test("d3: em espanhol, o que se digita depois do nome é PASSADO ao guia — `junto a` quer dizer `ao lado de`", () => {
  const lista = TEXTOS_GUIAS.es.lista;
  assert.ok(lista.some((a) => a.id === "claude"), "o cartão do Claude Code, onde a frase mora, sumiu — reveja a cerca");
  for (const a of lista)
    assert.doesNotMatch(a.peloNome.texto, /\bjunto a\b/i, `${a.id}: "va junto a la guía" põe o texto ao lado do guia, não dentro do pedido`);
});

test("d3: em espanhol, o assistente SEGUE os guias e responde — `sigue` + gerúndio diz que ele continua respondendo", () => {
  const item = TEXTOS_GUIAS.es.faq.itens.find((f) => /español|inglés/i.test(f.p));
  assert.ok(item, "a pergunta sobre o idioma sumiu do FAQ — reveja a cerca");
  assert.doesNotMatch(item.r, /\bsiguen?\s+(?!cuando\b)\p{L}+(?:ando|iendo|yendo|ándo|iéndo|yéndo)/iu, "`las sigue respondiendo` é `continua respondendo-as`");
});

test("d4: em inglês, a frase da imobiliária pede o prompt do AGENTE DE IA, não o do corretor", () => {
  const guia = TEXTOS_GUIAS.en.guias.find((g) => g.id === "deskcomm-cliente-novo");
  assert.ok(guia, "o cartão do guia de cliente novo sumiu");
  for (const f of guia.frases)
    if (/real estate/i.test(f)) assert.match(f, /AI agent/i, "`the real estate agent` é o corretor, e o guia monta o agente de IA");
});
