import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { test } from "node:test";
import { lerCapturasEspanhol } from "../lib/curso-capturas.mjs";
import { aplicarManifestoCapturas, idsDasCapturas, inventarioDoCurso, lerCurso, montarCursoLocalizado, validarManifestoCapturas, visitarTextos } from "../lib/curso-localizacao.mjs";
import { gerarCursos } from "../scripts/localizar-curso.mjs";

const ID_PASSO = "inbox--abrir--p1";
const ID_CENA = "demo-clinica--historia--chegada";
const COMMIT = "a".repeat(40);
const fotoPT = (id) => ({ foto: `/curso/capturas/${id}.jpg`, destaques: [{ x: 1, y: 2, w: 30, h: 40, rotulo: "Legenda original", tipo: "seta" }], clicar: { x: 5, y: 6, w: 7, h: 8 }, versao: "1.0.0", capturado_em: "2026-10-20" });
function dadosMinimos() {
  return {
    versao: "1.0.0", gerado: "2026-10-21", datas_das_fotos: ["2026-10-20"], largura: 1440, altura: 900,
    modulos: [{ id: "inbox", titulo: "Módulo", resumo: "Resumo", licoes: [{ id: "abrir", titulo: "Lição", objetivo: "Objetivo", busca: ["conversa"], passos: [{ id: "p1", titulo: "Passo", texto: "Explicação", destaques: [{ rotulo: "Legenda original", tipo: "seta", alvo: { testid: "conversa" } }], clicar: { testid: "abrir" } }] }] }],
    nichos: [{ id: "clinica", titulo: "Clínica", resumo: "Demonstração", jornadas: [{ id: "consulta", titulo: "Consulta", empresa: "Empresa fictícia", contexto: "Contexto", resultado: "Resultado", nota: "Nota", dependencias: "Agenda", montagem: [], cenas: [{ id: "chegada", titulo: "Chegada", cliente: "Cliente", operacao: "Operação", valor: "Valor", captura: ID_CENA }] }] }],
    capturas: { [ID_PASSO]: fotoPT(ID_PASSO), [ID_CENA]: fotoPT(ID_CENA) }, menu: [],
  };
}
function manifestoMinimo() {
  return {
    idioma: "es", commit_fonte: COMMIT, versao: "2.0.0", gerado_em: "2026-10-27T12:00:00.000Z", largura: 1440, altura: 900, falhas: [],
    capturas: Object.fromEntries([ID_PASSO, ID_CENA].map((id) => [id, { foto: `/curso/capturas/es/${id}.jpg`, destaques: [{ x: 101, y: 102, w: 130, h: 140, rotulo: "Legenda medida", tipo: "caixa" }], clicar: id === ID_PASSO ? { x: 205, y: 206, w: 207, h: 208 } : null, versao: "2.0.0", capturado_em: "2026-10-27T11:00:00.000Z", commit_fonte: COMMIT, idioma: "es" }])),
  };
}
function fonteMinima(dados = dadosMinimos()) {
  return `<html lang="pt-BR"><head><title>Curso DeskComm</title><style></style></head><body><header>
    </header><script id="dados" type="application/json">${JSON.stringify(dados)}</script><script>var progresso = "curso-deskcomm:feitos";</script></body></html>`;
}
function catalogoMinimo() {
  return {
    conteudo: { ...Object.fromEntries(inventarioDoCurso(dadosMinimos()).map(({ original }) => [original, `ES: ${original}`])), "Legenda medida": "Leyenda medida" },
    interface: {}, internos: ["curso-deskcomm:feitos"],
  };
}
function pastaTemporaria(t) {
  const raiz = mkdtempSync(join(tmpdir(), "curso-capturas-"));
  t.after(() => rmSync(raiz, { recursive: true, force: true }));
  return raiz;
}
function gravar(raiz, caminho, conteudo) {
  const arquivo = join(raiz, caminho);
  mkdirSync(dirname(arquivo), { recursive: true });
  writeFileSync(arquivo, conteudo);
}
function gravarManifesto(raiz, manifesto = manifestoMinimo()) {
  gravar(raiz, "conteudo/curso/es/capturas.json", JSON.stringify(manifesto));
}
function gravarFotos(raiz) {
  for (const id of [ID_PASSO, ID_CENA]) gravar(raiz, `public/curso/capturas/es/${id}.jpg`, Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
}

test("capturas: sem manifesto o espanhol mantém fotos, metadados e aviso de português", () => {
  const fonte = fonteMinima();
  const html = montarCursoLocalizado(fonte, "es", catalogoMinimo());
  const depois = lerCurso(html).dados;
  assert.equal(depois.capturas[ID_PASSO].foto, dadosMinimos().capturas[ID_PASSO].foto);
  assert.deepEqual(depois.capturas[ID_PASSO].clicar, dadosMinimos().capturas[ID_PASSO].clicar);
  assert.equal(depois.versao, "1.0.0");
  assert.deepEqual(depois.datas_das_fotos, ["2026-10-20"]);
  assert.match(html, /Las capturas muestran la interfaz original en portugués/);
});

test("capturas: manifesto completo substitui fotos e geometria antes da tradução, preservando aulas e progresso", () => {
  const fonte = fonteMinima();
  const manifesto = manifestoMinimo();
  const antes = structuredClone(manifesto);
  const html = montarCursoLocalizado(fonte, "es", { ...catalogoMinimo(), manifestoCapturas: manifesto });
  const depois = lerCurso(html).dados;
  assert.deepEqual(depois.capturas[ID_PASSO], { ...manifesto.capturas[ID_PASSO], destaques: [{ ...manifesto.capturas[ID_PASSO].destaques[0], rotulo: "Leyenda medida" }] });
  assert.equal(depois.capturas[ID_CENA].clicar, null, "não herda o alvo de clique da foto em português");
  assert.equal(depois.versao, "2.0.0");
  assert.deepEqual(depois.datas_das_fotos, ["2026-10-27"]);
  const semTextos = (dados) => visitarTextos(structuredClone(dados), () => "");
  assert.deepEqual(semTextos(depois).modulos, semTextos(dadosMinimos()).modulos);
  assert.deepEqual(semTextos(depois).nichos, semTextos(dadosMinimos()).nichos);
  assert.equal(lerCurso(html).programa, lerCurso(fonte).programa);
  assert.match(html, /link\.dataset\.idiomaCurso \+ location\.hash/);
  assert.match(html, /las capturas de la interfaz están en español/);
  assert.doesNotMatch(html, /Las capturas muestran la interfaz original en portugués/);
  assert.deepEqual(manifesto, antes, "traduzir não altera o manifesto original");
  assert.deepEqual(lerCurso(fonte).dados, dadosMinimos(), "não altera a fonte canônica");
  assert.throws(() => montarCursoLocalizado(fonte, "en", { ...catalogoMinimo(), manifestoCapturas: manifesto }), /só podem substituir.* es/);
});

test("capturas: legendas novas do manifesto também exigem tradução revisada", () => {
  const catalogo = catalogoMinimo();
  delete catalogo.conteudo["Legenda medida"];
  assert.throws(() => montarCursoLocalizado(fonteMinima(), "es", { ...catalogo, manifestoCapturas: manifestoMinimo() }), /Tradução ausente em capturas\//);
});

test("capturas: atualização incremental preserva origem e deriva versão/data de cada foto", () => {
  const manifesto = manifestoMinimo();
  Object.assign(manifesto.capturas[ID_CENA], { commit_fonte: "b".repeat(40), versao: "1.9.0", capturado_em: "2026-10-26" });
  manifesto.largura = 1600;
  manifesto.altura = 1000;
  const dados = aplicarManifestoCapturas(dadosMinimos(), manifesto);
  assert.equal(dados.versao, "1.9.0 / 2.0.0");
  assert.deepEqual(dados.datas_das_fotos, ["2026-10-26", "2026-10-27"]);
  assert.equal(dados.capturas[ID_CENA].commit_fonte, "b".repeat(40));
  assert.equal(dados.largura, 1600);
  assert.equal(dados.altura, 1000);
  assert.equal(dados.gerado, dadosMinimos().gerado, "a data editorial não se confunde com a data das fotos");
});

test("capturas: valida o conjunto exato, incluindo cenas de demonstração", () => {
  assert.deepEqual(idsDasCapturas(dadosMinimos()), [ID_CENA, ID_PASSO]);
  for (const remover of [ID_PASSO, ID_CENA]) {
    const manifesto = manifestoMinimo();
    delete manifesto.capturas[remover];
    assert.throws(() => validarManifestoCapturas(dadosMinimos(), manifesto), /IDs divergentes \(1 ausentes, 0 extras\)/);
  }
  const manifesto = manifestoMinimo();
  manifesto.capturas.obsoleta = structuredClone(manifesto.capturas[ID_PASSO]);
  assert.throws(() => validarManifestoCapturas(dadosMinimos(), manifesto), /IDs divergentes \(0 ausentes, 1 extras\)/);
});

test("capturas: rejeita idioma, origem, data ou falhas inválidos no conjunto e em cada foto", () => {
  const casos = [
    [(m) => { m.idioma = "pt-BR"; }, /idioma deve ser es/],
    [(m) => { m.commit_fonte = "abc123"; }, /commit_fonte/],
    [(m) => { m.versao = "atual"; }, /versao/],
    [(m) => { m.gerado_em = "2026-10-27"; }, /gerado_em/],
    [(m) => { m.gerado_em = "2026-02-31T00:00:00Z"; }, /gerado_em/],
    [(m) => { m.falhas = ["captura interrompida"]; }, /falhas/],
    [(m) => { delete m.falhas; }, /falhas/],
    [(m) => { m.capturas[ID_PASSO].idioma = "en"; }, /idioma deve ser es/],
    [(m) => { delete m.capturas[ID_PASSO].commit_fonte; }, /commit_fonte/],
    [(m) => { m.capturas[ID_PASSO].versao = ""; }, /versao/],
    [(m) => { m.capturas[ID_PASSO].capturado_em = "2026-02-31"; }, /capturado_em/],
  ];
  for (const [alterar, erro] of casos) {
    const manifesto = manifestoMinimo();
    alterar(manifesto);
    assert.throws(() => validarManifestoCapturas(dadosMinimos(), manifesto), erro);
  }
});

test("capturas: caminhos só aceitam o arquivo espanhol correspondente ao ID", () => {
  for (const foto of [`/curso/capturas/${ID_PASSO}.jpg`, `/curso/capturas/es/../${ID_PASSO}.jpg`, `/curso/capturas/es/%2e%2e/${ID_PASSO}.jpg`, `/curso/capturas/es/${ID_CENA}.jpg`, `/curso/capturas/es/${ID_PASSO}.jpg?idioma=es`, `https://externo.test/${ID_PASSO}.jpg`]) {
    const manifesto = manifestoMinimo();
    manifesto.capturas[ID_PASSO].foto = foto;
    assert.throws(() => validarManifestoCapturas(dadosMinimos(), manifesto), /caminho espanhol/);
  }
});

test("capturas: geometria inválida ou incompleta nunca reaproveita coordenadas em português", () => {
  const casos = [
    (m) => { m.largura = 0; },
    (m) => { m.altura = 900.5; },
    (m) => { delete m.capturas[ID_PASSO].clicar; },
    (m) => { m.capturas[ID_PASSO].clicar.w = 0; },
    (m) => { m.capturas[ID_PASSO].clicar.x = -1; },
    (m) => { m.capturas[ID_PASSO].clicar.x = 1400; },
    (m) => { m.capturas[ID_PASSO].destaques[0].y = Infinity; },
    (m) => { m.capturas[ID_PASSO].destaques[0].h = 900; },
    (m) => { m.capturas[ID_PASSO].destaques[0].rotulo = " "; },
    (m) => { m.capturas[ID_PASSO].destaques[0].tipo = "alvo"; },
    (m) => { delete m.capturas[ID_PASSO].destaques; },
  ];
  for (const alterar of casos) {
    const manifesto = manifestoMinimo();
    alterar(manifesto);
    assert.throws(() => validarManifestoCapturas(dadosMinimos(), manifesto), /Manifesto de capturas em espanhol inválido/);
  }
});

test("capturas: leitura opcional exige manifesto completo e fotos existentes, regulares e não vazias", (t) => {
  const raiz = pastaTemporaria(t);
  assert.equal(lerCapturasEspanhol(raiz), null, "sem manifesto não exige a fonte nem muda o curso");
  gravar(raiz, "public/curso/index.html", fonteMinima());
  gravarManifesto(raiz);
  assert.throws(() => lerCapturasEspanhol(raiz), /Captura em espanhol ausente/);
  gravarFotos(raiz);
  assert.deepEqual(lerCapturasEspanhol(raiz), manifestoMinimo());
  gravar(raiz, `public/curso/capturas/es/${ID_CENA}.jpg`, "");
  assert.throws(() => lerCapturasEspanhol(raiz), /Captura em espanhol ausente ou inválida/);
  rmSync(join(raiz, `public/curso/capturas/es/${ID_CENA}.jpg`));
  mkdirSync(join(raiz, `public/curso/capturas/es/${ID_CENA}.jpg`));
  assert.throws(() => lerCapturasEspanhol(raiz), /Captura em espanhol ausente ou inválida/);
  gravar(raiz, "conteudo/curso/es/capturas.json", "{");
  assert.throws(() => lerCapturasEspanhol(raiz), SyntaxError, "JSON inválido não é tratado como manifesto ausente");
});

test("capturas: gerador integra o conjunto espanhol e mantém português no inglês", async (t) => {
  const raiz = pastaTemporaria(t);
  gravar(raiz, "public/curso/index.html", fonteMinima());
  const catalogo = catalogoMinimo();
  gravar(raiz, "conteudo/curso/interface-interna.json", JSON.stringify(catalogo.internos));
  for (const idioma of ["en", "es"]) {
    gravar(raiz, `conteudo/curso/${idioma}/parte-1.json`, JSON.stringify(catalogo.conteudo));
    gravar(raiz, `conteudo/curso/${idioma}/interface.json`, "{}");
  }
  const urlRaiz = pathToFileURL(raiz + "/");
  const pagina = (idioma) => readFileSync(join(raiz, `public/curso/${idioma}/index.html`), "utf8");
  gravarManifesto(raiz);
  await assert.rejects(() => gerarCursos(urlRaiz), /Captura em espanhol ausente/);
  assert.equal(existsSync(join(raiz, "public/curso/pt-BR/index.html")), false, "valida os arquivos antes de gerar qualquer idioma");
  rmSync(join(raiz, "conteudo/curso/es/capturas.json"));
  await gerarCursos(urlRaiz);
  assert.match(pagina("es"), /Las capturas muestran la interfaz original en portugués/);
  gravarManifesto(raiz);
  gravarFotos(raiz);
  await gerarCursos(urlRaiz);
  assert.equal(lerCurso(pagina("es")).dados.capturas[ID_PASSO].foto, manifestoMinimo().capturas[ID_PASSO].foto);
  assert.match(pagina("es"), /las capturas de la interfaz están en español/);
  assert.equal(lerCurso(pagina("en")).dados.capturas[ID_PASSO].foto, fotoPT(ID_PASSO).foto);
  assert.match(pagina("en"), /Screenshots show the original Portuguese interface/);
  assert.deepEqual(lerCurso(pagina("pt-BR")).dados, dadosMinimos());
});
