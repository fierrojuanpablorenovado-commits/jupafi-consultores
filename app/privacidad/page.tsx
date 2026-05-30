import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — JuPaFi Consultores",
  description:
    "Cómo recopilamos, usamos y protegemos tus datos personales en JuPaFi Consultores.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors mb-12"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-4xl font-bold text-zinc-50 mb-2">
          Política de Privacidad
        </h1>
        <p className="text-zinc-500 mb-16">
          Última actualización: Mayo 2025
        </p>

        <section className="space-y-10 text-zinc-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              1. Responsable del tratamiento
            </h2>
            <p>
              JuPaFi Consultores es responsable del tratamiento de los datos
              personales que nos proporciones. Contacto:{" "}
              <a
                href="mailto:hola@jupaficonsultores.com"
                className="text-accent hover:underline"
              >
                hola@jupaficonsultores.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              2. Datos que recopilamos
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nombre y correo electrónico al contactarnos</li>
              <li>
                Datos de navegación básicos (páginas visitadas, tiempo en
                sitio)
              </li>
              <li>Información que compartes voluntariamente a través del formulario de contacto</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              3. Cómo usamos tus datos
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Responder a tus consultas y cotizaciones</li>
              <li>Enviarte información relevante sobre nuestros servicios</li>
              <li>Mejorar el sitio con datos agregados y anonimizados</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              4. Tus derechos
            </h2>
            <p>
              Tienes derecho a acceder, rectificar, eliminar, portabilidad y
              oposición al tratamiento de tus datos. Escríbenos a{" "}
              <a
                href="mailto:hola@jupaficonsultores.com"
                className="text-accent hover:underline"
              >
                hola@jupaficonsultores.com
              </a>{" "}
              y respondemos en máximo 72 horas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              5. Cookies
            </h2>
            <p>
              Solo usamos cookies técnicas esenciales para el funcionamiento
              del sitio. No utilizamos cookies de publicidad ni rastreo de
              terceros.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              6. Terceros
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-zinc-200">Vercel</strong> — hosting y
                CDN (servidores en EE.UU.)
              </li>
              <li>
                <strong className="text-zinc-200">Cierra CRM</strong> —
                formulario de contacto integrado
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              7. Retención de datos
            </h2>
            <p>
              Conservamos tus datos de contacto mientras sean necesarios para
              atender tu solicitud. Puedes pedir su eliminación en cualquier
              momento.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              8. Cambios a esta política
            </h2>
            <p>
              Notificaremos cambios importantes en este sitio. La fecha de
              última actualización siempre estará visible arriba.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
