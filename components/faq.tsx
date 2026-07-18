"use client";

import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "¿Y si lo que construyen no funciona?",
    a: "Trabajamos en sprints semanales con demos en vivo. Cada 7 días ves el avance. Si en el sprint 1 el producto no toma forma, lo paramos y solo cobramos lo trabajado (50% del primer sprint). Es nuestra red de seguridad y la tuya.",
  },
  {
    q: "¿Quién es dueño del código?",
    a: "Tú. 100%. Desde el primer commit. Te entregamos repositorio en GitHub bajo tu cuenta, deploy en tu cuenta de Vercel y todas las cuentas de servicios (Stripe, OpenAI, etc.) bajo tu nombre. Cero lock-in. Si mañana quieres llevártelo a otro equipo, todo es tuyo.",
  },
  {
    q: "¿Cuánto cuesta realmente? Los rangos son amplios.",
    a: "Los rangos son honestos porque el alcance varía. Después del diagnóstico inicial (45 min gratis) te damos cotización fija por escrito. No cobramos por hora — cobramos por entregable. Lo que ves en la propuesta es lo que pagas.",
  },
  {
    q: "¿Pueden integrar con [Stripe / SAT / WhatsApp / lo que sea]?",
    a: "Sí. Ya integramos con Stripe, PayPal, MercadoPago, WhatsApp Cloud API, ElevenLabs, OpenAI, Claude, Make, n8n, Google Workspace, Vercel, Neon, Supabase, Resend, Twilio y otros 20+ servicios. Si tu servicio tiene API, lo conectamos.",
  },
  {
    q: "¿Por qué tan rápido? ¿Sacrifican calidad?",
    a: "No sacrificamos — usamos stack moderno (Next.js, Tailwind, Vercel, motion, etc.) que está diseñado para velocidad. Plus, no construimos features que no vas a usar. Empezamos con el MVP mínimo viable real y crecemos basado en uso. Todos nuestros productos apuntan a Lighthouse 90+.",
  },
  {
    q: "¿Trabajan con startups o solo con empresas establecidas?",
    a: "Ambos. La mitad de nuestros clientes son empresarios validando una idea (presupuesto $50-150k). La otra mitad son empresas establecidas que quieren un módulo nuevo o digitalizar un proceso. El proceso es el mismo, el alcance cambia.",
  },
  {
    q: "Después del lanzamiento, ¿qué pasa?",
    a: "Tres opciones: 1) Lo operas tú (te entregamos documentación + handoff), 2) Nosotros lo operamos por retainer mensual ($15-40k/mes según escala), 3) Combinación — nosotros la parte técnica, tú lo comercial. Tú decides.",
  },
  {
    q: "¿Dónde están físicamente?",
    a: "Guadalajara, México. Trabajamos 100% remoto pero podemos vernos en persona si tu proyecto está en Guadalajara o CDMX. Para el resto del mundo: Google Meet semanal + Slack/WhatsApp directo todos los días.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-sm font-mono text-accent mb-4">07 · FAQ</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Las preguntas
            <br />
            <span className="text-zinc-500">que todos hacen.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Respuestas honestas a las objeciones más comunes. Si tienes otra,
            mándala por WhatsApp.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm divide-y divide-zinc-800/60 overflow-hidden">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left hover:bg-zinc-900/40 transition-colors group"
              >
                <span className="text-base md:text-lg font-medium text-zinc-50 pr-4">
                  {faq.q}
                </span>
                <div
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    open === i
                      ? "bg-accent text-zinc-950"
                      : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
                  }`}
                >
                  {open === i ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 md:px-8 pb-6 text-zinc-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
