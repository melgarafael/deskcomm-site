import type { Salto, TipoSecao } from "@/lib/changelog";

import type { Idioma } from "./tipos";

/**
 * Textos das páginas de changelog. O CONTEÚDO de cada versão vem do CHANGELOG.md
 * do produto e é escrito só em português — em inglês e espanhol a moldura é
 * traduzida, e a página avisa e marca o texto com `lang="pt-BR"` (é isso que faz
 * o navegador oferecer a tradução e o leitor de tela pronunciar certo).
 */
export type TextosChangelog = {
  locale: string;
  meta: { titulo: string; descricao: string; tituloVersao: string; descricaoVersao: string };
  sobretitulo: string;
  titulo: string;
  subtitulo: string;
  /** Só en/es: por que o texto está em português, e a saída. */
  aviso: { texto: string; traduzir: string } | null;
  maisRecente: string;
  lerCompleta: string;
  estatisticas: { versoes: string; mudancas: string; desde: string };
  filtros: { rotulo: string; todas: string; busca: string; nenhuma: string; limpar: string; resultado: (n: number) => string };
  secoes: Record<Exclude<TipoSecao, "outro">, string>;
  saltos: Record<Salto, string>;
  itens: (n: number) => string;
  mais: (n: number) => string;
  versao: (v: string) => string;
  nestaVersao: string;
  todasAsVersoes: string;
  anterior: string;
  proxima: string;
  verNoGithub: string;
  atencao: string;
  introducao: string;
  voltar: string;
  linkDoItem: string;
  migalha: string;
};

const pt: TextosChangelog = {
  locale: "pt-BR",
  meta: {
    titulo: "Changelog — DeskcommCRM",
    descricao: "Todas as versões do DeskcommCRM: o que ganhou, o que mudou, o que foi corrigido e o que pede atenção antes de atualizar.",
    tituloVersao: "Versão {v} — Changelog do DeskcommCRM",
    descricaoVersao: "O que mudou na versão {v} do DeskcommCRM, publicada em {d}.",
  },
  sobretitulo: "Changelog",
  titulo: "Tudo o que mudou no DeskcommCRM, versão por versão.",
  subtitulo:
    "Cada versão conta o que ganhou, o que mudou e o que foi corrigido — e, quando é o caso, o que você precisa fazer antes de atualizar a sua instalação.",
  aviso: null,
  maisRecente: "Versão mais recente",
  lerCompleta: "Ler a versão completa",
  estatisticas: { versoes: "versões publicadas", mudancas: "mudanças descritas", desde: "primeira versão" },
  filtros: {
    rotulo: "Filtrar por tipo de mudança",
    todas: "Todas",
    busca: "Buscar nas versões — ex.: WhatsApp, agenda, instalação",
    nenhuma: "Nenhuma versão encontrada com esse filtro.",
    limpar: "Limpar filtros",
    resultado: (n) => (n === 1 ? "1 versão" : `${n} versões`),
  },
  secoes: { atencao: "Requer atenção", adicionado: "Adicionado", alterado: "Alterado", corrigido: "Corrigido", seguranca: "Segurança" },
  saltos: { major: "Grande mudança", minor: "Novidades", patch: "Ajustes" },
  itens: (n) => (n === 1 ? "1 item" : `${n} itens`),
  mais: (n) => `e mais ${n}`,
  versao: (v) => `Versão ${v}`,
  nestaVersao: "Nesta versão",
  todasAsVersoes: "Todas as versões",
  anterior: "Versão anterior",
  proxima: "Versão seguinte",
  verNoGithub: "Ver no GitHub",
  atencao: "Esta versão pede uma ação sua antes ou depois de atualizar. Leia este bloco primeiro.",
  introducao: "Sobre esta versão",
  voltar: "Voltar para todas as versões",
  linkDoItem: "Link para este item",
  migalha: "Caminho da página",
};

const en: TextosChangelog = {
  locale: "en-US",
  meta: {
    titulo: "Changelog — DeskcommCRM",
    descricao: "Every DeskcommCRM release: what was added, what changed, what was fixed and what needs your attention before updating.",
    tituloVersao: "Version {v} — DeskcommCRM changelog",
    descricaoVersao: "What changed in DeskcommCRM version {v}, released on {d}.",
  },
  sobretitulo: "Changelog",
  titulo: "Everything that changed in DeskcommCRM, release by release.",
  subtitulo:
    "Each release tells you what was added, what changed and what was fixed — and, when it matters, what you need to do before updating your installation.",
  aviso: {
    texto:
      "The release notes are written in Portuguese, the language DeskcommCRM is built in. Your browser can translate them, or you can open this page already translated.",
    traduzir: "Open in Google Translate",
  },
  maisRecente: "Latest release",
  lerCompleta: "Read the full release",
  estatisticas: { versoes: "releases", mudancas: "changes described", desde: "first release" },
  filtros: {
    rotulo: "Filter by type of change",
    todas: "All",
    busca: "Search releases — e.g. WhatsApp, agenda, instalação",
    nenhuma: "No release matches this filter.",
    limpar: "Clear filters",
    resultado: (n) => (n === 1 ? "1 release" : `${n} releases`),
  },
  secoes: { atencao: "Action required", adicionado: "Added", alterado: "Changed", corrigido: "Fixed", seguranca: "Security" },
  saltos: { major: "Major", minor: "New features", patch: "Fixes" },
  itens: (n) => (n === 1 ? "1 item" : `${n} items`),
  mais: (n) => `and ${n} more`,
  versao: (v) => `Version ${v}`,
  nestaVersao: "In this release",
  todasAsVersoes: "All releases",
  anterior: "Previous release",
  proxima: "Next release",
  verNoGithub: "View on GitHub",
  atencao: "This release asks you to do something before or after updating. Read this block first.",
  introducao: "About this release",
  voltar: "Back to all releases",
  linkDoItem: "Link to this item",
  migalha: "Breadcrumb",
};

const es: TextosChangelog = {
  locale: "es-419",
  meta: {
    titulo: "Changelog — DeskcommCRM",
    descricao: "Todas las versiones de DeskcommCRM: qué se agregó, qué cambió, qué se corrigió y qué requiere atención antes de actualizar.",
    tituloVersao: "Versión {v} — Changelog de DeskcommCRM",
    descricaoVersao: "Qué cambió en la versión {v} de DeskcommCRM, publicada el {d}.",
  },
  sobretitulo: "Changelog",
  titulo: "Todo lo que cambió en DeskcommCRM, versión por versión.",
  subtitulo:
    "Cada versión cuenta qué se agregó, qué cambió y qué se corrigió — y, cuando corresponde, qué tienes que hacer antes de actualizar tu instalación.",
  aviso: {
    texto:
      "Las notas de versión están escritas en portugués, el idioma en que se desarrolla DeskcommCRM. Tu navegador puede traducirlas, o puedes abrir esta página ya traducida.",
    traduzir: "Abrir en Google Traductor",
  },
  maisRecente: "Versión más reciente",
  lerCompleta: "Leer la versión completa",
  estatisticas: { versoes: "versiones publicadas", mudancas: "cambios descritos", desde: "primera versión" },
  filtros: {
    rotulo: "Filtrar por tipo de cambio",
    todas: "Todas",
    busca: "Buscar en las versiones — ej.: WhatsApp, agenda, instalação",
    nenhuma: "Ninguna versión coincide con este filtro.",
    limpar: "Limpiar filtros",
    resultado: (n) => (n === 1 ? "1 versión" : `${n} versiones`),
  },
  secoes: { atencao: "Requiere atención", adicionado: "Agregado", alterado: "Cambiado", corrigido: "Corregido", seguranca: "Seguridad" },
  saltos: { major: "Cambio mayor", minor: "Novedades", patch: "Ajustes" },
  itens: (n) => (n === 1 ? "1 ítem" : `${n} ítems`),
  mais: (n) => `y ${n} más`,
  versao: (v) => `Versión ${v}`,
  nestaVersao: "En esta versión",
  todasAsVersoes: "Todas las versiones",
  anterior: "Versión anterior",
  proxima: "Versión siguiente",
  verNoGithub: "Ver en GitHub",
  atencao: "Esta versión te pide una acción antes o después de actualizar. Lee este bloque primero.",
  introducao: "Sobre esta versión",
  voltar: "Volver a todas las versiones",
  linkDoItem: "Enlace a este ítem",
  migalha: "Ruta de la página",
};

export const TEXTOS_CHANGELOG: Record<Idioma, TextosChangelog> = { "pt-BR": pt, en, es };

export function formatarData(data: string, locale: string, formato: "longo" | "curto" | "mes" | "numerico" = "longo"): string {
  const opcoes: Intl.DateTimeFormatOptions =
    formato === "numerico"
      ? { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }
      : formato === "mes"
      ? { month: "long", year: "numeric", timeZone: "UTC" }
      : formato === "curto"
        ? { day: "2-digit", month: "short", timeZone: "UTC" }
        : { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(locale, opcoes).format(new Date(`${data}T12:00:00Z`));
}
