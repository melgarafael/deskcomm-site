/**
 * O catálogo de extensões do produto, lido para a página pública.
 *
 * ── A fonte ─────────────────────────────────────────────────────────────────
 * `extensoes/catalogo.json` da `main` do DeskcommCRM — o MESMO arquivo que o
 * administrador envia na tela de Extensões para instalar. Não é uma cópia mantida
 * aqui, e isso é deliberado: catálogo duplicado diverge no primeiro pacote
 * corrigido, e a vitrine passaria a anunciar uma versão que ninguém consegue
 * instalar. Uma fonte, duas saídas.
 *
 * O arquivo é gerado no produto por `scripts/gerar-catalogo-de-extensoes.ts`, que
 * valida cada pacote pelo schema real antes de publicar, e traz por entrada o
 * digest e o tamanho exatos dos bytes — os mesmos que o CRM confere ao instalar.
 *
 * ── Quando falha ────────────────────────────────────────────────────────────
 * `lerCatalogo()` LANÇA se o GitHub não responder, se o documento não tiver a
 * forma esperada ou se vier sem nenhuma extensão. Mesma disciplina do changelog:
 * numa regeneração em segundo plano o Next continua servindo a última página boa,
 * e num `next build` a implantação falha e a anterior fica no ar. Devolver lista
 * vazia publicaria "nenhuma extensão" por cima da página certa — e, numa vitrine,
 * isso não é um buraco: é um anúncio errado de que o produto não tem nada.
 */
import { cache } from "react";

export const CATALOGO_URL =
  "https://raw.githubusercontent.com/melgarafael/DeskcommCRM/main/extensoes/catalogo.json";
export const CATALOGO_NO_GITHUB =
  "https://github.com/melgarafael/DeskcommCRM/blob/main/extensoes/catalogo.json";
export const COMO_CRIAR_URL =
  "https://github.com/melgarafael/DeskcommCRM/blob/main/.agents/skills/deskcomm-extensao/SKILL.md";

/** Mesma janela do changelog: uma publicação chega à vitrine em ~15 min. */
export const REVALIDAR_SEGUNDOS = 600;

// ── Tipos ────────────────────────────────────────────────────────────────────

export type Categoria = "productivity" | "sales" | "service";

export type Extensao = {
  /** `publicador/nome` — é o que a pessoa copia para instalar. */
  id: string;
  publicador: string;
  nome: string;
  versao: string;
  titulo: string;
  resumo: string;
  categoria: Categoria;
  /** Quem publicou, afirmado pelo catálogo revisado e não pelo próprio pacote. */
  autor: string | null;
  repositorio: string | null;
  etiquetas: string[];
  /** As telas que a extensão abre, em português, já sem o prefixo técnico. */
  portas: string[];
  publicadoEm: string | null;
};

export type Catalogo = { origem: string; revisao: number; extensoes: Extensao[] };

/**
 * Nome legível de cada permissão. Espelha `lib/extensions/portas-legiveis.ts` no
 * produto — a vitrine tem de dizer as mesmas telas que o CRM mostra na hora de
 * instalar, senão a pessoa decide por uma informação e recebe outra.
 */
const NOME_DA_PORTA: Record<string, string> = {
  "navigation.tasks": "Tarefas",
  "navigation.inbox": "Conversas",
  "navigation.kanban": "Funil",
  "navigation.contacts": "Contatos",
  "navigation.agenda": "Agenda",
  "navigation.radar": "Radar",
};

// ── Leitura ──────────────────────────────────────────────────────────────────

type EntradaCrua = {
  publisher?: unknown;
  name?: unknown;
  version?: unknown;
  display?: { title?: Record<string, unknown>; summary?: Record<string, unknown>; category?: unknown };
  permissions?: unknown;
  publisher_label?: unknown;
  repository?: unknown;
  tags?: unknown;
  published_at?: unknown;
};

function texto(valor: unknown): string | null {
  return typeof valor === "string" && valor.trim() !== "" ? valor : null;
}

/** Aceita só as categorias que o contrato do produto define. */
function categoria(valor: unknown): Categoria {
  return valor === "sales" || valor === "service" ? valor : "productivity";
}

export function interpretarCatalogo(bruto: unknown): Catalogo {
  const doc = bruto as { origin?: unknown; revision?: unknown; entries?: unknown };
  if (typeof doc?.origin !== "string" || !Array.isArray(doc.entries)) {
    throw new Error("Catálogo de extensões com forma inesperada — o contrato mudou?");
  }
  const extensoes = (doc.entries as EntradaCrua[]).flatMap((e): Extensao[] => {
    const publicador = texto(e.publisher);
    const nome = texto(e.name);
    const titulo = texto(e.display?.title?.["pt-BR"]);
    if (!publicador || !nome || !titulo) return [];
    const permissoes = Array.isArray(e.permissions) ? (e.permissions as unknown[]) : [];
    return [
      {
        id: `${publicador}/${nome}`,
        publicador,
        nome,
        versao: texto(e.version) ?? "",
        titulo,
        resumo: texto(e.display?.summary?.["pt-BR"]) ?? "",
        categoria: categoria(e.display?.category),
        autor: texto(e.publisher_label),
        repositorio: texto(e.repository),
        etiquetas: Array.isArray(e.tags) ? (e.tags as unknown[]).filter((t): t is string => typeof t === "string") : [],
        portas: permissoes
          .map((p) => (typeof p === "string" ? (NOME_DA_PORTA[p] ?? null) : null))
          .filter((p): p is string => p !== null)
          .sort((a, b) => a.localeCompare(b, "pt-BR")),
        publicadoEm: texto(e.published_at),
      },
    ];
  });
  if (extensoes.length === 0) {
    throw new Error("Catálogo sem nenhuma extensão legível — formato mudou?");
  }
  return { origem: doc.origin, revisao: Number(doc.revision) || 0, extensoes };
}

export const lerCatalogo = cache(async (): Promise<Catalogo> => {
  const r = await fetch(CATALOGO_URL, { next: { revalidate: REVALIDAR_SEGUNDOS } });
  if (!r.ok) throw new Error(`Catálogo indisponível: ${CATALOGO_URL} respondeu ${r.status}`);
  return interpretarCatalogo(await r.json());
});
