# Guia de instalação — verificação em 26/10/2026

Ambiente: build de produção do site (`pnpm build` + `pnpm start --port 3318`),
Chrome isolado em modo headless, conduzido por Playwright 1.58.2.

- `pnpm typecheck`: exit 0; também executado pelo build final.
- `pnpm test`: 33 passaram, nenhuma falha; repetidos pelo `prebuild` final.
- `pnpm build`: exit 0; `/instalar` gerada como página estática.
- `git diff --check`: exit 0.
- O site não tem script de lint; o CRM não foi alterado.

## Comportamento observado

1. O botão “Instalar na VPS” do cabeçalho da home abre `/instalar`, em todas as seis larguras.
2. As oito etapas estão no documento e os links navegam para as âncoras.
3. A etapa 3 fica destacada ao navegar para o Supabase.
4. O botão de copiar escreve o comando completo na área de transferência e anuncia “Copiado!”.
5. Marcar uma etapa atualiza a contagem e persiste depois de recarregar a página.
6. O FAQ expande o conteúdo pela tela.
7. Canonical aponta para `https://deskcomm.com.br/instalar`.
8. Sem JavaScript, texto e navegação pelas âncoras continuam disponíveis.
9. Em 360, 390, 768, 1024, 1280 e 1440 px: nenhum elemento do conteúdo excedeu a largura da tela.
10. Nenhum erro de JavaScript capturado na jornada.

As medições de geometria estão em `medicoes.json`. Screenshots: `desktop.png`,
`passo-3.png`, `celular.png` e `celular-passo-3.png`.

## Comando do token

Verificado separadamente em um Bash interativo com pseudo-terminal e token fictício:
o campo não ecoa o valor, a variável é exportada para processos filhos e pode ser
removida com `unset`. Nenhuma credencial real foi usada ou recebida pelo site.

## Escopo da prova

Esta verificação cobre a página e o comando de leitura do token. Não criou projeto
Supabase, não contratou VPS e não executou uma instalação completa. As instruções
de instalação foram conferidas contra `hostgator-setup-kit/install.sh` e os guias
de `.agents/skills/deskcomm-instalar/` do CRM, `origin/main` em `028b40c11`.
