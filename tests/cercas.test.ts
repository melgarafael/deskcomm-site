/**
 * Cercas de fonte para os consertos que vivem em componente React.
 *
 * O site não tem renderizador nos testes (JSX não passa pelo `--experimental-strip-types` do
 * Node), então aqui não se prova o comportamento: prova-se que o TOKEN que o causava não voltou.
 * É rede fina de propósito — vale para defeito de uma palavra (`opacity-80`, uma data escrita à
 * mão, um `aria-label` fixo), que é exatamente a forma dos consertos c4/c5, c6, c7, c10, d1 e d5.
 *
 * Cerca que reprovar por mudança legítima de estilo: mude a cerca junto, com a medição nova na
 * mensagem do commit. O que ela proíbe é a volta SILENCIOSA.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const ler = (caminho: string) => readFileSync(new URL(`../${caminho}`, import.meta.url), "utf8");

test("c4/c5: a página de versão passa o sufixo ao seletor de idioma", () => {
  const fonte = ler("components/changelog/PaginaVersao.tsx");
  assert.match(fonte, /<Cabecalho[^>]*sufixo=\{/, "sem sufixo, o seletor leva à LISTA do outro idioma");
  assert.match(ler("components/Cabecalho.tsx"), /href=\{`\$\{ROTAS\[pagina\]\[i\.codigo\]\}\$\{sufixo\}`\}/);
});

test("c10: o aria-label do seletor de idioma vem do dicionário", () => {
  assert.doesNotMatch(ler("components/Cabecalho.tsx"), /aria-label="Idioma"/, "texto fixo em português nas páginas en/es");
});

test("c10: a pasta da ilustração do terminal vem do dicionário", () => {
  assert.doesNotMatch(ler("components/guias/PaginaGuias.tsx"), /~\/meu-negocio/, "texto fixo em português nas páginas en/es");
});

test("d5: a data do rodapé é prop, e não uma data escrita à mão", () => {
  const fonte = ler("components/Rodape.tsx");
  assert.match(fonte, /atualizadoEm/);
  assert.doesNotMatch(fonte, /28\/07\/2026|2026-07-28/, "uma data só fazia /guias e /changelog dizerem julho");
});

test("c6: o aviso de cópia mora numa região sr-only, que existe em toda largura", () => {
  const fonte = ler("components/guias/Interativos.tsx");
  assert.match(fonte, /className="sr-only" aria-live="polite"/, "no rótulo visível ele é display:none abaixo de 640 px");
  assert.doesNotMatch(fonte, /className="hidden sm:inline" aria-live/, "região aria-live com display:none não anuncia nada");
});

test("c7: o contador do chip não tem opacidade — 3,89:1 reprova em AA", () => {
  assert.doesNotMatch(ler("components/changelog/Marcadores.tsx"), /tabular-nums opacity-80/);
});

test("d1: o placeholder da busca não tem opacidade — é o único rótulo visível do campo", () => {
  assert.doesNotMatch(ler("components/changelog/ListaDeVersoes.tsx"), /placeholder:text-text-muted\/80/);
});

test("r1: o link permanente do item não depende de o item ter título", () => {
  const fonte = ler("components/changelog/PaginaVersao.tsx");
  const link = fonte.indexOf("aria-label={t.linkDoItem}");
  const condicional = fonte.indexOf("{it.titulo ? (");
  assert.ok(link !== -1 && condicional !== -1, "âncoras do teste sumiram do componente");
  assert.ok(link < condicional, "dentro do `h3`, o cartão sem título não oferece o link — 64 cartões hoje");
});
