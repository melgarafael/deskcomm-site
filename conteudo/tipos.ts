/**
 * Contrato do conteúdo da página, em todos os idiomas.
 *
 * Tipar o dicionário é o que impede tradução esquecida: falta uma chave em
 * qualquer idioma e o build quebra, em vez de a página sair com um buraco em
 * produção.
 */
export type Idioma = "pt-BR" | "en" | "es";

export const IDIOMAS: { codigo: Idioma; caminho: string; rotulo: string; ogLocale: string }[] = [
  { codigo: "pt-BR", caminho: "/", rotulo: "Português", ogLocale: "pt_BR" },
  { codigo: "en", caminho: "/en", rotulo: "English", ogLocale: "en_US" },
  { codigo: "es", caminho: "/es", rotulo: "Español", ogLocale: "es_419" },
];

export type Conteudo = {
  meta: { titulo: string; descricao: string };
  nav: { comoFunciona: string; prova: string; instalar: string; preco: string; ctaInstalar: string };
  hero: {
    sobretitulo: string;
    h1a: string;
    h1b: string;
    sub: string;
    ctaPrimario: string;
    ctaSecundario: string;
    microcopy: string;
  };
  viloes: {
    titulo: string;
    itens: { titulo: string; texto: string; alt: string }[];
    fecho: { antes: string; forte: string };
  };
  virada: {
    sobretitulo: string;
    tituloA: string;
    tituloDestaque: string;
    sub: string;
    regras: { regra: string; prova: string }[];
    fecho: { antes: string; link: string; depois: string };
  };
  jornada: {
    sobretitulo: string;
    titulo: string;
    passos: { titulo: string; texto: string }[];
  };
  instalar: {
    sobretitulo: string;
    titulo: string;
    sub: string;
    apoio: { titulo: string; texto: string }[];
    comentario1: string;
    comentario2: string;
    depois: string;
    atualizarTitulo: string;
    atualizarTexto: string;
  };
  preco: {
    sobretitulo: string;
    titulo: string;
    sub: string;
    cartoes: { t: string; d: string }[];
    fecho: string;
  };
  banner: { sobretitulo: string; titulo: string; texto: string; cta: string; microcopy: string };
  prova: {
    sobretitulo: string;
    titulo: string;
    sub: string;
    itens: { afirmacao: string; caminho: string }[];
    cta: string;
    ctaNota: string;
  };
  radar: { sobretitulo: string; titulo: string; texto: string; fecho: string; faixas: string[] };
  nichos: { sobretitulo: string; titulo: string; texto: string; abas: { nicho: string; lead: string; ganho: string }[] };
  revendedor: { sobretitulo: string; titulo: string; texto: string; honestidade: string; cta: string };
  faq: { titulo: string; perguntas: { p: string; r: string }[] };
  rodape: { colunas: { titulo: string; itens: { rotulo: string; href: string }[] }[]; nota: string; atualizado: string };
};
