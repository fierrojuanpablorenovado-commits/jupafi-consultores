"use client";

import { motion } from "motion/react";

/**
 * Pure CSS mockup of Gestiona Flotilla dashboard.
 * KPIs + chart bars + table preview.
 */
export function FlotillaMockup() {
  const kpis = [
    { label: "Choferes activos", value: "47", trend: "+12%" },
    { label: "Ingresos hoy", value: "$24,580", trend: "+8%" },
    { label: "Vehículos op.", value: "32 / 38", trend: "84%" },
  ];

  const bars = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="p-4 bg-zinc-950">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800"
          >
            <div className="text-[9px] text-zinc-500 mb-1">{k.label}</div>
            <div className="text-sm font-bold text-zinc-50">{k.value}</div>
            <div className="text-[9px] text-accent mt-0.5">▲ {k.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
        <div className="flex items-end justify-between gap-1 h-16">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="flex-1 bg-gradient-to-t from-accent to-accent/40 rounded-sm"
              style={{ minHeight: 4 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[8px] font-mono text-zinc-600">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
