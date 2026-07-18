"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * Casos de éxito — honestos. Describen el reto técnico y la solución real de
 * proyectos propios. Sin testimonios ficticios: contamos qué construimos y
 * el resultado, no ponemos palabras en boca de clientes inventados.
 */
const cases = [
  {
    challenge: "Una empresa de transporte gestionaba choferes, rentas y mantenimientos en hojas de Excel.",
    solution:
      "Construimos un SaaS multi-tenant con 7 módulos — choferes, vehículos, cobranza, mantenimientos — entregado en sprints semanales con demos cada viernes.",
    project: "Gestiona tu Flotilla",
    result: "SaaS multi-tenant en producción",
    color: "rgba(249, 115, 22, 0.15)",
    url: "https://gestionatuflotilla.com",
  },
  {
    challenge: "Diseñar un CRM donde un equipo de ventas pudiera empezar a usarlo sin capacitación.",
    solution:
      "Pipeline visual + automatización de recordatorios con onboarding pensado para que el primer lead entre en minutos, no en días. Stripe-ready desde el inicio.",
    project: "Cierra CRM",
    result: "Onboarding en menos de 3 minutos",
    color: "rgba(200, 255, 0, 0.15)",
    url: "https://nextlead-saas.vercel.app",
  },
  {
    challenge: "Pre-filtrar decenas de candidatos a chofer al mes consumía horas de RH.",
    solution:
      "Sistema de entrevistas con voz natural en español que filtra y califica 24/7. El equipo humano solo revisa a los finalistas.",
    project: "Entrevista Virtual con IA",
    result: "Pre-entrevistas automatizadas 24/7",
    color: "rgba(99, 102, 241, 0.15)",
    url: "https://entrevista-virtual.vercel.app",
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
            ★ CASOS DE ÉXITO
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Retos reales,
            <br />
            <span className="text-zinc-500">soluciones en producción.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Cada proyecto resolvió un problema concreto de negocio. Puedes
            abrir cada uno y verlo funcionando.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.a
              key={c.project}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group block"
            >
              <SpotlightCard
                color={c.color}
                className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 backdrop-blur-sm hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    El reto
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-accent group-hover:rotate-12 transition-all" />
                </div>
                <p className="text-zinc-300 leading-relaxed text-[15px]">
                  {c.challenge}
                </p>

                <div className="mt-5 pt-5 border-t border-zinc-800">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                    Lo que construimos
                  </span>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {c.solution}
                  </p>
                </div>

                <div className="mt-5 pt-5 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-zinc-50">
                      {c.result}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-mono text-accent uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {c.project}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
