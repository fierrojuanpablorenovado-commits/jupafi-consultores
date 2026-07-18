import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllOrders } from '../_lib/store'
import { StatusBadge } from '../_components/StatusBadge'
import { TallerActions } from '../_components/TallerActions'
import type { Order, Responsable } from '../_lib/types'

const RESPONSABLES: Responsable[] = ['Mayra', 'Ale', 'Cynthia']

export default async function TallerPage() {
  const session = cookies().get('ls_session')
  if (session?.value !== 'ok') redirect('/lasser/login')

  const all = getAllOrders()
  const activos = all.filter(o => !['entregado', 'recibido'].includes(o.status))

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      {/* Simple header para taller (mobile-friendly) */}
      <header className="sticky top-0 bg-[#0A0A0A]/95 backdrop-blur border-b border-zinc-800 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/lasser/admin" className="text-[#B5D318] font-black text-lg">← LASSER</Link>
          <h1 className="text-white font-bold text-base">Vista Taller</h1>
          <span className="text-zinc-500 text-xs">{activos.length} activos</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {RESPONSABLES.map(resp => {
          const orders = activos.filter(o => o.responsable === resp)
          if (orders.length === 0) return null
          return (
            <section key={resp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#B5D318]/20 border border-[#B5D318]/40 flex items-center justify-center text-[#B5D318] font-black text-sm">
                  {resp[0]}
                </div>
                <h2 className="font-black text-xl">{resp}</h2>
                <span className="text-zinc-600 text-sm">{orders.length} pedido{orders.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {orders.map(o => <OrderCard key={o.id} order={o} />)}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function OrderCard({ order: o }: { order: Order }) {
  const saldo = (o.total ?? 0) - (o.anticipo ?? 0)
  const vencido = o.fechaCompromiso && new Date(o.fechaCompromiso) < new Date()

  return (
    <div className={`bg-zinc-900 border rounded-2xl p-5 ${vencido ? 'border-red-500/40' : 'border-zinc-800'}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-black text-lg leading-tight">{o.nombreEquipo}</div>
          <div className="text-zinc-500 text-xs mt-0.5">{o.clienteNombre} · {o.folio}</div>
        </div>
        <StatusBadge status={o.status} />
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>🖨️</span> {o.tecnica} {o.impresion && `— ${o.impresion}`}
        </div>
        {o.fechaCompromiso && (
          <div className={`flex items-center gap-2 text-sm ${vencido ? 'text-red-400 font-bold' : 'text-zinc-400'}`}>
            <span>📅</span> Entregar: {new Date(o.fechaCompromiso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
            {vencido && ' — VENCIDO ⚠️'}
          </div>
        )}
        {o.comentario && (
          <div className="flex items-start gap-2 text-sm text-zinc-500 italic">
            <span>💬</span> {o.comentario}
          </div>
        )}
        {saldo > 0 && (
          <div className="flex items-center gap-2 text-sm text-amber-400">
            <span>💰</span> Saldo: ${saldo.toLocaleString()}
          </div>
        )}
      </div>

      <TallerActions orderId={o.id} currentStatus={o.status} token={o.token} />
    </div>
  )
}
