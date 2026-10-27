import { lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { lerCurso, validarManifestoCapturas } from "./curso-localizacao.mjs";

/** A home e o gerador passam pela mesma validação, inclusive a presença das fotos. */
export function lerCapturasEspanhol(raiz = process.cwd(), dados) {
  const pasta = raiz instanceof URL ? fileURLToPath(raiz) : raiz;
  let texto;
  try {
    texto = readFileSync(join(pasta, "conteudo/curso/es/capturas.json"), "utf8");
  } catch (erro) {
    if (erro.code === "ENOENT") return null;
    throw erro;
  }
  const manifesto = JSON.parse(texto);
  const fonte = dados ?? lerCurso(readFileSync(join(pasta, "public/curso/index.html"), "utf8")).dados;
  validarManifestoCapturas(fonte, manifesto);
  for (const [id, captura] of Object.entries(manifesto.capturas)) {
    let arquivo;
    try {
      arquivo = lstatSync(join(pasta, "public", captura.foto));
    } catch (erro) {
      if (erro.code !== "ENOENT") throw erro;
    }
    if (!arquivo?.isFile() || !arquivo.size) throw new Error(`Captura em espanhol ausente ou inválida: ${id} (${captura.foto})`);
  }
  return manifesto;
}
