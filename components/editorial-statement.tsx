"use client";

import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { motion } from "motion/react";

/**
 * Big editorial statement. One sentence at huge typographic scale,
 * revealed word-by-word on scroll. Stripe / Apple style.
 */
export function EditorialStatement() {
  return (
    <section className="py-32 md:py-48 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-accent uppercase tracking-widest mb-10"
        >
          ★ MANIFIESTO
        </motion.div>

        <ScrollTextReveal
          text="Construimos productos digitales que la gente realmente usa. No demos. No bocetos. No promesas vacías. Código que vive en producción, suscriptores que pagan, métricas que crecen. Esa es la única vara que aceptamos."
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05]"
        />
      </div>
    </section>
  );
}
