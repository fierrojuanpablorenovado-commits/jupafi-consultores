'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { LasserLogo } from '../_components/LasserLogo'

export default function LasserLogin() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/lasser/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/lasser/admin')
      } else {
        setError('Contraseña incorrecta. Intenta de nuevo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 overflow-hidden">

      {/* Glow de energía */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 110%, rgba(181,211,24,0.2) 0%, rgba(181,211,24,0.06) 45%, transparent 72%)',
          animation: 'pulse-glow 3.5s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #B5D318 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B5D318]/35 to-transparent" />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B5D318]/15 to-transparent" />

      {/* Card principal */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/lasser">
            <LasserLogo className="h-12" />
          </Link>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 md:p-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="text-center pb-2">
            <div className="inline-flex items-center gap-2 bg-[#B5D318]/[0.07] border border-[#B5D318]/20 text-[#B5D318] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.18em] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5D318] animate-pulse" />
              Acceso Restringido
            </div>
            <h1 className="font-bebas text-4xl text-white tracking-wide leading-none mb-2">
              PANEL INTERNO 🎽
            </h1>
            <p className="text-zinc-500 text-sm">
              Exclusivo para el equipo Lasser Sport
            </p>
          </div>

          {/* Input contraseña */}
          <div>
            <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-2.5">
              🔐 Contraseña
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                autoComplete="current-password"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-white text-base focus:border-[#B5D318]/50 focus:shadow-[0_0_0_3px_rgba(181,211,24,0.1)] outline-none transition-all duration-200 placeholder:text-zinc-700 pr-14"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors text-lg"
                aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {show ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 border border-red-500/25 rounded-2xl px-5 py-3.5 text-red-400 text-sm flex items-center gap-2"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#B5D318] text-black font-black text-lg py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(181,211,24,0.45)] disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Entrando...
              </>
            ) : (
              '🚀 Entrar al panel'
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-zinc-700 text-xs">o</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {/* Link cliente */}
          <div className="text-center">
            <p className="text-zinc-600 text-sm">
              ¿Cliente buscando tu pedido?{' '}
              <Link href="/lasser#tracking" className="text-[#B5D318] font-semibold hover:underline">
                Rastrea aquí →
              </Link>
            </p>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.p
          className="text-center text-zinc-700 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/lasser" className="hover:text-zinc-500 transition-colors">
            ← Volver a Lasser Sport
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
