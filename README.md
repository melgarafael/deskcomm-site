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
pnpm build    # baixa o CHANGELOG da main do produto e gera as 42 versões × 3 idiomas
```

Os três rodam no CI (`.github/workflows/ci.yml`) em todo PR e a cada push na `main` — push em
outra branch não dispara nada. O gatilho é o bloco `on:` do arquivo:

```bash
sed -n '/^on:/,/^jobs:/p' .github/workflows/ci.yml
```

## Estado

Esqueleto com `noindex`. Sai quando a LP estiver pronta.
