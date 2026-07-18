'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SEED_ORDERS } from '../_lib/data'

export function TrackingForm() {
  const [folio, setFolio] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const q = folio.trim().toUpperCase()
    if (!q) return
    // Find by folio or token
    const order = SEED_ORDERS.find(
      o => o.folio.toUpperCase() === q || o.token === q.toLowerCase()
    )
    if (order) {
      router.push(`/lasser/pedido/${order.token}`)
    } else {
      setError('No encontramos ese folio. Verifica el número de pedido.')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          value={folio}
          onChange={e => setFolio(e.target.value)}
          placeholder="Ej: LS-2026-001"
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-[#B5D318] outline-none transition text-sm"
        />
        <button
          type="submit"
          className="bg-[#B5D318] text-zinc-950 font-black px-6 py-3 rounded-xl hover:bg-[#c8e820] transition whitespace-nowrap"
        >
          Ver estado →
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  )
}
