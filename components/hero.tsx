"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, Flame } from "lucide-react";
import { TextFlip } from "@/components/ui/text-flip";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marquee } from "@/components/ui/marquee";
import { FlameCanvas } from "@/components/ui/flame-canvas";

// Subtle background — deferred to not block first paint
const WebGLGradient = dynamic(
  () => import("@/components/ui/webgl-gradient").then((m) => m.WebGLGradient),
  { ssr: false }
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Postgres",
  "Vercel",
  "Stripe",
  "Claude",
  "GPT-4",
  "ElevenLabs",
  "WhatsApp Cloud API",
  "PlayCanvas",
  "Make",
  "n8n",
  "Supabase",
  "Prisma",
  "Neon",
  "Resend",
];

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[85vh] flex flex-col justify-center">
      {/* Background — minimal, atmospheric */}
      <WebGLGradient className="opacity-25" />
      {/* Flame particles — lime/green, mix-blend-screen */}
      <FlameCanvas intensity={0.65} />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-5xl mx-auto px-6 w-full text-center"
      >

        {/* Editorial centered headline — manda visualmente */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-bold tracking-[-0.04em] leading-[0.95]"
        >
          Productos digitales
          <br />
          <span className="italic font-light text-zinc-500">que </span>
          <TextFlip
            words={["escalan.", "convierten.", "venden.", "duran."]}
            className="text-accent"
          />
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-10 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
        >
          Consultoría boutique para empresarios que quieren lanzar SaaS, apps
          con IA y automatizaciones en{" "}
          <span className="text-zinc-50 font-medium">semanas</span>, no en
          trimestres. Ejecución de fundador.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <MagneticButton
            href="#contacto"
            strength={14}
            className="group cta-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-zinc-950 font-semibold hover:bg-accent-hover transition-colors cursor-pointer shadow-[0_0_60px_-12px_rgba(200,255,0,0.65),0_0_0_1px_rgba(200,255,0,0.3)] hover:shadow-[0_0_80px_-8px_rgba(200,255,0,0.8),0_0_0_1px_rgba(200,255,0,0.5)]"
          >
            <Flame className="w-4 h-4" />
            Agendar consulta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </MagneticButton>
          <MagneticButton
            href="#portfolio"
            strength={10}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-600 transition-colors cursor-pointer"
          >
            Ver portfolio
          </MagneticButton>
        </motion.div>

        {/* Trust signal subtle */}
        <motion.div
          variants={item}
          className="mt-12 flex items-center justify-center gap-3 text-sm text-zinc-500"
        >
          <div className="flex -space-x-2">
            {[
              "from-accent to-lime-600",
              "from-blue-400 to-blue-700",
              "from-pink-400 to-pink-700",
              "from-amber-400 to-amber-700",
            ].map((c, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full border-2 border-zinc-950 bg-gradient-to-br ${c}`}
              />
            ))}
          </div>
          <span>
            <span className="text-zinc-50 font-semibold">+13</span> productos
            lanzados desde 2024
          </span>
        </motion.div>
      </motion.div>

      {/* Tech stack marquee at the very bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative mt-20"
      >
        <div className="text-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-5">
          Stack que dominamos · {stack.length} tecnologías
        </div>
        <Marquee speed={50} fadeEdges>
          {stack.map((s) => (
            <div
              key={s}
              className="mx-6 text-zinc-500 hover:text-accent transition-colors text-base font-medium whitespace-nowrap"
            >
              {s}
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
