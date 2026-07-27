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

## Estado

Esqueleto com `noindex`. Sai quando a LP estiver pronta.
