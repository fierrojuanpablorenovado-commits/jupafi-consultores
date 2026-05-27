"use client";

import { motion } from "motion/react";
import { Flame, ArrowRight } from "lucide-react";

export function UrgencyBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-[52] bg-gradient-to-r from-accent/15 via-accent/25 to-accent/15 border-b border-accent/20 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-center text-xs">
        <div className="flex items-center gap-2 text-zinc-100 font-medium">
          <Flame className="w-3.5 h-3.5 text-accent shrink-0" />
          <span className="hidden sm:inline">
            Tomando 2 proyectos para Q3 2026 — quedan{" "}
            <span className="text-accent font-bold">1 lugar disponible</span>
          </span>
          <span className="sm:hidden">
            <span className="text-accent font-bold">1 lugar</span> Q3 2026
          </span>
          <a
            href="#contacto"
            className="ml-2 inline-flex items-center gap-1 text-accent hover:text-accent-hover font-semibold underline-offset-4 hover:underline"
          >
            Apartar <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
