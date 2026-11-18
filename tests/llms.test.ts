/**
 * O `/llms.txt` é lido por máquina: um link quebrado ou uma descrição que
 * divergiu da página passa por typecheck e build sem nada ficar vermelho.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { en } from "../conteudo/en.ts";
import { es } from "../conteudo/es.ts";
import { ptBR } from "../conteudo/pt-BR.ts";
import { INSTALACAO, ROTAS, ROTAS_CURSO } from "../conteudo/rotas.ts";
import { gerarLlmsTxt, ORIGEM_LLMS, REPOSITORIO } from "../lib/llms.ts";

const txt = gerarLlmsTxt();

test("segue o formato do llmstxt.org: H1, citação e seções H2", () => {
  const linhas = txt.split("\n");
  assert.equal(linhas[0], "# DeskcommCRM");
  assert.match(txt, /^> .+$/m);
  assert.ok((txt.match(/^## /gm) ?? []).length >= 2);
  assert.equal((txt.match(/^# /gm) ?? []).length, 1, "um único H1");
});

test("as descrições são as das páginas, nos três idiomas", () => {
  for (const d of [en.meta.descricao, ptBR.meta.descricao, es.meta.descricao]) assert.ok(txt.includes(d));
});

test("todo link do site é absoluto, no host www e numa rota que o site declara", () => {
  const conhecidas = new Set<string>([
    ...Object.values(ROTAS).flatMap((r) => Object.values(r)),
    ...Object.values(ROTAS_CURSO),
    INSTALACAO,
  ]);
  const links = [...txt.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
  assert.ok(links.length > 0);
  for (const l of links) {
    if (l.startsWith(REPOSITORIO)) continue;
    assert.ok(l.startsWith(`${ORIGEM_LLMS}/`), `link fora do host canônico: ${l}`);
    assert.ok(conhecidas.has(l.slice(ORIGEM_LLMS.length)), `rota desconhecida: ${l}`);
  }
});
