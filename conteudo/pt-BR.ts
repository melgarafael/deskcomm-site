import type { Conteudo } from "./tipos";

export const ptBR: Conteudo = {
  meta: {
    titulo: "DeskcommCRM — sua operação comercial numa mesa só",
    descricao:
      "Agentes de IA atendem no WhatsApp, qualificam o lead e movem o funil — com tudo registrado e auditável. No seu servidor, sem mensalidade por usuário. Open source, licença MIT.",
  },
  nav: { comoFunciona: "Como funciona", prova: "Prova", instalar: "Instalar", preco: "Preço", ctaInstalar: "Instalar na VPS" },
  hero: {
    sobretitulo: "Desk + comm — o comercial de mesa",
    h1a: "Sua operação comercial numa mesa só.",
    h1b: "E nada morre em cima dela.",
    sub: "Agentes de IA atendem no WhatsApp, qualificam o lead e movem o funil — com tudo registrado e auditável. No seu servidor, sem mensalidade por usuário.",
    ctaPrimario: "Instalar na minha VPS",
    ctaSecundario: "Ver o código no GitHub",
    microcopy: "Licença MIT · sem versão paga · 4 GB de RAM",
  },
  viloes: {
    titulo: "Você não perde venda por falta de lead.",
    itens: [
      {
        titulo: "O CRM que é planilha bonita",
        texto:
          "O lead entra, alguém cadastra, e nada acontece. Quando você percebe, ele sumiu — e ninguém sabe dizer em que momento, nem por quê. O sistema guardou o nome dele e perdeu a história.",
        alt: "Uma mesa com as peças desconectadas, sulcos que terminam sem chegar a lugar nenhum, e um buraco por onde um lead está caindo.",
      },
      {
        titulo: "O robô que responde e some",
        texto:
          "Atende rápido, responde qualquer coisa, e some. Se prometeu prazo que não existe, você descobre pelo cliente. Não dá para auditar o que ele disse — muito menos por que ele disse.",
        alt: "Um módulo isolado emitindo ondas sobre um fragmento de mesa que termina abruptamente, com sulcos que não levam a lugar nenhum.",
      },
    ],
    fecho: { antes: "Os dois têm a mesma raiz: ", forte: "o sistema não é responsável pelo que acontece depois." },
  },
  virada: {
    sobretitulo: "A categoria",
    tituloA: "Um sistema operacional comercial ",
    tituloDestaque: "vivo",
    sub: "Vivo tem definição — e a definição estava escrita no repositório antes de estar nesta página. São cinco regras que toda parte do sistema precisa cumprir para entrar.",
    regras: [
      { regra: "Nada é ilha", prova: "Toda peça tem entrada e saída. O mapa de arquitetura é público no repositório." },
      { regra: "Nenhum lead morre sem diagnóstico", prova: "Demanda parada aparece no Radar, classificada por risco — antes de virar prejuízo." },
      { regra: "Toda ação da IA é auditável", prova: "Sete verificações antes de cada envio. Cada uma vira registro — inclusive as que barram." },
      { regra: "Log invisível é log morto", prova: "Toda mutação relevante vira atividade na linha do tempo, visível na tela." },
      { regra: "Follow-up é o anti-morte", prova: "Demanda aberta sem próximo passo definido é tratada como vazamento do sistema." },
    ],
    fecho: {
      antes: "Isso não é o que a gente promete — é o critério que uma mudança precisa passar para entrar no sistema. Está em ",
      link: "docs/doctrine/sistema-vivo.md",
      depois: ", e o checklist de sete perguntas é respondido antes de cada merge.",
    },
  },
  jornada: {
    sobretitulo: "A vida de um lead",
    titulo: "O que acontece entre a mensagem e a venda.",
    passos: [
      { titulo: "09:41 — chega uma mensagem", texto: "“Vocês entregam em Salvador?” Antes de qualquer resposta, o sistema já sabe quem é: histórico, pedidos, o que ficou combinado da última vez." },
      { titulo: "O agente lê antes de falar", texto: "Ele busca na base de conhecimento da sua empresa — seu prazo, sua política, seu catálogo. Não inventa." },
      { titulo: "Sete verificações antes de enviar", texto: "Descadastro, LGPD, anti-banimento, variação de texto, promessa determinística, promessa semântica e aviso de automação. Nessa ordem, sempre." },
      { titulo: "Inclusive o que ele decidiu não enviar", texto: "O agente ia prometer entrega em 24h. A verificação barrou: esse prazo não existe no seu catálogo. Fica registrado o que ele ia dizer — e por que não disse." },
      { titulo: "O lead se move sozinho", texto: "Qualificado, ele muda de etapa no funil. A etiqueta entra, o responsável é definido — e cada movimento tem motivo registrado." },
      { titulo: "Quando é a vez do humano, ele recebe contexto", texto: "Não a conversa crua: resumo do que aconteceu, o que foi combinado, quais objeções apareceram e qual é o próximo passo." },
      { titulo: "E se ninguém responder, não morre", texto: "Follow-up agendado. Se esfriar, o lead aparece no Radar classificado por risco — antes de virar prejuízo." },
    ],
  },
  instalar: {
    sobretitulo: "Instalação",
    titulo: "Um comando. E o sistema é seu.",
    sub: "O script confere as dependências, gera todos os segredos, aplica o banco, cria o primeiro administrador, sobe os contêineres e liga a tarefa que dispara as automações.",
    apoio: [
      { titulo: "4 GB de RAM recomendados", texto: "O servidor não compila nada — baixa uma imagem pronta. A stack sobe com 2 GB, mas opera no limite: são 7 contêineres, e cada sessão de WhatsApp custa ~150 MB." },
      { titulo: "HTTPS automático", texto: "O certificado é emitido no primeiro acesso. Você não configura TLS na mão." },
      { titulo: "Travou? Tem assistente", texto: "Abra o Claude Code dentro da VPS e ele conduz a instalação por conversa, com nove armadilhas de ambiente já mapeadas." },
    ],
    comentario1: "# 1. baixa o projeto",
    comentario2: "# 2. instala",
    depois: "Depois disso: acessar o domínio, cadastrar a verificação em duas etapas do administrador e escanear o QR do WhatsApp. Tudo pela tela.",
    atualizarTitulo: "Atualizar não quebra",
    atualizarTexto: "faz backup do banco antes, reaplica o schema de forma idempotente e confere a saúde no fim. O caminho de atualização é testado no CI — não é só documentado.",
  },
  preco: {
    sobretitulo: "Quanto custa",
    titulo: "O software é grátis. Você paga o servidor.",
    sub: "Não existe versão paga, não existe funcionalidade travada, não existe cobrança por usuário. O que você paga é a VPS onde ele roda e as chaves de IA que consumir.",
    cartoes: [
      { t: "Licença MIT", d: "Use, modifique, revenda. Inclusive comercialmente, sem pedir permissão." },
      { t: "Sem plano pago", d: "O que você instala hoje é o produto completo. Não há tier esperando você crescer." },
      { t: "Sua conta não cresce com o time", d: "Cinco pessoas no comercial ou cinquenta custam a mesma VPS." },
    ],
    fecho: "Plataforma fechada cobra por atendente: o custo sobe junto com o time, no ano em que você contrata. Aqui o custo é do servidor, e ele não sabe quantas pessoas usam.",
  },
  banner: {
    sobretitulo: "Parceiro oficial",
    titulo: "Soberania com IA é na HostGator",
    texto: "Datacenter no Brasil, sem transferência internacional de dados. É onde o DeskcommCRM foi feito para rodar — o plano VPS NVMe 4 atende com folga.",
    cta: "Assinar a VPS com desconto",
    microcopy: "link de parceria — assinar por ele apoia o projeto",
  },
  prova: {
    sobretitulo: "Prova",
    titulo: "Não acredite. Confira.",
    sub: "Cada afirmação desta página aponta para um arquivo do repositório público. Se alguma não se sustentar, é bug — e vale uma issue.",
    itens: [
      { afirmacao: "O isolamento entre clientes é testado a cada alteração. O CI sobe um Postgres limpo e roda 364 testes de invariante. Um deles cria duas organizações e prova que uma não vê nenhuma linha da outra — e um caso de controle prova antes que as linhas existem, senão o teste passaria com a tabela vazia.", caminho: "tests/invariants/rls-isolation.test.ts" },
      { afirmacao: "Sete verificações antes de cada envio, em ordem fixa e versionada. Cada avaliação vira registro durável e exportável — inclusive as que barraram uma mensagem.", caminho: "lib/agent-engine/guardrails/before-send.ts" },
      { afirmacao: "Atualizar não quebra: o schema é aplicado em banco novo e reaplicado em banco existente, provando idempotência. O caminho de atualização é testado, não só documentado.", caminho: "scripts/test-db.sh" },
      { afirmacao: "Licença MIT, sem versão paga, sem funcionalidade travada. O que você instala é o produto completo.", caminho: "LICENSE" },
    ],
    cta: "Dar uma estrela no GitHub",
    ctaNota: "é o que ajuda outras pessoas a encontrarem o projeto",
  },
  radar: {
    sobretitulo: "Anti-morte",
    titulo: "Quantos leads estão morrendo agora?",
    texto: "O Radar responde. Toda demanda aberta é classificada pelo tempo sem interação e pelo que ficou pendente. Não é relatório do mês passado — é o estado agora.",
    fecho: "Um número na tela que não muda uma decisão é ruído. Esse muda.",
    faixas: ["crítico", "em risco", "em voo"],
  },
  nichos: {
    sobretitulo: "Multi-nicho",
    titulo: "O mesmo sistema atende quem vende consulta e quem vende tênis.",
    texto: "O vocabulário do funil é configurável. Não é tema, não é fork, não é “versão para clínicas” — é o mesmo núcleo, configurado.",
    abas: [
      { nicho: "E-commerce", lead: "Cliente", ganho: "Pago" },
      { nicho: "Clínica", lead: "Paciente", ganho: "Agendado" },
      { nicho: "Imobiliária", lead: "Interessado", ganho: "Fechado" },
      { nicho: "Serviços", lead: "Prospecto", ganho: "Contratado" },
    ],
  },
  revendedor: {
    sobretitulo: "Para agências",
    titulo: "Instale para os seus clientes.",
    texto: "Duas variáveis no .env trocam nome e logo em toda a interface — sem tocar em código, porque código editado se perde na próxima atualização. Licença MIT: pode modificar, hospedar para terceiros e cobrar.",
    honestidade: "O que ainda NÃO dá: cores e fontes exigem alterar o design system, e a marca é por instalação, não por organização. Está escrito no guia — melhor você saber agora do que descobrir na frente do seu cliente.",
    cta: "Ler o guia para agências",
  },
  faq: {
    titulo: "Perguntas que você vai fazer",
    perguntas: [
      { p: "Quanto custa o DeskcommCRM?", r: "O software é gratuito e de código aberto, sob licença MIT. Não existe versão paga nem funcionalidade travada. Você paga apenas a infraestrutura: a VPS e as chaves de IA que consumir." },
      { p: "Preciso saber programar para instalar?", r: "Não, mas precisa seguir um passo a passo e ter os acessos em mãos. A instalação é um comando, e o kit inclui um assistente em IA que conduz o processo por conversa." },
      { p: "Qual VPS eu preciso?", r: "4 GB de RAM são o recomendado — o plano VPS NVMe 4 da HostGator atende. A stack sobe com 2 GB, mas opera no limite: são 7 contêineres, e cada sessão de WhatsApp custa cerca de 150 MB." },
      { p: "Serve para qual tipo de negócio?", r: "Qualquer negócio que venda por conversa. O vocabulário do funil é configurável, então o mesmo sistema atende e-commerce, clínica, imobiliária, infoproduto e prestador de serviço." },
      { p: "Posso instalar para meus clientes e cobrar?", r: "Pode. A licença MIT permite uso comercial, modificação e redistribuição, e não há cláusula proibindo hospedar para terceiros." },
      { p: "O que acontece se a IA errar?", r: "Cada mensagem passa por sete verificações antes de sair, e todas ficam registradas — inclusive as que barraram um envio. Quando o agente não deve seguir sozinho, ele passa para um humano com um resumo do que aconteceu." },
      { p: "Meus dados ficam no Brasil?", r: "Ficam onde estiver a sua VPS. Contratando uma VPS com datacenter no Brasil, a operação não realiza transferência internacional de dados pessoais — e portanto não fica sujeita às cláusulas-padrão da Resolução ANPD nº 19/2024." },
      { p: "Como atualizo depois?", r: "Rodando bash update.sh. Ele faz backup do banco antes, reaplica o schema de forma idempotente e confere a saúde no final." },
    ],
  },
  rodape: {
    colunas: [
      { titulo: "Produto", itens: [{ rotulo: "Como funciona", href: "#como-funciona" }, { rotulo: "Preço", href: "#preco" }, { rotulo: "Instalar", href: "#instalar" }] },
      { titulo: "Documentação", itens: [{ rotulo: "Guia de instalação", href: "/blob/main/docs/SETUP.md" }, { rotulo: "Para agências", href: "/blob/main/docs/white-label.md" }, { rotulo: "Arquitetura", href: "/blob/main/ARCHITECTURE.md" }, { rotulo: "Doutrina do sistema vivo", href: "/blob/main/docs/doctrine/sistema-vivo.md" }] },
      { titulo: "Comunidade", itens: [{ rotulo: "Discussions", href: "/discussions" }, { rotulo: "Issues", href: "/issues" }, { rotulo: "Contribuir", href: "/blob/main/CONTRIBUTING.md" }] },
      { titulo: "Projeto", itens: [{ rotulo: "Licença MIT", href: "/blob/main/LICENSE" }, { rotulo: "Changelog", href: "/blob/main/CHANGELOG.md" }, { rotulo: "Segurança", href: "/blob/main/SECURITY.md" }] },
    ],
    nota: "DeskcommCRM · MIT · Feito no Brasil",
    atualizado: "Página atualizada em",
  },

};
