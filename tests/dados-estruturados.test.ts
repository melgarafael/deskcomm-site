/**
 * O JSON-LD da home: válido, no host canônico, sem afirmação que o produto não sustenta.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { en } from "../conteudo/en.ts";
import { es } from "../conteudo/es.ts";
import { ptBR } from "../conteudo/pt-BR.ts";
import { dadosEstruturados, ORIGEM_LD, serializarLd } from "../lib/dados-estruturados.ts";

const IDIOMAS = ["pt-BR", "en", "es"] as const;
const CONTEUDO = { "pt-BR": ptBR, en, es };

for (const idioma of IDIOMAS) {
  test(`JSON-LD da home (${idioma})`, () => {
    const ld = dadosEstruturados(idioma, CONTEUDO[idioma].meta.descricao);
    const volta = JSON.parse(serializarLd(ld));
    assert.deepEqual(volta, ld);
    const tipos = volta["@graph"].map((n: { "@type": string }) => n["@type"]);
    assert.deepEqual(tipos, ["Organization", "SoftwareApplication"]);
    const app = volta["@graph"][1];
    assert.equal(app.description, CONTEUDO[idioma].meta.descricao);
    assert.equal(app.inLanguage, idioma);
    assert.equal(app.offers.price, "0");
    assert.equal(app.publisher["@id"], volta["@graph"][0]["@id"]);
    // nada de versão fixa nem nota inventada
    assert.ok(!("softwareVersion" in app));
    assert.ok(!("aggregateRating" in app));
    for (const u of JSON.stringify(volta).match(/https:\/\/[^"]+deskcomm\.com\.br[^"]*/g) ?? []) {
      assert.ok(u.startsWith(`${ORIGEM_LD}/`), `fora do host canônico: ${u}`);
    }
  });
}

test("serializarLd não deixa o texto fechar o <script>", () => {
  const s = serializarLd({ x: "</script><script>alert(1)</script>" });
  assert.ok(!s.includes("<"));
  assert.deepEqual(JSON.parse(s), { x: "</script><script>alert(1)</script>" });
});
