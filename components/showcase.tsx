"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ProjectThumb } from "@/components/ui/project-thumb";
import { Tilt3D } from "@/components/ui/tilt-3d";
import { projects } from "@/data/projects";

const featuredSlugs = ["cierra-crm", "vista3d"];

export function Showcase() {
  const featured = projects.filter((p) => featuredSlugs.includes(p.slug));

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-sm font-mono text-accent mb-4">
            ★ PROYECTOS DESTACADOS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            En vivo,
            <br />
            <span className="text-zinc-500">no en mockups.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Estos screenshots se generan en tiempo real desde la URL pública —
            es exactamente lo que verías si abrieras la app ahora.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((p, i) => (
            <motion.a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group block"
            >
              <Tilt3D maxTilt={4} scale={1.01}>
                <SpotlightCard
                  color={
                    i === 0
                      ? "rgba(200, 255, 0, 0.15)"
                      : "rgba(99, 102, 241, 0.15)"
                  }
                  className="relative h-full rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 overflow-hidden transition-colors group-hover:border-zinc-700"
                >
                  {i === 0 && <BorderBeam duration={10} />}

                  {/* Live screenshot */}
                  <ProjectThumb
                    src={p.screenshotUrl}
                    alt={p.name}
                    className="aspect-[16/10] border-b border-zinc-800"
                  />

                  <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-accent/15 text-accent border border-accent/30 tracking-wider inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        EN PRODUCCIÓN
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-accent group-hover:rotate-12 transition-all" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-base text-zinc-400">{p.tagline}</p>

                    <p className="mt-6 text-zinc-300 leading-relaxed text-[15px]">
                      {p.description}
                    </p>

                    {p.metrics && (
                      <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
                        {p.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="text-lg md:text-xl font-semibold text-zinc-50">
                              {m.value}
                            </div>
                            <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[11px] font-mono text-zinc-400 bg-zinc-800/60 rounded border border-zinc-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {p.url && (
                      <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-500 truncate max-w-xs">
                          🔒 {p.url.replace("https://", "")}
                        </span>
                        <span className="text-xs text-accent font-semibold inline-flex items-center gap-1">
                          Ver app
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </Tilt3D>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
