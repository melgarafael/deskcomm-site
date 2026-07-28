import type { Conteudo } from "./tipos";

/**
 * Inglês: público dev global. A parceria de hospedagem pesa MENOS aqui — o
 * argumento é self-host, auditabilidade e ausência de tier pago. Não é tradução
 * literal do português: é o mesmo produto contado para quem avalia adotar código.
 */
export const en: Conteudo = {
  meta: {
    titulo: "DeskcommCRM — the open-source AI sales OS for WhatsApp",
    descricao:
      "AI agents that answer, qualify and move deals over WhatsApp, inside a CRM you host yourself. Every agent action is auditable. MIT-licensed, no paid tier, no per-seat pricing.",
  },
  nav: { comoFunciona: "How it works", prova: "Proof", instalar: "Install", preco: "Pricing", ctaInstalar: "Install on a VPS" },
  hero: {
    sobretitulo: "Desk + comm — the sales desk",
    h1a: "Your whole sales operation on one desk.",
    h1b: "And nothing dies on it.",
    sub: "AI agents answer on WhatsApp, qualify the lead and move the pipeline — every action recorded and auditable. On your own server, with no per-seat pricing.",
    ctaPrimario: "Install on my VPS",
    ctaSecundario: "See the code on GitHub",
    microcopy: "MIT licence · no paid tier · 4 GB of RAM",
  },
  viloes: {
    titulo: "You're not losing deals for lack of leads.",
    itens: [
      {
        titulo: "The CRM that's a pretty spreadsheet",
        texto:
          "A lead arrives, someone types it in, and nothing happens. By the time you notice, it's gone — and no one can say when, or why. The system kept the name and lost the story.",
        alt: "A desk with disconnected modules, grooves that stop before reaching anything, and a hole a lead is falling through.",
      },
      {
        titulo: "The bot that replies and vanishes",
        texto:
          "Fast to answer, happy to say anything, then gone. If it promised a deadline that doesn't exist, your customer tells you. You can't audit what it said — let alone why it said it.",
        alt: "An isolated module emitting waves over a desk fragment that ends abruptly, with grooves leading nowhere.",
      },
    ],
    fecho: { antes: "Both share one root cause: ", forte: "the system isn't responsible for what happens next." },
  },
  virada: {
    sobretitulo: "The category",
    tituloA: "A ",
    tituloDestaque: "living",
    sub: "Living has a definition — and it was written in the repository before it was written on this page. Five rules every part of the system must satisfy to ship.",
    regras: [
      { regra: "Nothing is an island", prova: "Every piece has an input and an output. The architecture map is public in the repo." },
      { regra: "No lead dies undiagnosed", prova: "A stalled request shows up in the Radar, classified by risk — before it becomes a loss." },
      { regra: "Every AI action is auditable", prova: "Seven guardrails before each send. Each one becomes a record — including the ones that block." },
      { regra: "An invisible log is a dead log", prova: "Every meaningful mutation becomes an activity on the timeline, visible on screen." },
      { regra: "Follow-up is the anti-death mechanism", prova: "An open request with no defined next step is treated as a leak in the system." },
    ],
    fecho: {
      antes: "This isn't what we promise — it's the bar a change has to clear to enter the system. It lives in ",
      link: "docs/doctrine/sistema-vivo.md",
      depois: ", and the seven-question checklist is answered before every merge.",
    },
  },
  jornada: {
    sobretitulo: "The life of a lead",
    titulo: "What happens between the message and the sale.",
    passos: [
      { titulo: "09:41 — a message arrives", texto: "“Do you deliver to Salvador?” Before any reply, the system already knows who this is: history, orders, what was agreed last time." },
      { titulo: "The agent reads before it speaks", texto: "It searches your company's knowledge base — your lead times, your policy, your catalogue. It doesn't invent." },
      { titulo: "Seven checks before sending", texto: "Opt-out, privacy, anti-ban, copy variation, deterministic promise, semantic promise and automation disclosure. In that order, always." },
      { titulo: "Including what it decided not to send", texto: "The agent was about to promise 24-hour delivery. The guardrail blocked it: that lead time doesn't exist in your catalogue. What it was going to say — and why it didn't — is on the record." },
      { titulo: "The lead moves on its own", texto: "Once qualified, it changes pipeline stage. The tag lands, the owner is set — and every move carries a recorded reason." },
      { titulo: "When it's the human's turn, they get context", texto: "Not the raw thread: a summary of what happened, what was agreed, which objections came up and what the next step is." },
      { titulo: "And if nobody replies, it doesn't die", texto: "A follow-up is scheduled. If it goes cold, the lead appears in the Radar classified by risk — before it turns into a loss." },
    ],
  },
  instalar: {
    sobretitulo: "Installation",
    titulo: "One command. Then it's yours.",
    sub: "The script checks dependencies, generates every secret, applies the database, creates the first admin, brings the containers up and wires the scheduled task that fires automations.",
    apoio: [
      { titulo: "4 GB of RAM recommended", texto: "The server compiles nothing — it pulls a prebuilt image. The stack boots on 2 GB but runs at the edge: seven containers, and each WhatsApp session costs about 150 MB." },
      { titulo: "Automatic HTTPS", texto: "The certificate is issued on first access. You don't configure TLS by hand." },
      { titulo: "Stuck? There's an assistant", texto: "Open Claude Code inside the VPS and it walks you through the install in conversation, with nine environment traps already mapped." },
    ],
    comentario1: "# 1. get the project",
    comentario2: "# 2. install",
    depois: "After that: open your domain, enrol the admin's two-factor and scan the WhatsApp QR. All from the screen.",
    atualizarTitulo: "Updating doesn't break it",
    atualizarTexto: "backs up the database first, reapplies the schema idempotently and health-checks at the end. The upgrade path is tested in CI — not merely documented.",
  },
  preco: {
    sobretitulo: "Pricing",
    titulo: "The software is free. You pay for the server.",
    sub: "There's no paid tier, no gated feature, no per-seat charge. What you pay for is the VPS it runs on and the AI keys you consume.",
    cartoes: [
      { t: "MIT licence", d: "Use it, modify it, resell it. Commercially too, without asking permission." },
      { t: "No paid tier", d: "What you install today is the complete product. There's no tier waiting for you to grow." },
      { t: "Your bill doesn't grow with the team", d: "Five people in sales or fifty cost the same VPS." },
    ],
    fecho: "Closed platforms charge per seat: the cost climbs with the team, in the same year you hire. Here the cost belongs to the server, and the server doesn't know how many people use it.",
  },
  banner: {
    sobretitulo: "Official partner",
    titulo: "Run it in Brazil, on HostGator",
    texto: "Datacenter in Brazil, no international data transfer. It's where DeskcommCRM was built to run — the VPS NVMe 4 plan handles it comfortably.",
    cta: "Get the VPS with the partner discount",
    microcopy: "partner link — subscribing through it supports the project",
  },
  prova: {
    sobretitulo: "Proof",
    titulo: "Don't take our word for it.",
    sub: "Every claim on this page points at a file in the public repository. If one of them doesn't hold, that's a bug — and worth an issue.",
    itens: [
      { afirmacao: "Tenant isolation is tested on every change. CI boots a clean Postgres and runs 364 invariant tests. One of them creates two organizations and proves that one sees zero rows of the other — and a control case first proves those rows exist, otherwise the test would pass against an empty table.", caminho: "tests/invariants/rls-isolation.test.ts" },
      { afirmacao: "Seven guardrails before every send, in fixed and versioned order. Each evaluation becomes a durable, exportable record — including the ones that blocked a message.", caminho: "lib/agent-engine/guardrails/before-send.ts" },
      { afirmacao: "Updating doesn't break: the schema is applied to a fresh database and reapplied to an existing one, proving idempotency. The upgrade path is tested, not merely documented.", caminho: "scripts/test-db.sh" },
      { afirmacao: "MIT licence, no paid tier, no gated features. What you install is the complete product.", caminho: "LICENSE" },
    ],
    cta: "Star it on GitHub",
    ctaNota: "it's what helps other people find the project",
  },
  radar: {
    sobretitulo: "Anti-death",
    titulo: "How many leads are dying right now?",
    texto: "The Radar answers that. Every open request is classified by time without interaction and by what's still pending. Not last month's report — the state right now.",
    fecho: "A number on screen that doesn't change a decision is noise. This one does.",
    faixas: ["critical", "at risk", "in flight"],
  },
  nichos: {
    sobretitulo: "Multi-vertical",
    titulo: "The same system serves a clinic and a sneaker store.",
    texto: "Pipeline vocabulary is configurable. It's not a theme, not a fork, not a “clinics edition” — it's the same core, configured.",
    abas: [
      { nicho: "E-commerce", lead: "Customer", ganho: "Paid" },
      { nicho: "Clinic", lead: "Patient", ganho: "Booked" },
      { nicho: "Real estate", lead: "Prospect", ganho: "Closed" },
      { nicho: "Services", lead: "Enquiry", ganho: "Signed" },
    ],
  },
  revendedor: {
    sobretitulo: "For agencies",
    titulo: "Install it for your clients.",
    texto: "Two variables in .env change the name and logo across the whole interface — without touching code, because edited code is lost on the next update. MIT licence: modify it, host it for third parties, charge for it.",
    honestidade: "What it still does NOT do: colours and fonts require changing the design system, and branding is per installation, not per organization. It's written in the guide — better you know now than find out in front of your client.",
    cta: "Read the agency guide",
  },
  faq: {
    titulo: "Questions you're about to ask",
    perguntas: [
      { p: "How much does DeskcommCRM cost?", r: "The software is free and open source under the MIT licence. There is no paid tier and no gated feature. You only pay for infrastructure: the VPS and the AI keys you consume." },
      { p: "Do I need to know how to code to install it?", r: "No, but you do need to follow a step-by-step and have your credentials at hand. Installation is one command, and the kit ships an AI assistant that walks you through it in conversation." },
      { p: "What VPS do I need?", r: "4 GB of RAM is the recommendation. The stack boots on 2 GB but runs at the edge: seven containers, and each WhatsApp session costs about 150 MB." },
      { p: "What kind of business is it for?", r: "Any business that sells through conversation. Pipeline vocabulary is configurable, so the same system serves e-commerce, clinics, real estate, info-products and service providers." },
      { p: "Can I install it for clients and charge for that?", r: "Yes. The MIT licence allows commercial use, modification and redistribution, and there is no clause forbidding hosting for third parties." },
      { p: "What happens when the AI gets it wrong?", r: "Every message passes seven checks before going out, and all of them are recorded — including the ones that blocked a send. When the agent shouldn't proceed alone, it hands off to a human with a summary of what happened." },
      { p: "Where does my data live?", r: "Wherever your VPS is. You host it, you own it — the maintainers have no access to your instance." },
      { p: "How do I update?", r: "Run bash update.sh. It backs up the database first, reapplies the schema idempotently and health-checks at the end." },
    ],
  },
  rodape: {
    colunas: [
      { titulo: "Product", itens: [{ rotulo: "How it works", href: "#como-funciona" }, { rotulo: "Pricing", href: "#preco" }, { rotulo: "Install", href: "#instalar" }] },
      { titulo: "Documentation", itens: [{ rotulo: "Setup guide", href: "/blob/main/docs/SETUP.md" }, { rotulo: "For agencies", href: "/blob/main/docs/white-label.md" }, { rotulo: "Architecture", href: "/blob/main/ARCHITECTURE.md" }, { rotulo: "Living system doctrine", href: "/blob/main/docs/doctrine/sistema-vivo.md" }] },
      { titulo: "Community", itens: [{ rotulo: "Discussions", href: "/discussions" }, { rotulo: "Issues", href: "/issues" }, { rotulo: "Contributing", href: "/blob/main/CONTRIBUTING.md" }] },
      { titulo: "Project", itens: [{ rotulo: "MIT licence", href: "/blob/main/LICENSE" }, { rotulo: "Changelog", href: "/blob/main/CHANGELOG.md" }, { rotulo: "Security", href: "/blob/main/SECURITY.md" }] },
    ],
    nota: "DeskcommCRM · MIT · Built in Brazil",
    atualizado: "Page updated on",
  },
};
