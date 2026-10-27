# Curso em três idiomas — 27/10/2026

Fonte: curso canônico em `public/curso/index.html`. Escopo conferido: 61 módulos,
259 lições e 30 demonstrações em cada idioma. Os 7.226 textos únicos do conteúdo
têm tradução em inglês e espanhol. As capturas originais permanecem em português,
conforme solicitado, com aviso visível nas versões traduzidas.

`pnpm typecheck` e `pnpm build` passaram; o build executou os 39 testes e gerou
as três versões. Uma revisão separada da implementação não encontrou falhas.
A revisão amostral das traduções corrigiu dois termos em inglês antes do build.

`verificar.cjs` percorreu o site servido por `next start` em Chrome isolado:
360, 390, 768, 1024 e 1440 px, nos três idiomas. Conferiu os acessos da home,
abertura de aula, legendas, ampliação da captura, conclusão da aula, troca de
idioma com a mesma aula e progresso, conclusão e reinício do simulador, busca
localizada e estado sem resultados, demonstração por nicho, avanço de cena,
recursos para montar a operação, menu móvel e tema escuro.

Resultado completo em `resultado.json`: nenhum erro de JavaScript, nenhuma
captura com resposta de erro e nenhum overflow nas 15 combinações de largura e
idioma. As imagens usam apenas a empresa fictícia do curso.

Para repetir, com o servidor na porta 3318 e Playwright disponível:

```sh
PLAYWRIGHT_PACKAGE=/caminho/para/node_modules/playwright \
QA_CHROME_PATH="/caminho/para/Chrome" \
node .superpowers/evidence/curso-idiomas/verificar.cjs
```

As duas variáveis são opcionais quando Playwright e seu navegador já estão
disponíveis no ambiente. `QA_BASE_URL` permite conferir outro endereço.
