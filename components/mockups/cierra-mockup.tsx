"use client";

import { motion } from "motion/react";

/**
 * Pure CSS mockup of Cierra CRM pipeline view.
 * Used in hero/showcase to give visual proof.
 */
export function CierraMockup() {
  const stages = [
    { name: "Prospecto", count: 24, color: "bg-zinc-700" },
    { name: "Contactado", count: 12, color: "bg-blue-500" },
    { name: "Propuesta", count: 7, color: "bg-amber-500" },
    { name: "Cierre", count: 3, color: "bg-accent" },
  ];

  return (
    <div className="p-4 bg-zinc-950">
      {/* Sidebar + Content */}
      <div className="flex gap-3">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col gap-1 w-28 shrink-0">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-accent/10 text-accent text-[10px] font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Pipeline
          </div>
          {["Clientes", "Tareas", "Reportes", "Ajustes"].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] text-zinc-500"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              {i}
            </div>
          ))}
        </div>

        {/* Kanban */}
        <div className="flex-1 grid grid-cols-4 gap-2">
          {stages.map((s, idx) => (
            <div key={s.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {s.name}
                </div>
                <div className={`w-4 h-4 rounded text-[8px] font-bold flex items-center justify-center ${s.color} ${s.name === "Cierre" ? "text-zinc-950" : "text-white"}`}>
                  {s.count}
                </div>
              </div>
              {Array.from({ length: Math.min(s.count, 3) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + i * 0.05, duration: 0.4 }}
                  className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800"
                >
                  <div className="h-1 w-3/4 bg-zinc-700 rounded mb-1" />
                  <div className="h-1 w-1/2 bg-zinc-800 rounded" />
                  {idx === 3 && (
                    <div className="mt-1 text-[8px] font-mono text-accent">
                      ${(45 + i * 12).toFixed(0)}k
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
