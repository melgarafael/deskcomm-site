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
};
