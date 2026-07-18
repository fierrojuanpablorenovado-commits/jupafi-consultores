'use client'
import { motion } from 'motion/react'

const EVENTS = [
  '🎽 Nuevo pedido — Antorcha Guayabitos, 16 piezas · hace 3 min',
  '✅ Pedido LS-2026-018 — Autorizado por cliente · hace 7 min',
  '🏭 Equipo Tigres FC — Entró a producción · hace 15 min',
  '💰 Saldo cobrado $3,200 — Real Madrid Vallarta · hace 22 min',
  '🔍 Control de calidad — Uniformes Academia Náutica listos · hace 31 min',
  '📦 Pedido LS-2026-011 — Entregado y cerrado · hace 45 min',
  '🎨 Diseño enviado — América Juniors 2026 · hace 52 min',
  '⚠️ Fecha próxima — Uniformes Escuela Bilingüe · vence en 2 días',
  '✅ Anticipo recibido $1,500 — Cornhole Vallarta · hace 1 h',
  '🎽 Cotización web — Club Halcones 24 réplicas · hace 1 h 10 min',
]

export function LiveTickerLasser() {
  return (
    <div className="bg-black/80 backdrop-blur-md border-b border-white/[0.05] py-2.5 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B5D318] animate-pulse" />
        <span className="text-[#B5D318] text-[10px] font-black uppercase tracking-widest">EN VIVO</span>
      </div>
      <motion.div
        className="flex gap-16 pl-28 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...EVENTS, ...EVENTS].map((event, i) => (
          <span key={i} className="text-zinc-500 text-xs font-mono">{event}</span>
        ))}
      </motion.div>
    </div>
  )
}
