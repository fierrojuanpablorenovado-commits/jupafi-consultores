'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TIPOS = [
  { value: 'clon', label: 'Réplica (Clon)' },
  { value: 'corte', label: 'Corte personalizado' },
  { value: 'replica_fut', label: 'Réplica Fútbol' },
  { value: 'dimeo', label: 'Dimeo / Playeras' },
]

const TECNICAS = ['Impresión Digital', 'DTF', 'Vinil', 'Sublimado', 'Corte', 'DTF + Vinil', 'Nombre y Número', 'Nombre, Número y Logo']
const RESPONSABLES = ['Mayra', 'Ale', 'Cynthia', 'Admin']

export function NuevoPedidoForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [form, setForm] = useState({
    clienteNombre: '',
    clienteTelefono: '',
    nombreEquipo: '',
    tipo: 'corte',
    tecnica: 'Impresión Digital',
    impresion: '',
    responsable: 'Mayra',
    fechaCompromiso: '',
    total: '',
    anticipo: '',
    comentario: '',
  })

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/lasser/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          fechaPedido: new Date().toISOString().split('T')[0],
          total: form.total ? Number(form.total) : undefined,
          anticipo: form.anticipo ? Number(form.anticipo) : undefined,
        }),
      })
      if (res.ok) {
        const order = await res.json()
        setSuccess(order.folio)
        setTimeout(() => router.push('/lasser/admin/pedidos'), 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-black text-white mb-2">Pedido registrado</h2>
        <p className="text-zinc-400">Folio: <span className="text-[#B5D318] font-mono font-bold">{success}</span></p>
        <p className="text-zinc-600 text-sm mt-2">Redirigiendo a la lista de pedidos...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">

      <fieldset className="space-y-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Cliente</legend>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nombre del cliente *" required>
            <input value={form.clienteNombre} onChange={e => set('clienteNombre', e.target.value)} required className={INPUT} placeholder="Juan García" />
          </Field>
          <Field label="Teléfono">
            <input value={form.clienteTelefono} onChange={e => set('clienteTelefono', e.target.value)} className={INPUT} placeholder="322 100 0000" />
          </Field>
        </div>
        <Field label="Nombre del equipo *" required>
          <input value={form.nombreEquipo} onChange={e => set('nombreEquipo', e.target.value)} required className={INPUT} placeholder="Antorcha Guayabitos" />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Producción</legend>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tipo *">
            <select value={form.tipo} onChange={e => set('tipo', e.target.value)} className={INPUT}>
              {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </Field>
          <Field label="Técnica *">
            <select value={form.tecnica} onChange={e => set('tecnica', e.target.value)} className={INPUT}>
              {TECNICAS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Impresión / Personalización">
          <input value={form.impresion} onChange={e => set('impresion', e.target.value)} className={INPUT} placeholder="Nombre, número y logo" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Responsable *">
            <select value={form.responsable} onChange={e => set('responsable', e.target.value)} className={INPUT}>
              {RESPONSABLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Fecha compromiso">
            <input type="date" value={form.fechaCompromiso} onChange={e => set('fechaCompromiso', e.target.value)} className={INPUT} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Financiero</legend>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Total ($)">
            <input type="number" value={form.total} onChange={e => set('total', e.target.value)} className={INPUT} placeholder="2000" />
          </Field>
          <Field label="Anticipo ($)">
            <input type="number" value={form.anticipo} onChange={e => set('anticipo', e.target.value)} className={INPUT} placeholder="1000" />
          </Field>
        </div>
      </fieldset>

      <Field label="Observaciones">
        <textarea value={form.comentario} onChange={e => set('comentario', e.target.value)} rows={3} className={INPUT} placeholder="Notas adicionales del pedido..." />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#B5D318] text-zinc-950 font-black py-3.5 rounded-xl hover:bg-[#c8e820] disabled:opacity-60 transition text-lg"
      >
        {loading ? 'Registrando...' : 'Registrar pedido →'}
      </button>
    </form>
  )
}

const INPUT = 'w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#B5D318] outline-none transition placeholder:text-zinc-600'

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
