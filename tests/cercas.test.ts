/**
 * Cercas de fonte para os consertos que vivem em componente React.
 *
 * O site não tem renderizador nos testes (JSX não passa pelo `--experimental-strip-types` do
 * Node), então aqui não se prova o comportamento: prova-se que a FONTE do valor é a certa.
 *
 * A diferença importa, e custou uma rodada: a primeira versão destas cercas só proibia o token
 * exato do defeito (`aria-label="Idioma"`, `28/07/2026`, `~/meu-negocio`), e três delas ficavam
 * verdes com o defeito reescrito de outro jeito — outra data à mão no `<time>`, `sufixo={""}`,
 * a pasta do terminal fixada em `~/my-business`. O nome do caso afirmava "vem do dicionário" e a
 * asserção media "não é aquela string". Agora cada caso exige o LIGAMENTO (`{t.terminal.pasta}`,
 * `{formatarData(atualizadoEm…)}`, ``sufixo={`/${v.versao}`}``) e proíbe a família do token, não
 * o token.
 *
 * Cerca que reprovar por mudança legítima de estilo: mude a cerca junto, com a medição nova na
 * mensagem do commit. O que ela proíbe é a volta SILENCIOSA.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { en } from "../conteudo/en.ts";
import { es } from "../conteudo/es.ts";
import { TEXTOS_GUIAS } from "../conteudo/guias.ts";
import { ptBR } from "../conteudo/pt-BR.ts";

const ler = (caminho: string) => readFileSync(new URL(`../${caminho}`, import.meta.url), "utf8");

test("c4/c5: a página de versão passa a PRÓPRIA versão ao seletor de idioma", () => {
  const fonte = ler("components/changelog/PaginaVersao.tsx");
  assert.match(fonte, /<Cabecalho[^>]*sufixo=\{`\/\$\{v\.versao\}`\}/, "sem a versão no sufixo, o seletor leva à LISTA do outro idioma");
  assert.match(ler("components/Cabecalho.tsx"), /href=\{`\$\{ROTAS\[pagina\]\[i\.codigo\]\}\$\{sufixo\}`\}/);
});

test("c10: a data do rodapé é a prop, formatada — nenhuma data escrita à mão", () => {
  const fonte = ler("components/Rodape.tsx");
  assert.match(fonte, /<time dateTime=\{atualizadoEm\}>\{formatarData\(atualizadoEm,/, "uma data só fazia /guias e /changelog dizerem julho");
  assert.doesNotMatch(fonte, /\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}/, "data escrita à mão no rodapé, seja qual for");
});

test("d5: o aria-label do seletor de idioma vem do dicionário, e o dicionário traduz", () => {
  assert.match(ler("components/Cabecalho.tsx"), /<nav aria-label=\{c\.nav\.idioma\}/, "texto fixo em português nas páginas en/es");
  assert.notEqual(en.nav.idioma, ptBR.nav.idioma, "a nav de /en/… anunciada em português");
});

test("d5: a pasta da ilustração do terminal vem do dicionário, e o dicionário traduz", () => {
  const fonte = ler("components/guias/PaginaGuias.tsx");
  assert.match(fonte, /\{t\.terminal\.pasta\}/);
  assert.doesNotMatch(fonte, /~\//, "caminho de pasta escrito no componente serve os três idiomas com um só");
  assert.notEqual(TEXTOS_GUIAS.en.terminal.pasta, TEXTOS_GUIAS["pt-BR"].terminal.pasta);
  assert.notEqual(TEXTOS_GUIAS.es.terminal.pasta, TEXTOS_GUIAS["pt-BR"].terminal.pasta);
});

test("c6: o aviso de cópia mora numa região sr-only, que existe em toda largura", () => {
  const fonte = ler("components/guias/Interativos.tsx");
  assert.match(fonte, /className="sr-only" aria-live="polite"/, "no rótulo visível ele é display:none abaixo de 640 px");
  assert.doesNotMatch(fonte, /className="hidden[^"]*" aria-live/, "região aria-live com display:none não anuncia nada");
});

test("c7: o contador dos chips de seção não tem opacidade — 3,89:1 reprova em AA", () => {
  // Dois contadores, e o conserto tirou o `opacity-80` dos dois: o do `ChipSecao` (listagem) e o do
  // chip do cabeçalho da página de versão, que não usa o `ChipSecao`. Vigiar só o primeiro deixava o
  // segundo voltar em silêncio. O do segundo é o `<span>` DENTRO do `<a>` que leva o estilo do chip —
  // a forma não atravessa `</a>`, então não escorrega para os outros dois `{contarItens(s)}` do
  // arquivo (o do `h2` e o da lateral), que nunca tiveram opacidade nem são chip.
  const contadores = [
    ["components/changelog/Marcadores.tsx", /<span className="(font-mono[^"]*)">\{contagem\}<\/span>/],
    ["components/changelog/PaginaVersao.tsx", /<a\b(?:(?!<\/a>)[\s\S])*?ESTILO_SECAO\[s\.tipo\]\.chip(?:(?!<\/a>)[\s\S])*?<span className="(font-mono[^"]*)">\{contarItens\(s\)\}<\/span>/],
  ] as const;
  for (const [arquivo, forma] of contadores) {
    const contador = forma.exec(ler(arquivo));
    assert.ok(contador, `${arquivo}: o contador do chip mudou de forma — reveja a cerca`);
    assert.doesNotMatch(contador[1], /opacity-|\/\d\d\b/, `${arquivo}: opacidade no contador, escrita como for`);
  }
});

test("d1: o placeholder da busca não tem opacidade — é o único rótulo visível do campo", () => {
  assert.doesNotMatch(ler("components/changelog/ListaDeVersoes.tsx"), /placeholder:text-[\w-]+\/\d/, "4,29:1 com /80; 6,98:1 sem");
});

test("r1: o link permanente do item não depende de o item ter título", () => {
  const fonte = ler("components/changelog/PaginaVersao.tsx");
  const link = fonte.indexOf("aria-label={t.linkDoItem}");
  const condicional = fonte.indexOf("{it.titulo ? (");
  assert.ok(link !== -1 && condicional !== -1, "âncoras do teste sumiram do componente");
  assert.ok(link < condicional, "dentro do `h3`, o cartão sem título não oferece o link — 64 cartões hoje");
});
