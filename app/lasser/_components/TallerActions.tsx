'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { OrderStatus } from '../_lib/types'
import { STATUS_LABEL } from '../_lib/types'

const NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  diseño:       'autorizacion',
  autorizacion: 'produccion',
  produccion:   'calidad',
  calidad:      'listo',
  listo:        'entregado',
}

export function TallerActions({ orderId, currentStatus, token }: { orderId: string; currentStatus: OrderStatus; token: string }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const next = NEXT[currentStatus]

  async function advance() {
    if (!next) return
    setLoading(true)
    try {
      const res = await fetch(`/lasser/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (res.ok) {
        setDone(true)
        setTimeout(() => router.refresh(), 800)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      {next && (
        <button
          onClick={advance}
          disabled={loading || done}
          className="flex-1 bg-[#B5D318]/10 border border-[#B5D318]/40 text-[#B5D318] font-bold text-sm py-2.5 rounded-xl hover:bg-[#B5D318]/20 disabled:opacity-60 transition"
        >
          {done ? '✓ Actualizado' : loading ? 'Actualizando...' : `→ Marcar ${STATUS_LABEL[next]}`}
        </button>
      )}
      <a
        href={`/lasser/pedido/${token}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-sm transition"
        title="Ver link del cliente"
      >
        🔗
      </a>
    </div>
  )
}
