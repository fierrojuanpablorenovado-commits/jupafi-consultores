'use client'
import type { OrderStatus } from '../_lib/types'
import { STATUS_ORDER, STATUS_LABEL } from '../_lib/types'

const ICONS: Record<OrderStatus, string> = {
  recibido:     '📥',
  diseño:       '🎨',
  autorizacion: '✅',
  produccion:   '🏭',
  calidad:      '🔍',
  listo:        '📦',
  entregado:    '🎽',
}

export function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentIdx = STATUS_ORDER.indexOf(status)
  return (
    <div className="space-y-0">
      {STATUS_ORDER.map((s, i) => {
        const done = i < currentIdx
        const active = i === currentIdx
        const pending = i > currentIdx
        return (
          <div key={s} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                done    ? 'bg-lime-400 text-zinc-900' :
                active  ? 'bg-lime-400/20 border-2 border-lime-400 text-lime-400 animate-pulse' :
                          'bg-zinc-800 text-zinc-600'
              }`}>
                {done ? '✓' : ICONS[s]}
              </div>
              {i < STATUS_ORDER.length - 1 && (
                <div className={`w-0.5 h-8 ${done ? 'bg-lime-400/50' : 'bg-zinc-800'}`} />
              )}
            </div>
            <div className="pt-1 pb-8">
              <p className={`text-sm font-semibold ${
                done ? 'text-zinc-400' : active ? 'text-lime-400' : 'text-zinc-600'
              }`}>
                {STATUS_LABEL[s]}
                {active && <span className="ml-2 text-xs bg-lime-400/20 text-lime-400 px-2 py-0.5 rounded-full">← Aquí estás</span>}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
