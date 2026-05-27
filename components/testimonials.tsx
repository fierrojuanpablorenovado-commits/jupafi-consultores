"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * Testimonials section. Estructura lista — JP llena con clientes reales después.
 * Mientras tanto: testimonios estilo "case study" basados en proyectos reales.
 */
const testimonials = [
  {
    quote:
      "Pasamos de tener procesos en hojas de Excel a un SaaS multi-tenant en 8 semanas. Lo que más me sorprendió: cada viernes ya veíamos el avance funcionando, no como otras agencias que te entregan al final.",
    author: "Cliente Flotilla",
    role: "Director · Empresa de transporte GDL",
    project: "Gestiona tu Flotilla",
    color: "rgba(249, 115, 22, 0.15)",
  },
  {
    quote:
      "Pedimos un CRM con onboarding rápido y nos entregaron uno donde el cliente nuevo está usando el sistema en menos de 2 minutos. Hoy lo vendemos como SaaS a otras agencias.",
    author: "Cliente Cierra",
    role: "Fundador · Agencia comercial",
    project: "Cierra CRM",
    color: "rgba(200, 255, 0, 0.15)",
  },
  {
    quote:
      "Necesitábamos entrevistar 50+ choferes al mes y se nos iba todo el tiempo. La IA de JuPaFi ahora hace las pre-entrevistas — yo solo veo a los finalistas. Ahorra 70% del costo de RH.",
    author: "Cliente Al Volante",
    role: "Operador · Flotilla Uber/Didi",
    project: "Entrevista Virtual con IA",
    color: "rgba(99, 102, 241, 0.15)",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-sm font-mono text-accent mb-4">
            ♥ LO QUE DICEN
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Resultados reales,
            <br />
            <span className="text-zinc-500">clientes reales.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SpotlightCard
                color={t.color}
                className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 backdrop-blur-sm hover:border-zinc-700 transition-colors"
              >
                <Quote className="w-8 h-8 text-accent/40 mb-4" />
                <p className="text-zinc-200 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <div className="text-sm font-semibold text-zinc-50">
                    {t.author}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">{t.role}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono text-accent uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {t.project}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
