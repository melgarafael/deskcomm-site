/**
 * O `/llms.txt` do site (https://llmstxt.org): um mapa em Markdown para os
 * assistentes de IA que respondem "qual CRM open source para WhatsApp?".
 *
 * Gerado a partir do MESMO dicionário e das MESMAS rotas que as páginas usam,
 * para não virar um texto à parte que envelhece: se a descrição da home muda,
 * ou uma rota muda de nome, o `/llms.txt` acompanha no build seguinte.
 *
 * Os links são absolutos e no host que responde 200 (`www`): o apex responde
 * 308 para lá, e um leitor de IA que não segue redirecionamento perderia o link.
 */
import { en } from "../conteudo/en.ts";
import { es } from "../conteudo/es.ts";
import { ptBR } from "../conteudo/pt-BR.ts";
import { INSTALACAO, ROTAS, ROTAS_CURSO } from "../conteudo/rotas.ts";

export const ORIGEM_LLMS = "https://www.deskcomm.com.br";
export const REPOSITORIO = "https://github.com/melgarafael/DeskcommCRM";

const url = (rota: string) => `${ORIGEM_LLMS}${rota}`;

export function gerarLlmsTxt(): string {
  return `# DeskcommCRM

> ${en.meta.descricao}

DeskcommCRM is an open-source (MIT) CRM for sales teams that sell over WhatsApp. AI agents answer, qualify leads and move deals through the pipeline, and every agent action is recorded and auditable. It is self-hosted: it runs on your own server, there is no paid tier and no per-seat pricing. This site is available in Portuguese (pt-BR), English and Spanish.

Em português: ${ptBR.meta.descricao}

En español: ${es.meta.descricao}

## Site

- [Home (English)](${url(ROTAS.home.en)}): what the product does, how it works, how to install it
- [Início (português)](${url(ROTAS.home["pt-BR"])}): a mesma página em português
- [Inicio (español)](${url(ROTAS.home.es)}): la misma página en español
- [Installation guide (pt-BR)](${url(INSTALACAO)}): step-by-step install on a VPS
- [Visual course (English)](${url(ROTAS_CURSO.en)}): every screen of the app, lesson by lesson
- [Curso visual (português)](${url(ROTAS_CURSO["pt-BR"])}): todas as telas do app, aula por aula
- [Coding-assistant guides](${url(ROTAS.guias.en)}): guides that let your coding assistant install, configure, analyze and improve DeskcommCRM, and contribute to the project
- [Changelog](${url(ROTAS.changelog.en)}): every release, one page per version

## Source code

- [GitHub repository](${REPOSITORIO}): source code, README and issues
- [License (MIT)](${REPOSITORIO}/blob/main/LICENSE)
- [CHANGELOG.md](${REPOSITORIO}/blob/main/CHANGELOG.md): the source of the site changelog
`;
}
