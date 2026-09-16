/**
 * O CHANGELOG do produto, lido e estruturado para as páginas de versões.
 *
 * ── A fonte ─────────────────────────────────────────────────────────────────
 * O `CHANGELOG.md` da `main` do DeskcommCRM. É ele — e não a lista de Releases do
 * GitHub — porque o CHANGELOG é a tela que o operador da VPS lê antes de atualizar
 * (`docs/doctrine/versionamento.md`), e porque as Releases têm buracos medidos em
 * 2026-09-15: a v1.20.0 teve a tag criada à mão e nenhuma Release publicada.
 * Tudo que tem seção no CHANGELOG aparece aqui.
 *
 * ── O formato ───────────────────────────────────────────────────────────────
 * Desde a 1.8.0 a seção é montada por robô (`lib/release/montar-secao.ts` no
 * produto): `## [X.Y.Z] — AAAA-MM-DD`, `### Adicionado|Alterado|Corrigido`
 * (e `### ⚠️ Requer atenção` primeiro), itens `- **Título** corpo`. As versões
 * escritas à mão (1.0.0–1.7.0) fogem disso, e o leitor aceita todas as fugas
 * medidas: prosa antes do primeiro `###`, títulos por domínio na 1.0.0,
 * `### Corrigido` repetido na 1.6.0, negrito que atravessa linhas, citação `>`,
 * bloco de código indentado, subitens e o rodapé de referências de link.
 *
 * ── Quando falha ────────────────────────────────────────────────────────────
 * `lerChangelog()` LANÇA se o GitHub não responder ou se o arquivo vier sem
 * versões. É de propósito: numa regeneração em segundo plano, o Next continua
 * servindo a última página boa quando a renderização lança; e num `next build`
 * a implantação falha e a anterior continua no ar. Devolver lista vazia faria a
 * página publicar "nenhuma versão" por cima da página certa.
 */
import { cache } from "react";

export const CHANGELOG_URL = "https://raw.githubusercontent.com/melgarafael/DeskcommCRM/main/CHANGELOG.md";
export const CHANGELOG_NO_GITHUB = "https://github.com/melgarafael/DeskcommCRM/blob/main/CHANGELOG.md";

/**
 * De quanto em quanto tempo a página confere se há versão nova, em segundos.
 * Somado ao cache do raw.githubusercontent.com (5 min), uma release chega à LP
 * em até ~15 min — o passo final do `release.yml` do produto espera por isso.
 */
export const REVALIDAR_SEGUNDOS = 600;

// ── Tipos ────────────────────────────────────────────────────────────────────

export type Bloco =
  | { t: "p"; texto: string }
  | { t: "lista"; itens: Item[] }
  | { t: "codigo"; texto: string; linguagem: string }
  | { t: "citacao"; blocos: Bloco[] }
  | { t: "separador" };

/** Um item de lista. `titulo` é o `**negrito**` que abre o item, quando há. */
export type Item = { titulo: string | null; blocos: Bloco[] };

export type TipoSecao = "atencao" | "adicionado" | "alterado" | "corrigido" | "seguranca" | "outro";

export type Secao = { titulo: string; tipo: TipoSecao; blocos: Bloco[] };

export type Salto = "major" | "minor" | "patch";

export type Versao = {
  versao: string;
  /** AAAA-MM-DD do cabeçalho: o dia (UTC) em que a versão foi montada. */
  data: string;
  /** Salto em relação à versão anterior do próprio CHANGELOG. */
  salto: Salto;
  /** Texto antes do primeiro `###` (versões escritas à mão). */
  introducao: Bloco[];
  secoes: Secao[];
  /** Âncora do cabeçalho no CHANGELOG.md renderizado pelo GitHub. */
  ancoraGithub: string;
};

// ── Leitura ──────────────────────────────────────────────────────────────────

export const lerChangelog = cache(async (): Promise<Versao[]> => {
  const r = await fetch(CHANGELOG_URL, { next: { revalidate: REVALIDAR_SEGUNDOS } });
  if (!r.ok) throw new Error(`CHANGELOG indisponível: ${CHANGELOG_URL} respondeu ${r.status}`);
  const versoes = interpretarChangelog(await r.text());
  if (versoes.length === 0) throw new Error("CHANGELOG sem nenhuma seção de versão — formato mudou?");
  return versoes;
});

export async function lerVersao(versao: string): Promise<{ atual: Versao; anterior: Versao | null; proxima: Versao | null } | null> {
  const todas = await lerChangelog();
  const i = todas.findIndex((v) => v.versao === versao);
  if (i === -1) return null;
  // A lista é da mais nova para a mais antiga: a "anterior" é a de índice maior.
  return { atual: todas[i], anterior: todas[i + 1] ?? null, proxima: todas[i - 1] ?? null };
}

// ── Interpretação ────────────────────────────────────────────────────────────

const CABECALHO_VERSAO = /^## \[(\d+\.\d+\.\d+)\]\s*[—–-]\s*(\d{4}-\d{2}-\d{2})\s*$/;
const CABECALHO_QUALQUER = /^## /;
const REFERENCIA_DE_LINK = /^\[[^\]]+\]:\s+https?:\/\//;

export function interpretarChangelog(md: string): Versao[] {
  const linhas = md.replace(/\r\n?/g, "\n").split("\n");
  const brutas: { versao: string; data: string; cabecalho: string; linhas: string[] }[] = [];
  let atual: (typeof brutas)[number] | null = null;

  for (const linha of linhas) {
    if (REFERENCIA_DE_LINK.test(linha)) {
      atual = null; // o rodapé de referências encerra a última seção
      continue;
    }
    if (CABECALHO_QUALQUER.test(linha)) {
      const m = CABECALHO_VERSAO.exec(linha);
      // `## [Não lançado]` e qualquer outro `##` encerram a seção corrente e não abrem versão.
      atual = m ? { versao: m[1], data: m[2], cabecalho: linha.slice(3), linhas: [] } : null;
      if (atual) brutas.push(atual);
      continue;
    }
    if (atual) atual.linhas.push(linha);
  }

  const versoes = brutas.map(({ versao, data, cabecalho, linhas: corpo }) => {
    const { introducao, secoes } = separarSecoes(corpo);
    return { versao, data, salto: "patch" as Salto, introducao, secoes, ancoraGithub: ancoraDoGithub(cabecalho) };
  });

  versoes.forEach((v, i) => {
    v.salto = saltoEntre(versoes[i + 1]?.versao ?? null, v.versao);
  });
  return versoes;
}

const CABECALHO_DE_SECAO = /^###\s+(.+?)\s*$/;
/** Uma linha que é só um negrito: `**⚠️ Requer atenção**`. */
const SO_NEGRITO = /^\*\*(.+?)\*\*\s*$/;

/** O título de uma seção sem o `⚠️` do formato do robô — é por ele que `### Corrigido` repetido funde. */
function normalizarTituloDeSecao(titulo: string): string {
  return titulo.replace(/^⚠️?\s*/u, "").trim();
}

/**
 * A linha abre uma seção? `###` sempre; um negrito sozinho, quando ele nomeia uma seção conhecida.
 *
 * A 1.1.0 e a 1.2.0 escrevem `**⚠️ Requer atenção**` DENTRO de `### Alterado` e de `### Segurança`,
 * e lido como corpo o aviso não ganhava seção, nem h2, nem chip: a 1.2.0 mostrava só "Adicionado 26
 * · Corrigido 19 · Segurança 5", e o aviso escondido ali é o das 51 migrations de banco. Pior que o
 * silêncio seria o carimbo errado: qualquer parágrafo em negrito depois dele viraria uma entrada de
 * "Segurança". Medido no CHANGELOG da `main`: das 12 linhas que são só negrito, estas 2 são as
 * únicas que nomeiam uma seção — `**Atendimento**` e `**Escolher a sua IA**` (1.2.0) continuam
 * abrindo lista, e o `**Versão de segurança. Se você roda…**` da 1.2.1 continua parágrafo.
 */
function tituloDaSecao(linha: string): string | null {
  const cabecalho = CABECALHO_DE_SECAO.exec(linha);
  if (cabecalho) return normalizarTituloDeSecao(cabecalho[1]);
  const negrito = SO_NEGRITO.exec(linha);
  if (!negrito) return null;
  const titulo = normalizarTituloDeSecao(negrito[1].trim().replace(/[.:]$/, ""));
  return tipoDaSecao(titulo) === "outro" ? null : titulo;
}

function separarSecoes(linhas: string[]): { introducao: Bloco[]; secoes: Secao[] } {
  const intro: string[] = [];
  const secoes: { titulo: string; linhas: string[] }[] = [];
  for (const linha of linhas) {
    const titulo = tituloDaSecao(linha);
    if (titulo) secoes.push({ titulo, linhas: [] });
    else if (secoes.length) secoes[secoes.length - 1].linhas.push(linha);
    else intro.push(linha);
  }

  // `### Corrigido` duas vezes na mesma versão (1.6.0) vira uma seção só.
  const fundidas: Secao[] = [];
  for (const s of secoes) {
    const blocos = interpretarBlocos(s.linhas);
    const existente = fundidas.find((f) => f.titulo === s.titulo);
    if (existente) existente.blocos.push(...blocos);
    else fundidas.push({ titulo: s.titulo, tipo: tipoDaSecao(s.titulo), blocos });
  }

  // "Requer atenção" vem sempre primeiro — nas versões manuais ela aparecia em qualquer posição.
  fundidas.sort((a, b) => Number(b.tipo === "atencao") - Number(a.tipo === "atencao"));
  return { introducao: interpretarBlocos(intro), secoes: fundidas };
}

export function tipoDaSecao(titulo: string): TipoSecao {
  const t = titulo.toLowerCase();
  if (t.includes("requer atenção")) return "atencao";
  if (t === "adicionado") return "adicionado";
  if (t === "alterado") return "alterado";
  if (t === "corrigido") return "corrigido";
  if (t === "segurança") return "seguranca";
  return "outro";
}

const INICIO_DE_ITEM = /^- /;
const CERCA = /^```(.*)$/;
/** `---`, `***`, `___` (com ou sem espaços entre os sinais). Sem este ramo, a linha virava um parágrafo "---" (1.10.0). */
const SEPARADOR = /^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/;

/** Blocos de um trecho já sem a indentação do contêiner. */
export function interpretarBlocos(linhas: string[]): Bloco[] {
  const blocos: Bloco[] = [];
  let i = 0;

  while (i < linhas.length) {
    const linha = linhas[i];

    if (linha.trim() === "") {
      i++;
      continue;
    }

    if (SEPARADOR.test(linha)) {
      blocos.push({ t: "separador" });
      i++;
      continue;
    }

    const cerca = CERCA.exec(linha);
    if (cerca) {
      const corpo: string[] = [];
      i++;
      while (i < linhas.length && !/^```\s*$/.test(linhas[i])) corpo.push(linhas[i++]);
      i++; // a cerca de fechamento
      blocos.push({ t: "codigo", texto: corpo.join("\n"), linguagem: cerca[1].trim() });
      continue;
    }

    if (linha.startsWith(">")) {
      const corpo: string[] = [];
      while (i < linhas.length && linhas[i].startsWith(">")) corpo.push(linhas[i++].replace(/^> ?/, ""));
      blocos.push({ t: "citacao", blocos: interpretarBlocos(corpo) });
      continue;
    }

    if (INICIO_DE_ITEM.test(linha)) {
      const itens: Item[] = [];
      while (i < linhas.length && INICIO_DE_ITEM.test(linhas[i])) {
        const corpo = [linhas[i].slice(2)];
        i++;
        while (i < linhas.length) {
          const l = linhas[i];
          if (l.startsWith("  ")) corpo.push(l.slice(2));
          else if (l.trim() === "") {
            // Linha em branco continua o item só se a próxima não vazia estiver indentada.
            let j = i;
            while (j < linhas.length && linhas[j].trim() === "") j++;
            if (j < linhas.length && linhas[j].startsWith("  ")) corpo.push("");
            else break;
          } else if (!INICIO_DE_ITEM.test(l) && !l.startsWith(">") && !CERCA.test(l) && corpo[corpo.length - 1] !== "") {
            corpo.push(l); // continuação preguiçosa, sem indentação
          } else break;
          i++;
        }
        itens.push(interpretarItem(corpo));
        while (i < linhas.length && linhas[i].trim() === "" && INICIO_DE_ITEM.test(linhas[i + 1] ?? "")) i++;
      }
      blocos.push({ t: "lista", itens });
      continue;
    }

    const paragrafo: string[] = [];
    while (i < linhas.length && linhas[i].trim() !== "" && !INICIO_DE_ITEM.test(linhas[i]) && !CERCA.test(linhas[i]) && !linhas[i].startsWith(">")) {
      paragrafo.push(linhas[i++].trim());
    }
    blocos.push({ t: "p", texto: paragrafo.join(" ") });
  }

  return blocos;
}

function interpretarItem(corpo: string[]): Item {
  const blocos = interpretarBlocos(corpo);
  const primeiro = blocos[0];
  if (primeiro?.t !== "p") return { titulo: null, blocos };

  const separado = separarTitulo(primeiro.texto);
  if (!separado) return { titulo: null, blocos };
  const { titulo, resto } = separado;
  return { titulo, blocos: resto ? [{ t: "p", texto: resto }, ...blocos.slice(1)] : blocos.slice(1) };
}

/**
 * O que fecha o título quando a pontuação não está dentro do negrito: travessão, en-dash ou
 * dois-pontos abrindo o corpo — `**Tempo adaptativo** — a IA escolhe o intervalo` —, com um
 * localizador entre parênteses opcional antes dele — `**Tela de Execuções** (Agente de IA →
 * Execuções): o que a IA fez`, `**Índice de Atrito** (Desempenho) — o sistema passa a medir`.
 *
 * O parêntese sozinho NÃO fecha, e é por isso que ele não está na classe de caracteres: em
 * `**O instalador pergunta qual IA vai atender** (OpenRouter, Anthropic ou OpenAI) e valida a
 * chave na hora` a frase continua DEPOIS do parêntese. Medido no CHANGELOG da `main`: dos 5
 * corpos que começam por `(`, 3 seguem com `:`/travessão (título) e 2 seguem com `,`/`e`
 * (frase que continua).
 */
const SEPARA_TITULO_DO_CORPO = /^(?:\([^)]*\)\s*)?[—–:]/u;

/**
 * `**Título** Corpo` (robô) e `**Título.** corpo` (manual) → título e corpo. O título pode ter
 * atravessado linhas: o parágrafo já chega com as linhas unidas.
 *
 * O negrito só é título quando fecha a frase: corpo vazio, negrito terminado em pontuação, corpo
 * que abre frase nova (maiúscula, número, aspas, código) ou corpo que abre com separador
 * (`SEPARA_TITULO_DO_CORPO`). Fora disso o negrito é o começo de uma frase que continua —
 * `**Excluir um canal** apagava o roteador`, `**Chamada perdida vira aviso na Central**, com o
 * número` — e parti-lo deixava um título solto e um parágrafo que começa por minúscula ou
 * vírgula. Aí devolve `null` e o parágrafo fica inteiro.
 *
 * Exigir só a pontuação dentro do negrito custou caro na primeira versão desta regra: as versões
 * escritas à mão dão o título no estilo `**Título** — corpo`, e 42 cartões de topo perderam o
 * `titulo` de uma vez (36 deles na 1.2.0, que caiu de 49 para 13 títulos de item).
 */
function separarTitulo(texto: string): { titulo: string; resto: string } | null {
  const m = /^\*\*(.+?)\*\*\s*(.*)$/.exec(texto);
  if (!m) return null;
  const negrito = m[1].trim();
  const resto = m[2].trim();
  const fechaFrase =
    resto === "" || /[.:!?]$/.test(negrito) || /^[\p{Lu}\p{N}"“'`]/u.test(resto) || SEPARA_TITULO_DO_CORPO.test(resto);
  return fechaFrase ? { titulo: negrito.replace(/[.:]$/, ""), resto } : null;
}

// ── Auxiliares ───────────────────────────────────────────────────────────────

export function saltoEntre(anterior: string | null, atual: string): Salto {
  if (!anterior) return "major";
  const [a1, a2] = anterior.split(".").map(Number);
  const [b1, b2] = atual.split(".").map(Number);
  if (b1 !== a1) return "major";
  if (b2 !== a2) return "minor";
  return "patch";
}

/** A âncora que o GitHub gera para um título: `[1.27.2] — 2026-09-15` → `1272--2026-09-15`. */
export function ancoraDoGithub(titulo: string): string {
  return titulo
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

/**
 * As entradas de uma seção, uma por posição, cada uma pelo seu título em markdown. É o modelo
 * único do que a página CONTA (chip, h2, "Nesta versão", totais) e do que a listagem NOMEIA.
 *
 * Entrada é um item de lista de topo, ou um parágrafo de topo que abre em negrito. As versões
 * escritas à mão dão os avisos de "Requer atenção" em parágrafos assim (1.3.0, 1.4.0, 1.4.1,
 * 1.5.0): contar só itens de lista punha "Requer atenção 0" logo acima de "Leia este bloco
 * primeiro". Parágrafo em negrito seguido de lista é a abertura dela — os grupos da 1.2.0, o
 * "Se você está vindo da 1.4.0" da 1.5.0 — e quem conta são os itens. Parágrafo sem negrito,
 * citação, código e separador são corpo, não entrada.
 *
 * Corpo, mas de quê? Numa seção que não nomeia NADA, não há entrada para esses parágrafos
 * sustentarem — e o chip voltaria a dizer 0 sobre uma seção que diz alguma coisa. É o caso dos
 * avisos da 1.1.0 e da 1.2.0, prosa pura debaixo de um cabeçalho em negrito. Então: sem nenhuma
 * entrada nomeada, cada parágrafo de topo é uma entrada. O recuo é DESSA seção e só dela — a
 * 1.3.0 tem um aviso em negrito seguido de citação, código e quatro parágrafos de apoio, e
 * continua contando 1, porque ali a prosa tem a quem servir. Medido no CHANGELOG da `main`: das
 * 95 seções das 42 versões, o ramo dispara em 2 — as duas que o cabeçalho em negrito cria (1.1.0
 * e 1.2.0); nas outras 93 nenhuma entrada muda.
 *
 * Entrada que não nomeia nada depois de tirada a marcação sai daqui, e não do consumidor: o chip
 * conta `length` e a listagem imprime os títulos, e filtrar só na listagem faria o chip contar um
 * marcador que a lista não mostra. Hoje não há nenhuma (464 entradas, 0 vazias) — o filtro existe
 * para que o número e a lista continuem sendo o MESMO array quando houver.
 */
export function entradasDaSecao(s: Secao): string[] {
  const nomeadas: string[] = [];
  s.blocos.forEach((b, i) => {
    if (b.t === "lista") for (const it of b.itens) nomeadas.push(it.titulo ?? primeiroParagrafo(it));
    else if (b.t === "p" && b.texto.startsWith("**") && s.blocos[i + 1]?.t !== "lista")
      nomeadas.push(separarTitulo(b.texto)?.titulo ?? b.texto);
  });
  const comNome = nomeadas.filter((e) => textoSimples(e) !== "");
  if (comNome.length > 0) return comNome;
  return s.blocos.flatMap((b) => (b.t === "p" ? [b.texto] : [])).filter((e) => textoSimples(e) !== "");
}

/** O título de cada entrada, sem marcação — o que a listagem mostra e busca. */
export function titulosDaSecao(s: Secao): string[] {
  return entradasDaSecao(s).map((t) => textoSimples(t));
}

export function contarItens(s: Secao): number {
  return entradasDaSecao(s).length;
}

function primeiroParagrafo(it: Item): string {
  const p = it.blocos.find((b) => b.t === "p");
  return p && p.t === "p" ? p.texto : "";
}

/** Tira a marcação inline; corta em ~140 caracteres para caber numa linha de listagem. */
export function textoSimples(md: string, limite = 140): string {
  const texto = md
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return texto.length > limite ? `${texto.slice(0, limite - 1).trimEnd()}…` : texto;
}
