import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { parse } from "acorn";
import { ROTAS_CURSO } from "../conteudo/rotas.ts";
import config from "../next.config.ts";
import { CAMINHOS_CURSO, IDIOMAS_CURSO, aplicarManifestoCapturas, inventarioDoCurso, lerCurso, literaisDoPrograma, montarCursoLocalizado, traduzirDados, traduzirPrograma, visitarTextos } from "../lib/curso-localizacao.mjs";
import { lerCapturasEspanhol } from "../lib/curso-capturas.mjs";

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

function conferirCatalogo(dados, conteudo, idioma, manifestoCapturas = null) {
  // A fonte canônica ainda atende o inglês e o fallback espanhol. Preserve seus textos,
  // além dos rótulos que só aparecem nas fotos espanholas realmente publicadas.
  const inventarios = [inventarioDoCurso(dados)];
  if (manifestoCapturas !== null) inventarios.push(inventarioDoCurso(aplicarManifestoCapturas(dados, manifestoCapturas)));
  const inventario = [...new Map(inventarios.flat().map((texto) => [texto.original, texto])).values()];
  const esperados = new Set(inventario.map((t) => t.original));
  const presentes = new Set(Object.keys(conteudo));
  assert.deepEqual(inventario.filter((t) => !presentes.has(t.original)).map((t) => t.contexto), [], `Faltam traduções em ${idioma}`);
  assert.deepEqual([...presentes].filter((t) => !esperados.has(t)).map((t) => t.slice(0, 90)), [], `Textos antigos no catálogo ${idioma}`);
  for (const { original, contexto } of inventario) {
    assert.equal(typeof conteudo[original], "string", contexto);
    assert.ok(conteudo[original].trim(), contexto);
    if (original.split(/\s+/).length > 10) assert.notEqual(conteudo[original], original, `${idioma}: parágrafo em português em ${contexto}`);
  }
}

test("curso: links do site, seletor e rewrites concordam nos três idiomas", async () => {
  assert.deepEqual(ROTAS_CURSO, CAMINHOS_CURSO);
  assert.deepEqual(await config.rewrites(), { beforeFiles: IDIOMAS_CURSO.map((idioma) => ({ source: CAMINHOS_CURSO[idioma], destination: `/curso/${idioma}/index.html` })) }, "o HTML canônico em public/curso/index.html não deve ganhar do curso com seletor na Vercel");
});

test("curso: inglês e espanhol cobrem todo o conteúdo publicado sem fallback", () => {
  const inventario = inventarioDoCurso(curso.dados);
  assert.ok(inventario.length > 7000, "o teste deve cobrir o curso completo, incluindo demonstrações");
  const manifestoEspanhol = lerCapturasEspanhol(new URL("../", import.meta.url), curso.dados);
  for (const idioma of ["en", "es"]) {
    conferirCatalogo(curso.dados, catalogos[idioma].conteudo, idioma, idioma === "es" ? manifestoEspanhol : null);
  }
});

test("curso: inventário de capturas espanholas inclui rótulos novos sem admitir extras arbitrários", () => {
  const id = "equipe--plantao-e-capacidade--p1";
  const antigo = "Fora do expediente";
  const novo = "Plantão conforme a jornada";
  const dados = {
    versao: "1.0.0", gerado: "2026-10-26", largura: 1440, altura: 900, datas_das_fotos: ["2026-10-26"],
    modulos: [{ id: "equipe", titulo: "Equipe", resumo: "Resumo", licoes: [{ id: "plantao-e-capacidade", titulo: "Plantão", objetivo: "Objetivo", busca: ["plantão"], passos: [{ id: "p1", titulo: "Passo", texto: "Explicação", destaques: [] }] }] }],
    capturas: { [id]: { foto: `/curso/capturas/${id}.jpg`, destaques: [{ x: 10, y: 20, w: 100, h: 30, rotulo: antigo, tipo: "caixa" }], clicar: null, versao: "1.0.0", capturado_em: "2026-10-26" } },
    menu: [],
  };
  const manifesto = {
    idioma: "es", commit_fonte: "a".repeat(40), versao: "2.0.0", gerado_em: "2026-10-27T12:00:00.000Z", largura: 1440, altura: 900, falhas: [],
    capturas: { [id]: { foto: `/curso/capturas/es/${id}.jpg`, destaques: [{ x: 20, y: 40, w: 120, h: 35, rotulo: novo, tipo: "caixa" }], clicar: null, versao: "2.0.0", capturado_em: "2026-10-27", commit_fonte: "a".repeat(40), idioma: "es" } },
  };
  const conteudo = Object.fromEntries(inventarioDoCurso(dados).map(({ original }) => [original, `ES: ${original}`]));
  conteudo[novo] = catalogos.es.conteudo[novo];
  assert.throws(() => conferirCatalogo(dados, conteudo, "es"), /Textos antigos/, "rótulo novo exige o manifesto correspondente");
  assert.doesNotThrow(() => conferirCatalogo(dados, conteudo, "es", manifesto));
  assert.throws(() => conferirCatalogo(dados, { ...conteudo, "Texto sem uso": "Texto sin uso" }, "es", manifesto), /Textos antigos/);
  for (const necessario of ["Equipe", antigo, novo]) {
    const incompleto = { ...conteudo };
    delete incompleto[necessario];
    assert.throws(() => conferirCatalogo(dados, incompleto, "es", manifesto), /Faltam traduções/);
  }
  const fonteMinima = fonte.replace(curso.json, () => JSON.stringify(dados));
  const html = montarCursoLocalizado(fonteMinima, "es", { ...catalogos.es, conteudo, manifestoCapturas: manifesto });
  const traduzidos = lerCurso(html).dados;
  assert.equal(traduzidos.capturas[id].destaques[0].rotulo, "Guardia según la jornada");
  assert.equal(traduzidos.capturas[id].foto, manifesto.capturas[id].foto);
  assert.equal(manifesto.capturas[id].destaques[0].rotulo, novo, "o manifesto mantém o rótulo PT para tradução");
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
    const manifestoCapturas = idioma === "es" ? lerCapturasEspanhol(new URL("../", import.meta.url), curso.dados) : null;
    const html = montarCursoLocalizado(fonte, idioma, { ...catalogos[idioma], manifestoCapturas });
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
