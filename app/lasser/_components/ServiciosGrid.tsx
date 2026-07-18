'use client'
import { motion } from 'motion/react'

const SERVICIOS = [
  {
    icon: '⚽',
    title: 'Réplicas de Fútbol',
    desc: 'Jerseys réplica con nombre, número y escudo de tu equipo. Los mismos modelos que ves en la cancha, con tu identidad.',
    tags: ['DTF', 'Vinil', 'Nombre + Número'],
    desde: 850,
    accent: 'from-blue-500/10 to-transparent',
    border: 'hover:border-blue-500/30',
  },
  {
    icon: '✂️',
    title: 'Uniformes a la Medida',
    desc: 'Diseño único desde cero. Tú eliges tela, corte, colores y estampado. Hacemos el uniforme que imaginaste.',
    tags: ['Corte Propio', 'Sublimado', 'Full Digital'],
    desde: 280,
    accent: 'from-[#B5D318]/10 to-transparent',
    border: 'hover:border-[#B5D318]/30',
  },
  {
    icon: '🖨️',
    title: 'Impresión DTF y Vinil',
    desc: 'Estampamos en playeras, casacas o lo que traigas. Alta durabilidad, colores que no se van, entrega en 24-48 h.',
    tags: ['DTF', 'Vinil Textil', 'Full Color'],
    desde: 150,
    accent: 'from-orange-500/10 to-transparent',
    border: 'hover:border-orange-500/30',
  },
  {
    icon: '🌊',
    title: 'Sublimado All-over',
    desc: 'Impresión que forma parte de la tela. Sin costuras visibles, sin límite de colores. Ideal para deporte de alto rendimiento.',
    tags: ['All-over', 'Sin límite color', 'Lavado eterno'],
    desde: 320,
    accent: 'from-violet-500/10 to-transparent',
    border: 'hover:border-violet-500/30',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export function ServiciosGrid() {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-5"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {SERVICIOS.map((s) => (
        <motion.div
          key={s.title}
          variants={card}
          className={`relative rounded-3xl p-8 border border-white/[0.07] glass transition-all duration-300 cursor-default group overflow-hidden ${s.border}`}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          {/* Glow gradient en hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <motion.span
                className="text-5xl block"
                whileHover={{ scale: 1.1, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {s.icon}
              </motion.span>
              <div className="text-right">
                <div className="text-zinc-600 text-xs">desde</div>
                <div className="font-bebas text-3xl text-white leading-none">${s.desde.toLocaleString()}</div>
                <div className="text-zinc-600 text-xs">MXN / pieza</div>
              </div>
            </div>

            <h3 className="font-bebas text-2xl text-white mb-2 group-hover:text-[#B5D318] transition-colors duration-200 tracking-wide">
              {s.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">{s.desc}</p>

            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.05] text-zinc-400 border border-white/[0.06] group-hover:border-[#B5D318]/20 group-hover:text-zinc-300 transition-all duration-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
