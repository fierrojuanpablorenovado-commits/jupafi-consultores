"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { ProjectThumb } from "@/components/ui/project-thumb";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProductRotatorProps {
  products: Project[];
  interval?: number;
}

/**
 * Hero showcase that rotates through products one at a time.
 * Linear/Apple-style — product as the visual hero, not bento.
 */
export function ProductRotator({
  products,
  interval = 6000,
}: ProductRotatorProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, interval);
    return () => clearInterval(id);
  }, [paused, interval, products.length]);

  const current = products[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ perspective: 2000 }}
    >
      {/* Tab navigation */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {products.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setIndex(i)}
            className={`group relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              i === index
                ? "bg-accent text-zinc-950"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800"
            }`}
          >
            <span className="relative z-10">{p.name}</span>
            {i === index && !paused && (
              <motion.span
                key={`progress-${index}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: interval / 1000, ease: "linear" }}
                style={{ originX: 0 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950/40 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Browser-framed product */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.a
            key={current.slug}
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24, rotateX: -2 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -24, rotateX: 2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block group"
            style={{ transformStyle: "preserve-3d" }}
          >
            <BrowserFrame
              url={current.url?.replace("https://", "") ?? ""}
              className="shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_120px_-30px_rgba(200,255,0,0.3)]"
            >
              <ProjectThumb
                src={current.screenshotUrl}
                alt={current.name}
                className="aspect-[16/10]"
              />
            </BrowserFrame>

            {/* Overlay info on hover */}
            <div className="mt-6 flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="text-xs font-mono text-accent uppercase tracking-widest mb-2">
                  {current.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50">
                  {current.name}
                </h3>
                <p className="mt-1 text-zinc-400 text-base">
                  {current.tagline}
                </p>
              </div>
              <div className="shrink-0 hidden md:flex items-center gap-2 text-sm text-zinc-500 group-hover:text-accent transition-colors">
                Ver app en vivo
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
          </motion.a>
        </AnimatePresence>
      </div>
    </div>
  );
}
