'use client'
import { motion, useReducedMotion } from 'motion/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LasserLogo } from './LasserLogo'

// ── Fixed particles (hydration-safe) ──────────────────────────────────────────
const PARTICLES = [
  { x: '8%',  y: '18%', dur: 4.2, delay: 0,   s: 3 },
  { x: '18%', y: '72%', dur: 3.8, delay: 0.8, s: 2 },
  { x: '30%', y: '35%', dur: 5.1, delay: 1.5, s: 2 },
  { x: '45%', y: '82%', dur: 3.3, delay: 0.3, s: 3 },
  { x: '52%', y: '12%', dur: 4.7, delay: 2.1, s: 2 },
  { x: '62%', y: '55%', dur: 3.9, delay: 1.1, s: 3 },
  { x: '72%', y: '25%', dur: 5.5, delay: 0.6, s: 2 },
  { x: '82%', y: '68%', dur: 4.1, delay: 1.8, s: 2 },
  { x: '90%', y: '40%', dur: 3.6, delay: 2.5, s: 3 },
  { x: '14%', y: '48%', dur: 4.8, delay: 1.3, s: 2 },
  { x: '25%', y: '88%', dur: 3.7, delay: 0.2, s: 2 },
  { x: '38%', y: '60%', dur: 4.4, delay: 1.9, s: 3 },
] as const

// ── Typewriter ─────────────────────────────────────────────────────────────────
const TW_PHRASES = [
  'sin Excel. Sin caos.',
  'con diseño aprobado por ti.',
  'en tracking en tiempo real.',
  'en la fecha que acordamos.',
] as const

function useTypewriter(phrases: readonly string[], speed = 70) {
  const [state, setState] = useState({ idx: 0, char: 0, del: false, paused: false })
  const [text, setText] = useState('')
  useEffect(() => {
    const phrase = phrases[state.idx]
    if (state.paused) {
      const t = setTimeout(() => setState(s => ({ ...s, del: true, paused: false })), 2200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      if (!state.del) {
        if (state.char < phrase.length) {
          setText(phrase.slice(0, state.char + 1))
          setState(s => ({ ...s, char: s.char + 1 }))
        } else {
          setState(s => ({ ...s, paused: true }))
        }
      } else {
        if (state.char > 0) {
          setText(phrase.slice(0, state.char - 1))
          setState(s => ({ ...s, char: s.char - 1 }))
        } else {
          setState(s => ({ ...s, del: false, idx: (s.idx + 1) % phrases.length }))
        }
      }
    }, state.del ? speed * 0.4 : speed)
    return () => clearTimeout(t)
  }, [state, phrases, speed])
  return text
}

// ── Motion variants ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  hidden: { opacity: 0, y: 48, scale: 0.97, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }

// ── Main component ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const rm = useReducedMotion()
  const typed = useTypewriter(TW_PHRASES)

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-black">

      {/* ── Tech grid ── */}
      {!rm && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(181,211,24,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(181,211,24,0.055) 1px,transparent 1px)`,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 85% 85% at 40% 45%,black 25%,transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 40% 45%,black 25%,transparent 100%)',
          }}
        />
      )}

      {/* ── Scan beam ── */}
      {!rm && (
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(181,211,24,0.55) 50%,transparent 100%)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        />
      )}

      {/* ── Aurora blobs ── */}
      {!rm && (
        <>
          <motion.div
            aria-hidden
            className="absolute left-[3%] top-[10%] w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{ background: 'rgba(181,211,24,0.12)', filter: 'blur(120px)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.28, 0.15], x: [0, 25, 0], y: [0, -18, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute right-[8%] top-[35%] w-[280px] h-[280px] rounded-full pointer-events-none"
            style={{ background: 'rgba(181,211,24,0.08)', filter: 'blur(90px)' }}
            animate={{ scale: [1, 1.45, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </>
      )}

      {/* ── Particles ── */}
      {!rm && PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: '#B5D318' }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* ── Top gradient line ── */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B5D318]/40 to-transparent" />

      {/* ── Navbar ── */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-12 h-20 border-b border-white/[0.04]">
        <LasserLogo className="h-9 md:h-10" />

        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
          <a href="#servicios" className="hover:text-white transition-colors duration-200">🎽 Servicios</a>
          <a href="#proceso" className="hover:text-white transition-colors duration-200">⚙️ Proceso</a>
          <Link href="/lasser/catalogo" className="hover:text-white transition-colors duration-200">🛒 Catálogo</Link>
          <a href="#tracking" className="hover:text-white transition-colors duration-200">📦 Mi pedido</a>
        </nav>

        <motion.a
          href="https://wa.me/5213221052920?text=Hola%20Lasser%20Sport%2C%20quiero%20cotizaci%C3%B3n"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-[#B5D318] text-black font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          animate={rm ? {} : {
            boxShadow: [
              '0 0 12px rgba(181,211,24,0.3)',
              '0 0 32px rgba(181,211,24,0.7)',
              '0 0 12px rgba(181,211,24,0.3)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          💬 Cotizar gratis
        </motion.a>
      </header>

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 md:px-12 py-16"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2.5 border border-[#B5D318]/25 bg-[#B5D318]/[0.07] text-[#B5D318] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B5D318] animate-pulse" />
            🏆 Uniformes Premium · Puerto Vallarta
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          className="font-bebas leading-[0.88] uppercase mb-6 text-[78px] sm:text-[108px] md:text-[138px] lg:text-[160px]"
        >
          <span className="text-white block">TUS</span>
          <span className="text-white block">UNIFORMES,</span>
          <span className="block text-gradient-lime glow-lime">A OTRO</span>
          <span className="text-white block">NIVEL.</span>
        </motion.h1>

        {/* Typewriter subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-xl md:text-2xl text-zinc-300 font-semibold leading-snug mb-8 max-w-xl min-h-[2.5rem]"
        >
          Tu equipo merece más —{' '}
          <span className="text-white">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-0.5 w-0.5 h-5 bg-[#B5D318] align-middle"
            />
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <motion.a
            href="https://wa.me/5213221052920?text=Hola%20Lasser%20Sport%2C%20quiero%20cotizaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B5D318] text-black font-black text-lg px-8 py-4 rounded-2xl"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            animate={rm ? {} : {
              boxShadow: [
                '0 0 20px rgba(181,211,24,0.4)',
                '0 0 48px rgba(181,211,24,0.75)',
                '0 0 20px rgba(181,211,24,0.4)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', borderRadius: 16 }}
          >
            💬 Pedir cotización gratis
          </motion.a>
          <Link
            href="/lasser/catalogo"
            className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 font-semibold text-lg px-8 py-4 rounded-2xl hover:border-[#B5D318]/50 hover:text-[#B5D318] transition-all duration-200"
          >
            🛒 Ver catálogo →
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        {!rm && (
          <motion.div
            className="absolute bottom-8 left-6 md:left-12 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            aria-hidden
          >
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-[#B5D318]/50 to-transparent"
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-zinc-700 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
