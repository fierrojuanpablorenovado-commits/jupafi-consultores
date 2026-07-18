'use client'
import { useState } from 'react'

const TIPOS = [
  { value: 'replica', label: '⚽ Réplica de Fútbol', desde: 850 },
  { value: 'corte', label: '✂️ Uniforme a la Medida', desde: 280 },
  { value: 'dtf', label: '🖨️ Playera con Estampado DTF', desde: 150 },
  { value: 'sublimado', label: '🌈 Sublimado Completo', desde: 320 },
]

const CANTIDADES = ['1-5 piezas', '6-15 piezas', '16-30 piezas', '31-60 piezas', '+60 piezas']

type Step = 1 | 2 | 3 | 4

export function Cotizador() {
  const [step, setStep] = useState<Step>(1)
  const [tipo, setTipo] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [detalle, setDetalle] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [equipo, setEquipo] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  const tipoObj = TIPOS.find(t => t.value === tipo)

  async function enviar() {
    setLoading(true)
    // Crear pedido en el sistema como "recibido"
    await fetch('/lasser/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: tipo === 'replica' ? 'clon' : tipo === 'dtf' ? 'dimeo' : tipo === 'sublimado' ? 'corte' : 'corte',
        tecnica: tipoObj?.label.split(' ').slice(1).join(' ') ?? '',
        clienteNombre: nombre,
        clienteTelefono: telefono,
        nombreEquipo: equipo || 'Por definir',
        responsable: 'Admin',
        comentario: `Cotización web — Cantidad: ${cantidad}. Detalle: ${detalle}`,
        fechaPedido: new Date().toISOString().split('T')[0],
      }),
    })
    setLoading(false)
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">
        <div className="text-6xl mb-4">🎽</div>
        <h3 className="text-2xl font-black text-white mb-2">¡Cotización recibida!</h3>
        <p className="text-zinc-400 mb-2">
          Tu solicitud ya está en nuestro sistema. Te contactamos al
          <span className="text-[#B5D318] font-semibold"> {telefono} </span>
          en menos de 2 horas.
        </p>
        <p className="text-zinc-600 text-sm mt-4">Lunes a sábado de 9am a 7pm</p>
        <a
          href={`https://wa.me/5213221052920?text=Hola%20Lasser%20Sport%2C%20acabo%20de%20llenar%20la%20cotizaci%C3%B3n%20en%20l%C3%ADnea%20-%20soy%20${encodeURIComponent(nombre)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          💬 Confirmar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
      {/* Progress */}
      <div className="flex border-b border-zinc-800">
        {([1, 2, 3, 4] as Step[]).map(s => (
          <div
            key={s}
            className={`flex-1 h-1.5 transition-colors ${step >= s ? 'bg-[#B5D318]' : 'bg-zinc-800'}`}
          />
        ))}
      </div>

      <div className="p-8">
        {/* Step 1: Tipo */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="text-[#B5D318] text-xs font-bold uppercase tracking-widest mb-1">Paso 1 de 4</p>
              <h3 className="text-2xl font-black">¿Qué necesitas?</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TIPOS.map(t => (
                <button
                  key={t.value}
                  onClick={() => { setTipo(t.value); setStep(2) }}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl border text-left transition ${
                    tipo === t.value
                      ? 'border-[#B5D318] bg-[#B5D318]/10 text-white'
                      : 'border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white'
                  }`}
                >
                  <span className="font-semibold text-base">{t.label}</span>
                  <span className="text-zinc-500 text-sm">desde ${t.desde.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Cantidad */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="text-[#B5D318] text-xs font-bold uppercase tracking-widest mb-1">Paso 2 de 4</p>
              <h3 className="text-2xl font-black">¿Cuántas piezas?</h3>
              <p className="text-zinc-500 text-sm mt-1">A más cantidad, mejor precio por pieza</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CANTIDADES.map(c => (
                <button
                  key={c}
                  onClick={() => { setCantidad(c); setStep(3) }}
                  className={`py-3 px-4 rounded-xl border font-semibold transition ${
                    cantidad === c
                      ? 'border-[#B5D318] bg-[#B5D318]/10 text-white'
                      : 'border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="text-zinc-600 text-sm hover:text-zinc-400 transition">← Atrás</button>
          </div>
        )}

        {/* Step 3: Detalle */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <p className="text-[#B5D318] text-xs font-bold uppercase tracking-widest mb-1">Paso 3 de 4</p>
              <h3 className="text-2xl font-black">Cuéntanos más</h3>
              <p className="text-zinc-500 text-sm mt-1">Colores, diseño, detalles especiales — todo ayuda</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Nombre del equipo / empresa</label>
                <input
                  value={equipo}
                  onChange={e => setEquipo(e.target.value)}
                  placeholder="Antorcha Guayabitos, Empresa X..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#B5D318] outline-none transition placeholder:text-zinc-600"
                />
              </div>
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">¿Qué personalización necesitas?</label>
                <textarea
                  value={detalle}
                  onChange={e => setDetalle(e.target.value)}
                  rows={3}
                  placeholder="Ej: Nombre y número en el dorso, logo del equipo en el pecho, colores azul y blanco..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#B5D318] outline-none transition placeholder:text-zinc-600 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="text-zinc-600 text-sm hover:text-zinc-400 transition">← Atrás</button>
              <button
                onClick={() => setStep(4)}
                className="ml-auto bg-[#B5D318] text-zinc-950 font-black px-6 py-2.5 rounded-xl hover:bg-[#c8e820] transition"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Contacto */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <p className="text-[#B5D318] text-xs font-bold uppercase tracking-widest mb-1">Paso 4 de 4</p>
              <h3 className="text-2xl font-black">¿A dónde te avisamos?</h3>
              <p className="text-zinc-500 text-sm mt-1">Te mandamos la cotización por WhatsApp</p>
            </div>

            {/* Resumen */}
            <div className="bg-zinc-800/60 rounded-xl p-4 text-sm space-y-1.5">
              <div className="flex gap-2"><span className="text-zinc-500">Servicio:</span><span className="text-white font-medium">{tipoObj?.label}</span></div>
              <div className="flex gap-2"><span className="text-zinc-500">Cantidad:</span><span className="text-white font-medium">{cantidad}</span></div>
              {equipo && <div className="flex gap-2"><span className="text-zinc-500">Equipo:</span><span className="text-white font-medium">{equipo}</span></div>}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Tu nombre *</label>
                <input
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                  placeholder="Juan García"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#B5D318] outline-none transition placeholder:text-zinc-600"
                />
              </div>
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">WhatsApp *</label>
                <input
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  required
                  type="tel"
                  placeholder="322 100 0000"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-[#B5D318] outline-none transition placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => setStep(3)} className="text-zinc-600 text-sm hover:text-zinc-400 transition">← Atrás</button>
              <button
                onClick={enviar}
                disabled={!nombre || !telefono || loading}
                className="ml-auto bg-[#B5D318] text-zinc-950 font-black px-8 py-3 rounded-xl hover:bg-[#c8e820] disabled:opacity-60 transition flex items-center gap-2"
              >
                {loading ? 'Enviando...' : '🎽 Solicitar cotización'}
              </button>
            </div>

            <p className="text-zinc-700 text-xs text-center">
              Al enviar aceptas que te contactemos por WhatsApp con tu cotización. Sin spam.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
