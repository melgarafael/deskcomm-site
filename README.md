# deskcomm-site

Landing page de [deskcomm.com.br](https://deskcomm.com.br).

**Repositório separado do produto de propósito.** O CRM é self-hosted e revendido:
se a LP morasse na rota `/` do app, todo clone instalado por um revendedor serviria
a nossa página de vendas para os clientes finais dele.

- Plano de conteúdo e direção de arte: [`docs/growth/lp-plano.md`](https://github.com/melgarafael/DeskcommCRM/blob/main/docs/growth/lp-plano.md) no repo do produto
- Prompts das imagens: [`docs/growth/lp-prompts-imagens.md`](https://github.com/melgarafael/DeskcommCRM/blob/main/docs/growth/lp-prompts-imagens.md)
- Identidade visual: `docs/design-system/` no repo do produto — os tokens em `tailwind.config.ts` são espelho de lá

## Rodar

```bash
pnpm install
pnpm dev
```

## Conferir

```bash
pnpm typecheck
pnpm test     # node:test; também roda sozinho antes do `pnpm build`
pnpm build    # baixa o CHANGELOG da main do produto e gera uma página por versão × 3 idiomas
```

Os três rodam no CI (`.github/workflows/ci.yml`) num PR — ao abrir e a cada push na branch dele — e
a cada push na `main`. Push numa branch sem PR aberto não dispara nada. O gatilho é o bloco `on:`:

```bash
sed -n '/^on:/,/^jobs:/p' .github/workflows/ci.yml
```

## Estado

O guia público de instalação fica em `/instalar`, com acesso pelo cabeçalho, home e
rodapé em português. O conteúdo original veio do Notion e foi conferido contra o
`hostgator-setup-kit` do CRM em 26/10/2026. O caminho principal usa um token pessoal
do Supabase, lido em campo oculto no terminal da VPS, antes do instalador.
Conteúdo e comandos: `conteudo/instalacao.ts` e `components/instalacao/`.
O progresso guarda apenas ids de etapas no navegador; a página não recebe credenciais.

O curso visual tem três endereços: `/curso`, `/en/course` e `/es/curso`. As capturas
originais em português são compartilhadas; instruções, legendas, busca e navegação
são traduzidas. O seletor mantém a aula ou cena aberta e o progresso no navegador.

`public/curso/index.html` é a fonte canônica gerada no repositório do produto.
`pnpm curso:gerar` combina essa fonte com os catálogos de `conteudo/curso/{en,es}/`
e gera o HTML de cada idioma (ignorado pelo Git). Roda antes de `dev` e `build`.
Ao atualizar o curso, traduza os textos novos nos catálogos: o teste e o gerador
recusam traduções ausentes. `interface.json` traduz os literais visíveis do programa;
`interface-interna.json` identifica os tokens que precisam permanecer iguais.

Esqueleto com `noindex`. Sai quando a LP estiver pronta.
