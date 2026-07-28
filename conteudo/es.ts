import type { Conteudo } from "./tipos";

/**
 * Español LATINOAMERICANO, não ibérico.
 *
 * A dissecção da Cal.com pegou o erro espelhado: eles traduziram para português
 * EUROPEU ("equipas em crescimento"), e um dono de PME em Belo Horizonte
 * identifica isso em dois segundos. Aqui: "computadora" e não "ordenador",
 * "celular" e não "móvil", "ustedes" e não "vosotros".
 *
 * O bloco da HostGator aparece como o caminho recomendado, mas sem prometer o
 * desconto de parceria para fora do Brasil — a oferta é brasileira.
 */
export const es: Conteudo = {
  meta: {
    titulo: "DeskcommCRM — tu operación comercial en una sola mesa",
    descricao:
      "Agentes de IA atienden por WhatsApp, califican al lead y mueven el embudo — con todo registrado y auditable. En tu propio servidor, sin mensualidad por usuario. Open source, licencia MIT.",
  },
  nav: { comoFunciona: "Cómo funciona", prova: "Prueba", instalar: "Instalar", preco: "Precio", ctaInstalar: "Instalar en un VPS" },
  hero: {
    sobretitulo: "Desk + comm — el escritorio comercial",
    h1a: "Tu operación comercial en una sola mesa.",
    h1b: "Y ahí nada se muere.",
    sub: "Agentes de IA atienden por WhatsApp, califican al lead y mueven el embudo — con todo registrado y auditable. En tu propio servidor, sin mensualidad por usuario.",
    ctaPrimario: "Instalar en mi VPS",
    ctaSecundario: "Ver el código en GitHub",
    microcopy: "Licencia MIT · sin versión paga · 4 GB de RAM",
  },
  viloes: {
    titulo: "No pierdes ventas por falta de leads.",
    itens: [
      {
        titulo: "El CRM que es una planilla bonita",
        texto:
          "Entra el lead, alguien lo carga, y no pasa nada. Cuando te das cuenta, desapareció — y nadie sabe decir en qué momento ni por qué. El sistema guardó el nombre y perdió la historia.",
        alt: "Una mesa con las piezas desconectadas, surcos que terminan sin llegar a ningún lado, y un hueco por donde cae un lead.",
      },
      {
        titulo: "El bot que responde y desaparece",
        texto:
          "Contesta rápido, dice cualquier cosa, y desaparece. Si prometió un plazo que no existe, te enteras por el cliente. No puedes auditar lo que dijo — mucho menos por qué lo dijo.",
        alt: "Un módulo aislado emitiendo ondas sobre un fragmento de mesa que termina abruptamente, con surcos que no llevan a ningún lado.",
      },
    ],
    fecho: { antes: "Los dos tienen la misma raíz: ", forte: "el sistema no se hace responsable de lo que pasa después." },
  },
  virada: {
    sobretitulo: "La categoría",
    tituloA: "Un sistema operativo comercial ",
    tituloDestaque: "vivo",
    sub: "Vivo tiene definición — y la definición estaba escrita en el repositorio antes de estar en esta página. Son cinco reglas que toda parte del sistema tiene que cumplir para entrar.",
    regras: [
      { regra: "Nada es una isla", prova: "Cada pieza tiene entrada y salida. El mapa de arquitectura es público en el repositorio." },
      { regra: "Ningún lead muere sin diagnóstico", prova: "La demanda detenida aparece en el Radar, clasificada por riesgo — antes de volverse pérdida." },
      { regra: "Toda acción de la IA es auditable", prova: "Siete verificaciones antes de cada envío. Cada una queda registrada — incluidas las que bloquean." },
      { regra: "Log invisible es log muerto", prova: "Toda mutación relevante se vuelve actividad en la línea de tiempo, visible en pantalla." },
      { regra: "El follow-up es el mecanismo anti-muerte", prova: "Demanda abierta sin próximo paso definido se trata como una fuga del sistema." },
    ],
    fecho: {
      antes: "Esto no es lo que prometemos — es el criterio que un cambio tiene que pasar para entrar al sistema. Está en ",
      link: "docs/doctrine/sistema-vivo.md",
      depois: ", y la lista de siete preguntas se responde antes de cada merge.",
    },
  },
  jornada: {
    sobretitulo: "La vida de un lead",
    titulo: "Lo que pasa entre el mensaje y la venta.",
    passos: [
      { titulo: "09:41 — llega un mensaje", texto: "“¿Hacen envíos a Monterrey?” Antes de cualquier respuesta, el sistema ya sabe quién es: historial, pedidos, lo que quedó acordado la última vez." },
      { titulo: "El agente lee antes de hablar", texto: "Busca en la base de conocimiento de tu empresa — tus plazos, tu política, tu catálogo. No inventa." },
      { titulo: "Siete verificaciones antes de enviar", texto: "Baja del canal, privacidad, anti-bloqueo, variación de texto, promesa determinística, promesa semántica y aviso de automatización. En ese orden, siempre." },
      { titulo: "Incluso lo que decidió no enviar", texto: "El agente iba a prometer entrega en 24 horas. La verificación lo bloqueó: ese plazo no existe en tu catálogo. Queda registrado lo que iba a decir — y por qué no lo dijo." },
      { titulo: "El lead se mueve solo", texto: "Ya calificado, cambia de etapa en el embudo. Entra la etiqueta, se define el responsable — y cada movimiento tiene un motivo registrado." },
      { titulo: "Cuando le toca al humano, recibe contexto", texto: "No la conversación cruda: resumen de lo que pasó, lo que se acordó, qué objeciones aparecieron y cuál es el próximo paso." },
      { titulo: "Y si nadie responde, no se muere", texto: "Follow-up agendado. Si se enfría, el lead aparece en el Radar clasificado por riesgo — antes de volverse pérdida." },
    ],
  },
  instalar: {
    sobretitulo: "Instalación",
    titulo: "Un comando. Y el sistema es tuyo.",
    sub: "El script revisa las dependencias, genera todos los secretos, aplica la base de datos, crea el primer administrador, levanta los contenedores y conecta la tarea programada que dispara las automatizaciones.",
    apoio: [
      { titulo: "4 GB de RAM recomendados", texto: "El servidor no compila nada — descarga una imagen lista. La stack levanta con 2 GB, pero opera al límite: son 7 contenedores, y cada sesión de WhatsApp cuesta ~150 MB." },
      { titulo: "HTTPS automático", texto: "El certificado se emite en el primer acceso. No configuras TLS a mano." },
      { titulo: "¿Se trabó? Hay asistente", texto: "Abre Claude Code dentro del VPS y te guía la instalación conversando, con nueve trampas de entorno ya mapeadas." },
    ],
    comentario1: "# 1. descarga el proyecto",
    comentario2: "# 2. instala",
    depois: "Después de eso: entrar al dominio, registrar la verificación en dos pasos del administrador y escanear el QR de WhatsApp. Todo desde la pantalla.",
    atualizarTitulo: "Actualizar no rompe nada",
    atualizarTexto: "hace respaldo de la base antes, reaplica el esquema de forma idempotente y verifica la salud al final. El camino de actualización se prueba en CI — no está solo documentado.",
  },
  preco: {
    sobretitulo: "Cuánto cuesta",
    titulo: "El software es gratis. Pagas el servidor.",
    sub: "No hay versión paga, no hay funcionalidad bloqueada, no hay cobro por usuario. Lo que pagas es el VPS donde corre y las claves de IA que consumas.",
    cartoes: [
      { t: "Licencia MIT", d: "Úsalo, modifícalo, revéndelo. También comercialmente, sin pedir permiso." },
      { t: "Sin plan pago", d: "Lo que instalas hoy es el producto completo. No hay un tier esperando a que crezcas." },
      { t: "Tu cuenta no crece con el equipo", d: "Cinco personas en ventas o cincuenta cuestan el mismo VPS." },
    ],
    fecho: "Las plataformas cerradas cobran por asiento: el costo sube junto con el equipo, el mismo año en que contratas. Acá el costo es del servidor, y el servidor no sabe cuántas personas lo usan.",
  },
  banner: {
    sobretitulo: "Socio oficial",
    titulo: "Con datacenter en Brasil, en HostGator",
    texto: "Servidores en Brasil, con baja latencia para toda Latinoamérica. Es donde DeskcommCRM fue hecho para correr — el plan VPS NVMe 4 lo maneja con holgura.",
    cta: "Contratar el VPS",
    microcopy: "enlace de socio — contratar por ahí apoya al proyecto",
  },
  prova: {
    sobretitulo: "Prueba",
    titulo: "No nos creas. Comprueba.",
    sub: "Cada afirmación de esta página apunta a un archivo del repositorio público. Si alguna no se sostiene, es un bug — y vale una issue.",
    itens: [
      { afirmacao: "El aislamiento entre clientes se prueba en cada cambio. El CI levanta un Postgres limpio y corre 364 tests de invariante. Uno de ellos crea dos organizaciones y prueba que una no ve ninguna fila de la otra — y un caso de control prueba antes que esas filas existen, si no el test pasaría con la tabla vacía.", caminho: "tests/invariants/rls-isolation.test.ts" },
      { afirmacao: "Siete verificaciones antes de cada envío, en orden fijo y versionado. Cada evaluación queda como registro duradero y exportable — incluidas las que bloquearon un mensaje.", caminho: "lib/agent-engine/guardrails/before-send.ts" },
      { afirmacao: "Actualizar no rompe: el esquema se aplica en base nueva y se reaplica en base existente, probando idempotencia. El camino de actualización se prueba, no solo se documenta.", caminho: "scripts/test-db.sh" },
      { afirmacao: "Licencia MIT, sin versión paga, sin funcionalidad bloqueada. Lo que instalas es el producto completo.", caminho: "LICENSE" },
    ],
    cta: "Dar una estrella en GitHub",
    ctaNota: "es lo que ayuda a que otras personas encuentren el proyecto",
  },
  radar: {
    sobretitulo: "Anti-muerte",
    titulo: "¿Cuántos leads se están muriendo ahora?",
    texto: "El Radar responde eso. Toda demanda abierta se clasifica por el tiempo sin interacción y por lo que quedó pendiente. No es el reporte del mes pasado — es el estado ahora.",
    fecho: "Un número en pantalla que no cambia una decisión es ruido. Este sí.",
    faixas: ["crítico", "en riesgo", "en vuelo"],
  },
  nichos: {
    sobretitulo: "Multi-rubro",
    titulo: "El mismo sistema sirve a una clínica y a una tienda de zapatillas.",
    texto: "El vocabulario del embudo es configurable. No es un tema, no es un fork, no es una “versión para clínicas” — es el mismo núcleo, configurado.",
    abas: [
      { nicho: "E-commerce", lead: "Cliente", ganho: "Pagado" },
      { nicho: "Clínica", lead: "Paciente", ganho: "Agendado" },
      { nicho: "Inmobiliaria", lead: "Interesado", ganho: "Cerrado" },
      { nicho: "Servicios", lead: "Prospecto", ganho: "Contratado" },
    ],
  },
  revendedor: {
    sobretitulo: "Para agencias",
    titulo: "Instálalo para tus clientes.",
    texto: "Dos variables en el .env cambian el nombre y el logo en toda la interfaz — sin tocar código, porque el código editado se pierde en la próxima actualización. Licencia MIT: puedes modificar, hospedar para terceros y cobrar.",
    honestidade: "Lo que todavía NO se puede: colores y tipografías exigen cambiar el design system, y la marca es por instalación, no por organización. Está escrito en la guía — mejor que lo sepas ahora y no frente a tu cliente.",
    cta: "Leer la guía para agencias",
  },
  faq: {
    titulo: "Preguntas que vas a hacer",
    perguntas: [
      { p: "¿Cuánto cuesta DeskcommCRM?", r: "El software es gratuito y de código abierto, con licencia MIT. No hay versión paga ni funcionalidad bloqueada. Solo pagas la infraestructura: el VPS y las claves de IA que consumas." },
      { p: "¿Necesito saber programar para instalarlo?", r: "No, pero sí necesitas seguir un paso a paso y tener los accesos a mano. La instalación es un comando, y el kit incluye un asistente de IA que te guía conversando." },
      { p: "¿Qué VPS necesito?", r: "4 GB de RAM es lo recomendado. La stack levanta con 2 GB, pero opera al límite: son 7 contenedores, y cada sesión de WhatsApp cuesta cerca de 150 MB." },
      { p: "¿Para qué tipo de negocio sirve?", r: "Cualquier negocio que venda conversando. El vocabulario del embudo es configurable, así que el mismo sistema sirve a e-commerce, clínicas, inmobiliarias, infoproductos y prestadores de servicios." },
      { p: "¿Puedo instalarlo para mis clientes y cobrar?", r: "Sí. La licencia MIT permite uso comercial, modificación y redistribución, y no hay cláusula que prohíba hospedar para terceros." },
      { p: "¿Qué pasa si la IA se equivoca?", r: "Cada mensaje pasa por siete verificaciones antes de salir, y todas quedan registradas — incluidas las que bloquearon un envío. Cuando el agente no debe seguir solo, pasa a un humano con un resumen de lo que ocurrió." },
      { p: "¿Dónde quedan mis datos?", r: "Donde esté tu VPS. Tú lo hospedas, tú lo controlas — los mantenedores no tienen acceso a tu instancia." },
      { p: "¿Cómo actualizo después?", r: "Corriendo bash update.sh. Hace respaldo de la base antes, reaplica el esquema de forma idempotente y verifica la salud al final." },
    ],
  },
  rodape: {
    colunas: [
      { titulo: "Producto", itens: [{ rotulo: "Cómo funciona", href: "#como-funciona" }, { rotulo: "Precio", href: "#preco" }, { rotulo: "Instalar", href: "#instalar" }] },
      { titulo: "Documentación", itens: [{ rotulo: "Guía de instalación", href: "/blob/main/docs/SETUP.md" }, { rotulo: "Para agencias", href: "/blob/main/docs/white-label.md" }, { rotulo: "Arquitectura", href: "/blob/main/ARCHITECTURE.md" }, { rotulo: "Doctrina del sistema vivo", href: "/blob/main/docs/doctrine/sistema-vivo.md" }] },
      { titulo: "Comunidad", itens: [{ rotulo: "Discussions", href: "/discussions" }, { rotulo: "Issues", href: "/issues" }, { rotulo: "Contribuir", href: "/blob/main/CONTRIBUTING.md" }] },
      { titulo: "Proyecto", itens: [{ rotulo: "Licencia MIT", href: "/blob/main/LICENSE" }, { rotulo: "Changelog", href: "/blob/main/CHANGELOG.md" }, { rotulo: "Seguridad", href: "/blob/main/SECURITY.md" }] },
    ],
    nota: "DeskcommCRM · MIT · Hecho en Brasil",
    atualizado: "Página actualizada el",
  },
};
