"use client";

import { motion } from "motion/react";
import { Check, ArrowRight, Zap } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";

const tiers = [
  {
    name: "Landing",
    price: "$15-30k",
    unit: "MXN",
    desc: "Sitio premium con animaciones y deploy. Para validar idea o lanzar producto.",
    features: [
      "Next.js + Tailwind + motion",
      "Diseño premium (estilo Linear/Vercel)",
      "Mobile-first + Lighthouse 95+",
      "Deploy + dominio + SSL",
      "Copy de conversión incluido",
      "Entrega en 2 semanas",
    ],
    cta: "Empezar landing",
    href: "#contacto",
  },
  {
    name: "MVP / App",
    price: "$60-120k",
    unit: "MXN",
    desc: "Aplicación funcional con auth, base de datos, IA y deploy. Listo para validar con usuarios reales.",
    features: [
      "Full-stack Next.js + Postgres",
      "Auth multi-rol + dashboards",
      "Integración IA (Claude/GPT)",
      "WhatsApp Cloud API",
      "Sprints semanales con demo",
      "Entrega en 4-6 semanas",
    ],
    cta: "Empezar MVP",
    href: "#contacto",
    featured: true,
    badge: "MÁS POPULAR",
  },
  {
    name: "SaaS completo",
    price: "$150-400k",
    unit: "MXN",
    desc: "Producto multi-tenant con Stripe, panel admin, API pública. Listo para escalar.",
    features: [
      "Todo lo del MVP +",
      "Multi-tenant con aislamiento",
      "Stripe / suscripciones",
      "API pública + webhooks",
      "Panel admin completo",
      "Entrega en 8-12 semanas",
    ],
    cta: "Empezar SaaS",
    href: "#contacto",
  },
];

export function Pricing() {
  return (
    <section id="precios" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-sm font-mono text-accent mb-4">
            06 · PAQUETES
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Precios claros.
            <br />
            <span className="text-zinc-500">Sin sorpresas.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Tres puntos de entrada. Rangos reales basados en alcance. La
            cotización final sale tras el diagnóstico inicial (gratis).
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <SpotlightCard
                className={`relative h-full rounded-2xl border p-8 ${
                  tier.featured
                    ? "bg-gradient-to-b from-zinc-900 to-zinc-950 border-accent/40"
                    : "bg-zinc-900/40 border-zinc-800"
                }`}
              >
                {tier.featured && <BorderBeam duration={10} />}

                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-3 py-1 rounded-full bg-accent text-zinc-950 text-[10px] font-bold tracking-wider shadow-[0_0_20px_-5px_rgba(200,255,0,0.6)]">
                      ★ {tier.badge}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  {tier.featured && <Zap className="w-5 h-5 text-accent" />}
                  <h3 className="text-xl font-bold text-zinc-50">
                    {tier.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-50">
                    {tier.price}
                  </span>
                  <span className="text-sm text-zinc-500 font-mono">
                    {tier.unit}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {tier.desc}
                </p>

                <ul className="mt-6 space-y-2.5 pb-8">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`group absolute bottom-8 left-8 right-8 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${
                    tier.featured
                      ? "bg-accent text-zinc-950 hover:bg-accent-hover"
                      : "border border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center text-sm text-zinc-500"
        >
          ¿Necesitas algo distinto? También hacemos automatizaciones desde
          $25k MXN, marketing digital desde $20k/mes y consultoría estratégica
          desde $15k/mes.
        </motion.div>
      </div>
    </section>
  );
}
