export type ProjectCategory =
  | "SaaS"
  | "IA + Chatbots"
  | "Fintech"
  | "Inmobiliaria"
  | "Educación";

export type ProjectStatus = "En producción" | "Beta" | "En desarrollo";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  progress?: number; // 0-100
  stack: string[];
  url: string; // URL pública obligatoria — ya no admitimos proyectos sin demo
  screenshotUrl: string; // screenshot real obligatorio — local
  highlight?: boolean;
  metrics?: { label: string; value: string }[];
  lastUpdate?: string;
}

/**
 * Filtro editorial estricto:
 * - Solo productos JuPaFi propios — cero réplicas, cero reverse engineering
 * - Solo productos CON URL pública verificable
 * - Solo productos CON screenshot real del sitio en producción
 * - Excluidos: motores internos, proyectos sin demo, productos rotos
 *
 * Originales y auténticos. Nada más.
 */
export const projects: Project[] = [
  {
    slug: "cierra-crm",
    name: "Cierra CRM",
    tagline: "El CRM que cierra contigo",
    description:
      "CRM SaaS multi-tenant para equipos de venta hispanohablantes. Pipeline visual, automatización de recordatorios, métricas en tiempo real. Hecho en México, listo para LatAm.",
    category: "SaaS",
    status: "En producción",
    progress: 100,
    stack: ["Next.js 14", "Neon Postgres", "Stripe", "Vercel"],
    url: "https://nextlead-saas.vercel.app",
    screenshotUrl: "/screenshots/cierra-crm.webp",
    highlight: true,
    metrics: [
      { label: "Onboarding", value: "< 3 min" },
      { label: "Pipeline", value: "Visual" },
      { label: "Pagos", value: "Stripe-ready" },
    ],
    lastUpdate: "Hace 8 días",
  },
  {
    slug: "vista3d",
    name: "Vista3D",
    tagline: "3D Gaussian Splatting en el navegador",
    description:
      "SaaS para escanear y visualizar espacios físicos en 3D. Visor web ultraligero con PlayCanvas. Render a 60fps incluso en móvil.",
    category: "SaaS",
    status: "En producción",
    progress: 100,
    stack: ["Next.js 16", "PlayCanvas 2.18", "WebGL", "Vercel"],
    url: "https://vista3d-beige.vercel.app",
    screenshotUrl: "/screenshots/vista3d.webp",
    highlight: true,
    metrics: [
      { label: "Render", value: "60 fps" },
      { label: "Escena", value: "10-50 MB" },
    ],
    lastUpdate: "Hace 5 días",
  },
  {
    slug: "gestiona-flotilla",
    name: "Gestiona tu Flotilla",
    tagline: "SaaS para administradores de flotillas",
    description:
      "Plataforma multi-tenant para gestionar choferes, vehículos, rentas, mantenimientos y cobranza. Dominio propio en producción, 7 módulos activos.",
    category: "SaaS",
    status: "En producción",
    progress: 100,
    stack: ["Next.js 14", "Postgres", "Multi-tenant"],
    url: "https://gestionatuflotilla.com",
    screenshotUrl: "/screenshots/gestiona-flotilla.webp",
    highlight: true,
    metrics: [
      { label: "Módulos", value: "7 activos" },
      { label: "Tenants", value: "Multi" },
    ],
    lastUpdate: "Hace 1 día",
  },
  {
    slug: "inmobiliaria-lp",
    name: "Inmobiliaria LP",
    tagline: "Plataforma completa para inmobiliarias con IA",
    description:
      "Sistema completo: captación de leads por WhatsApp, marketing automatizado, CRM, contratos digitales y app web+móvil. Dominio propio en producción.",
    category: "Inmobiliaria",
    status: "En producción",
    progress: 95,
    stack: ["Next.js", "WhatsApp API", "Portales inmobiliarios"],
    url: "https://inmobiliarialp.com",
    screenshotUrl: "/screenshots/inmobiliaria-lp.webp",
    metrics: [{ label: "Ciclo cubierto", value: "Captación→Cierre" }],
    lastUpdate: "Hace 14 horas",
  },
  {
    slug: "entrevista-virtual",
    name: "Entrevista Virtual",
    tagline: "Entrevistas con IA para reclutar choferes",
    description:
      "Sistema conversacional con voz natural en español. Pre-filtra y califica candidatos 24/7 para que el equipo de RH solo invierta tiempo en los finalistas.",
    category: "IA + Chatbots",
    status: "En producción",
    progress: 100,
    stack: ["Next.js", "ElevenLabs", "GPT-4", "Vercel"],
    url: "https://entrevista-virtual.vercel.app",
    screenshotUrl: "/screenshots/entrevista-virtual.webp",
    metrics: [
      { label: "Disponibilidad", value: "24/7" },
      { label: "Voz", value: "ES neutro nativo" },
    ],
    lastUpdate: "Hace 4 días",
  },
  {
    slug: "prestamo-listo",
    name: "Préstamo Listo",
    tagline: "El dinero que necesitas, hoy mismo",
    description:
      "Préstamos personales en Guadalajara de $8,000 a $30,000 MXN. Proceso 100% digital, tasa transparente 4% mensual, depósito en 24-48h, sin letra chiquita. Cumplimiento NOM-151 + PLD/UIF.",
    category: "Fintech",
    status: "En producción",
    progress: 100,
    stack: ["Next.js", "Cumplimiento PLD/UIF", "Firma NOM-151", "Simulador"],
    url: "https://prestamo-listo-app.vercel.app",
    screenshotUrl: "/screenshots/prestamo-listo.webp",
    highlight: true,
    metrics: [
      { label: "Ticket", value: "$8-30k MXN" },
      { label: "Clientes GDL", value: "+300" },
      { label: "Rating", value: "4.9/5 ★" },
    ],
    lastUpdate: "Operando hoy",
  },
  {
    slug: "vantor-saas",
    name: "Vantor SaaS",
    tagline: "Sales tracking que vendedores sí usan",
    description:
      "Plataforma de seguimiento comercial con 7 módulos: pipeline, metas, comisiones, dashboards. Recharts + Tailwind.",
    category: "SaaS",
    status: "En producción",
    progress: 100,
    stack: ["Next.js 14", "Tailwind", "Recharts"],
    url: "https://vantor-saas.vercel.app",
    screenshotUrl: "/screenshots/vantor-saas.webp",
    metrics: [{ label: "Módulos", value: "7 completos" }],
    lastUpdate: "Hace 7 días",
  },
  {
    slug: "cierra-leads",
    name: "Cierra Leads",
    tagline: "Captador de leads para Cierra CRM",
    description:
      "Landing + formulario optimizado para conversión que alimenta directamente Cierra CRM. Webhook + Stripe trial integrado.",
    category: "SaaS",
    status: "En producción",
    progress: 100,
    stack: ["Next.js", "Stripe", "Webhooks"],
    url: "https://cierra-leads.vercel.app",
    screenshotUrl: "/screenshots/cierra-leads.webp",
    lastUpdate: "Hace 15 horas",
  },
  {
    slug: "academia-quantum",
    name: "Academia Quantum",
    tagline: "Plataforma educativa de neurociencia",
    description:
      "LMS con login, roles, sidebar, tabs, búsqueda y notas. Catálogo de cursos con video, PDFs y certificados.",
    category: "Educación",
    status: "En producción",
    progress: 100,
    stack: ["Next.js", "Vercel", "LMS modular"],
    url: "https://academia-quantum-neurociencia.vercel.app",
    screenshotUrl: "/screenshots/academia-quantum.webp",
    lastUpdate: "Hace 1 día",
  },
  {
    slug: "mi-mapa-numerico",
    name: "Mi Mapa Numérico",
    tagline: "Tarot + numerología interactivo",
    description:
      "Aplicación educativa con análisis numerológico personalizado por número (1-8). Contenido estructurado, audio + texto sincronizado.",
    category: "Educación",
    status: "En producción",
    progress: 85,
    stack: ["Next.js", "Audio sync", "Layout cuadro misional"],
    url: "https://mi-mapa-numerico.vercel.app",
    screenshotUrl: "/screenshots/mi-mapa-numerico.webp",
    metrics: [{ label: "Números", value: "1-8 cubiertos" }],
    lastUpdate: "Hace 23 horas",
  },
  {
    slug: "terralta-portal",
    name: "Cloud Terralta Portal",
    tagline: "Portal cloud inmobiliario empresarial",
    description:
      "Plataforma portal para gestión inmobiliaria corporativa. Deployments diarios, equipo activo trabajando.",
    category: "Inmobiliaria",
    status: "En desarrollo",
    progress: 70,
    stack: ["Next.js", "Postgres", "Multi-tenant"],
    url: "https://cloud-terralta-portal.vercel.app",
    screenshotUrl: "/screenshots/terralta-portal.webp",
    lastUpdate: "Hace 21 minutos",
  },
  {
    slug: "solventa",
    name: "Solventa",
    tagline: "Validación financiera inmobiliaria",
    description:
      "Sistema de validación financiera para operaciones inmobiliarias. Score crediticio simulado y reportes ejecutivos.",
    category: "Fintech",
    status: "Beta",
    progress: 65,
    stack: ["Next.js", "Vercel"],
    url: "https://inmoburo.vercel.app",
    screenshotUrl: "/screenshots/solventa.webp",
    lastUpdate: "Hace 8 días",
  },
  {
    slug: "jupafi-consultores",
    name: "JuPaFi Consultores",
    tagline: "Este sitio mismo",
    description:
      "Sitio agencia con bento mockups, smooth scroll, custom cursor, tilt 3D, page loader, editorial statement y journey timeline.",
    category: "SaaS",
    status: "En producción",
    progress: 100,
    stack: ["Next.js 14", "Tailwind", "motion", "Lenis"],
    url: "https://jupaficonsultores.com",
    screenshotUrl: "/screenshots/jupafi-consultores.webp",
    metrics: [
      { label: "First Load", value: "163 KB" },
      { label: "Lighthouse", value: "95+" },
    ],
    lastUpdate: "Hace 2 días",
  },
];

export const stats = {
  totalProjects: projects.length,
  inProduction: projects.filter((p) => p.status === "En producción").length,
  saasProducts: projects.filter((p) => p.category === "SaaS").length,
};
