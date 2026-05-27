"use client";

import { motion } from "motion/react";
import { Check, X, Minus } from "lucide-react";

const rows = [
  {
    feature: "Tiempo a producción",
    jupafi: "6 semanas",
    agency: "6-12 meses",
    freelancer: "Indefinido",
    highlight: true,
  },
  {
    feature: "Costo proyecto MVP",
    jupafi: "$80-150k MXN",
    agency: "$500k-2M MXN",
    freelancer: "$30-200k MXN",
  },
  {
    feature: "Dueño del código",
    jupafi: "Tú · 100%",
    agency: "Compartido / licencia",
    freelancer: "Tú · depende",
  },
  {
    feature: "Stack moderno (Next.js, IA)",
    jupafi: true,
    agency: false,
    freelancer: "Variable",
  },
  {
    feature: "Multi-tenant desde día 1",
    jupafi: true,
    agency: "A veces (+$)",
    freelancer: false,
  },
  {
    feature: "Sprints semanales con demo",
    jupafi: true,
    agency: false,
    freelancer: "Variable",
  },
  {
    feature: "Deploy a producción incluido",
    jupafi: true,
    agency: "+$",
    freelancer: false,
  },
  {
    feature: "Track record verificable",
    jupafi: "14+ productos vivos",
    agency: "Casos selectos",
    freelancer: "Portfolio",
  },
  {
    feature: "Equipo dedicado o boutique",
    jupafi: "Boutique senior",
    agency: "Junior mayormente",
    freelancer: "Una persona",
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return <Check className="w-5 h-5 text-accent mx-auto" />;
  if (value === false)
    return <X className="w-5 h-5 text-zinc-700 mx-auto" />;
  if (value === "Variable" || value === "A veces (+$)" || value === "+$")
    return (
      <span className="flex items-center gap-1 justify-center text-amber-400">
        <Minus className="w-4 h-4" />
        <span className="text-xs">{value}</span>
      </span>
    );
  return <span>{value}</span>;
}

export function Comparison() {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-sm font-mono text-accent mb-4">
            05 · COMPARATIVA HONESTA
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            ¿Por qué no
            <br />
            <span className="text-zinc-500">una agencia tradicional?</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Sin malas vibras. Hay agencias muy buenas — pero sus modelos están
            hechos para proyectos de $500k+ con timelines de un año. Nosotros
            vivimos en la otra mitad del mercado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-zinc-800">
            <div className="p-4 md:p-5 text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Criterio
            </div>
            <div className="p-4 md:p-5 text-center bg-accent/10 border-x border-accent/30">
              <div className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                ★ JuPaFi
              </div>
              <div className="text-sm md:text-base font-semibold text-zinc-50">
                Consultoría
              </div>
            </div>
            <div className="p-4 md:p-5 text-center">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                Agencia
              </div>
              <div className="text-sm md:text-base font-semibold text-zinc-300">
                Tradicional
              </div>
            </div>
            <div className="p-4 md:p-5 text-center">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                Freelancer
              </div>
              <div className="text-sm md:text-base font-semibold text-zinc-300">
                Solo
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`grid grid-cols-4 border-b border-zinc-800/60 last:border-b-0 ${row.highlight ? "bg-accent/5" : ""}`}
            >
              <div className="p-4 md:p-5 text-sm text-zinc-300 font-medium">
                {row.feature}
              </div>
              <div className="p-4 md:p-5 text-center text-sm bg-accent/5 border-x border-accent/20 text-zinc-50 font-semibold flex items-center justify-center">
                <Cell value={row.jupafi} />
              </div>
              <div className="p-4 md:p-5 text-center text-sm text-zinc-400 flex items-center justify-center">
                <Cell value={row.agency} />
              </div>
              <div className="p-4 md:p-5 text-center text-sm text-zinc-400 flex items-center justify-center">
                <Cell value={row.freelancer} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
