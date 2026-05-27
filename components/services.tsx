"use client";

import { motion } from "motion/react";
import { services } from "@/data/services";
import { Check } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-sm font-mono text-accent mb-4">
            03 · SERVICIOS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            6 líneas.
            <br />
            <span className="text-zinc-500">Todas conectadas.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Empezamos por una landing y terminamos con tu SaaS completo — o
            entramos directo donde lo necesites. Tarifas transparentes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <SpotlightCard className="h-full rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="p-6">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-zinc-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-50">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {service.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-zinc-300"
                        >
                          <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {service.startingFrom && (
                      <div className="mt-6 pt-5 border-t border-zinc-800 flex items-baseline gap-2">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                          DESDE
                        </span>
                        <span className="text-lg font-semibold text-zinc-50">
                          {service.startingFrom}
                        </span>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
