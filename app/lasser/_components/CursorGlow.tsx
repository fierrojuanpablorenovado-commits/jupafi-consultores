'use client'
import { motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'

export function CursorGlow() {
  const rm = useReducedMotion()
  const x = useMotionValue(-800)
  const y = useMotionValue(-800)

  useEffect(() => {
    if (rm) return
    const handler = (e: MouseEvent) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [rm, x, y])

  if (rm) return null
  return (
    <motion.div
      className="fixed pointer-events-none z-[1] hidden lg:block"
      style={{
        x, y,
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(181,211,24,0.06) 0%, transparent 70%)',
      }}
    />
  )
}
