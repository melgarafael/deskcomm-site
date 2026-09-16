import type { Idioma } from "./tipos";

/**
 * A página "Guias do assistente" — para devs e para quem instala.
 *
 * Tudo aqui descreve o que existe na `main` do DeskcommCRM, conferido em
 * 2026-09-15: os seis guias `deskcomm-*` em `.agents/skills/` (espelho em
 * `.claude/skills/`), o `scripts/instalar-guias.sh` e o comportamento de cada
 * assistente — medido nesta máquina onde deu (Claude Code, OpenCode, Antigravity
 * CLI) e pela documentação oficial onde não deu (Codex, Cursor).
 *
 * Mudou um guia, o nome de um comando ou a pasta que um assistente lê? Esta
 * página mente até alguém mudar este arquivo. O guia `deskcomm-contribuir` do
 * produto lembra disso a quem mexe em `.agents/skills/`.
 */

export type GuiaId = "deskcomm-instalar" | "deskcomm-cliente-novo" | "deskcomm-metricas" | "deskcomm-prompt" | "deskcomm-contribuir" | "deskcomm-doutrina";
export type AssistenteId = "claude" | "codex" | "cursor" | "antigravity" | "opencode";
export type Publico = "opera" | "programa";

export type Guia = {
  id: GuiaId;
  publico: Publico;
  titulo: string;
  resumo: string;
  paraQuem: string;
  faz: string[];
  frases: string[];
};

export type Assistente = {
  id: AssistenteId;
  nome: string;
  onde: string;
  pastas: { rotulo: string; caminho: string }[];
  sozinho: string;
  peloNome: { texto: string; exemplo: string };
  lista: { texto: string; exemplo: string | null };
  bomSaber: string[];
  doc: string;
};

export type TextosGuias = {
  meta: { titulo: string; descricao: string };
  sobretitulo: string;
  titulo: string;
  subtitulo: string;
  ctaInstalar: string;
  ctaCatalogo: string;
  copiar: string;
  copiado: string;
  /** Anunciado ao leitor de tela quando a área de transferência recusa e o comando fica só selecionado. */
  selecionado: string;
  terminal: { pasta: string; voce: string; pedido: string; usando: string; passos: string[] };
  passos: { titulo: string; itens: { titulo: string; texto: string }[] };
  catalogo: {
    sobretitulo: string;
    titulo: string;
    texto: string;
    filtros: Record<"todos" | Publico, string>;
    paraQuem: string;
    faz: string;
    pecaAssim: string;
    oficial: string;
  };
  assistentes: {
    sobretitulo: string;
    titulo: string;
    texto: string;
    onde: string;
    sozinho: string;
    peloNome: string;
    lista: string;
    bomSaber: string;
    doc: string;
    outros: string;
  };
  instalar: {
    sobretitulo: string;
    titulo: string;
    texto: string;
    opcaoA: { titulo: string; selo: string; texto: string; atualizar: string; remover: string; detalhes: string[] };
    opcaoB: { titulo: string; texto: string; detalhes: string[] };
    windows: string;
  };
  contribuir: { sobretitulo: string; titulo: string; texto: string; passos: { titulo: string; texto: string; comando: string | null }[] };
  faq: { titulo: string; itens: { p: string; r: string }[] };
  guias: Guia[];
  lista: Assistente[];
};

/** A data que o rodapé da página de guias mostra. Mudou o texto desta página? Mude esta data. */
export const GUIAS_ATUALIZADO_EM = "2026-09-16";

const COMANDO = "curl -fsSL https://raw.githubusercontent.com/melgarafael/DeskcommCRM/main/scripts/instalar-guias.sh | bash";
export const COMANDOS = {
  instalar: COMANDO,
  remover: `${COMANDO} -s -- --remover`,
  clonar: "git clone https://github.com/melgarafael/DeskcommCRM.git\ncd DeskcommCRM",
  sincronizar: "pnpm skills:sync",
  testar: "pnpm test:unit tests/unit/skills-embutidas.test.ts",
  fonte: "bash scripts/instalar-guias.sh --fonte .",
};

// ─────────────────────────────────────────────────────────────────────────────
// pt-BR
// ─────────────────────────────────────────────────────────────────────────────

const pt: TextosGuias = {
  meta: {
    titulo: "Guias do assistente — DeskcommCRM",
    descricao:
      "Seis guias que ensinam Claude Code, Codex, Cursor, Antigravity e OpenCode a instalar, configurar, analisar e melhorar o DeskcommCRM com você. O que cada um faz e como usar em cada assistente.",
  },
  sobretitulo: "Guias do assistente",
  titulo: "O seu assistente de código já sabe trabalhar no DeskcommCRM.",
  subtitulo:
    "São seis guias que ensinam Claude Code, Codex, Cursor, Antigravity e OpenCode a instalar, montar um cliente, ler as métricas, afinar o agente de IA e contribuir com o código — seguindo as regras do projeto. Você não precisa decorar nome nenhum: diga o que quer e o guia certo entra sozinho.",
  ctaInstalar: "Instalar os guias",
  ctaCatalogo: "Ver os seis guias",
  copiar: "Copiar",
  copiado: "Copiado",
  selecionado: "Comando selecionado. Copie com Ctrl+C.",
  terminal: {
    pasta: "~/meu-negocio",
    voce: "você",
    pedido: "quero instalar o CRM na minha VPS da HostGator",
    usando: "usando o guia deskcomm-instalar",
    passos: ["confere Docker, domínio e DNS", "pede a connection string do Supabase", "roda o install.sh e acompanha cada etapa"],
  },
  passos: {
    titulo: "Como funciona",
    itens: [
      { titulo: "Instale uma vez", texto: "Um comando deixa os guias disponíveis em qualquer pasta do seu computador, para todos os assistentes." },
      { titulo: "Abra uma sessão nova", texto: "Os assistentes leem os guias quando a sessão começa. Uma conversa que já estava aberta não vê o que acabou de chegar." },
      { titulo: "Peça do seu jeito", texto: "“O agente está respondendo errado.” O assistente reconhece o assunto e segue o guia. Se preferir, chame pelo nome." },
    ],
  },
  catalogo: {
    sobretitulo: "Os guias",
    titulo: "Um guia para cada trabalho.",
    texto: "Quatro são para quem instala e opera o CRM, e não exigem saber programar. Dois são para quem mexe no código.",
    filtros: { todos: "Todos", opera: "Para quem usa o CRM", programa: "Para quem programa" },
    paraQuem: "Para quem",
    faz: "O que ele faz",
    pecaAssim: "Peça assim",
    oficial: "Ver o guia no GitHub",
  },
  assistentes: {
    sobretitulo: "No seu assistente",
    titulo: "Como usar em cada um.",
    texto: "Todos seguem o mesmo padrão aberto de guias (Agent Skills) e acionam o guia sozinhos pelo assunto. Muda onde procuram e como chamar pelo nome.",
    onde: "Onde procura",
    sozinho: "Sozinho",
    peloNome: "Pelo nome",
    lista: "Ver a lista",
    bomSaber: "Bom saber",
    doc: "Documentação oficial",
    outros: "Outro assistente? Quem segue o padrão Agent Skills — como GitHub Copilot e Gemini CLI — costuma ler a pasta .agents/skills, e o instalador também liga os guias em ~/.agents/skills.",
  },
  instalar: {
    sobretitulo: "Instalar",
    titulo: "Dois jeitos de ter os guias.",
    texto: "Quem ainda não clonou o projeto, ou trabalha em outra pasta, usa o instalador. Quem já está num clone atualizado já tem tudo.",
    opcaoA: {
      titulo: "Em qualquer pasta",
      selo: "Recomendado",
      texto: "Cola no terminal do seu computador — não na VPS. Funciona antes de clonar o projeto.",
      atualizar: "Para atualizar, rode o mesmo comando de novo.",
      remover: "Para desfazer:",
      detalhes: [
        "Guarda uma cópia só dos guias em ~/.deskcomm/guias.",
        "Liga cada guia nas pastas que os assistentes leem: ~/.claude/skills, ~/.agents/skills e ~/.gemini/config/skills.",
        "Nunca apaga uma skill sua com o mesmo nome: avisa e pula.",
      ],
    },
    opcaoB: {
      titulo: "Dentro de um clone",
      texto: "Os guias moram no próprio repositório. Abra o assistente na pasta do projeto e eles já estão lá.",
      detalhes: [
        "Ficam em .agents/skills, com uma cópia em .claude/skills para o Claude Code.",
        "Mantenha a sua branch atualizada com a main: numa branch antiga, os guias também são os antigos.",
      ],
    },
    windows: "No Windows, rode pelo Git Bash quando o assistente está instalado no próprio Windows. Pelo WSL, só se o assistente também roda dentro do WSL: lá a pasta pessoal é a do Linux, que os programas do Windows não leem. Onde o sistema não cria atalhos de pasta, o instalador copia os guias — aí rode o comando de novo sempre que quiser atualizar.",
  },
  contribuir: {
    sobretitulo: "Para quem contribui",
    titulo: "Mexer num guia.",
    texto: "Os guias são código do projeto: entram por pull request e têm teste.",
    passos: [
      { titulo: "Edite a fonte", texto: "O arquivo é .agents/skills/<guia>/SKILL.md. Deixe a descrição do cabeçalho entre aspas: dois-pontos soltos quebram a leitura em assistentes mais rígidos, e o guia some sem aviso.", comando: null },
      { titulo: "Atualize o espelho", texto: "Copia os guias para .claude/skills, que é a pasta do Claude Code.", comando: COMANDOS.sincronizar },
      { titulo: "Rode o teste", texto: "Reprova cabeçalho inválido, espelho desatualizado e descrição longa demais.", comando: COMANDOS.testar },
      { titulo: "Teste a sua versão", texto: "No Claude Code, um guia instalado na pasta global vence o do projeto. Aponte o instalador para o seu clone antes de testar.", comando: COMANDOS.fonte },
    ],
  },
  faq: {
    titulo: "Perguntas frequentes",
    itens: [
      { p: "Preciso saber o nome do guia?", r: "Não. O assistente escolhe o guia pelo assunto do que você pede. O nome serve para quando você quer ter certeza de qual guia vai entrar." },
      { p: "O assistente vai mexer no meu servidor sozinho?", r: "Ele segue as permissões do seu assistente: comandos pedem a sua confirmação, a menos que você tenha liberado. No guia de prompt, publicar a versão nova do agente é sempre com você." },
      { p: "Os guias leem as conversas dos meus clientes?", r: "O de métricas, não: lê o banco só com consultas que somam e contam, sem abrir o texto das mensagens nem dado pessoal. O de prompt pode ler um trecho quando é indispensável para ver como o agente fala, e só com você sabendo: as mensagens que o próprio agente enviou em poucas conversas recentes — não as do cliente —, sem copiar nada para fora da sessão." },
      { p: "Funciona se eu escrever em inglês ou espanhol?", r: "Sim. Os guias são escritos em português, e o assistente segue o guia respondendo no idioma em que você escreve." },
      { p: "Já tenho uma skill com o mesmo nome. E agora?", r: "O instalador não toca nela: avisa que pulou e segue com os outros guias." },
      { p: "Instalei e o guia não aparece.", r: "Abra uma sessão nova do assistente. No Antigravity, confirme também que você confia na pasta do projeto: ali, pasta não confiável não carrega os guias dela." },
    ],
  },
  guias: [
    {
      id: "deskcomm-instalar",
      publico: "opera",
      titulo: "Instalar e operar",
      resumo: "Coloca o CRM no ar numa VPS e cuida dele depois: atualização, backup, domínio, WhatsApp e os erros da instalação.",
      paraQuem: "Quem instala, mesmo sem ser técnico, agências e quem opera uma VPS.",
      faz: ["Conduz a instalação passo a passo e roda os scripts do kit.", "Resolve cadeado/SSL, DNS, Supabase, proxy e chave de IA.", "Atualiza, faz backup e restaura."],
      frases: ["quero instalar o CRM na minha VPS", "o cadeado do site não aparece", "como faço backup?"],
    },
    {
      id: "deskcomm-cliente-novo",
      publico: "opera",
      titulo: "Montar um cliente",
      resumo: "Monta o atendimento de um cliente pelo nicho — clínica, imobiliária, serviços, curso, loja — na ordem certa e pela tela.",
      paraQuem: "Donos de negócio, agências e quem implanta para terceiros.",
      faz: ["Cria agentes de IA, roteadores e follow-ups.", "Sobe a base de conhecimento e monta o funil.", "Entrega o texto pronto para colar e conduz até o teste."],
      frases: ["configura o CRM para uma clínica", "que prompt eu uso no agente da imobiliária?", "terminei o onboarding, e agora?"],
    },
    {
      id: "deskcomm-metricas",
      publico: "opera",
      titulo: "Analisar as métricas",
      resumo: "Lê a operação como um analista experiente: conversão, funil, tempo de resposta, passagem para humano e custo de IA.",
      paraQuem: "Donos de negócio, agências e operadores.",
      faz: ["Mostra onde o funil trava e por que a conversão caiu.", "Diz quanto a IA custa e em que horário os clientes mais falam.", "Declara a régua e o fuso de cada número."],
      frases: ["o agente está vendendo?", "por que a conversão caiu?", "quanto estou gastando com IA?"],
    },
    {
      id: "deskcomm-prompt",
      publico: "opera",
      titulo: "Afinar o agente de IA",
      resumo: "Melhora o prompt de um agente que não está indo bem, como um engenheiro de prompt sênior — com os dados da operação.",
      paraQuem: "Donos de negócio, agências e quem implanta.",
      faz: ["Diagnostica pelas execuções, bloqueios e custos do agente.", "Escreve a versão nova como rascunho e testa pelo botão Testar.", "Deixa o Publicar com você."],
      frases: ["o agente está robótico", "ele inventa preço", "melhora o prompt do agente de vendas"],
    },
    {
      id: "deskcomm-contribuir",
      publico: "programa",
      titulo: "Contribuir com o código",
      resumo: "Confere antes do pull request o que o mantenedor confere depois — e evita retrabalho e PR recusado.",
      paraQuem: "Quem contribui, sobretudo a partir de um fork, e devs de agência.",
      faz: ["Avisa quando a branch está atrasada em relação à main.", "Cobra migration, teste que falta e fragmento de release.", "Mostra como provar a mudança pela tela."],
      frases: ["vou abrir um PR", "minha branch está atrasada?", "por que o CI ficou vermelho?"],
    },
    {
      id: "deskcomm-doutrina",
      publico: "programa",
      titulo: "Seguir as regras do código",
      resumo: "Aponta as regras que não se negociam neste repositório sempre que alguém escreve ou revisa código.",
      paraQuem: "Qualquer pessoa ou IA escrevendo código no projeto.",
      faz: ["Isolamento entre empresas com RLS.", "Migration, baseline e manifesto andando juntos.", "O que muda para quem já instalou numa VPS."],
      frases: ["revisa este código", "como crio uma migration aqui?", "posso adicionar esta coluna?"],
    },
  ],
  lista: [
    {
      id: "claude",
      nome: "Claude Code",
      onde: "Na pasta .claude/skills do projeto e na sua pasta pessoal.",
      pastas: [
        { rotulo: "Projeto", caminho: ".claude/skills/" },
        { rotulo: "Global", caminho: "~/.claude/skills/" },
      ],
      sozinho: "Lê a descrição de cada guia e aciona o que combina com o seu pedido.",
      peloNome: { texto: "Digite a barra e o nome. O que vier depois vai junto para o guia.", exemplo: "/deskcomm-instalar meu domínio é crm.minhaempresa.com.br" },
      lista: { texto: "Mostra todos os guias carregados.", exemplo: "/skills" },
      bomSaber: [
        "Um guia global com o mesmo nome vence o do projeto.",
        "Mudou o texto de um guia? Ele recarrega sozinho. Criou a pasta de guias agora? Reinicie a sessão.",
      ],
      doc: "https://code.claude.com/docs/en/skills",
    },
    {
      id: "codex",
      nome: "Codex",
      onde: "Na pasta .agents/skills do projeto e na sua pasta pessoal. Vale para a CLI e para a extensão de IDE.",
      pastas: [
        { rotulo: "Projeto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "Aciona o guia quando o pedido combina com a descrição dele.",
      peloNome: { texto: "Digite o cifrão e o nome, ou escolha no menu.", exemplo: "$deskcomm-prompt o agente está inventando preço" },
      lista: { texto: "Abre o menu de guias.", exemplo: "/skills" },
      bomSaber: ["Se uma mudança não aparecer, reinicie o Codex."],
      doc: "https://learn.chatgpt.com/docs/build-skills",
    },
    {
      id: "cursor",
      nome: "Cursor",
      onde: "Lê .agents/skills e também .claude/skills — no projeto e na sua pasta pessoal. Vale para o editor e para a CLI.",
      pastas: [
        { rotulo: "Projeto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "O agente vê os guias disponíveis e decide quando cada um é relevante.",
      peloNome: { texto: "No chat do Agent, digite a barra e escolha o guia. Option+Enter (Alt+Enter no Windows) deixa o guia ligado na conversa inteira.", exemplo: "/deskcomm-cliente-novo" },
      lista: { texto: "No editor, em Customize › Skills. Na CLI, no próprio menu da barra.", exemplo: null },
      bomSaber: ["O repositório também traz uma regra em .cursor/rules que lembra o agente de usar os guias."],
      doc: "https://cursor.com/docs/skills",
    },
    {
      id: "antigravity",
      nome: "Antigravity",
      onde: "Na pasta .agents/skills do projeto e numa pasta global própria, que o instalador também preenche.",
      pastas: [
        { rotulo: "Projeto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.gemini/config/skills/" },
      ],
      sozinho: "O agente decide pelo contexto, sem você precisar pedir o guia.",
      peloNome: { texto: "Na CLI, cada guia vira um comando de barra. No app, mencione o guia pelo nome no pedido.", exemplo: "/deskcomm-metricas" },
      lista: { texto: "Na CLI, sem gastar cota. No app, em Skills & Customizations.", exemplo: 'agy -p "/skills"' },
      bomSaber: [
        "Medimos: numa pasta que não foi marcada como confiável, a CLI não carregou os guias do projeto — os globais, sim. Instalar pelo comando resolve.",
        "Aqui o guia do projeto vence o global com o mesmo nome — o contrário do Claude Code.",
      ],
      doc: "https://antigravity.google/docs/skills/",
    },
    {
      id: "opencode",
      nome: "OpenCode",
      onde: "Lê .agents/skills e .claude/skills, no projeto e na sua pasta pessoal.",
      pastas: [
        { rotulo: "Projeto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "O modelo chama a ferramenta de guias quando o pedido combina.",
      peloNome: { texto: "Peça pelo nome, em linguagem natural.", exemplo: "use o guia deskcomm-contribuir e confira a minha branch" },
      lista: { texto: "Lista cada guia com a pasta de onde veio.", exemplo: "opencode debug skill" },
      bomSaber: ["Mudou um guia? Reinicie o OpenCode: a configuração não recarrega sozinha."],
      doc: "https://opencode.ai/docs/skills/",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// en
// ─────────────────────────────────────────────────────────────────────────────

const en: TextosGuias = {
  meta: {
    titulo: "Assistant guides — DeskcommCRM",
    descricao:
      "Six guides that teach Claude Code, Codex, Cursor, Antigravity and OpenCode to install, set up, analyze and improve DeskcommCRM with you. What each one does and how to use it in each assistant.",
  },
  sobretitulo: "Assistant guides",
  titulo: "Your coding assistant already knows how to work on DeskcommCRM.",
  subtitulo:
    "Six guides teach Claude Code, Codex, Cursor, Antigravity and OpenCode to install the CRM, set up a client, read the metrics, tune the AI agent and contribute code — following the project's rules. No names to memorize: say what you want and the right guide kicks in on its own.",
  ctaInstalar: "Install the guides",
  ctaCatalogo: "See the six guides",
  copiar: "Copy",
  copiado: "Copied",
  selecionado: "Command selected. Copy it with Ctrl+C.",
  terminal: {
    pasta: "~/my-business",
    voce: "you",
    pedido: "I want to install the CRM on my VPS",
    usando: "using the deskcomm-instalar guide",
    passos: ["checks Docker, domain and DNS", "asks for the Supabase connection string", "runs install.sh and follows every step"],
  },
  passos: {
    titulo: "How it works",
    itens: [
      { titulo: "Install once", texto: "One command makes the guides available in any folder on your computer, for every assistant." },
      { titulo: "Start a new session", texto: "Assistants read guides when a session starts. A conversation that was already open won't see what just arrived." },
      { titulo: "Ask your own way", texto: "“The agent is answering wrong.” The assistant recognizes the topic and follows the guide. You can also call it by name." },
    ],
  },
  catalogo: {
    sobretitulo: "The guides",
    titulo: "One guide for each job.",
    texto: "Four are for people who install and run the CRM, no coding required. Two are for people who work on the code.",
    filtros: { todos: "All", opera: "For CRM operators", programa: "For developers" },
    paraQuem: "Who it's for",
    faz: "What it does",
    pecaAssim: "Ask like this",
    oficial: "View the guide on GitHub",
  },
  assistentes: {
    sobretitulo: "In your assistant",
    titulo: "How to use them in each one.",
    texto: "They all follow the same open guide standard (Agent Skills) and pick the guide on their own from the topic. What changes is where they look and how you call a guide by name.",
    onde: "Where it looks",
    sozinho: "On its own",
    peloNome: "By name",
    lista: "See the list",
    bomSaber: "Good to know",
    doc: "Official docs",
    outros: "Another assistant? Tools that follow the Agent Skills standard — like GitHub Copilot and Gemini CLI — usually read the .agents/skills folder, and the installer also links the guides into ~/.agents/skills.",
  },
  instalar: {
    sobretitulo: "Install",
    titulo: "Two ways to get the guides.",
    texto: "If you haven't cloned the project yet, or you work from another folder, use the installer. If you're in an up-to-date clone, you already have everything.",
    opcaoA: {
      titulo: "In any folder",
      selo: "Recommended",
      texto: "Paste it into your computer's terminal — not the VPS. It works before you clone the project.",
      atualizar: "To update, run the same command again.",
      remover: "To undo:",
      detalhes: [
        "Keeps a copy of just the guides in ~/.deskcomm/guias.",
        "Links each guide into the folders assistants read: ~/.claude/skills, ~/.agents/skills and ~/.gemini/config/skills.",
        "Never deletes a skill of yours with the same name: it warns and skips it.",
      ],
    },
    opcaoB: {
      titulo: "Inside a clone",
      texto: "The guides live in the repository itself. Open your assistant in the project folder and they're already there.",
      detalhes: [
        "They sit in .agents/skills, with a copy in .claude/skills for Claude Code.",
        "Keep your branch up to date with main: on an old branch, the guides are old too.",
      ],
    },
    windows: "On Windows, run it from Git Bash when the assistant is installed on Windows itself. Use WSL only if the assistant also runs inside WSL: there your home folder is the Linux one, which Windows apps don't read. Where the system can't create folder links, the installer copies the guides instead — then run the command again whenever you want to update.",
  },
  contribuir: {
    sobretitulo: "For contributors",
    titulo: "Changing a guide.",
    texto: "Guides are project code: they go in through a pull request and they have tests.",
    passos: [
      { titulo: "Edit the source", texto: "The file is .agents/skills/<guide>/SKILL.md. Keep the header description in quotes: a stray colon breaks strict parsers, and the guide disappears without a warning.", comando: null },
      { titulo: "Update the mirror", texto: "Copies the guides into .claude/skills, the Claude Code folder.", comando: COMANDOS.sincronizar },
      { titulo: "Run the test", texto: "Fails on an invalid header, an outdated mirror or a description that's too long.", comando: COMANDOS.testar },
      { titulo: "Try your version", texto: "In Claude Code, a guide installed globally wins over the project's. Point the installer at your clone before testing.", comando: COMANDOS.fonte },
    ],
  },
  faq: {
    titulo: "Frequently asked questions",
    itens: [
      { p: "Do I need to know the guide's name?", r: "No. The assistant picks the guide from what you ask. The name is for when you want to be sure which guide runs." },
      { p: "Will the assistant change my server on its own?", r: "It follows your assistant's permissions: commands ask for your confirmation unless you've allowed them. In the prompt guide, publishing the agent's new version is always up to you." },
      { p: "Do the guides read my customers' conversations?", r: "The metrics guide doesn't: it reads the database only with queries that sum and count, without opening message text or personal data. The prompt guide may read an excerpt when it's essential to see how the agent talks, and only with your knowledge: the messages the agent itself sent in a few recent conversations — not the customer's — without copying anything out of the session." },
      { p: "Does it work if I write in English or Spanish?", r: "Yes. The guides are written in Portuguese, and the assistant follows them while answering in the language you write in." },
      { p: "I already have a skill with the same name. Now what?", r: "The installer leaves it alone: it says it skipped it and carries on with the other guides." },
      { p: "I installed them and the guide doesn't show up.", r: "Start a new assistant session. In Antigravity, also confirm that you trust the project folder: there, an untrusted folder doesn't load its guides." },
    ],
  },
  guias: [
    {
      id: "deskcomm-instalar",
      publico: "opera",
      titulo: "Install and operate",
      resumo: "Gets the CRM running on a VPS and looks after it: updates, backups, domain, WhatsApp and installation errors.",
      paraQuem: "People who install it — technical or not — agencies and VPS operators.",
      faz: ["Walks you through the installation and runs the kit's scripts.", "Fixes SSL, DNS, Supabase, proxy and AI key issues.", "Updates, backs up and restores."],
      frases: ["I want to install the CRM on my VPS", "my site has no padlock", "how do I back it up?"],
    },
    {
      id: "deskcomm-cliente-novo",
      publico: "opera",
      titulo: "Set up a client",
      resumo: "Builds a client's customer service by niche — clinic, real estate, services, courses, store — in the right order, through the screens.",
      paraQuem: "Business owners, agencies and people implementing it for others.",
      faz: ["Creates AI agents, routers and follow-ups.", "Uploads the knowledge base and builds the pipeline.", "Hands you ready-to-paste text and guides you to the test."],
      frases: ["set up the CRM for a clinic", "what prompt should I use for the real estate agency's AI agent?", "I finished onboarding, now what?"],
    },
    {
      id: "deskcomm-metricas",
      publico: "opera",
      titulo: "Analyze the metrics",
      resumo: "Reads your operation like a seasoned analyst: conversion, pipeline, response time, human handoff and AI cost.",
      paraQuem: "Business owners, agencies and operators.",
      faz: ["Shows where the pipeline gets stuck and why conversion dropped.", "Tells you what the AI costs and when customers talk the most.", "States the yardstick and time zone behind every number."],
      frases: ["is the agent selling?", "why did conversion drop?", "how much am I spending on AI?"],
    },
    {
      id: "deskcomm-prompt",
      publico: "opera",
      titulo: "Tune the AI agent",
      resumo: "Improves the prompt of an agent that isn't performing, like a senior prompt engineer — using your operation's data.",
      paraQuem: "Business owners, agencies and implementers.",
      faz: ["Diagnoses from the agent's runs, blocks and costs.", "Writes the new version as a draft and tests it with the Test button.", "Leaves Publish to you."],
      frases: ["the agent sounds robotic", "it makes up prices", "improve the sales agent's prompt"],
    },
    {
      id: "deskcomm-contribuir",
      publico: "programa",
      titulo: "Contribute code",
      resumo: "Checks before your pull request what the maintainer checks after — so you avoid rework and rejected PRs.",
      paraQuem: "Contributors, especially from a fork, and agency developers.",
      faz: ["Warns when your branch is behind main.", "Asks for the migration, the missing test and the release fragment.", "Shows how to prove the change on screen."],
      frases: ["I'm going to open a PR", "is my branch behind?", "why did CI go red?"],
    },
    {
      id: "deskcomm-doutrina",
      publico: "programa",
      titulo: "Follow the code rules",
      resumo: "Points to this repository's non-negotiable rules whenever someone writes or reviews code.",
      paraQuem: "Anyone — person or AI — writing code in the project.",
      faz: ["Tenant isolation with RLS.", "Migration, baseline and manifest moving together.", "What changes for people who already installed it on a VPS."],
      frases: ["review this code", "how do I create a migration here?", "can I add this column?"],
    },
  ],
  lista: [
    {
      id: "claude",
      nome: "Claude Code",
      onde: "In the project's .claude/skills folder and in your personal folder.",
      pastas: [
        { rotulo: "Project", caminho: ".claude/skills/" },
        { rotulo: "Global", caminho: "~/.claude/skills/" },
      ],
      sozinho: "Reads each guide's description and triggers the one that matches your request.",
      peloNome: { texto: "Type a slash and the name. Whatever follows goes along to the guide.", exemplo: "/deskcomm-instalar my domain is crm.mycompany.com" },
      lista: { texto: "Shows every loaded guide.", exemplo: "/skills" },
      bomSaber: ["A global guide with the same name wins over the project's.", "Edited a guide? It reloads on its own. Just created the guides folder? Restart the session."],
      doc: "https://code.claude.com/docs/en/skills",
    },
    {
      id: "codex",
      nome: "Codex",
      onde: "In the project's .agents/skills folder and in your personal folder. Applies to the CLI and the IDE extension.",
      pastas: [
        { rotulo: "Project", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "Triggers the guide when your request matches its description.",
      peloNome: { texto: "Type a dollar sign and the name, or pick it from the menu.", exemplo: "$deskcomm-prompt the agent keeps making up prices" },
      lista: { texto: "Opens the guides menu.", exemplo: "/skills" },
      bomSaber: ["If a change doesn't show up, restart Codex."],
      doc: "https://learn.chatgpt.com/docs/build-skills",
    },
    {
      id: "cursor",
      nome: "Cursor",
      onde: "Reads .agents/skills and also .claude/skills — in the project and in your personal folder. Applies to the editor and the CLI.",
      pastas: [
        { rotulo: "Project", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "The agent sees the available guides and decides when each one is relevant.",
      peloNome: { texto: "In the Agent chat, type a slash and pick the guide. Option+Enter (Alt+Enter on Windows) keeps the guide on for the whole conversation.", exemplo: "/deskcomm-cliente-novo" },
      lista: { texto: "In the editor, under Customize › Skills. In the CLI, in the slash menu itself.", exemplo: null },
      bomSaber: ["The repository also ships a rule in .cursor/rules that reminds the agent to use the guides."],
      doc: "https://cursor.com/docs/skills",
    },
    {
      id: "antigravity",
      nome: "Antigravity",
      onde: "In the project's .agents/skills folder and in its own global folder, which the installer also fills.",
      pastas: [
        { rotulo: "Project", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.gemini/config/skills/" },
      ],
      sozinho: "The agent decides from context, without you asking for the guide.",
      peloNome: { texto: "In the CLI, each guide becomes a slash command. In the app, mention the guide by name in your request.", exemplo: "/deskcomm-metricas" },
      lista: { texto: "In the CLI, without spending quota. In the app, under Skills & Customizations.", exemplo: 'agy -p "/skills"' },
      bomSaber: [
        "We measured it: in a folder not marked as trusted, the CLI didn't load the project's guides — the global ones, yes. Installing with the command solves it.",
        "Here the project guide wins over a global one with the same name — the opposite of Claude Code.",
      ],
      doc: "https://antigravity.google/docs/skills/",
    },
    {
      id: "opencode",
      nome: "OpenCode",
      onde: "Reads .agents/skills and .claude/skills, in the project and in your personal folder.",
      pastas: [
        { rotulo: "Project", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "The model calls the guides tool when your request matches.",
      peloNome: { texto: "Ask for it by name, in plain language.", exemplo: "use the deskcomm-contribuir guide and check my branch" },
      lista: { texto: "Lists every guide with the folder it came from.", exemplo: "opencode debug skill" },
      bomSaber: ["Edited a guide? Restart OpenCode: its configuration doesn't reload on its own."],
      doc: "https://opencode.ai/docs/skills/",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// es (latinoamericano, tuteo — igual que la home)
// ─────────────────────────────────────────────────────────────────────────────

const es: TextosGuias = {
  meta: {
    titulo: "Guías del asistente — DeskcommCRM",
    descricao:
      "Seis guías que enseñan a Claude Code, Codex, Cursor, Antigravity y OpenCode a instalar, configurar, analizar y mejorar DeskcommCRM contigo. Qué hace cada una y cómo usarla en cada asistente.",
  },
  sobretitulo: "Guías del asistente",
  titulo: "Tu asistente de código ya sabe trabajar en DeskcommCRM.",
  subtitulo:
    "Son seis guías que enseñan a Claude Code, Codex, Cursor, Antigravity y OpenCode a instalar el CRM, configurar un cliente, leer las métricas, afinar el agente de IA y contribuir con el código — siguiendo las reglas del proyecto. No tienes que memorizar nombres: di lo que quieres y la guía correcta entra sola.",
  ctaInstalar: "Instalar las guías",
  ctaCatalogo: "Ver las seis guías",
  copiar: "Copiar",
  copiado: "Copiado",
  selecionado: "Comando seleccionado. Cópialo con Ctrl+C.",
  terminal: {
    pasta: "~/mi-negocio",
    voce: "tú",
    pedido: "quiero instalar el CRM en mi VPS",
    usando: "usando la guía deskcomm-instalar",
    passos: ["revisa Docker, dominio y DNS", "pide la connection string de Supabase", "ejecuta install.sh y acompaña cada paso"],
  },
  passos: {
    titulo: "Cómo funciona",
    itens: [
      { titulo: "Instala una vez", texto: "Un comando deja las guías disponibles en cualquier carpeta de tu computadora, para todos los asistentes." },
      { titulo: "Abre una sesión nueva", texto: "Los asistentes leen las guías cuando empieza la sesión. Una conversación que ya estaba abierta no ve lo que acaba de llegar." },
      { titulo: "Pide a tu manera", texto: "“El agente está respondiendo mal.” El asistente reconoce el tema y sigue la guía. Si prefieres, llámala por su nombre." },
    ],
  },
  catalogo: {
    sobretitulo: "Las guías",
    titulo: "Una guía para cada trabajo.",
    texto: "Cuatro son para quien instala y opera el CRM, y no exigen saber programar. Dos son para quien trabaja en el código.",
    filtros: { todos: "Todas", opera: "Para quien usa el CRM", programa: "Para quien programa" },
    paraQuem: "Para quién",
    faz: "Qué hace",
    pecaAssim: "Pídelo así",
    oficial: "Ver la guía en GitHub",
  },
  assistentes: {
    sobretitulo: "En tu asistente",
    titulo: "Cómo usarlas en cada uno.",
    texto: "Todos siguen el mismo estándar abierto de guías (Agent Skills) y activan la guía solos según el tema. Cambia dónde buscan y cómo llamar una guía por su nombre.",
    onde: "Dónde busca",
    sozinho: "Por su cuenta",
    peloNome: "Por nombre",
    lista: "Ver la lista",
    bomSaber: "Conviene saber",
    doc: "Documentación oficial",
    outros: "¿Otro asistente? Los que siguen el estándar Agent Skills — como GitHub Copilot y Gemini CLI — suelen leer la carpeta .agents/skills, y el instalador también enlaza las guías en ~/.agents/skills.",
  },
  instalar: {
    sobretitulo: "Instalar",
    titulo: "Dos formas de tener las guías.",
    texto: "Si todavía no clonaste el proyecto, o trabajas desde otra carpeta, usa el instalador. Si estás en un clon actualizado, ya tienes todo.",
    opcaoA: {
      titulo: "En cualquier carpeta",
      selo: "Recomendado",
      texto: "Pégalo en la terminal de tu computadora — no en el VPS. Funciona antes de clonar el proyecto.",
      atualizar: "Para actualizar, ejecuta el mismo comando otra vez.",
      remover: "Para deshacer:",
      detalhes: [
        "Guarda una copia solo de las guías en ~/.deskcomm/guias.",
        "Enlaza cada guía en las carpetas que leen los asistentes: ~/.claude/skills, ~/.agents/skills y ~/.gemini/config/skills.",
        "Nunca borra una skill tuya con el mismo nombre: avisa y la salta.",
      ],
    },
    opcaoB: {
      titulo: "Dentro de un clon",
      texto: "Las guías viven en el propio repositorio. Abre el asistente en la carpeta del proyecto y ya están ahí.",
      detalhes: [
        "Están en .agents/skills, con una copia en .claude/skills para Claude Code.",
        "Mantén tu rama actualizada con main: en una rama vieja, las guías también son viejas.",
      ],
    },
    windows: "En Windows, ejecútalo desde Git Bash si el asistente está instalado en el propio Windows. Desde WSL, solo si el asistente también corre dentro de WSL: ahí tu carpeta personal es la de Linux, que los programas de Windows no leen. Donde el sistema no crea enlaces de carpeta, el instalador copia las guías — entonces vuelve a ejecutar el comando cada vez que quieras actualizar.",
  },
  contribuir: {
    sobretitulo: "Para quien contribuye",
    titulo: "Cambiar una guía.",
    texto: "Las guías son código del proyecto: entran por pull request y tienen pruebas.",
    passos: [
      { titulo: "Edita la fuente", texto: "El archivo es .agents/skills/<guía>/SKILL.md. Deja la descripción del encabezado entre comillas: dos puntos sueltos rompen los lectores estrictos, y la guía desaparece sin aviso.", comando: null },
      { titulo: "Actualiza el espejo", texto: "Copia las guías a .claude/skills, la carpeta de Claude Code.", comando: COMANDOS.sincronizar },
      { titulo: "Ejecuta la prueba", texto: "Reprueba un encabezado inválido, un espejo desactualizado y una descripción demasiado larga.", comando: COMANDOS.testar },
      { titulo: "Prueba tu versión", texto: "En Claude Code, una guía instalada de forma global le gana a la del proyecto. Apunta el instalador a tu clon antes de probar.", comando: COMANDOS.fonte },
    ],
  },
  faq: {
    titulo: "Preguntas frecuentes",
    itens: [
      { p: "¿Necesito saber el nombre de la guía?", r: "No. El asistente elige la guía según lo que pides. El nombre sirve cuando quieres estar seguro de qué guía va a entrar." },
      { p: "¿El asistente va a cambiar mi servidor solo?", r: "Sigue los permisos de tu asistente: los comandos piden tu confirmación, salvo que los hayas liberado. En la guía de prompt, publicar la nueva versión del agente siempre queda en tus manos." },
      { p: "¿Las guías leen las conversaciones de mis clientes?", r: "La de métricas, no: lee la base solo con consultas que suman y cuentan, sin abrir el texto de los mensajes ni datos personales. La de prompt puede leer un fragmento cuando es indispensable para ver cómo habla el agente, y solo con tu conocimiento: los mensajes que el propio agente envió en pocas conversaciones recientes — no los del cliente —, sin copiar nada fuera de la sesión." },
      { p: "¿Funciona si escribo en español o en inglés?", r: "Sí. Las guías están escritas en portugués, y el asistente las sigue y te responde en el idioma en que escribes." },
      { p: "Ya tengo una skill con el mismo nombre. ¿Y ahora?", r: "El instalador no la toca: avisa que la saltó y sigue con las otras guías." },
      { p: "Instalé y la guía no aparece.", r: "Abre una sesión nueva del asistente. En Antigravity, confirma también que confías en la carpeta del proyecto: ahí, una carpeta no confiable no carga sus guías." },
    ],
  },
  guias: [
    {
      id: "deskcomm-instalar",
      publico: "opera",
      titulo: "Instalar y operar",
      resumo: "Pone el CRM en línea en un VPS y lo cuida después: actualizaciones, respaldos, dominio, WhatsApp y los errores de instalación.",
      paraQuem: "Quien instala, aunque no sea técnico, agencias y quien opera un VPS.",
      faz: ["Guía la instalación paso a paso y ejecuta los scripts del kit.", "Resuelve SSL, DNS, Supabase, proxy y clave de IA.", "Actualiza, respalda y restaura."],
      frases: ["quiero instalar el CRM en mi VPS", "mi sitio no tiene el candado", "¿cómo hago un respaldo?"],
    },
    {
      id: "deskcomm-cliente-novo",
      publico: "opera",
      titulo: "Configurar un cliente",
      resumo: "Arma la atención de un cliente según su nicho — clínica, inmobiliaria, servicios, cursos, tienda — en el orden correcto y desde la pantalla.",
      paraQuem: "Dueños de negocio, agencias y quien implementa para terceros.",
      faz: ["Crea agentes de IA, enrutadores y seguimientos.", "Sube la base de conocimiento y arma el embudo.", "Te da el texto listo para pegar y te guía hasta la prueba."],
      frases: ["configura el CRM para una clínica", "¿qué prompt uso en el agente de la inmobiliaria?", "terminé el onboarding, ¿y ahora?"],
    },
    {
      id: "deskcomm-metricas",
      publico: "opera",
      titulo: "Analizar las métricas",
      resumo: "Lee la operación como un analista experimentado: conversión, embudo, tiempo de respuesta, paso a humano y costo de IA.",
      paraQuem: "Dueños de negocio, agencias y operadores.",
      faz: ["Muestra dónde se traba el embudo y por qué cayó la conversión.", "Dice cuánto cuesta la IA y a qué hora escriben más los clientes.", "Declara la regla y la zona horaria de cada número."],
      frases: ["¿el agente está vendiendo?", "¿por qué cayó la conversión?", "¿cuánto estoy gastando en IA?"],
    },
    {
      id: "deskcomm-prompt",
      publico: "opera",
      titulo: "Afinar el agente de IA",
      resumo: "Mejora el prompt de un agente que no está rindiendo, como un ingeniero de prompts sénior — con los datos de la operación.",
      paraQuem: "Dueños de negocio, agencias e implementadores.",
      faz: ["Diagnostica por las ejecuciones, bloqueos y costos del agente.", "Escribe la nueva versión como borrador y la prueba con el botón Probar.", "Deja el Publicar en tus manos."],
      frases: ["el agente suena robótico", "inventa precios", "mejora el prompt del agente de ventas"],
    },
    {
      id: "deskcomm-contribuir",
      publico: "programa",
      titulo: "Contribuir con código",
      resumo: "Revisa antes del pull request lo que el mantenedor revisa después — y evita retrabajo y PR rechazados.",
      paraQuem: "Quien contribuye, sobre todo desde un fork, y devs de agencia.",
      faz: ["Avisa cuando tu rama está atrasada respecto a main.", "Pide la migración, la prueba que falta y el fragmento de release.", "Muestra cómo probar el cambio en pantalla."],
      frases: ["voy a abrir un PR", "¿mi rama está atrasada?", "¿por qué el CI quedó en rojo?"],
    },
    {
      id: "deskcomm-doutrina",
      publico: "programa",
      titulo: "Seguir las reglas del código",
      resumo: "Señala las reglas no negociables de este repositorio cada vez que alguien escribe o revisa código.",
      paraQuem: "Cualquier persona o IA que escriba código en el proyecto.",
      faz: ["Aislamiento entre empresas con RLS.", "Migración, baseline y manifiesto andando juntos.", "Qué cambia para quien ya instaló en un VPS."],
      frases: ["revisa este código", "¿cómo creo una migración aquí?", "¿puedo agregar esta columna?"],
    },
  ],
  lista: [
    {
      id: "claude",
      nome: "Claude Code",
      onde: "En la carpeta .claude/skills del proyecto y en tu carpeta personal.",
      pastas: [
        { rotulo: "Proyecto", caminho: ".claude/skills/" },
        { rotulo: "Global", caminho: "~/.claude/skills/" },
      ],
      sozinho: "Lee la descripción de cada guía y activa la que coincide con tu pedido.",
      peloNome: { texto: "Escribe la barra y el nombre. Lo que escribas después se le pasa a la guía.", exemplo: "/deskcomm-instalar mi dominio es crm.miempresa.com" },
      lista: { texto: "Muestra todas las guías cargadas.", exemplo: "/skills" },
      bomSaber: ["Una guía global con el mismo nombre le gana a la del proyecto.", "¿Cambiaste el texto de una guía? Se recarga sola. ¿Acabas de crear la carpeta de guías? Reinicia la sesión."],
      doc: "https://code.claude.com/docs/en/skills",
    },
    {
      id: "codex",
      nome: "Codex",
      onde: "En la carpeta .agents/skills del proyecto y en tu carpeta personal. Vale para la CLI y la extensión de IDE.",
      pastas: [
        { rotulo: "Proyecto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "Activa la guía cuando tu pedido coincide con su descripción.",
      peloNome: { texto: "Escribe el signo de dólar y el nombre, o elígela en el menú.", exemplo: "$deskcomm-prompt el agente está inventando precios" },
      lista: { texto: "Abre el menú de guías.", exemplo: "/skills" },
      bomSaber: ["Si un cambio no aparece, reinicia Codex."],
      doc: "https://learn.chatgpt.com/docs/build-skills",
    },
    {
      id: "cursor",
      nome: "Cursor",
      onde: "Lee .agents/skills y también .claude/skills — en el proyecto y en tu carpeta personal. Vale para el editor y la CLI.",
      pastas: [
        { rotulo: "Proyecto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "El agente ve las guías disponibles y decide cuándo es relevante cada una.",
      peloNome: { texto: "En el chat del Agent, escribe la barra y elige la guía. Option+Enter (Alt+Enter en Windows) deja la guía activa en toda la conversación.", exemplo: "/deskcomm-cliente-novo" },
      lista: { texto: "En el editor, en Customize › Skills. En la CLI, en el mismo menú de la barra.", exemplo: null },
      bomSaber: ["El repositorio también trae una regla en .cursor/rules que le recuerda al agente usar las guías."],
      doc: "https://cursor.com/docs/skills",
    },
    {
      id: "antigravity",
      nome: "Antigravity",
      onde: "En la carpeta .agents/skills del proyecto y en una carpeta global propia, que el instalador también llena.",
      pastas: [
        { rotulo: "Proyecto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.gemini/config/skills/" },
      ],
      sozinho: "El agente decide por el contexto, sin que tengas que pedir la guía.",
      peloNome: { texto: "En la CLI, cada guía se vuelve un comando de barra. En la app, menciona la guía por su nombre en el pedido.", exemplo: "/deskcomm-metricas" },
      lista: { texto: "En la CLI, sin gastar cuota. En la app, en Skills & Customizations.", exemplo: 'agy -p "/skills"' },
      bomSaber: [
        "Lo medimos: en una carpeta no marcada como confiable, la CLI no cargó las guías del proyecto — las globales, sí. Instalar con el comando lo resuelve.",
        "Aquí la guía del proyecto le gana a la global con el mismo nombre — lo contrario de Claude Code.",
      ],
      doc: "https://antigravity.google/docs/skills/",
    },
    {
      id: "opencode",
      nome: "OpenCode",
      onde: "Lee .agents/skills y .claude/skills, en el proyecto y en tu carpeta personal.",
      pastas: [
        { rotulo: "Proyecto", caminho: ".agents/skills/" },
        { rotulo: "Global", caminho: "~/.agents/skills/" },
      ],
      sozinho: "El modelo llama a la herramienta de guías cuando tu pedido coincide.",
      peloNome: { texto: "Pídela por su nombre, en lenguaje natural.", exemplo: "usa la guía deskcomm-contribuir y revisa mi rama" },
      lista: { texto: "Lista cada guía con la carpeta de donde vino.", exemplo: "opencode debug skill" },
      bomSaber: ["¿Cambiaste una guía? Reinicia OpenCode: su configuración no se recarga sola."],
      doc: "https://opencode.ai/docs/skills/",
    },
  ],
};

export const TEXTOS_GUIAS: Record<Idioma, TextosGuias> = { "pt-BR": pt, en, es };
