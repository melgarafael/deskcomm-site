# Acesso ao curso no cabeçalho

Verificado em 27/10/2026 contra build de produção local, com Chrome isolado e
Playwright 1.58.2. `pnpm build` passou, incluindo TypeScript e os 33 testes existentes.
`git diff --check` passou.

- “Curso” fica visível no cabeçalho em português e espanhol; “Course”, em inglês.
- O destino é `/curso`, sinalizado como conteúdo em português com `hreflang`.
- Link visível nos três idiomas em 360, 390, 640, 768, 1024, 1280 e 1440 px.
- Medidas por `getBoundingClientRect`: nenhum link fora da tela ou sobreposto.
- Navegação para o curso percorrida a partir das três homes em 390 e 1440 px.
- A instalação mantém o botão principal e o destino de cada idioma. O rótulo
  visível é compacto abaixo de 1280 px; o nome acessível continua completo.
- O acesso ao curso também foi conferido em `/instalar`, `/guias` e `/changelog`.

Capturas: `home-390.png` e `home-1440.png`. Dados: `verificacao.json`.
