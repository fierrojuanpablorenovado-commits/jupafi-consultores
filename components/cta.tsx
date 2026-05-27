"use client";

import { motion } from "motion/react";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { GlowMesh } from "@/components/ui/glow-mesh";

export function CTA() {
  return (
    <section
      id="contacto"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      <GlowMesh intensity="intense" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 backdrop-blur-sm p-8 md:p-16 text-center overflow-hidden"
        >
          <BorderBeam duration={12} />

          <div className="text-sm font-mono text-accent mb-4">
            05 · ¿LISTO?
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.05]">
            ¿Tienes una idea?
            <br />
            <span className="text-accent">La construimos en 6 semanas.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Agenda una sesión de 45 minutos. Te decimos honestamente si
            podemos hacerlo, cuánto cuesta y cuándo está listo. Sin
            compromiso.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <MagneticButton
              href="mailto:hola@jupaficonsultores.com"
              strength={14}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-accent text-zinc-950 font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Agendar consulta gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="https://wa.me/523312345678"
              strength={10}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-600 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp directo
            </MagneticButton>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800 grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                Respuesta
              </div>
              <div className="text-zinc-100 font-medium">Menos de 24h</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                Propuesta
              </div>
              <div className="text-zinc-100 font-medium">En 48h hábiles</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                Primer demo
              </div>
              <div className="text-zinc-100 font-medium">Sprint 1 · 7 días</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
