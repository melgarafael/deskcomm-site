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
};
