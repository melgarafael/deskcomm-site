import { createHash } from "node:crypto";
import { parse } from "acorn";

export const IDIOMAS_CURSO = ["pt-BR", "en", "es"];
export const CAMINHOS_CURSO = { "pt-BR": "/curso", en: "/en/course", es: "/es/curso" };

/** O HTML em português é o artefato canônico publicado pelo gerador do produto. */
export function lerCurso(html) {
  const dados = /<script id="dados" type="application\/json">([\s\S]*?)<\/script>/.exec(html);
  if (!dados) throw new Error("O curso não contém o bloco de dados esperado.");
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  const app = scripts.find((s) => !s[0].startsWith('<script id="dados"'));
  if (!app) throw new Error("O curso não contém o programa de navegação.");
  return { dados: JSON.parse(dados[1]), json: dados[1], programa: app[1], script: app[0] };
}

/** Visita só o conteúdo lido pelo aluno. Seletores, ids, ações e coordenadas ficam intactos. */
export function visitarTextos(dados, transformar) {
  const campo = (objeto, nome, contexto) => {
    if (typeof objeto?.[nome] === "string" && objeto[nome]) objeto[nome] = transformar(objeto[nome], `${contexto}/${nome}`);
  };
  for (const m of dados.modulos) {
    const base = `modulos/${m.id}`;
    for (const k of ["titulo", "resumo"]) campo(m, k, base);
    for (const l of m.licoes) {
      const lb = `${base}/licoes/${l.id}`;
      for (const k of ["titulo", "objetivo"]) campo(l, k, lb);
      l.busca = l.busca.map((t, i) => transformar(t, `${lb}/busca/${i}`));
      for (const p of l.passos) {
        for (const k of ["titulo", "texto", "dica"]) campo(p, k, `${lb}/passos/${p.id}`);
        (p.destaques ?? []).forEach((d, i) => campo(d, "rotulo", `${lb}/passos/${p.id}/destaques/${i}`));
      }
    }
  }
  for (const [id, cap] of Object.entries(dados.capturas)) {
    cap.destaques.forEach((d, i) => campo(d, "rotulo", `capturas/${id}/destaques/${i}`));
  }
  dados.menu.forEach((g, i) => {
    campo(g, "grupo", `menu/${i}`);
    g.itens.forEach((it) => { for (const k of ["rotulo", "descricao"]) campo(it, k, `menu/${i}/${it.href}`); });
  });
  for (const n of dados.nichos ?? []) {
    for (const k of ["titulo", "resumo"]) campo(n, k, `nichos/${n.id}`);
    for (const j of n.jornadas) {
      const jb = `nichos/${n.id}/${j.id}`;
      for (const k of ["titulo", "empresa", "contexto", "resultado", "nota", "dependencias"]) campo(j, k, jb);
      j.montagem.forEach((ref, i) => campo(ref, "porque", `${jb}/montagem/${i}`));
      j.cenas.forEach((c) => { for (const k of ["titulo", "cliente", "operacao", "valor"]) campo(c, k, `${jb}/cenas/${c.id}`); });
    }
  }
  return dados;
}

export function idDoTexto(texto) {
  return createHash("sha256").update(texto).digest("hex").slice(0, 16);
}

export function inventarioDoCurso(dados) {
  const textos = new Map();
  visitarTextos(structuredClone(dados), (original, contexto) => {
    if (!textos.has(original)) textos.set(original, { id: idDoTexto(original), original, contexto });
    return original;
  });
  return [...textos.values()];
}

/** Acorn permite reescrever apenas literais, sem alterar código, seletores ou rotas. */
export function literaisDoPrograma(programa) {
  const arvore = parse(programa, { ecmaVersion: "latest", sourceType: "script" });
  const encontrados = [];
  function visitar(no) {
    if (!no || typeof no !== "object") return;
    if (no.type === "Literal" && typeof no.value === "string") encontrados.push({ valor: no.value, inicio: no.start, fim: no.end });
    for (const [k, v] of Object.entries(no)) {
      if (k === "start" || k === "end") continue;
      if (Array.isArray(v)) v.forEach(visitar);
      else if (v && typeof v === "object") visitar(v);
    }
  }
  visitar(arvore);
  return encontrados;
}

/** Falha no build se uma atualização do curso ainda não tiver tradução revisada. */
export function traduzirDados(dados, catalogo) {
  return visitarTextos(structuredClone(dados), (texto, contexto) => {
    if (typeof catalogo[texto] !== "string" || !catalogo[texto].trim()) {
      throw new Error(`Tradução ausente em ${contexto}: ${texto.slice(0, 90)}`);
    }
    return catalogo[texto];
  });
}

export function traduzirPrograma(programa, catalogo, internos) {
  const permitidos = new Set(internos);
  let resultado = programa;
  for (const literal of literaisDoPrograma(programa).reverse()) {
    if (Object.hasOwn(catalogo, literal.valor)) {
      if (typeof catalogo[literal.valor] !== "string" || !catalogo[literal.valor]) throw new Error("Tradução da interface vazia.");
      resultado = resultado.slice(0, literal.inicio) + JSON.stringify(catalogo[literal.valor]).replaceAll("<", "\\u003c") + resultado.slice(literal.fim);
    } else if (!permitidos.has(literal.valor)) {
      throw new Error(`Literal novo na interface: ${literal.valor.slice(0, 120)}`);
    }
  }
  return resultado;
}

/** Inclui as fotos de passos e as fotos referenciadas pelas histórias de demonstração. */
export function idsDasCapturas(dados) {
  const ids = new Set();
  for (const modulo of dados.modulos) {
    for (const licao of modulo.licoes) {
      for (const passo of licao.passos) ids.add(`${modulo.id}--${licao.id}--${passo.id}`);
    }
  }
  for (const nicho of dados.nichos ?? []) {
    for (const jornada of nicho.jornadas) {
      for (const cena of jornada.cenas) ids.add(cena.captura);
    }
  }
  return [...ids].sort();
}

const objeto = (valor) => valor !== null && typeof valor === "object" && !Array.isArray(valor);
const SHA = /^[a-f0-9]{40}$/i;
const VERSAO = /^v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const DATA = /^\d{4}-\d{2}-\d{2}$/;
const INSTANTE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

function dataValida(valor, instante = false) {
  if (typeof valor !== "string" || !(INSTANTE.test(valor) || (!instante && DATA.test(valor)))) return false;
  const data = new Date(valor);
  return Number.isFinite(data.getTime()) && data.toISOString().slice(0, 10) === valor.slice(0, 10);
}

/** Um manifesto presente nunca pode degradar silenciosamente para fotos em português. */
export function validarManifestoCapturas(dados, manifesto) {
  const exigir = (condicao, motivo) => {
    if (!condicao) throw new Error(`Manifesto de capturas em espanhol inválido: ${motivo}`);
  };
  exigir(objeto(manifesto), "objeto esperado.");
  exigir(manifesto.idioma === "es", "idioma deve ser es.");
  exigir(typeof manifesto.commit_fonte === "string" && SHA.test(manifesto.commit_fonte), "commit_fonte deve ser um SHA de 40 caracteres.");
  exigir(typeof manifesto.versao === "string" && VERSAO.test(manifesto.versao), "versao ausente ou inválida.");
  exigir(dataValida(manifesto.gerado_em, true), "gerado_em deve ser um instante ISO-8601 UTC.");
  exigir(Number.isSafeInteger(manifesto.largura) && manifesto.largura > 0 && Number.isSafeInteger(manifesto.altura) && manifesto.altura > 0, "largura e altura devem ser inteiros positivos.");
  exigir(Array.isArray(manifesto.falhas) && manifesto.falhas.length === 0, "falhas deve ser uma lista vazia.");
  exigir(objeto(manifesto.capturas), "capturas deve ser um objeto.");
  const ids = idsDasCapturas(dados);
  const esperados = new Set(ids);
  const faltantes = ids.filter((id) => !Object.hasOwn(manifesto.capturas, id));
  const extras = Object.keys(manifesto.capturas).filter((id) => !esperados.has(id));
  exigir(!faltantes.length && !extras.length, `IDs divergentes (${faltantes.length} ausentes, ${extras.length} extras): ${[...faltantes, ...extras].slice(0, 5).join(", ")}`);
  const retangulo = (alvo, contexto) => {
    exigir(objeto(alvo) && ["x", "y", "w", "h"].every((chave) => Number.isFinite(alvo[chave])), `${contexto}: coordenadas numéricas esperadas.`);
    exigir(alvo.x >= 0 && alvo.y >= 0 && alvo.w > 0 && alvo.h > 0 && alvo.x + alvo.w <= manifesto.largura + 0.000001 && alvo.y + alvo.h <= manifesto.altura + 0.000001, `${contexto}: retângulo fora da foto.`);
  };
  for (const id of ids) {
    const captura = manifesto.capturas[id];
    exigir(/^[a-z0-9-]+$/.test(id), `ID de captura inválido: ${id}`);
    exigir(objeto(captura), `${id}: objeto esperado.`);
    exigir(captura.foto === `/curso/capturas/es/${id}.jpg`, `${id}: foto deve usar o caminho espanhol e o mesmo ID, sem parâmetros ou traversal.`);
    exigir(captura.idioma === "es", `${id}: idioma deve ser es.`);
    // Registros preservados numa atualização incremental podem ter um commit anterior.
    exigir(typeof captura.commit_fonte === "string" && SHA.test(captura.commit_fonte), `${id}: commit_fonte deve ser um SHA de 40 caracteres.`);
    exigir(typeof captura.versao === "string" && VERSAO.test(captura.versao), `${id}: versao ausente ou inválida.`);
    exigir(dataValida(captura.capturado_em), `${id}: capturado_em deve ser uma data ou instante ISO-8601 UTC.`);
    exigir(Array.isArray(captura.destaques), `${id}: destaques deve ser uma lista.`);
    captura.destaques.forEach((destaque, indice) => {
      retangulo(destaque, `${id}/destaques/${indice}`);
      exigir(typeof destaque.rotulo === "string" && destaque.rotulo.trim(), `${id}: rótulo de destaque vazio.`);
      exigir(["seta", "caixa", "numero"].includes(destaque.tipo), `${id}: tipo de destaque inválido.`);
    });
    exigir(captura.clicar === null || objeto(captura.clicar), `${id}: clicar deve ser um retângulo ou null.`);
    if (captura.clicar !== null) retangulo(captura.clicar, `${id}/clicar`);
  }
  return manifesto;
}

/** Substitui o conjunto inteiro antes de traduzir os rótulos medidos pelo capturador. */
export function aplicarManifestoCapturas(dados, manifesto) {
  validarManifestoCapturas(dados, manifesto);
  const resultado = structuredClone(dados);
  resultado.capturas = Object.fromEntries(idsDasCapturas(dados).map((id) => [id, structuredClone(manifesto.capturas[id])]));
  resultado.largura = manifesto.largura;
  resultado.altura = manifesto.altura;
  resultado.versao = [...new Set(Object.values(resultado.capturas).map((c) => c.versao))].sort().join(" / ");
  resultado.datas_das_fotos = [...new Set(Object.values(resultado.capturas).map((c) => c.capturado_em.slice(0, 10)))].sort();
  return resultado;
}

const MOLDURA = {
  "pt-BR": {
    titulo: "Curso DeskComm", descricao: "Curso em imagens do DeskComm: cada tela do sistema com fotos reais, setas e um simulador para treinar.",
    menu: "Menu do sistema", selo: "Curso", botaoMenu: "Menu", busca: "Buscar no curso", exemplo: "Buscar no curso (ex.: transferir conversa)",
    conteudo: "Conteúdo do curso", foto: "Foto ampliada", fechar: "Fechar", idioma: "Idioma do curso", aviso: "",
  },
  en: {
    titulo: "DeskComm Course", descricao: "DeskComm visual course: explore every screen with real screenshots, arrows and a practice simulator.",
    menu: "System menu", selo: "Course", botaoMenu: "Menu", busca: "Search the course", exemplo: "Search the course (e.g. transfer conversation)",
    conteudo: "Course content", foto: "Enlarged screenshot", fechar: "Close", idioma: "Course language",
    aviso: "The lessons, captions and navigation are in English. Screenshots show the original Portuguese interface; follow the numbered arrows to find each control.",
  },
  es: {
    titulo: "Curso DeskComm", descricao: "Curso visual de DeskComm: explora cada pantalla con capturas reales, flechas y un simulador para practicar.",
    menu: "Menú del sistema", selo: "Curso", botaoMenu: "Menú", busca: "Buscar en el curso", exemplo: "Buscar en el curso (p. ej., transferir conversación)",
    conteudo: "Contenido del curso", foto: "Captura ampliada", fechar: "Cerrar", idioma: "Idioma del curso",
    aviso: "Las lecciones, las leyendas y la navegación están en español. Las capturas muestran la interfaz original en portugués; sigue las flechas numeradas para encontrar cada control.",
  },
};

export const ESTILO_IDIOMAS = `
.busca { min-width: 0; }
.idiomas-curso { display:flex; gap:2px; flex-shrink:0; margin-left:auto; }
.idiomas-curso a { display:inline-flex; align-items:center; justify-content:center; min-width:36px; min-height:36px; padding:4px 6px; border-radius:5px; font:500 .75rem var(--mono); text-decoration:none; color:var(--tinta-2); }
.idiomas-curso a[aria-current] { color:var(--tinta); background:var(--oliva-suave); outline:1px solid var(--linha-forte); }
.idiomas-curso a:hover { text-decoration:underline; }
.aviso-idioma { margin:16px max(24px, env(safe-area-inset-left, 0px)) 0; max-width:900px; padding:12px 16px; border-left:3px solid var(--linha-forte); background:var(--folha); color:var(--tinta-2); font-size:.875rem; line-height:1.6; }
@media(max-width:480px) { .barra { gap:8px; padding-left:12px; padding-right:12px; } .idiomas-curso a { min-width:30px; padding:4px; } .botao-menu { padding:7px 8px; } .busca input { padding-right:12px; } .busca-atalho { display:none; } }
`;

/** As aulas e a conclusão usam os mesmos ids; trocar idioma mantém o hash e o progresso. */
export const SCRIPT_IDIOMAS = `
(function () {
  function atualizarIdiomas() {
    document.querySelectorAll('[data-idioma-curso]').forEach(function (link) {
      link.href = link.dataset.idiomaCurso + location.hash;
    });
  }
  atualizarIdiomas();
  window.addEventListener('hashchange', atualizarIdiomas);
})();`;

export function montarCursoLocalizado(html, idioma, { conteudo = {}, interface: ui = {}, internos = [], manifestoCapturas = null } = {}) {
  let moldura = MOLDURA[idioma];
  if (!moldura) throw new Error(`Idioma de curso inválido: ${idioma}`);
  const fonte = lerCurso(html);
  if (manifestoCapturas !== null && idioma !== "es") throw new Error("As capturas em espanhol só podem substituir as fotos do curso es.");
  const dadosDasFotos = manifestoCapturas === null ? fonte.dados : aplicarManifestoCapturas(fonte.dados, manifestoCapturas);
  if (manifestoCapturas !== null) moldura = { ...moldura, aviso: "Las lecciones, las leyendas, la navegación y las capturas de la interfaz están en español. Sigue las flechas numeradas para encontrar cada control." };
  const dados = idioma === "pt-BR" ? dadosDasFotos : traduzirDados(dadosDasFotos, conteudo);
  const programa = idioma === "pt-BR" ? fonte.programa : traduzirPrograma(fonte.programa, ui, internos);
  // Não deixe texto editorial encerrar o bloco de script. O programa usa esc() no DOM.
  const json = JSON.stringify(dados).replaceAll("<", "\\u003c");
  let pagina = html.replace(fonte.json, () => json).replace(fonte.script, () => `<script>${programa}</script>`);
  const original = MOLDURA["pt-BR"];
  // Só a moldura fora dos scripts é editada; ids e instruções do simulador são preservados.
  const posicao = pagina.indexOf('<script id="dados"');
  let cabeca = pagina.slice(0, posicao);
  const cauda = pagina.slice(posicao);
  for (const chave of ["descricao", "titulo", "menu", "exemplo", "busca", "conteudo", "foto"]) {
    cabeca = cabeca.replaceAll(original[chave], moldura[chave]);
  }
  cabeca = cabeca.replace('lang="pt-BR"', `lang="${idioma}"`)
    .replace('class="marca-selo">Curso<', `class="marca-selo">${moldura.selo}<`)
    .replace('aria-expanded="false">Menu</button>', `aria-expanded="false">${moldura.botaoMenu}</button>`)
    .replace('data-fechar>Fechar</button>', `data-fechar>${moldura.fechar}</button>`);
  const links = IDIOMAS_CURSO.map((i) => `<a href="${CAMINHOS_CURSO[i]}" data-idioma-curso="${CAMINHOS_CURSO[i]}" hreflang="${i}" lang="${i}" title="${i === "pt-BR" ? "Português" : i === "en" ? "English" : "Español"}"${i === idioma ? ' aria-current="page"' : ""}>${i === "pt-BR" ? "PT" : i.toUpperCase()}</a>`).join("");
  cabeca = cabeca.replace('    </header>', `      <nav class="idiomas-curso" aria-label="${moldura.idioma}">${links}</nav>\n    </header>${moldura.aviso ? `<aside class="aviso-idioma" role="note">${moldura.aviso}</aside>` : ""}`);
  const origem = "https://www.deskcomm.com.br";
  const metadados = `<link rel="canonical" href="${origem}${CAMINHOS_CURSO[idioma]}">\n` + IDIOMAS_CURSO.map((i) => `<link rel="alternate" hreflang="${i}" href="${origem}${CAMINHOS_CURSO[i]}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${origem}${CAMINHOS_CURSO.en}">`;
  cabeca = cabeca.replace('</title>', `</title>\n${metadados}`).replace('</style>', `${ESTILO_IDIOMAS}\n</style>`);
  pagina = cabeca + cauda + `<script>${SCRIPT_IDIOMAS}</script>\n`;
  return pagina;
}
