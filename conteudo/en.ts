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
};
