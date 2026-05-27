"use client";

import { motion } from "motion/react";
import { projects, type ProjectCategory } from "@/data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProjectThumb } from "@/components/ui/project-thumb";

const categories: Array<ProjectCategory | "Todos"> = [
  "Todos",
  "SaaS",
  "IA + Chatbots",
  "Automatización",
  "Fintech",
  "Inmobiliaria",
  "Educación",
];

const statusColor: Record<string, string> = {
  "En producción": "bg-accent/15 text-accent border-accent/30",
  Beta: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "En desarrollo": "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

export function Portfolio() {
  // Exclude featured projects from Showcase
  const remaining = projects.filter(
    (p) => !["cierra-crm", "vista3d"].includes(p.slug)
  );
  const [filter, setFilter] = useState<ProjectCategory | "Todos">("Todos");

  const filtered =
    filter === "Todos"
      ? remaining
      : remaining.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12"
        >
          <div className="text-sm font-mono text-accent mb-4">
            01 · PORTFOLIO COMPLETO
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Productos.
            <br />
            <span className="text-zinc-500">Estado real,</span>
            <br />
            <span className="text-zinc-700">URLs reales.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Screenshots reales capturados del sitio en producción. Click en el
            card para abrir la app y verificarlo tú mismo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === c
                  ? "bg-accent text-zinc-950 border-accent shadow-[0_0_24px_-8px_rgba(200,255,0,0.5)]"
                  : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => {
            const Wrapper = p.url ? "a" : "div";
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 6) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Wrapper
                  {...(p.url
                    ? {
                        href: p.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="block h-full"
                >
                  <SpotlightCard className="h-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden transition-colors group-hover:border-zinc-700">
                    {/* Thumb */}
                    <ProjectThumb
                      src={p.screenshotUrl}
                      alt={p.name}
                      className="aspect-[16/10] border-b border-zinc-800"
                    />

                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono rounded border tracking-wider ${statusColor[p.status]}`}
                        >
                          {p.status.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">
                          {p.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-zinc-50 flex items-center gap-2">
                        {p.name}
                        {p.url && (
                          <ArrowUpRight className="w-4 h-4 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all" />
                        )}
                      </h3>
                      <p className="text-xs text-zinc-500">{p.tagline}</p>

                      {/* Progress bar if not 100% */}
                      {p.progress !== undefined && p.progress < 100 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                            <span>PROGRESO</span>
                            <span className="text-zinc-300">{p.progress}%</span>
                          </div>
                          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: p.progress / 100 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{ originX: 0 }}
                              className="h-full bg-accent"
                            />
                          </div>
                        </div>
                      )}

                      <p className="mt-3 text-sm text-zinc-300 leading-relaxed flex-1 line-clamp-3">
                        {p.description}
                      </p>

                      {p.metrics && (
                        <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800">
                          {p.metrics.slice(0, 2).map((m) => (
                            <div key={m.label}>
                              <div className="text-sm font-semibold text-zinc-50">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-1">
                        {p.stack.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/50 rounded border border-zinc-800"
                          >
                            {s}
                          </span>
                        ))}
                        {p.stack.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                            +{p.stack.length - 3}
                          </span>
                        )}
                      </div>

                      {p.lastUpdate && (
                        <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {p.lastUpdate}
                          </span>
                          {p.url && (
                            <span className="text-[10px] text-accent inline-flex items-center gap-1">
                              Visitar
                              <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </Wrapper>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
