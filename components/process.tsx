"use client";

import { motion } from "motion/react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    description:
      "Sesión inicial de 45 min para entender el negocio, validar el problema y definir el alcance real. Sin compromiso.",
    duration: "Día 1",
  },
  {
    n: "02",
    title: "Roadmap + Propuesta",
    description:
      "Plan claro: qué se construye, en qué orden, con qué stack, cuánto cuesta, cuándo está listo. Todo por escrito.",
    duration: "Día 2-3",
  },
  {
    n: "03",
    title: "Construcción",
    description:
      "Sprints semanales con demos en vivo. Ves avance cada 7 días. Nada de cajas negras ni 'te aviso cuando termine'.",
    duration: "Sem 1-6",
  },
  {
    n: "04",
    title: "Lanzamiento",
    description:
      "Deploy a producción con dominio, SSL, analytics y monitoreo. Te enseñamos a operarlo o lo operamos por ti.",
    duration: "Sem 6+",
  },
  {
    n: "05",
    title: "Escalamiento",
    description:
      "Iteración continua con métricas reales. Crecemos el producto basado en uso, no en suposiciones.",
    duration: "Mensual",
  },
];

export function Process() {
  return (
    <section id="proceso" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-sm font-mono text-accent mb-4">
            04 · PROCESO
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            De idea a producto
            <br />
            <span className="text-zinc-500">en 6 semanas.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Sprints cortos con entregas semanales. Cero sorpresas, todo
            medible, todo documentado.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Node dot */}
                <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-zinc-950 z-10" />

                <SpotlightCard className="h-full mt-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors p-6">
                  <div className="font-mono text-4xl text-accent/40 mb-3">
                    {s.n}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {s.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {s.duration}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
