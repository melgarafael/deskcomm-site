/**
 * O sitemap só pode listar endereço FINAL: o `www`, que responde 200. Em 11/11/2026 o
 * `deskcomm.com.br` respondia 308 para o `www`, e canonical/robots apontavam para o primeiro.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { ORIGEM } from "../conteudo/rotas.ts";
import { entradasDoSitemap } from "../lib/sitemap.ts";

const versoes = [
  { versao: "1.102.0", data: "2026-11-05" },
  { versao: "1.101.0", data: "2026-11-04" },
];

test("toda URL é absoluta no www, sem barra final nem duplicata", () => {
  const urls = entradasDoSitemap(versoes).map((e) => e.url);
  assert.equal(ORIGEM, "https://www.deskcomm.com.br");
  for (const u of urls) {
    assert.ok(u.startsWith(ORIGEM), u);
    assert.ok(!u.endsWith("/"), u);
  }
  assert.equal(new Set(urls).size, urls.length);
});

test("lista as páginas dos três idiomas, o curso, a instalação e cada versão", () => {
  const urls = new Set(entradasDoSitemap(versoes).map((e) => e.url));
  for (const c of ["", "/en", "/es", "/guias", "/en/guides", "/es/guias", "/changelog", "/en/changelog", "/es/changelog",
    "/instalar", "/curso", "/en/course", "/es/curso", "/changelog/1.102.0", "/en/changelog/1.101.0", "/es/changelog/1.102.0"]) {
    assert.ok(urls.has(`${ORIGEM}${c}`), c);
  }
  assert.equal(urls.size, 13 + 3 * versoes.length);
});

test("cada versão traz a data do CHANGELOG e o hreflang das três línguas", () => {
  const e = entradasDoSitemap(versoes).find((x) => x.url === `${ORIGEM}/en/changelog/1.101.0`);
  assert.equal(e?.lastModified, "2026-11-04");
  assert.deepEqual(e?.alternates?.languages, {
    "pt-BR": `${ORIGEM}/changelog/1.101.0`,
    en: `${ORIGEM}/en/changelog/1.101.0`,
    es: `${ORIGEM}/es/changelog/1.101.0`,
  });
});
