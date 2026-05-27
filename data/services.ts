import {
  Boxes,
  Bot,
  Workflow,
  Sparkles,
  LineChart,
  ShieldCheck,
} from "lucide-react";

export interface Service {
  icon: typeof Boxes;
  title: string;
  description: string;
  bullets: string[];
  startingFrom?: string;
}

export const services: Service[] = [
  {
    icon: Boxes,
    title: "SaaS multi-tenant",
    description:
      "Productos digitales con suscripción, cobro recurrente y miles de usuarios concurrentes desde el día uno.",
    bullets: [
      "Next.js 14 + Postgres + Stripe",
      "Multi-tenant con aislamiento real",
      "API pública + webhooks",
      "Deploy a Vercel en 24h",
    ],
    startingFrom: "$80k MXN",
  },
  {
    icon: Bot,
    title: "Apps con IA",
    description:
      "Asistentes conversacionales, voz natural, agentes autónomos y chatbots que sí venden — no son demos juguete.",
    bullets: [
      "Claude / GPT / ElevenLabs",
      "WhatsApp Business API",
      "Voz natural ES neutro",
      "Memoria persistente real",
    ],
    startingFrom: "$60k MXN",
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description:
      "Conectamos sistemas, eliminamos trabajo manual repetitivo y dejamos flujos que corren solos 24/7.",
    bullets: [
      "Make · n8n · GitHub Actions",
      "Integración WhatsApp + CRM",
      "Dashboards en Sheets / Airtable",
      "100% cloud serverless",
    ],
    startingFrom: "$25k MXN",
  },
  {
    icon: Sparkles,
    title: "Landings premium",
    description:
      "Sitios de alta conversión con animaciones profesionales, mobile-first y velocidad Lighthouse 95+.",
    bullets: [
      "Next.js + Tailwind + motion",
      "Lighthouse 95+ garantizado",
      "Copy de conversión incluido",
      "Deploy + dominio + SSL",
    ],
    startingFrom: "$15k MXN",
  },
  {
    icon: LineChart,
    title: "Marketing digital + Growth",
    description:
      "Captación de leads que sí cierran. Meta Ads + WhatsApp + CRM + seguimiento automatizado.",
    bullets: [
      "Meta Ads gestionado",
      "Embudos WhatsApp completos",
      "Reportes semanales con KPIs",
      "Optimización continua",
    ],
    startingFrom: "$20k MXN/mes",
  },
  {
    icon: ShieldCheck,
    title: "Consultoría estratégica",
    description:
      "Auditoría, roadmap, validación de modelo y diseño de productos digitales antes de invertir.",
    bullets: [
      "Análisis competencia + nicho",
      "Roadmap a 6-12 meses",
      "Validación con MVPs reales",
      "Sesiones quincenales",
    ],
    startingFrom: "$15k MXN/mes",
  },
];
