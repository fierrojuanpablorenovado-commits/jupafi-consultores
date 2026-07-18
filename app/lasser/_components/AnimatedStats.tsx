'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface StatProps {
  prefix?: string
  value: number
  suffix?: string
  label: string
  duration?: number
}

function Counter({ prefix = '', value, suffix = '', label, duration = 1400 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-bebas text-5xl md:text-6xl leading-none mb-2"
        style={{ color: '#B5D318', textShadow: '0 0 40px rgba(181,211,24,0.4)' }}
      >
        {prefix}{count}{suffix}
      </div>
      <div className="text-zinc-500 text-sm uppercase tracking-widest">{label}</div>
    </div>
  )
}

export function AnimatedStats() {
  return (
    <section className="relative border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B5D318]/3 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <Counter value={500} prefix="+" label="Equipos vestidos" />
        <Counter value={10} prefix="+" label="Años en Vallarta" />
        <Counter value={6} label="Técnicas de impresión" />
        <Counter value={48} suffix="h" label="Respuesta de diseño" />
      </div>
    </section>
  )
}
