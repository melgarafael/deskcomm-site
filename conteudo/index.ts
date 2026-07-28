import { en } from "./en";
import { es } from "./es";
import { ptBR } from "./pt-BR";
import type { Conteudo, Idioma } from "./tipos";

export const CONTEUDO: Record<Idioma, Conteudo> = { "pt-BR": ptBR, en, es };
export { IDIOMAS } from "./tipos";
export type { Conteudo, Idioma } from "./tipos";
