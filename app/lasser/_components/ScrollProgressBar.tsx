'use client'
import { motion, useScroll } from 'motion/react'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #B5D318, #d4f020, #B5D318)',
      }}
    />
  )
}
