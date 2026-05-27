"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MessageCircle, FileText, Code2, Rocket, TrendingUp } from "lucide-react";

const stages = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Hablamos",
    sub: "45 minutos · Sin costo",
    desc: "Entendemos tu negocio, validamos el problema y definimos qué tiene sentido construir. Si no encajamos, te lo decimos honestamente.",
  },
  {
    n: "02",
    icon: FileText,
    title: "Plan claro",
    sub: "48 horas",
    desc: "Propuesta por escrito con alcance, stack, timeline y costo fijo. Cero sorpresas, cero ambigüedad.",
  },
  {
    n: "03",
    icon: Code2,
    title: "Construimos",
    sub: "Sprints semanales",
    desc: "Cada viernes ves el avance funcionando. Iteramos basado en tu feedback real, no en suposiciones.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Lanzamos",
    sub: "Producción real",
    desc: "Deploy con tu dominio, SSL, analytics y monitoreo. Te enseñamos a operarlo — o lo operamos por ti.",
  },
  {
    n: "05",
    icon: TrendingUp,
    title: "Crecemos",
    sub: "Iteración continua",
    desc: "Métricas reales, features basadas en uso, mejora continua. Tu producto evoluciona con tu negocio.",
  },
];

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.3", "end 0.7"],
  });

  return (
    <section
      ref={ref}
      id="proceso"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <div className="text-sm font-mono text-accent mb-4">
            08 · EL VIAJE
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02]">
            5 pasos.
            <br />
            <span className="text-zinc-500">6 semanas.</span>
            <br />
            <span className="text-zinc-700">1 producto en producción.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: scrollYProgress, originY: 0 }}
              className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-accent via-accent to-transparent"
            />
          </div>

          <div className="space-y-16 md:space-y-32">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    reverse ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent blur-md rounded-full" />
                      <div className="relative w-4 h-4 rounded-full bg-accent ring-4 ring-zinc-950" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`pl-20 md:pl-0 ${reverse ? "md:[direction:ltr] md:pr-16" : "md:pl-16"}`}
                  >
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="font-mono text-5xl md:text-6xl text-accent/30 leading-none">
                        {s.n}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-2">
                      {s.title}
                    </h3>
                    <div className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
                      {s.sub}
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-base md:text-lg max-w-md">
                      {s.desc}
                    </p>
                  </div>

                  {/* Empty column for spacing on desktop */}
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
