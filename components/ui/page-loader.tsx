"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Branded page loader. Shows on first paint, dismisses on window load.
 * Logo + counter from 0 to 100. Hardened against StrictMode double-render.
 */
export function PageLoader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const start = performance.now();
    const duration = 900; // ms — keep snappy
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        timeoutId = setTimeout(() => setDone(true), 150);
      }
    };
    rafId = requestAnimationFrame(tick);

    // Safety net: force-dismiss after 2s no matter what
    const safety = setTimeout(() => setDone(true), 2000);

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-zinc-950"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-zinc-950 font-black text-2xl">
              J
            </span>
            <span className="text-2xl font-bold text-zinc-50 tracking-tight">
              JuPaFi
            </span>
            <span className="text-2xl text-zinc-500 tracking-tight">
              Consultores
            </span>
          </motion.div>

          <div className="w-64 h-px bg-zinc-800 relative overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.1 }}
              style={{ originX: 0 }}
              className="absolute inset-0 bg-accent"
            />
          </div>

          <div className="mt-4 font-mono text-xs text-zinc-500 tabular-nums">
            {count.toString().padStart(3, "0")} / 100
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
