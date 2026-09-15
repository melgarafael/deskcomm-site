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
  | { t: "citacao"; blocos: Bloco[] };

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

function separarSecoes(linhas: string[]): { introducao: Bloco[]; secoes: Secao[] } {
  const intro: string[] = [];
  const secoes: { titulo: string; linhas: string[] }[] = [];
  for (const linha of linhas) {
    const m = /^###\s+(.+?)\s*$/.exec(linha);
    if (m) secoes.push({ titulo: m[1], linhas: [] });
    else if (secoes.length) secoes[secoes.length - 1].linhas.push(linha);
    else intro.push(linha);
  }

  // `### Corrigido` duas vezes na mesma versão (1.6.0) vira uma seção só.
  const fundidas: Secao[] = [];
  for (const s of secoes) {
    const titulo = s.titulo.replace(/^⚠️?\s*/u, "").trim();
    const blocos = interpretarBlocos(s.linhas);
    const existente = fundidas.find((f) => f.titulo === titulo);
    if (existente) existente.blocos.push(...blocos);
    else fundidas.push({ titulo, tipo: tipoDaSecao(titulo), blocos });
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

  // `**Título** corpo` (robô) e `**Título.** corpo` (manual). O título pode ter atravessado linhas:
  // o parágrafo já chega com as linhas unidas.
  const m = /^\*\*(.+?)\*\*\s*(.*)$/.exec(primeiro.texto);
  if (!m) return { titulo: null, blocos };
  const titulo = m[1].trim().replace(/[.:]$/, "");
  const resto = m[2].trim();
  return { titulo, blocos: resto ? [{ t: "p", texto: resto }, ...blocos.slice(1)] : blocos.slice(1) };
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

/** Itens com título de uma seção — o que a listagem mostra. */
export function titulosDaSecao(s: Secao): string[] {
  const titulos: string[] = [];
  for (const b of s.blocos) if (b.t === "lista") for (const it of b.itens) titulos.push(textoSimples(it.titulo ?? primeiroParagrafo(it)));
  return titulos.filter(Boolean);
}

export function contarItens(s: Secao): number {
  return s.blocos.reduce((n, b) => n + (b.t === "lista" ? b.itens.length : 0), 0);
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
