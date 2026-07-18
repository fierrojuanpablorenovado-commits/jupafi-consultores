import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOrderByToken } from '../../_lib/store'
import { OrderTimeline } from '../../_components/OrderTimeline'
import { STATUS_LABEL } from '../../_lib/types'

export default async function TrackingPage({ params }: { params: { token: string } }) {
  const order = getOrderByToken(params.token)
  if (!order) notFound()

  const saldo = (order.total ?? 0) - (order.anticipo ?? 0)
  const diasRestantes = order.fechaCompromiso
    ? Math.ceil((new Date(order.fechaCompromiso).getTime() - Date.now()) / 86400000)
    : null

  const isListo = order.status === 'listo'
  const isEntregado = order.status === 'entregado'

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/lasser" className="flex items-center gap-2">
            <span className="text-[#B5D318] font-black text-lg">LASSER</span>
            <span className="text-zinc-500 text-xs font-bold">SPORT®</span>
          </Link>
          <span className="text-zinc-600 text-xs">Seguimiento de pedido</span>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-10 space-y-6">
        {/* Folio y equipo */}
        <div className="text-center">
          <div className="text-zinc-500 text-xs font-mono mb-2">{order.folio}</div>
          <h1 className="text-3xl font-black uppercase mb-1">{order.nombreEquipo}</h1>
          <p className="text-zinc-400 text-sm">{order.clienteNombre}</p>
        </div>

        {/* Status card */}
        <div className={`rounded-3xl p-8 text-center ${
          isListo    ? 'bg-[#B5D318]/10 border-2 border-[#B5D318]' :
          isEntregado ? 'bg-zinc-800/60 border border-zinc-700' :
                       'bg-zinc-900 border border-zinc-800'
        }`}>
          <div className="text-5xl mb-3">
            {isListo ? '📦' : isEntregado ? '🎽' : '🏭'}
          </div>
          <div className={`text-2xl font-black uppercase mb-2 ${isListo ? 'text-[#B5D318]' : 'text-white'}`}>
            {STATUS_LABEL[order.status]}
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {order.status === 'recibido'     && 'Tu pedido fue registrado y está siendo procesado.'}
            {order.status === 'diseño'       && 'Nuestro equipo está trabajando en el diseño de tu uniforme.'}
            {order.status === 'autorizacion' && 'El diseño está listo. Pronto te compartimos la vista previa para tu aprobación.'}
            {order.status === 'produccion'   && 'Tu uniforme está en producción. ¡Ya se está fabricando!'}
            {order.status === 'calidad'      && 'Revisando que todo esté perfecto antes de entregarte el pedido.'}
            {order.status === 'listo'        && '¡Tu pedido está listo para recoger! Comunícate con nosotros para coordinar la entrega.'}
            {order.status === 'entregado'    && '¡Pedido entregado! Gracias por confiar en Lasser Sport.'}
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="font-bold text-sm uppercase tracking-wider text-zinc-400 mb-5">Progreso del pedido</h2>
          <OrderTimeline status={order.status} />
        </div>

        {/* Info extra */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-zinc-400">Detalles</h2>

          {order.fechaCompromiso && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-sm">📅 Fecha estimada</span>
              <span className={`font-semibold text-sm ${diasRestantes !== null && diasRestantes < 0 ? 'text-red-400' : diasRestantes !== null && diasRestantes <= 2 ? 'text-amber-400' : 'text-white'}`}>
                {new Date(order.fechaCompromiso).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
                {diasRestantes !== null && diasRestantes > 0 && <span className="text-zinc-500 text-xs ml-2">({diasRestantes} días)</span>}
              </span>
            </div>
          )}

          {order.tecnica && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-sm">🖨️ Técnica</span>
              <span className="text-white text-sm font-medium">{order.tecnica}</span>
            </div>
          )}

          {saldo > 0 && !isEntregado && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-zinc-500 text-sm">💰 Saldo pendiente</span>
              <span className="text-amber-400 font-black text-lg">${saldo.toLocaleString()} MXN</span>
            </div>
          )}

          {saldo <= 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-zinc-500 text-sm">💰 Pago</span>
              <span className="text-emerald-400 font-semibold text-sm">✓ Liquidado</span>
            </div>
          )}
        </div>

        {/* Comentario si existe */}
        {order.comentario && (
          <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-4">
            <p className="text-zinc-400 text-sm">💬 {order.comentario}</p>
          </div>
        )}

        {/* CTA WhatsApp */}
        <a
          href={`https://wa.me/5213221052920?text=Hola%20Lasser%2C%20consulto%20sobre%20mi%20pedido%20${order.folio}%20-%20${encodeURIComponent(order.nombreEquipo)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition text-base"
        >
          <span>💬</span> Contactar a Lasser Sport
        </a>

        <p className="text-center text-zinc-700 text-xs">
          <Link href="/lasser" className="hover:text-zinc-500 transition">lassersport · Puerto Vallarta</Link>
        </p>
      </div>
    </div>
  )
}
