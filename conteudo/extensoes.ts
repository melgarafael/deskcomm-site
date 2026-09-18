import type { Idioma } from "./tipos";

/**
 * Os textos da vitrine de extensões, nos três idiomas.
 *
 * O que esta página NÃO pode dizer, e a razão é lei do produto
 * (`docs/doctrine/extensoes.md`, não-negociável 11): nada de "marketplace",
 * "avaliações", "downloads", "SDK" ou "código de terceiros". Nenhuma dessas
 * coisas existe, e prometer a quem vai investir uma semana escrevendo um pacote
 * é a pior forma de prometer. O que a página diz é o que uma extensão faz hoje —
 * e, com a mesma clareza, o que ela não faz.
 */
export type TextosExtensoes = {
  meta: { titulo: string; descricao: string };
  sobretitulo: string;
  titulo: string;
  subtitulo: string;
  ctaCatalogo: string;
  ctaCriar: string;
  oQueE: { titulo: string; paragrafos: string[] };
  limites: { titulo: string; itens: string[] };
  catalogo: { titulo: string; subtitulo: string; abre: string; por: string; copiar: string; copiado: string };
  instalar: { titulo: string; passos: { titulo: string; texto: string }[]; nota: string };
  criar: { titulo: string; texto: string; cta: string };
  vazio: string;
};

export const EXTENSOES_ATUALIZADO_EM = "2026-09-18";

export const TEXTOS_EXTENSOES: Record<Idioma, TextosExtensoes> = {
  "pt-BR": {
    meta: {
      titulo: "Extensões — DeskcommCRM",
      descricao:
        "Guias de trabalho que você instala no seu CRM: roteiros curtos que levam sua equipe à tela certa. Código aberto, instalação pela tela, sem acesso aos seus dados.",
    },
    sobretitulo: "Extensões",
    titulo: "Roteiros de trabalho que você instala no seu CRM",
    subtitulo:
      "Uma extensão é um guia curto que fica dentro do sistema e leva sua equipe à tela certa na hora certa. Ela não lê seus dados, não envia mensagem e não roda código na sua máquina.",
    ctaCatalogo: "Ver as extensões",
    ctaCriar: "Criar a sua",
    oQueE: {
      titulo: "O que é uma extensão",
      paragrafos: [
        "Todo negócio tem um punhado de rotinas que ninguém escreveu em lugar nenhum: quem ligar hoje, o que perguntar, quando parar de insistir. Elas vivem na cabeça de quem está há mais tempo na casa — e somem quando essa pessoa sai de férias.",
        "Uma extensão é esse conhecimento escrito e colocado dentro do CRM, ao lado do trabalho. Cada cartão traz um roteiro curto e um botão que abre a tela onde a ação acontece.",
      ],
    },
    limites: {
      titulo: "O que ela não faz — e isso é de propósito",
      itens: [
        "Não lê seus contatos, conversas nem negócios.",
        "Não envia mensagem, não muda dado e não gasta nada.",
        "Não roda código: o pacote é um arquivo de texto, conferido antes de entrar.",
        "Não escolhe para onde te manda: ela pede uma tela por nome, de uma lista fechada, e o sistema é quem resolve o caminho.",
      ],
    },
    catalogo: {
      titulo: "Extensões disponíveis",
      subtitulo: "Revisadas e publicadas por nós. O código de cada uma é aberto.",
      abre: "Abre",
      por: "por",
      copiar: "Copiar código",
      copiado: "Copiado",
    },
    instalar: {
      titulo: "Como instalar",
      passos: [
        { titulo: "Baixe o catálogo", texto: "No servidor onde o CRM está instalado, rode ./extensao.sh baixar. Ele baixa o arquivo e confere que ele não mudou no caminho." },
        { titulo: "Envie pelo painel", texto: "No CRM, abra Extensões, envie o arquivo e escolha o pacote pelo código (algo como deskcomm/carrinho-abandonado)." },
        { titulo: "Ative na sua empresa", texto: "Instalar é do administrador do servidor; ativar é de cada empresa. Antes de aceitar, a tela mostra quais telas a extensão vai abrir." },
      ],
      nota: "A instalação é pela tela de propósito: ela pede a verificação em duas etapas e registra quem instalou — coisas que um comando no servidor não teria como fazer.",
    },
    criar: {
      titulo: "Criar a sua extensão",
      texto:
        "O formato é um arquivo de texto, sem código. Se você já tem uma rotina que funciona no seu nicho, escrevê-la como extensão leva uma tarde. Há um guia passo a passo, com um exemplo pronto e um validador que roda antes de você enviar.",
      cta: "Ler o guia de autoria",
    },
    vazio: "O catálogo está sendo publicado. Volte em alguns minutos.",
  },

  en: {
    meta: {
      titulo: "Extensions — DeskcommCRM",
      descricao:
        "Work guides you install in your CRM: short playbooks that take your team to the right screen. Open source, installed from the screen, with no access to your data.",
    },
    sobretitulo: "Extensions",
    titulo: "Work playbooks you install in your CRM",
    subtitulo:
      "An extension is a short guide that lives inside the system and takes your team to the right screen at the right time. It does not read your data, does not send messages and does not run code on your machine.",
    ctaCatalogo: "Browse extensions",
    ctaCriar: "Build your own",
    oQueE: {
      titulo: "What an extension is",
      paragrafos: [
        "Every business has a handful of routines nobody ever wrote down: who to call today, what to ask, when to stop chasing. They live in the head of whoever has been there longest — and disappear when that person goes on holiday.",
        "An extension is that knowledge written down and placed inside the CRM, next to the work. Each card carries a short playbook and a button that opens the screen where the action happens.",
      ],
    },
    limites: {
      titulo: "What it does not do — by design",
      itens: [
        "It does not read your contacts, conversations or deals.",
        "It does not send messages, change data or spend anything.",
        "It does not run code: the package is a text file, checked before it goes in.",
        "It does not choose where it sends you: it asks for a screen by name, from a closed list, and the system resolves the path.",
      ],
    },
    catalogo: {
      titulo: "Available extensions",
      subtitulo: "Reviewed and published by us. Every one of them is open source.",
      abre: "Opens",
      por: "by",
      copiar: "Copy code",
      copiado: "Copied",
    },
    instalar: {
      titulo: "How to install",
      passos: [
        { titulo: "Download the catalogue", texto: "On the server running your CRM, run ./extensao.sh baixar. It downloads the file and checks it did not change on the way." },
        { titulo: "Upload it in the panel", texto: "In the CRM, open Extensions, upload the file and pick the package by its code (something like deskcomm/carrinho-abandonado)." },
        { titulo: "Enable it for your company", texto: "Installing is the server administrator's call; enabling is each company's. Before you accept, the screen shows which screens the extension will open." },
      ],
      nota: "Installing happens on screen by design: it requires two-step verification and records who installed it — things a command on the server could not do.",
    },
    criar: {
      titulo: "Build your own extension",
      texto:
        "The format is a text file, with no code. If you already have a routine that works in your niche, writing it as an extension takes an afternoon. There is a step-by-step guide, a ready example and a validator you can run before submitting.",
      cta: "Read the authoring guide",
    },
    vazio: "The catalogue is being published. Check back in a few minutes.",
  },

  es: {
    meta: {
      titulo: "Extensiones — DeskcommCRM",
      descricao:
        "Guías de trabajo que instalas en tu CRM: rutinas cortas que llevan a tu equipo a la pantalla correcta. Código abierto, instalación por pantalla, sin acceso a tus datos.",
    },
    sobretitulo: "Extensiones",
    titulo: "Rutinas de trabajo que instalas en tu CRM",
    subtitulo:
      "Una extensión es una guía corta que vive dentro del sistema y lleva a tu equipo a la pantalla correcta en el momento correcto. No lee tus datos, no envía mensajes y no ejecuta código en tu máquina.",
    ctaCatalogo: "Ver las extensiones",
    ctaCriar: "Crear la tuya",
    oQueE: {
      titulo: "Qué es una extensión",
      paragrafos: [
        "Todo negocio tiene un puñado de rutinas que nadie escribió en ninguna parte: a quién llamar hoy, qué preguntar, cuándo dejar de insistir. Viven en la cabeza de quien lleva más tiempo en la casa — y desaparecen cuando esa persona se va de vacaciones.",
        "Una extensión es ese conocimiento escrito y puesto dentro del CRM, al lado del trabajo. Cada tarjeta trae una rutina corta y un botón que abre la pantalla donde ocurre la acción.",
      ],
    },
    limites: {
      titulo: "Lo que no hace — y es a propósito",
      itens: [
        "No lee tus contactos, conversaciones ni negocios.",
        "No envía mensajes, no cambia datos y no gasta nada.",
        "No ejecuta código: el paquete es un archivo de texto, revisado antes de entrar.",
        "No elige adónde te manda: pide una pantalla por su nombre, de una lista cerrada, y el sistema resuelve el camino.",
      ],
    },
    catalogo: {
      titulo: "Extensiones disponibles",
      subtitulo: "Revisadas y publicadas por nosotros. El código de cada una es abierto.",
      abre: "Abre",
      por: "por",
      copiar: "Copiar código",
      copiado: "Copiado",
    },
    instalar: {
      titulo: "Cómo instalar",
      passos: [
        { titulo: "Descarga el catálogo", texto: "En el servidor donde está el CRM, ejecuta ./extensao.sh baixar. Descarga el archivo y comprueba que no cambió en el camino." },
        { titulo: "Envíalo por el panel", texto: "En el CRM, abre Extensiones, envía el archivo y elige el paquete por su código (algo como deskcomm/carrinho-abandonado)." },
        { titulo: "Actívala en tu empresa", texto: "Instalar es del administrador del servidor; activar es de cada empresa. Antes de aceptar, la pantalla muestra qué pantallas abrirá la extensión." },
      ],
      nota: "La instalación es por pantalla a propósito: pide la verificación en dos pasos y registra quién instaló — cosas que un comando en el servidor no podría hacer.",
    },
    criar: {
      titulo: "Crear tu extensión",
      texto:
        "El formato es un archivo de texto, sin código. Si ya tienes una rutina que funciona en tu nicho, escribirla como extensión lleva una tarde. Hay una guía paso a paso, un ejemplo listo y un validador que puedes ejecutar antes de enviar.",
      cta: "Leer la guía de autoría",
    },
    vazio: "El catálogo se está publicando. Vuelve en unos minutos.",
  },
};
