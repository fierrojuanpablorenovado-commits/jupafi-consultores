"use client";

import { motion } from "motion/react";
import { MessageSquare, Send, Check, Loader2 } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { GlowMesh } from "@/components/ui/glow-mesh";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function CTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error || "No se pudo enviar.");
      }
    } catch {
      setStatus("error");
      setError("Error de conexión. Intenta por WhatsApp.");
    }
  }

  return (
    <section
      id="contacto"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      <GlowMesh intensity="intense" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 backdrop-blur-sm p-8 md:p-14 overflow-hidden"
        >
          <BorderBeam duration={12} />

          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT — pitch */}
            <div>
              <div className="text-sm font-mono text-accent mb-4">
                05 · ¿LISTO?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                ¿Tienes una idea?
                <br />
                <span className="text-accent">
                  La construimos en 6 semanas.
                </span>
              </h2>
              <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                Déjanos tus datos y te respondemos en menos de 24h. Sin
                compromiso — te decimos honestamente si podemos hacerlo,
                cuánto cuesta y cuándo está listo.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                {[
                  { l: "Respuesta", v: "< 24h" },
                  { l: "Propuesta", v: "48h" },
                  { l: "Primer demo", v: "7 días" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      {s.l}
                    </div>
                    <div className="text-zinc-100 font-semibold">{s.v}</div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/5213312933906?text=Hola%20JuPaFi%2C%20vi%20su%20sitio%20y%20quiero%20agendar%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-accent transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                O escríbenos directo por WhatsApp
              </a>
            </div>

            {/* RIGHT — real form */}
            <div>
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-zinc-950" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-50">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Te respondemos a tu correo en menos de 24 horas. Gracias
                    por confiar en JuPaFi.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Honeypot — hidden from humans */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                    aria-hidden="true"
                  />

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      name="name"
                      required
                      maxLength={200}
                      placeholder="Tu nombre *"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition"
                    />
                    <input
                      name="company"
                      maxLength={200}
                      placeholder="Empresa"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition"
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Tu correo *"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition"
                  />
                  <textarea
                    name="message"
                    required
                    maxLength={5000}
                    rows={4}
                    placeholder="Cuéntanos qué quieres construir *"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition resize-none"
                  />

                  {status === "error" && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent text-zinc-950 font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar y agendar consulta
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-zinc-600 text-center">
                    Al enviar aceptas nuestra{" "}
                    <a href="/privacidad" className="underline hover:text-zinc-400">
                      política de privacidad
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
