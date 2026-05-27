"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { TextFlip } from "@/components/ui/text-flip";
import { Aurora } from "@/components/ui/aurora";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marquee } from "@/components/ui/marquee";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Tilt3D } from "@/components/ui/tilt-3d";
import { CierraMockup } from "@/components/mockups/cierra-mockup";
import { Vista3DMockup } from "@/components/mockups/vista3d-mockup";
import { FlotillaMockup } from "@/components/mockups/flotilla-mockup";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
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
  "ManyChat",
  "Supabase",
  "Prisma",
  "Neon",
  "Resend",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-12 overflow-hidden">
      <Aurora />
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-[1400px] mx-auto px-6 w-full flex-1 flex flex-col justify-center"
      >
        {/* Status badge */}
        <motion.div
          variants={item}
          className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm text-[11px] text-zinc-400 mb-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-mono uppercase tracking-widest">
            Consultoría boutique GDL · 14+ productos vivos
          </span>
        </motion.div>

        {/* MASSIVE editorial headline */}
        <motion.h1
          variants={item}
          className="text-[clamp(3rem,11vw,11rem)] font-bold tracking-[-0.045em] leading-[0.88]"
        >
          Productos
          <br />
          digitales{" "}
          <span className="italic font-light text-zinc-500">que</span>
          <br />
          <TextFlip
            words={["escalan.", "convierten.", "venden.", "duran."]}
            className="text-accent"
          />
        </motion.h1>

        <div className="mt-12 grid lg:grid-cols-12 gap-12 items-end">
          {/* Sub copy */}
          <motion.div variants={item} className="lg:col-span-5">
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              Consultoría boutique para empresarios que quieren lanzar SaaS,
              apps con IA y automatizaciones en{" "}
              <span className="text-zinc-50 font-medium">semanas</span>,
              no en trimestres. Ejecución de fundador. 100% del código tuyo
              desde el día uno.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <MagneticButton
                href="#contacto"
                strength={14}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-accent text-zinc-950 font-semibold hover:bg-accent-hover transition-colors cursor-pointer shadow-[0_0_60px_-15px_rgba(200,255,0,0.7)]"
              >
                <Sparkles className="w-4 h-4" />
                Agendar consulta
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </MagneticButton>
              <MagneticButton
                href="#portfolio"
                strength={10}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-600 transition-colors cursor-pointer"
              >
                Ver portfolio
              </MagneticButton>
            </div>
          </motion.div>

          {/* Mockups bento */}
          <motion.div
            variants={item}
            className="lg:col-span-7 relative"
            style={{ perspective: 2000 }}
          >
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[420px] md:h-[520px]">
              {/* Big — Cierra CRM */}
              <Tilt3D
                maxTilt={6}
                scale={1.02}
                className="col-span-6 md:col-span-4 row-span-4"
              >
                <BrowserFrame
                  url="cierra-crm.vercel.app"
                  className="h-full"
                >
                  <CierraMockup />
                </BrowserFrame>
              </Tilt3D>

              {/* Vista3D */}
              <Tilt3D
                maxTilt={8}
                className="col-span-3 md:col-span-2 row-span-3"
              >
                <BrowserFrame url="vista3d.com" className="h-full">
                  <Vista3DMockup />
                </BrowserFrame>
              </Tilt3D>

              {/* Flotilla */}
              <Tilt3D
                maxTilt={8}
                className="col-span-3 md:col-span-2 row-span-3"
              >
                <BrowserFrame
                  url="gestiona-flotilla.app"
                  className="h-full"
                >
                  <FlotillaMockup />
                </BrowserFrame>
              </Tilt3D>

              {/* Stats card */}
              <div className="col-span-6 md:col-span-4 row-span-2 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-4 flex items-center justify-around">
                {[
                  { v: "14+", l: "PRODUCTOS" },
                  { v: "6 sem", l: "PROMEDIO" },
                  { v: "95+", l: "LIGHTHOUSE" },
                  { v: "24h", l: "DEPLOY" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-zinc-50 tracking-tight">
                      {s.v}
                    </div>
                    <div className="text-[9px] text-zinc-500 uppercase tracking-wider mt-1">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech stack marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative mt-16"
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
