"use client";

import { motion } from "motion/react";
import { Zap, Brain, Code2, Rocket } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const items = [
  {
    icon: Zap,
    title: "Velocidad real",
    desc: "Lanzamos productos en semanas, no en trimestres. MVP en producción al sprint 1.",
    metric: "6 sem",
    metricLabel: "promedio",
  },
  {
    icon: Brain,
    title: "IA como núcleo",
    desc: "No 'le agregamos IA'. Construimos productos donde la IA es el motor desde día uno.",
    metric: "100%",
    metricLabel: "AI-native",
  },
  {
    icon: Code2,
    title: "Stack moderno",
    desc: "Next.js, Vercel, Postgres serverless, Claude, GPT-4. Sin tecnología obsoleta.",
    metric: "0",
    metricLabel: "legacy",
  },
  {
    icon: Rocket,
    title: "Listos para escalar",
    desc: "Multi-tenant desde el inicio. Tu primer cliente o el cliente 10,000 — mismo código.",
    metric: "∞",
    metricLabel: "tenants",
  },
];

export function Differentiators() {
  return (
    <section className="py-24 px-6 border-y border-zinc-900 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Por qué eligen JuPaFi
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SpotlightCard className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                    <div className="text-right">
                      <div className="text-lg font-bold text-zinc-50">
                        {item.metric}
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        {item.metricLabel}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
