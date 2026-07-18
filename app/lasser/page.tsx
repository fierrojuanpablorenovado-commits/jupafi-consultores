import Link from 'next/link'
import { HeroSection } from './_components/HeroSection'
import { AnimatedStats } from './_components/AnimatedStats'
import { ServiciosGrid } from './_components/ServiciosGrid'
import { ScrollReveal } from './_components/ScrollReveal'
import { TrackingForm } from './_components/TrackingForm'
import { LasserLogo } from './_components/LasserLogo'
import { CursorGlow } from './_components/CursorGlow'
import { ScrollProgressBar } from './_components/ScrollProgressBar'
import { LiveTickerLasser } from './_components/LiveTickerLasser'

const PROCESO = [
  { step: '01', emoji: '📥', title: 'Solicitas',    desc: 'Nos escribes por WhatsApp o llenas el cotizador online.' },
  { step: '02', emoji: '🎨', title: 'Diseñamos',    desc: 'En 48 h tienes una propuesta visual para revisar.' },
  { step: '03', emoji: '✅', title: 'Autorizas',    desc: 'Das el visto bueno antes de que cortemos una sola tela.' },
  { step: '04', emoji: '🏭', title: 'Producción',   desc: 'Fabricamos con la técnica que mejor va con tu pedido.' },
  { step: '05', emoji: '🔍', title: 'Calidad',      desc: 'Revisamos pieza por pieza antes de que salga del taller.' },
  { step: '06', emoji: '🎽', title: 'Entregamos',   desc: 'Tu pedido listo, en la fecha acordada, sin sorpresas.' },
]

const BEFORE_AFTER = [
  { before: '😩 Pediste uniformes y llevas semanas sin noticias', after: '📦 Link de tracking desde el primer día' },
  { before: '🎨 El color llegó diferente al que aprobaste',       after: '✅ Autorizas el diseño antes de producción' },
  { before: '💸 El precio cambió al llegar a recoger',            after: '💰 El precio que cotizamos es el precio final' },
  { before: '📱 Preguntas por WhatsApp sin respuesta clara',      after: '🔍 Ves el avance en tiempo real, tú solo' },
]

export default function LasserLanding() {
  return (
    <main className="bg-black text-white min-h-screen">
      <CursorGlow />
      <ScrollProgressBar />

      {/* ── 1. HERO ── */}
      <HeroSection />

      {/* ── 2. LIVE TICKER ── */}
      <LiveTickerLasser />

      {/* ── 3. STATS ANIMADOS ── */}
      <AnimatedStats />

      {/* ── 4. ANTES / DESPUÉS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-[#B5D318] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            La diferencia
          </span>
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide">
            ASÍ SE SIENTE EL CAMBIO 🔄
          </h2>
          <p className="text-zinc-500 mt-3 max-w-lg mx-auto text-base">
            No somos otra uniformería más. Esto es lo que pasa cuando trabajas con Lasser Sport.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Columna ANTES */}
          <ScrollReveal direction="left" className="space-y-3">
            <div className="text-center py-3 glass rounded-2xl mb-2">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">😰 Antes</span>
            </div>
            {BEFORE_AFTER.map((b) => (
              <div key={b.before} className="glass rounded-2xl px-5 py-4 flex items-start gap-3">
                <span className="text-red-400/50 text-lg mt-0.5">✗</span>
                <p className="text-zinc-500 text-sm leading-relaxed">{b.before}</p>
              </div>
            ))}
          </ScrollReveal>

          {/* Columna DESPUÉS */}
          <ScrollReveal direction="right" className="space-y-3">
            <div className="text-center py-3 rounded-2xl mb-2" style={{ background: 'rgba(181,211,24,0.08)', border: '1px solid rgba(181,211,24,0.2)' }}>
              <span className="text-[#B5D318] text-xs font-bold uppercase tracking-widest">🏆 Con Lasser Sport</span>
            </div>
            {BEFORE_AFTER.map((b) => (
              <div
                key={b.after}
                className="rounded-2xl px-5 py-4 flex items-start gap-3"
                style={{ background: 'rgba(181,211,24,0.04)', border: '1px solid rgba(181,211,24,0.15)' }}
              >
                <span className="text-[#B5D318] text-lg mt-0.5">✓</span>
                <p className="text-zinc-300 text-sm leading-relaxed">{b.after}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. SERVICIOS ── */}
      <section id="servicios" className="max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block text-[#B5D318] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Lo que fabricamos
          </span>
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide">
            SERVICIOS 🎽
          </h2>
          <p className="text-zinc-500 text-base mt-3 max-w-lg mx-auto">
            Cada pedido es único. Elige el tipo de servicio y te cotizamos en menos de 2 horas.
          </p>
        </ScrollReveal>

        <ServiciosGrid />

        <ScrollReveal delay={0.2} className="mt-10 text-center">
          <a
            href="https://wa.me/5213221052920?text=Hola%20Lasser%20Sport%2C%20quiero%20cotizaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B5D318] text-black font-black text-lg px-10 py-4 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(181,211,24,0.5)]"
          >
            💬 Pedir cotización gratis
          </a>
        </ScrollReveal>
      </section>

      {/* ── 6. PROCESO ── */}
      <section id="proceso" className="relative border-y border-white/[0.05] overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(181,211,24,0.03) 0%, transparent 70%)' }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-block text-[#B5D318] text-xs font-bold uppercase tracking-[0.2em] mb-4">Sin sorpresas</span>
            <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide">ASÍ FUNCIONA ⚙️</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PROCESO.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.08}>
                <div className="glass rounded-2xl p-5 text-center h-full hover:border-[#B5D318]/25 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 glass group-hover:shadow-[0_0_16px_rgba(181,211,24,0.2)] transition-all duration-300">
                    {p.emoji}
                  </div>
                  <div className="font-bebas text-[#B5D318] text-xs tracking-widest mb-1">{p.step}</div>
                  <div className="font-bebas text-white text-lg tracking-wide mb-2 group-hover:text-[#B5D318] transition-colors">{p.title}</div>
                  <p className="text-zinc-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TRACKING ── */}
      <section id="tracking" className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <ScrollReveal>
          <div className="glass-lime rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 120%, rgba(181,211,24,0.12) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <div className="text-5xl mb-4">📦</div>
              <div className="font-bebas text-5xl text-white mb-2 tracking-wide">¿YA TIENES UN PEDIDO?</div>
              <p className="text-zinc-400 mb-8 text-sm">Consulta el estado de tu uniforme en tiempo real — sin llamar, sin esperar.</p>
              <TrackingForm />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 8. MINI TESTIMONIOS ── */}
      <section className="border-y border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-white tracking-wide">LO QUE DICEN NUESTROS EQUIPOS ⭐</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { quote: 'Los uniformes llegaron exactamente como los diseñamos. El link de seguimiento fue increíble, nunca había tenido eso con otra uniformería.', name: 'Carlos M.', role: 'Capitán · Tigres FC Vallarta', emoji: '⚽' },
              { quote: 'Para el evento de empresa necesitábamos playeras en 3 días. Cumplieron sin problema y el precio fue el mismo que cotizaron.', name: 'Daniela R.', role: 'RRHH · Empresa Vallartense', emoji: '🏢' },
              { quote: 'Las réplicas quedaron igual al original. El equipo ya las pide solo con Lasser, no van a otro lado.', name: 'Miguel A.', role: 'DT · Academia Deportiva PV', emoji: '🥅' },
            ].map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="glass rounded-3xl p-7 h-full flex flex-col">
                  <div className="text-3xl mb-4">{t.emoji}</div>
                  <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-5 italic">"{t.quote}"</p>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-zinc-500 text-xs">{t.role}</div>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#B5D318] text-sm">★</span>)}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA FINAL ── */}
      <section className="relative overflow-hidden bg-[#B5D318]">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <div className="font-bebas text-6xl md:text-8xl text-black leading-none tracking-wide mb-4">
            ¿LISTO PARA EL<br />NUEVO UNIFORME? 🎽
          </div>
          <p className="text-zinc-800 text-lg mb-10 max-w-xl mx-auto">
            Mándanos un WhatsApp y en menos de 24 h tienes tu cotización personalizada. Sin costo, sin compromiso.
          </p>
          <a
            href="https://wa.me/5213221052920?text=Hola%20Lasser%20Sport%2C%20quiero%20mi%20cotizaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-black text-white font-black text-xl px-12 py-5 rounded-2xl hover:bg-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            💬 Pedir cotización gratis
          </a>
          <p className="mt-5 text-zinc-700 text-sm">🕐 Lun–Sáb · 9 am – 7 pm · Puerto Vallarta, Jalisco</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] py-12 bg-black">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <LasserLogo className="h-8" />
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <a href="https://instagram.com/lassersport" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">📸 Instagram</a>
            <a href="https://facebook.com/share/14pwEmqtvy3/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">📘 Facebook</a>
            <Link href="/lasser/catalogo" className="hover:text-white transition-colors">🛒 Catálogo</Link>
            <Link href="/lasser/login" className="hover:text-zinc-400 transition-colors">⚙️ Panel</Link>
          </nav>
          <p className="text-zinc-700 text-xs text-center">© {new Date().getFullYear()} Lasser Sport®. Puerto Vallarta, Jalisco.</p>
        </div>
      </footer>
    </main>
  )
}
