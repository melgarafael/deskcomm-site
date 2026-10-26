# Instalação → curso visual

Verificado em 26/10/2026, contra `pnpm build` + `pnpm start --port 3318`,
com Chrome isolado conduzido por Playwright 1.58.2.

- Build, checagem de tipos e 33 testes existentes passaram.
- O convite para o curso fica depois da etapa 8 e antes de manutenção e ajuda.
- O botão da última etapa abre `/curso`.
- O atalho na navegação leva ao convite destacado.
- “Começar o curso visual” abre o curso; “Começar pela Inbox” abre a primeira
  lição real, “Conhecendo a Inbox”.
- Jornada percorrida em 1440, 390 e 360 px, sem erro de JavaScript ou overflow.
- Convite e link continuam no HTML com JavaScript desativado.

Geometria e destinos observados: `jornada.json`. Capturas: `proximo-passo-*.png`.
