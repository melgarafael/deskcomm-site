import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { parse } from "acorn";
import { ROTAS_CURSO } from "../conteudo/rotas.ts";
import config from "../next.config.ts";
import { CAMINHOS_CURSO, IDIOMAS_CURSO, inventarioDoCurso, lerCurso, literaisDoPrograma, montarCursoLocalizado, traduzirDados, traduzirPrograma, visitarTextos } from "../lib/curso-localizacao.mjs";

const ler = (caminho) => readFileSync(new URL(`../${caminho}`, import.meta.url), "utf8");
const json = (caminho) => JSON.parse(ler(caminho));
const fonte = ler("public/curso/index.html");
const curso = lerCurso(fonte);
const internos = json("conteudo/curso/interface-interna.json");
const catalogos = Object.fromEntries(["en", "es"].map((idioma) => {
  const pasta = `conteudo/curso/${idioma}/`;
  const partes = readdirSync(new URL(`../${pasta}`, import.meta.url)).filter((n) => /^parte-\d+\.json$/.test(n));
  const conteudo = {};
  for (const parte of partes) for (const [original, traducao] of Object.entries(json(pasta + parte))) {
    assert.ok(!Object.hasOwn(conteudo, original), `Texto repetido em ${idioma}: ${original}`);
    conteudo[original] = traducao;
  }
  return [idioma, { conteudo, interface: json(pasta + "interface.json"), internos }];
}));

test("curso: links do site, seletor e rewrites concordam nos três idiomas", async () => {
  assert.deepEqual(ROTAS_CURSO, CAMINHOS_CURSO);
  assert.deepEqual(await config.rewrites(), IDIOMAS_CURSO.map((idioma) => ({ source: CAMINHOS_CURSO[idioma], destination: `/curso/${idioma}/index.html` })));
});

test("curso: inglês e espanhol cobrem todo o conteúdo publicado sem fallback", () => {
  const inventario = inventarioDoCurso(curso.dados);
  assert.ok(inventario.length > 7000, "o teste deve cobrir o curso completo, incluindo demonstrações");
  const esperados = new Set(inventario.map((t) => t.original));
  for (const idioma of ["en", "es"]) {
    const presentes = new Set(Object.keys(catalogos[idioma].conteudo));
    assert.deepEqual(inventario.filter((t) => !presentes.has(t.original)).map((t) => t.contexto), [], `Faltam traduções em ${idioma}`);
    assert.deepEqual([...presentes].filter((t) => !esperados.has(t)).map((t) => t.slice(0, 90)), [], `Textos antigos no catálogo ${idioma}`);
    for (const { original, contexto } of inventario) {
      assert.equal(typeof catalogos[idioma].conteudo[original], "string", contexto);
      assert.ok(catalogos[idioma].conteudo[original].trim(), contexto);
      if (original.split(/\s+/).length > 10) assert.notEqual(catalogos[idioma].conteudo[original], original, `${idioma}: parágrafo em português em ${contexto}`);
    }
  }
});

test("curso: traduzir preserva ids, ações, capturas, coordenadas e demais metadados", () => {
  const semTextos = (dados) => visitarTextos(structuredClone(dados), () => "");
  for (const idioma of ["en", "es"]) {
    const traduzidos = traduzirDados(curso.dados, catalogos[idioma].conteudo);
    assert.deepEqual(semTextos(traduzidos), semTextos(curso.dados));
    assert.notEqual(traduzidos.modulos[0].licoes[0].objetivo, curso.dados.modulos[0].licoes[0].objetivo);
    assert.notEqual(traduzidos.nichos[0].jornadas[0].contexto, curso.dados.nichos[0].jornadas[0].contexto);
    assert.notEqual(traduzidos.capturas[Object.keys(traduzidos.capturas)[0]].destaques[0].rotulo, curso.dados.capturas[Object.keys(curso.dados.capturas)[0]].destaques[0].rotulo);
  }
});

test("curso: conteúdo ou interface novos sem tradução interrompem a geração", () => {
  assert.throws(() => traduzirDados(curso.dados, {}), /Tradução ausente/);
  assert.throws(() => traduzirPrograma('var texto = "Texto novo sem tradução";', {}, internos), /Literal novo/);
  assert.equal(traduzirPrograma('var modo = "simular";', {}, internos), 'var modo = "simular";');
});

test("curso: interface localizada continua sendo JavaScript válido e mantém tokens internos", () => {
  for (const idioma of ["en", "es"]) {
    const programa = traduzirPrograma(curso.programa, catalogos[idioma].interface, internos);
    assert.doesNotThrow(() => parse(programa, { ecmaVersion: "latest" }));
    const antes = literaisDoPrograma(curso.programa).map((x) => x.valor);
    const depois = literaisDoPrograma(programa).map((x) => x.valor);
    assert.equal(antes.length, depois.length);
    antes.forEach((v, i) => {
      if (internos.includes(v)) assert.equal(depois[i], v, `Token interno alterado: ${v}`);
    });
    assert.match(programa, /curso-deskcomm:feitos/, "mesma chave de progresso nos três idiomas");
  }
});

test("curso: HTML anuncia seu idioma, canonical, alternates e oferece troca de idioma", () => {
  for (const idioma of IDIOMAS_CURSO) {
    const html = montarCursoLocalizado(fonte, idioma, catalogos[idioma]);
    assert.match(html, new RegExp(`<html lang="${idioma}">`));
    assert.ok(html.includes(`rel="canonical" href="https://www.deskcomm.com.br${CAMINHOS_CURSO[idioma]}"`));
    for (const i of IDIOMAS_CURSO) {
      assert.ok(html.includes(`hreflang="${i}" href="https://www.deskcomm.com.br${CAMINHOS_CURSO[i]}"`));
      assert.ok(html.includes(`data-idioma-curso="${CAMINHOS_CURSO[i]}"`));
    }
    assert.match(html, /link\.dataset\.idiomaCurso \+ location\.hash/, "preserva aula e cena ao trocar idioma");
    if (idioma !== "pt-BR") assert.match(html, /class="aviso-idioma" role="note"/);
    const gerado = lerCurso(html);
    assert.equal(gerado.dados.modulos.length, curso.dados.modulos.length);
    assert.doesNotThrow(() => parse(gerado.programa, { ecmaVersion: "latest" }));
  }
});
