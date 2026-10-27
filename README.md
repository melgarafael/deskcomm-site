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

O curso visual tem três endereços: `/curso`, `/en/course` e `/es/curso`. Instruções,
legendas, busca e navegação são traduzidas. O seletor mantém a aula ou cena aberta
e o progresso no navegador. Inglês usa as capturas originais em português, com
aviso explícito. Espanhol usa fotos próprias quando o manifesto abaixo estiver
completo; sem ele, mantém as fotos em português e o aviso, inclusive na home.

`public/curso/index.html` é a fonte canônica gerada no repositório do produto.
`pnpm curso:gerar` combina essa fonte com os catálogos de `conteudo/curso/{en,es}/`
e gera o HTML de cada idioma (ignorado pelo Git). Roda antes de `dev` e `build`.
Ao atualizar o curso, traduza os textos novos nos catálogos: o teste e o gerador
recusam traduções ausentes. `interface.json` traduz os literais visíveis do programa;
`interface-interna.json` identifica os tokens que precisam permanecer iguais.

### Capturas reais em espanhol

`conteudo/curso/es/capturas.json` é opcional. Quando presente, o gerador e a
configuração do Next validam o conjunto inteiro e a existência de cada arquivo em
`public/curso/capturas/es/`. Um manifesto parcial ou inválido interrompe a geração:
nunca publica uma mistura anunciada como curso com imagens em espanhol.
A home recebe apenas a foto de capa e suas dimensões pela constante de build
`CURSO_CAPTURAS_ES`, ou `null` quando não há manifesto. Essa constante é produzida
pelo projeto, sem ajuste do operador. A home não lê os arquivos do curso no
servidor: assim, as capturas continuam como arquivos estáticos e não são incluídas
na função do servidor pelo rastreador de dependências do Next.

Contrato do manifesto (o exemplo mostra um registro; o arquivo real precisa de
todos os IDs dos passos e das cenas de demonstração, sem IDs extras):

```json
{
  "idioma": "es",
  "commit_fonte": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "versao": "1.92.0",
  "gerado_em": "2026-10-27T12:00:00.000Z",
  "largura": 1440,
  "altura": 900,
  "capturas": {
    "inbox--assumir-e-responder--p1": {
      "foto": "/curso/capturas/es/inbox--assumir-e-responder--p1.jpg",
      "destaques": [
        { "x": 12, "y": 20, "w": 200, "h": 40, "rotulo": "Legenda em português para o catálogo", "tipo": "caixa" }
      ],
      "clicar": null,
      "versao": "1.92.0",
      "capturado_em": "2026-10-27T11:00:00.000Z",
      "commit_fonte": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "idioma": "es"
    }
  },
  "falhas": []
}
```

- O idioma é `es` no topo e em cada foto; `commit_fonte` é um SHA de 40 caracteres
  hexadecimais. A versão usa formato semântico (`v` opcional). `gerado_em` é ISO-8601
  UTC; `capturado_em` aceita esse formato ou `YYYY-MM-DD`.
- O caminho deve ser exatamente `/curso/capturas/es/<id>.jpg`, sem parâmetros nem
  traversal. Cada imagem precisa ser um arquivo regular, não vazio. Largura e
  altura são inteiros positivos; retângulos usam pixels finitos dentro da foto,
  com largura e altura maiores que zero.
- `destaques` é uma lista de retângulos com `rotulo` não vazio e `tipo` igual a
  `caixa`, `seta` ou `numero`. `clicar` é um retângulo ou `null` explícito. Fotos,
  destaques e alvos de clique substituem os originais por inteiro: coordenadas
  precisam ser medidas novamente na interface espanhola.
- As legendas do manifesto ficam em português e passam pelo catálogo espanhol
  antes de publicar. Legenda nova sem tradução interrompe a geração.
- Atualizações incrementais podem preservar registros de um commit anterior,
  desde que cada foto mantenha sua origem, versão e data. `dados.versao` e
  `dados.datas_das_fotos` são derivados das fotos efetivamente usadas; a data
  editorial do curso continua separada. IDs de aulas, hashes e progresso não mudam.

Depois de copiar o manifesto, as fotos e as traduções, rode `pnpm test`,
`pnpm curso:gerar`, `pnpm typecheck` e `pnpm build`. Confira `/es/curso` e a seção
do curso em `/es`: só o conjunto completo muda o aviso e a foto da home para
espanhol. A captura e a revisão visual acontecem no repositório do produto;
o localizador não traduz pixels nem reaproveita as coordenadas em português.

Esqueleto com `noindex`. Sai quando a LP estiver pronta.
