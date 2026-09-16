/**
 * O que a página de changelog CONTA e NOMEIA — a camada onde moram os consertos c1, c2 e c3.
 *
 * Existe porque nenhum deles tinha guarda: `pnpm typecheck` e `pnpm build` passam com
 * `lib/changelog.ts` revertido inteiro, e o único check do PR é o deploy. Uma regra de título
 * escrita sem esta rede já derrubou 42 cartões de uma vez sem nada ficar vermelho.
 *
 * A fonte real é o `CHANGELOG.md` da `main`, que muda toda semana; o que se guarda aqui é a
 * REGRA, contra um texto fixo que reúne as fugas de formato medidas naquele arquivo.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { contarItens, interpretarChangelog, titulosDaSecao, type Secao, type Versao } from "../lib/changelog.ts";

const FIXTURE = `# Changelog

## [Não lançado]

- Isto não é uma versão e não pode virar uma.

## [2.0.0] — 2026-01-02

### Adicionado

- **Título do robô** Corpo que abre em maiúscula.
- **Tempo adaptativo** — a IA escolhe o intervalo e a tela mostra qual foi.
- **Tela de Execuções** (Agente de IA → Execuções): o que a IA fez.
- **Quem usa teclado remarca do mesmo jeito**: com o compromisso em foco.
- **Excluir um canal** apagava o roteador junto, sem avisar.
- **O instalador pergunta qual IA vai atender** (OpenRouter, Anthropic ou OpenAI) e valida a chave.
- **Chamada perdida vira aviso na Central**, com o número de quem ligou.

---

### ⚠️ Requer atenção

**Se o seu servidor foi instalado antes desta versão, rode o \`update.sh\` DUAS vezes.**

**Antes de ligar a parada automática, confira o número do seu limite.**

## [1.0.0] — 2026-01-01

### Segurança

**⚠️ Requer atenção**

Prosa que não é entrada de nada.

**Estes são os grupos desta versão:**

- **Uma correção.** O corpo dela.
- **Outra correção** — o corpo da outra.

### Corrigido

- Item sem negrito nenhum.
- \`\`\`
  um item que é só um bloco de código, e não nomeia nada
  \`\`\`

[1.0.0]: https://example.invalid/1.0.0
`;

const versoes = interpretarChangelog(FIXTURE);
const porNumero = (v: string): Versao => {
  const achada = versoes.find((x) => x.versao === v);
  assert.ok(achada, `versão ${v} não foi lida`);
  return achada;
};
const secao = (v: string, titulo: string): Secao => {
  const achada = porNumero(v).secoes.find((s) => s.titulo === titulo);
  assert.ok(achada, `seção ${titulo} da ${v} não foi lida`);
  return achada;
};

test("lê as versões e ignora `## [Não lançado]` e o rodapé de referências", () => {
  assert.deepEqual(
    versoes.map((v) => v.versao),
    ["2.0.0", "1.0.0"],
  );
  assert.equal(porNumero("2.0.0").salto, "major");
});

test("c1: aviso escrito como parágrafo em negrito é entrada — a seção não conta zero", () => {
  const atencao = secao("2.0.0", "Requer atenção");
  assert.equal(contarItens(atencao), 2);
  assert.deepEqual(titulosDaSecao(atencao), [
    "Se o seu servidor foi instalado antes desta versão, rode o update.sh DUAS vezes",
    "Antes de ligar a parada automática, confira o número do seu limite",
  ]);
});

test("c1: `Requer atenção` vem primeiro, mesmo escrita depois no arquivo", () => {
  assert.equal(porNumero("2.0.0").secoes[0].tipo, "atencao");
});

test("c1: `**⚠️ Requer atenção**` é cabeçalho de seção, não entrada dela", () => {
  const seguranca = secao("1.0.0", "Segurança");
  assert.equal(contarItens(seguranca), 2, "os 2 itens da lista, sem o cabeçalho em negrito e sem a prosa");
  assert.deepEqual(titulosDaSecao(seguranca), ["Uma correção", "Outra correção"]);
});

test("c1: parágrafo em negrito que ABRE uma lista não conta — quem conta são os itens", () => {
  assert.ok(!titulosDaSecao(secao("1.0.0", "Segurança")).includes("Estes são os grupos desta versão"));
});

const adicionado = secao("2.0.0", "Adicionado");
const itens = adicionado.blocos.flatMap((b) => (b.t === "lista" ? b.itens : []));

test("c2: negrito que abre uma frase que continua NÃO vira título", () => {
  const partidos = itens.filter((it) => it.titulo).map((it) => it.titulo);
  assert.ok(!partidos.includes("Excluir um canal"), "corpo que começa por minúscula");
  assert.ok(!partidos.includes("Chamada perdida vira aviso na Central"), "corpo que começa por vírgula");
  assert.ok(!partidos.includes("O instalador pergunta qual IA vai atender"), "parêntese seguido de `e`: a frase continua");
});

test("c2: o texto do item que não foi partido continua inteiro", () => {
  const inteiro = itens.find((it) => !it.titulo && it.blocos[0]?.t === "p" && it.blocos[0].texto.includes("Excluir um canal"));
  assert.ok(inteiro, "o item ficou sem título E sem o parágrafo");
  assert.equal(inteiro.blocos[0].t === "p" && inteiro.blocos[0].texto, "**Excluir um canal** apagava o roteador junto, sem avisar.");
});

test("r1: travessão, dois-pontos e localizador entre parênteses fecham o título", () => {
  const titulos = itens.map((it) => it.titulo);
  assert.ok(titulos.includes("Título do robô"), "corpo em maiúscula");
  assert.ok(titulos.includes("Tempo adaptativo"), "corpo que abre com travessão");
  assert.ok(titulos.includes("Tela de Execuções"), "localizador entre parênteses seguido de dois-pontos");
  assert.ok(titulos.includes("Quem usa teclado remarca do mesmo jeito"), "corpo que abre com dois-pontos");
});

test("c3: `---` vira separador, e não um parágrafo com três hífens", () => {
  const blocos = porNumero("2.0.0").secoes.flatMap((s) => s.blocos);
  assert.ok(blocos.some((b) => b.t === "separador"), "o `---` sumiu");
  assert.ok(!blocos.some((b) => b.t === "p" && b.texto.trim() === "---"), "o `---` virou parágrafo");
});

test("r6: o chip e a lista de marcadores são o mesmo array em toda seção", () => {
  for (const v of versoes)
    for (const s of v.secoes) {
      assert.equal(contarItens(s), titulosDaSecao(s).length, `${v.versao} · ${s.titulo}`);
      assert.ok(!titulosDaSecao(s).includes(""), `${v.versao} · ${s.titulo}: marcador vazio na listagem`);
    }
});

test("r6: entrada que não nomeia nada não vira marcador vazio nem número a mais", () => {
  const corrigido = secao("1.0.0", "Corrigido");
  assert.deepEqual(titulosDaSecao(corrigido), ["Item sem negrito nenhum."]);
  assert.equal(contarItens(corrigido), 1, "o item que é só código não pode contar no chip e sumir da lista");
});
