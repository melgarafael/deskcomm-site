import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { IDIOMAS_CURSO, montarCursoLocalizado } from "../lib/curso-localizacao.mjs";

const raiz = new URL("../", import.meta.url);
const lerJson = async (caminho) => JSON.parse(await readFile(new URL(caminho, raiz), "utf8"));
const fonte = await readFile(new URL("public/curso/index.html", raiz), "utf8");
const internos = await lerJson("conteudo/curso/interface-interna.json");
for (const idioma of IDIOMAS_CURSO) {
  const conteudo = {};
  let ui = {};
  if (idioma !== "pt-BR") {
    const pasta = `conteudo/curso/${idioma}/`;
    const partes = (await readdir(new URL(pasta, raiz))).filter((n) => /^parte-\d+\.json$/.test(n)).sort();
    if (!partes.length) throw new Error(`Catálogo de ${idioma} não encontrado.`);
    for (const parte of partes) {
      const textos = await lerJson(`${pasta}${parte}`);
      for (const [original, traducao] of Object.entries(textos)) {
        if (Object.hasOwn(conteudo, original)) throw new Error(`Tradução duplicada: ${original.slice(0, 90)}`);
        conteudo[original] = traducao;
      }
    }
    ui = await lerJson(`${pasta}interface.json`);
  }
  const html = montarCursoLocalizado(fonte, idioma, { conteudo, interface: ui, internos });
  const saida = new URL(`public/curso/${idioma}/`, raiz);
  await mkdir(saida, { recursive: true });
  await writeFile(new URL("index.html", saida), html);
  process.stdout.write(`Curso ${idioma}: ${Object.keys(conteudo).length} textos, ${Buffer.byteLength(html)} bytes.\n`);
}
