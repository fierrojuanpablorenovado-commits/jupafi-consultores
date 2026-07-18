'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Order, OrderStatus } from '../_lib/types'
import { STATUS_LABEL, STATUS_COLOR, STATUS_ORDER, TIPO_LABEL } from '../_lib/types'
import { StatusBadge } from './StatusBadge'

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  recibido:     'diseño',
  diseño:       'autorizacion',
  autorizacion: 'produccion',
  produccion:   'calidad',
  calidad:      'listo',
  listo:        'entregado',
}

export function OrdersTable({ orders: initial }: { orders: Order[] }) {
  const [orders, setOrders] = useState(initial)
  const [filter, setFilter] = useState<OrderStatus | 'todos'>('todos')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const router = useRouter()

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'todos' || o.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || o.clienteNombre.toLowerCase().includes(q) || o.nombreEquipo.toLowerCase().includes(q) || o.folio.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  async function advance(order: Order) {
    const next = NEXT_STATUS[order.status]
    if (!next) return
    setUpdating(order.id)
    try {
      const res = await fetch(`/lasser/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (res.ok) {
        const updated = await res.json()
        setOrders(prev => prev.map(o => o.id === order.id ? updated : o))
      }
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar cliente, equipo o folio..."
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#B5D318] outline-none w-64"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'todos' ? 'bg-[#B5D318] text-zinc-950' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
          >
            Todos ({orders.length})
          </button>
          {STATUS_ORDER.map(s => {
            const count = orders.filter(o => o.status === s).length
            if (count === 0) return null
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${filter === s ? 'bg-[#B5D318] text-zinc-950' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
              >
                {STATUS_LABEL[s]} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                {['Folio', 'Equipo / Cliente', 'Tipo', 'Técnica', 'Responsable', 'Entrega', 'Saldo', 'Estado', 'Acción'].map(h => (
                  <th key={h} className="text-left text-zinc-500 font-semibold px-4 py-3 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => {
                const saldo = (o.total ?? 0) - (o.anticipo ?? 0)
                const vencido = o.fechaCompromiso && new Date(o.fechaCompromiso) < new Date() && o.status !== 'entregado'
                const next = NEXT_STATUS[o.status]
                return (
                  <tr key={o.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                    <td className="px-4 py-3 font-mono text-zinc-500 text-xs">{o.folio}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{o.nombreEquipo}</div>
                      <div className="text-zinc-500 text-xs">{o.clienteNombre}</div>
                      {o.comentario && <div className="text-zinc-600 text-xs italic mt-0.5 truncate max-w-[200px]">{o.comentario}</div>}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{TIPO_LABEL[o.tipo]}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{o.tecnica}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{o.responsable}</td>
                    <td className={`px-4 py-3 text-xs whitespace-nowrap ${vencido ? 'text-red-400 font-bold' : 'text-zinc-500'}`}>
                      {o.fechaCompromiso
                        ? new Date(o.fechaCompromiso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
                        : '—'}
                      {vencido && ' ⚠️'}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap">
                      {saldo > 0 ? <span className="text-amber-400">${saldo.toLocaleString()}</span> : <span className="text-emerald-400">✓ Pagado</span>}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {next && (
                          <button
                            onClick={() => advance(o)}
                            disabled={updating === o.id}
                            className="bg-[#B5D318]/10 border border-[#B5D318]/30 text-[#B5D318] text-xs font-bold px-2.5 py-1.5 rounded-lg hover:bg-[#B5D318]/20 transition disabled:opacity-50 whitespace-nowrap"
                          >
                            {updating === o.id ? '...' : `→ ${STATUS_LABEL[next]}`}
                          </button>
                        )}
                        <a
                          href={`/lasser/pedido/${o.token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 hover:text-zinc-400 text-xs px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition"
                          title="Ver tracking del cliente"
                        >
                          🔗
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-zinc-600 py-12">No hay pedidos con ese filtro</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
