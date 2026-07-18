import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllOrders, getStats } from '../_lib/store'
import { NavAdmin } from '../_components/NavAdmin'
import { StatusBadge } from '../_components/StatusBadge'
import type { Order } from '../_lib/types'
import { TIPO_LABEL } from '../_lib/types'

// ── Helpers ──────────────────────────────────────────────────────────────────
function diasHasta(fecha: string): number {
  return Math.ceil((new Date(fecha).getTime() - Date.now()) / 86400000)
}

function statusGroup(orders: Order[]) {
  const map: Record<string, number> = {}
  for (const o of orders) {
    if (o.status !== 'entregado') map[o.status] = (map[o.status] ?? 0) + 1
  }
  return map
}

// ── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({
  emoji, title, value, sub, glow, trend,
}: {
  emoji: string; title: string; value: string | number; sub: string
  glow: string; trend?: { up: boolean; label: string }
}) {
  return (
    <div
      className="relative rounded-3xl p-6 overflow-hidden group"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Glow sutil */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(ellipse 80% 70% at 50% 120%, ${glow} 0%, transparent 70%)` }} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{emoji}</span>
          {trend && (
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend.up ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
              {trend.up ? '↑' : '↓'} {trend.label}
            </span>
          )}
        </div>
        <div className="font-bebas text-4xl text-white leading-none mb-1">{value}</div>
        <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-0.5">{title}</div>
        <div className="text-zinc-600 text-xs">{sub}</div>
      </div>
    </div>
  )
}

// ── Pipeline Bar ──────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  recibido:     { label: '📥 Recibido',     color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
  diseno:       { label: '🎨 Diseño',        color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  autorizacion: { label: '✅ Autorización',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  produccion:   { label: '🏭 Producción',    color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  calidad:      { label: '🔍 Calidad',       color: '#06b6d4', bg: 'rgba(6,182,212,0.15)'  },
  listo:        { label: '🎽 Listo',         color: '#B5D318', bg: 'rgba(181,211,24,0.15)' },
}

function PipelineBar({ counts, total }: { counts: Record<string, number>; total: number }) {
  const statuses = ['recibido', 'diseno', 'autorizacion', 'produccion', 'calidad', 'listo']
  return (
    <div
      className="rounded-3xl p-6"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bebas text-xl text-white tracking-wide">Pipeline de Producción 🏭</h3>
          <p className="text-zinc-600 text-xs">{total} pedidos activos en proceso</p>
        </div>
        <Link href="/lasser/admin/pedidos" className="text-[#B5D318] text-xs font-semibold hover:underline">Ver todos →</Link>
      </div>

      {/* Barra visual */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-0.5">
        {statuses.map(s => {
          const pct = total > 0 ? ((counts[s] ?? 0) / total) * 100 : 0
          if (pct === 0) return null
          return (
            <div
              key={s}
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: STATUS_CONFIG[s]?.color ?? '#666', minWidth: 4 }}
              title={`${STATUS_CONFIG[s]?.label}: ${counts[s]}`}
            />
          )
        })}
      </div>

      {/* Leyenda */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {statuses.map(s => {
          const n = counts[s] ?? 0
          if (n === 0) return null
          const cfg = STATUS_CONFIG[s]
          return (
            <div key={s} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: cfg?.bg }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg?.color }} />
              <span className="text-xs text-zinc-300 truncate">{cfg?.label}</span>
              <span className="text-xs font-black ml-auto" style={{ color: cfg?.color }}>{n}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Alert Card ────────────────────────────────────────────────────────────────
function AlertPanel({ atrasados, listos }: { atrasados: Order[]; listos: Order[] }) {
  if (atrasados.length === 0 && listos.length === 0) return null
  return (
    <div
      className="rounded-3xl p-6"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <h3 className="font-bebas text-xl text-white tracking-wide mb-4">Alertas Operativas ⚠️</h3>
      <div className="space-y-2">
        {atrasados.map(o => (
          <div key={o.id} className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-red-500/10 border border-red-500/20">
            <span className="text-red-400 text-lg flex-shrink-0">🚨</span>
            <div className="flex-1 min-w-0">
              <div className="text-red-300 font-semibold text-sm truncate">{o.nombreEquipo}</div>
              <div className="text-red-400/60 text-xs">{o.folio} · Fecha vencida</div>
            </div>
            <Link href="/lasser/admin/pedidos" className="text-red-400 text-xs font-bold hover:underline flex-shrink-0">Ver →</Link>
          </div>
        ))}
        {listos.map(o => (
          <div key={o.id} className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(181,211,24,0.08)', border: '1px solid rgba(181,211,24,0.2)' }}>
            <span className="text-[#B5D318] text-lg flex-shrink-0">🎽</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-zinc-200 truncate">{o.nombreEquipo}</div>
              <div className="text-zinc-500 text-xs">{o.folio} · Listo para entrega</div>
            </div>
            <a
              href={`https://wa.me/${o.clienteTelefono?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${o.clienteNombre}, tu pedido ${o.folio} de Lasser Sport está listo para recoger 🎽`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B5D318] text-xs font-bold hover:underline flex-shrink-0"
            >
              Avisar →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Quick Actions ─────────────────────────────────────────────────────────────
function QuickActions() {
  return (
    <div
      className="rounded-3xl p-6"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <h3 className="font-bebas text-xl text-white tracking-wide mb-4">Acciones Rápidas ⚡</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: '/lasser/admin/pedidos/nuevo', emoji: '➕', label: 'Nuevo Pedido',    color: '#B5D318', textColor: 'text-black' },
          { href: '/lasser/taller',              emoji: '🏭', label: 'Vista Taller',    color: 'rgba(249,115,22,0.15)', textColor: 'text-orange-300' },
          { href: '/lasser/admin/pedidos',       emoji: '📋', label: 'Todos los Pedidos', color: 'rgba(255,255,255,0.06)', textColor: 'text-zinc-300' },
          { href: '/lasser',                     emoji: '🌐', label: 'Ver Sitio Web',   color: 'rgba(255,255,255,0.06)', textColor: 'text-zinc-300' },
        ].map(a => (
          <Link
            key={a.href}
            href={a.href}
            className={`flex flex-col items-center gap-2 rounded-2xl px-4 py-5 font-bold text-sm text-center transition-all hover:scale-[1.02] hover:opacity-90 ${a.textColor}`}
            style={{ background: a.color, border: a.color.startsWith('rgba') ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
          >
            <span className="text-2xl">{a.emoji}</span>
            <span>{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Recent Orders Table (compact) ─────────────────────────────────────────────
function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
        <h3 className="font-bebas text-xl text-white tracking-wide">Pedidos Activos 📦</h3>
        <Link href="/lasser/admin/pedidos" className="text-[#B5D318] text-xs font-semibold hover:underline">
          Ver todos ({orders.length}) →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {['Folio', 'Equipo / Cliente', 'Responsable', 'Compromiso', 'Estado', 'Saldo'].map(h => (
                <th key={h} className="text-left text-zinc-600 font-bold px-5 py-3 text-xs uppercase tracking-wider first:pl-6">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 10).map((o) => {
              const saldo = (o.total ?? 0) - (o.anticipo ?? 0)
              const dias = o.fechaCompromiso ? diasHasta(o.fechaCompromiso) : null
              const esVencido = dias !== null && dias < 0
              const esUrgente = dias !== null && dias >= 0 && dias <= 2
              return (
                <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 first:pl-6 font-mono text-zinc-500 text-xs">{o.folio}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white text-sm">{o.nombreEquipo}</div>
                    <div className="text-zinc-500 text-xs">{o.clienteNombre} · {TIPO_LABEL[o.tipo]}</div>
                  </td>
                  <td className="px-5 py-4 text-zinc-400 text-xs">{o.responsable}</td>
                  <td className="px-5 py-4">
                    {o.fechaCompromiso ? (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        esVencido ? 'bg-red-500/15 text-red-400'
                        : esUrgente ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-white/[0.05] text-zinc-400'
                      }`}>
                        {esVencido ? '🚨' : esUrgente ? '⚠️' : '📅'}{' '}
                        {new Date(o.fechaCompromiso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                        {dias !== null && ` (${dias < 0 ? `${Math.abs(dias)}d atrás` : dias === 0 ? 'hoy' : `${dias}d`})`}
                      </span>
                    ) : <span className="text-zinc-700">—</span>}
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4 text-xs font-bold">
                    {saldo > 0
                      ? <span className="text-amber-400">💰 ${saldo.toLocaleString()}</span>
                      : <span className="text-emerald-400">✅ Pagado</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function AdminDashboard() {
  const session = cookies().get('ls_session')
  if (session?.value !== 'ok') redirect('/lasser/login')

  const stats = getStats()
  const orders = getAllOrders()
  const activos = orders.filter(o => o.status !== 'entregado')
  const atrasados = activos.filter(o => o.fechaCompromiso && new Date(o.fechaCompromiso) < new Date())
  const listos = activos.filter(o => o.status === 'listo')
  const counts = statusGroup(activos)
  const hoy = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="bg-black min-h-screen text-white">
      <style>{`
        @keyframes pulse-glow { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        .font-bebas { font-family: var(--font-bebas), Impact, sans-serif; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.07); }
      `}</style>

      <NavAdmin />

      <main className="pl-56">
        {/* ── Fondo sutil ── */}
        <div className="fixed inset-0 pointer-events-none ml-56 z-0" aria-hidden style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(181,211,24,0.04) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">

          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#B5D318]/[0.07] border border-[#B5D318]/20 text-[#B5D318] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B5D318] animate-pulse" />
                Panel de Administración
              </div>
              <h1 className="font-bebas text-5xl text-white tracking-wide leading-none">DASHBOARD 🎽</h1>
              <p className="text-zinc-500 text-sm mt-1">
                {hoy.charAt(0).toUpperCase() + hoy.slice(1)} · {activos.length} pedidos activos
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/lasser/taller"
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-300 transition-all hover:text-white"
                style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }}
              >
                🏭 Vista Taller
              </Link>
              <Link
                href="/lasser/admin/pedidos/nuevo"
                className="bg-[#B5D318] text-black font-black px-5 py-2.5 rounded-xl text-sm hover:shadow-[0_0_24px_rgba(181,211,24,0.4)] transition-all hover:scale-[1.02]"
              >
                ➕ Nuevo Pedido
              </Link>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              emoji="📦"
              title="Pedidos activos"
              value={stats.activos}
              sub="en proceso ahora"
              glow="rgba(99,102,241,0.2)"
              trend={{ up: true, label: 'esta semana' }}
            />
            <StatCard
              emoji="🏭"
              title="En producción"
              value={stats.enProduccion}
              sub="fabricando ahora"
              glow="rgba(249,115,22,0.2)"
            />
            <StatCard
              emoji="🎽"
              title="Listos para entrega"
              value={stats.listos}
              sub="avisar a clientes"
              glow="rgba(181,211,24,0.25)"
              trend={stats.listos > 0 ? { up: true, label: `${stats.listos} esperando` } : undefined}
            />
            <StatCard
              emoji="💰"
              title="Saldo por cobrar"
              value={`$${stats.saldoPendiente.toLocaleString()}`}
              sub="MXN pendiente"
              glow="rgba(245,158,11,0.2)"
            />
          </div>

          {/* ── Fila media: Pipeline + Alertas + Acciones ── */}
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <PipelineBar counts={counts} total={activos.length} />
            </div>
            <div className="flex flex-col gap-4">
              {(atrasados.length > 0 || listos.length > 0) ? (
                <AlertPanel atrasados={atrasados} listos={listos} />
              ) : (
                <div className="rounded-3xl p-6 flex flex-col items-center justify-center text-center flex-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-4xl mb-3">✅</div>
                  <div className="text-white font-bold text-sm">Todo en orden</div>
                  <div className="text-zinc-600 text-xs mt-1">Sin pedidos atrasados ni urgencias</div>
                </div>
              )}
              <QuickActions />
            </div>
          </div>

          {/* ── Tabla de pedidos recientes ── */}
          <RecentOrders orders={activos} />
        </div>
      </main>
    </div>
  )
}
