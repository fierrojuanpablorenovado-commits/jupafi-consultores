'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { LasserLogo } from '../_components/LasserLogo'
import { Cotizador } from '../_components/Cotizador'
import { ScrollReveal } from '../_components/ScrollReveal'

const CATEGORIAS = [
  {
    id: 'replica',
    icon: '⚽',
    nombre: 'Réplicas de Fútbol',
    descripcion: 'Jerseys réplica de equipos nacionales e internacionales. Personalizamos con nombre, número y escudo — calidad premium al precio que buscas.',
    desde: 850,
    tiempo: '3-5 días',
    tecnicas: ['DTF', 'Vinil', 'Nombre y Número'],
    ejemplos: ['Bélgica', 'Portugal', 'Uruguay', 'Italia', 'Brasil', 'México'],
    glow: 'rgba(59,130,246,0.15)',
    borderHover: 'hover:border-blue-500/30',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  },
  {
    id: 'corte',
    icon: '✂️',
    nombre: 'Uniformes a la Medida',
    descripcion: 'Diseño único desde cero para tu equipo. Tela, corte, colores y estampado 100% personalizados. Volleyball, fútbol, basquetbol y más.',
    desde: 280,
    tiempo: '7-14 días',
    tecnicas: ['Sublimado', 'Digital', 'Corte Propio'],
    ejemplos: ['Volleyball', 'Fútbol 7', 'Basquetbol', 'Softbol', 'Atletismo'],
    glow: 'rgba(181,211,24,0.12)',
    borderHover: 'hover:border-[#B5D318]/35',
    tagColor: 'bg-[#B5D318]/10 text-[#B5D318] border-[#B5D318]/20',
  },
  {
    id: 'dtf',
    icon: '🖨️',
    nombre: 'Playeras DTF y Vinil',
    descripcion: 'Estampado en playeras, casacas y accesorios que ya tienes o que nosotros conseguimos. Alta durabilidad, colores vivos, entrega en 48 h.',
    desde: 150,
    tiempo: '1-3 días',
    tecnicas: ['DTF', 'Vinil Textil', 'Full Color'],
    ejemplos: ['Empresas', 'Eventos', 'Escuelas', 'Cornhole', 'Staff'],
    glow: 'rgba(249,115,22,0.12)',
    borderHover: 'hover:border-orange-500/30',
    tagColor: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  },
  {
    id: 'sublimado',
    icon: '🌊',
    nombre: 'Sublimado All-over',
    descripcion: 'Impresión que forma parte de la tela. Sin límite de colores, sin costuras visibles. El diseño no se va con el lavado. Para deporte serio.',
    desde: 320,
    tiempo: '7-10 días',
    tecnicas: ['Sublimación', 'All-over', 'Sin costuras'],
    ejemplos: ['Ciclismo', 'Volleyball', 'Natación', 'Triatlón', 'Gaming'],
    glow: 'rgba(139,92,246,0.12)',
    borderHover: 'hover:border-violet-500/30',
    tagColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  },
]

const TECNICAS = [
  {
    nombre: 'DTF (Direct to Film)',
    icon: '🎯',
    badge: 'RÁPIDA Y VERSÁTIL',
    pros: ['Alta resolución y colores brillantes', 'Sin cantidad mínima — desde 1 pieza', 'Entrega en 24-48 horas', 'Funciona en cualquier tela'],
    ideal: 'Logos, nombres, diseños complejos en cualquier tipo de tela',
    badgeColor: 'bg-yellow-500/15 text-yellow-300',
  },
  {
    nombre: 'Sublimación',
    icon: '🌊',
    badge: 'PREMIUM ALL-OVER',
    pros: ['Diseño que cubre toda la prenda', 'Sin límite de colores por diseño', 'No se despega, no se borra', 'Tela más ligera y transpirable'],
    ideal: 'Uniformes deportivos de alto rendimiento en tela poliéster',
    badgeColor: 'bg-violet-500/15 text-violet-300',
  },
  {
    nombre: 'Vinil Textil',
    icon: '✂️',
    badge: 'ACABADO PREMIUM',
    pros: ['Muy duradero y resistente al lavado', 'Tacto suave y acabado profesional', 'Ideal para números y letras grandes', 'Alto contraste en cualquier color de tela'],
    ideal: 'Nombres, números, dorsales y logos con pocas tintas',
    badgeColor: 'bg-emerald-500/15 text-emerald-300',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function CatalogoPage() {
  return (
    <div className="bg-black min-h-screen text-white">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/lasser">
            <LasserLogo className="h-9" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
            <Link href="/lasser" className="hover:text-white transition-colors">Inicio</Link>
            <Link href="/lasser/catalogo" className="text-[#B5D318] font-semibold">Catálogo</Link>
            <a href="#cotizador" className="hover:text-white transition-colors">Cotizador</a>
            <a href="/lasser#tracking" className="hover:text-white transition-colors">Mi pedido</a>
          </nav>
          <a
            href="https://wa.me/5213221052920?text=Hola%20Lasser%20Sport%2C%20quiero%20cotizaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#B5D318] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:shadow-[0_0_24px_rgba(181,211,24,0.4)] transition-all hover:scale-[1.02]"
          >
            Cotizar →
          </a>
        </div>
      </header>

      {/* ── Hero catálogo ── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(181,211,24,0.16) 0%, rgba(181,211,24,0.05) 50%, transparent 75%)',
            animation: 'pulse-glow 4s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #B5D318 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-16 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 border border-[#B5D318]/25 bg-[#B5D318]/[0.07] text-[#B5D318] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.18em] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5D318] animate-pulse" />
              Puerto Vallarta · Fabricación propia
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl leading-none uppercase tracking-wide mb-5">
              TODO LO QUE<br />
              <span className="text-gradient-lime glow-lime">FABRICAMOS</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Cada uniforme es único. Elige el servicio, cotiza en línea y recibe tu precio exacto en menos de 2 horas.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Categorías ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CATEGORIAS.map((cat) => (
            <motion.div
              key={cat.id}
              variants={card}
              className={`relative rounded-3xl p-8 border border-white/[0.07] glass transition-all duration-300 group overflow-hidden ${cat.borderHover}`}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              {/* Glow al hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 120%, ${cat.glow} 0%, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <span className="text-5xl block">{cat.icon}</span>
                  <div className="text-right">
                    <div className="text-zinc-600 text-xs">desde</div>
                    <div className="font-bebas text-3xl text-white leading-none">${cat.desde.toLocaleString()}</div>
                    <div className="text-zinc-600 text-xs">MXN / pieza</div>
                  </div>
                </div>

                <h2 className="font-bebas text-2xl text-white tracking-wide mb-2 group-hover:text-[#B5D318] transition-colors duration-200">
                  {cat.nombre}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">{cat.descripcion}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {cat.tecnicas.map((t) => (
                    <span key={t} className={`text-xs font-bold px-3 py-1 rounded-full border ${cat.tagColor}`}>{t}</span>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="text-zinc-600 text-xs uppercase tracking-widest mb-2">Ejemplos de uso</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.ejemplos.map((e) => (
                      <span key={e} className="text-xs bg-white/[0.04] text-zinc-500 px-2.5 py-1 rounded-full border border-white/[0.05]">{e}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                  <div className="text-zinc-600 text-xs flex items-center gap-1.5">
                    <span>⏱️</span> Entrega: {cat.tiempo}
                  </div>
                  <a
                    href="#cotizador"
                    className="bg-[#B5D318] text-black font-black text-sm px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(181,211,24,0.4)] transition-all hover:scale-[1.02]"
                  >
                    Cotizar →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Técnicas de impresión ── */}
      <section className="border-y border-white/[0.06] relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B5D318]/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <ScrollReveal className="text-center mb-14">
            <span className="inline-block text-[#B5D318] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Cada técnica tiene su lugar
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide">
              ¿CUÁL TE CONVIENE?
            </h2>
            <p className="text-zinc-500 text-base mt-3 max-w-lg mx-auto">
              Te asesoramos para elegir la técnica correcta. Aquí un resumen rápido.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {TECNICAS.map((t, i) => (
              <ScrollReveal key={t.nombre} delay={i * 0.1}>
                <div className="glass rounded-3xl p-7 h-full hover:border-[#B5D318]/20 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-4xl">{t.icon}</span>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${t.badgeColor}`}>
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="font-bebas text-xl text-white tracking-wide mb-4 group-hover:text-[#B5D318] transition-colors">
                    {t.nombre}
                  </h3>
                  <ul className="space-y-2 mb-5">
                    {t.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="text-[#B5D318] mt-0.5 flex-shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="glass rounded-xl p-3.5">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-300 font-semibold">Ideal para: </span>
                      {t.ideal}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cotizador ── */}
      <section id="cotizador" className="max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-flex items-center gap-2 border border-[#B5D318]/25 bg-[#B5D318]/[0.07] text-[#B5D318] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.18em] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B5D318] animate-pulse" />
            Respuesta en menos de 2 horas
          </span>
          <h2 className="font-bebas text-5xl text-white tracking-wide mb-3">COTIZA AQUÍ</h2>
          <p className="text-zinc-400 text-sm">Llena el formulario y te mandamos precio exacto por WhatsApp.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Cotizador />
        </ScrollReveal>
      </section>

      {/* ── FAQs ── */}
      <section className="bg-black border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-bebas text-5xl text-white tracking-wide">PREGUNTAS FRECUENTES</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              { q: '¿Hay cantidad mínima?', a: 'Para réplicas y playeras DTF: desde 1 pieza. Para uniformes de corte y sublimado: mínimo 6 piezas para mantener precio competitivo.' },
              { q: '¿Cuánto tiempo tarda mi pedido?', a: 'Depende del tipo: DTF/Vinil 1-3 días, Réplicas 3-5 días, Sublimado/Corte 7-14 días. Te confirmamos la fecha exacta al registrar tu pedido.' },
              { q: '¿Pueden hacer mi diseño?', a: 'Sí. Tenemos diseñadoras que te apoyan sin costo adicional. Solo necesitas referencia de colores, logo y lo que quieres que diga el uniforme.' },
              { q: '¿Cómo puedo ver el avance de mi pedido?', a: 'Al confirmar tu pedido te enviamos un link personalizado por WhatsApp para que veas en tiempo real en qué etapa está tu uniforme.' },
              { q: '¿Aceptan devoluciones?', a: 'Hay garantía por defecto de fabricación. Si algo llegó mal por nuestra parte, lo reponemos sin costo. No aplica para cambios de talla o diseño ya autorizado.' },
              { q: '¿Tienen catálogo de modelos?', a: 'Cada pedido es 100% personalizado, pero tenemos archivo de trabajos anteriores para que tomes inspiración. Pídenos referencias por WhatsApp.' },
            ].map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.05}>
                <details className="glass rounded-2xl overflow-hidden group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-white flex items-center justify-between list-none hover:text-[#B5D318] transition-colors">
                    {faq.q}
                    <span className="text-zinc-500 group-open:text-[#B5D318] transition-colors text-xl leading-none flex-shrink-0 ml-4">+</span>
                  </summary>
                  <div className="px-6 pb-5 pt-1 text-zinc-400 text-sm leading-relaxed border-t border-white/[0.05]">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="relative bg-[#B5D318] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20 text-center">
          <h2 className="font-bebas text-5xl md:text-6xl text-black leading-none tracking-wide mb-3">¿TIENES PRISA?</h2>
          <p className="text-zinc-800 text-lg mb-8">Escríbenos directo al WhatsApp y en minutos te atendemos.</p>
          <a
            href="https://wa.me/5213221052920?text=Hola%20Lasser%20Sport%2C%20quiero%20cotizaci%C3%B3n%20urgente"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-black text-white font-black text-xl px-10 py-5 rounded-2xl hover:bg-zinc-900 transition-all hover:scale-[1.02]"
          >
            <span>💬</span> WhatsApp directo
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 bg-black">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
          <Link href="/lasser"><LasserLogo className="h-8" /></Link>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <Link href="/lasser" className="hover:text-white transition-colors">Inicio</Link>
            <Link href="/lasser/catalogo" className="text-[#B5D318] font-medium">Catálogo</Link>
            <a href="https://instagram.com/lassersport" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://facebook.com/share/14pwEmqtvy3/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
          </nav>
          <p className="text-zinc-700 text-xs">© {new Date().getFullYear()} Lasser Sport®</p>
        </div>
      </footer>
    </div>
  )
}
