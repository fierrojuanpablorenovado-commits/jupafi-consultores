"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { BrowserFrame } from "@/components/ui/browser-frame";

// Real "building" animation — terminal, code, build, deploy. Zero stock imagery.
const CreationCanvas = dynamic(
  () => import("@/components/ui/creation-canvas").then((m) => m.CreationCanvas),
  { ssr: false }
);

/**
 * Process visualization section.
 * Video gets its own dedicated section with room to breathe — not competing
 * with the hero. Inspired by Stripe's product showcase sections.
 */
export function ProcessVideo() {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="text-sm font-mono text-accent mb-4">
            ★ EL PROCESO
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Así construimos
            <br />
            <span className="text-zinc-500">cada producto.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Idea → Diseño → Código → Deploy. Cada proyecto sigue el mismo
            proceso disciplinado. Cero improvisación, cero sorpresas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Subtle glow */}
          <div className="absolute -inset-12 bg-accent/8 blur-3xl rounded-3xl pointer-events-none" />

          <BrowserFrame
            url="jupafi.consultores · process"
            className="relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="aspect-video bg-zinc-950 relative overflow-hidden">
              {/* Animated build process — terminal → code → build → deploy.
                  Real code, on-brand, zero stock imagery. */}
              <CreationCanvas className="opacity-95" />
            </div>
          </BrowserFrame>
        </motion.div>

        {/* 4-step caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { n: "01", t: "Idea", d: "Validamos el problema antes de escribir código" },
            { n: "02", t: "Diseño", d: "UX/UI hecho a la medida del usuario real" },
            { n: "03", t: "Código", d: "Stack moderno + buenas prácticas desde día 1" },
            { n: "04", t: "Deploy", d: "Producción en horas, no en semanas" },
          ].map((s) => (
            <div key={s.n} className="border-l-2 border-zinc-800 pl-4">
              <div className="font-mono text-xs text-accent">{s.n}</div>
              <div className="mt-1 text-base font-semibold text-zinc-50">
                {s.t}
              </div>
              <div className="mt-1 text-xs text-zinc-500 leading-relaxed">
                {s.d}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
