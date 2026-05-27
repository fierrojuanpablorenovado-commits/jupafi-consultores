"use client";

import { motion } from "motion/react";

/**
 * Pure CSS mockup of Vista3D viewer.
 * Conic gradient simulating a 3D rendered scene with rotation.
 */
export function Vista3DMockup() {
  return (
    <div className="relative p-4 bg-zinc-950 h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          <div className="px-2 py-0.5 rounded text-[9px] font-mono text-accent bg-accent/15 border border-accent/30">
            VIEW
          </div>
          <div className="px-2 py-0.5 rounded text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800">
            ROTATE
          </div>
          <div className="px-2 py-0.5 rounded text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800">
            MEASURE
          </div>
        </div>
        <div className="text-[9px] font-mono text-zinc-500">60 fps</div>
      </div>

      {/* 3D scene */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
        {/* Rotating gradient mesh */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20%]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(200,255,0,0.4), rgba(99,102,241,0.3), rgba(236,72,153,0.3), rgba(200,255,0,0.4))",
            filter: "blur(20px)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Pulsing dot center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-accent shadow-[0_0_20px_rgba(200,255,0,0.8)]"
          />
        </div>
        {/* Corner labels */}
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-zinc-400">
          escena.splat · 32 MB
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-accent">
          ● LIVE
        </div>
      </div>
    </div>
  );
}
