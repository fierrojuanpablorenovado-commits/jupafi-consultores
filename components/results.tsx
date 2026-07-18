"use client";

import { motion } from "motion/react";
import { Counter } from "@/components/ui/counter";
import { Marquee } from "@/components/ui/marquee";
import { projects } from "@/data/projects";

const bigStats = [
  { value: 13, suffix: "", label: "Productos digitales", sub: "Construidos desde 2024" },
  { value: 11, suffix: "", label: "Con demo en vivo", sub: "URL pública verificable" },
  { value: 5, suffix: "", label: "Categorías", sub: "SaaS · IA · Fintech · más" },
  { value: 6, suffix: " sem", label: "Tiempo medio", sub: "De la idea al deploy" },
];

export function Results() {
  return (
    <section className="py-24 md:py-32 px-6 relative border-y border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-sm font-mono text-accent mb-4">
            02 · RESULTADOS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Los números
            <br />
            <span className="text-zinc-500">no mienten.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/60 border border-zinc-800 rounded-2xl overflow-hidden mb-16">
          {bigStats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-950 p-6 md:p-10"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-50 leading-none">
                <Counter to={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="mt-4 text-sm font-medium text-zinc-300">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6 text-center">
            Productos en el portfolio
          </div>
          <Marquee speed={50} fadeEdges>
            {projects.map((p) => (
              <div
                key={p.slug}
                className="mx-3 px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-center gap-3 whitespace-nowrap hover:border-accent/40 hover:bg-zinc-900 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm font-semibold text-zinc-100">
                  {p.name}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  {p.category}
                </span>
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
