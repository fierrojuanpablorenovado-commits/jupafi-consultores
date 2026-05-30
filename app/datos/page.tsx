import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datos y Seguridad — JuPaFi Consultores",
  description:
    "Cómo protegemos tu información y cumplimos con la normativa de protección de datos.",
};

export default function DatosPage() {
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
          Datos y Seguridad
        </h1>
        <p className="text-zinc-500 mb-16">
          Última actualización: Mayo 2025
        </p>

        <section className="space-y-10 text-zinc-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Seguridad del sitio
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Datos en tránsito: TLS 1.3 (HTTPS obligatorio)</li>
              <li>Security headers activos: CSP, HSTS, X-Frame-Options, nosniff</li>
              <li>Hosting en Vercel con CDN global y DDoS protection</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Seguridad en proyectos de clientes
            </h2>
            <p className="mb-3">
              Todos los SaaS que construimos para clientes incluyen por
              defecto:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Datos en reposo: cifrado AES-256</li>
              <li>Row Level Security (RLS) en base de datos — aislamiento total por tenant</li>
              <li>Autenticación de dos factores disponible</li>
              <li>Backups automáticos diarios con retención de 30 días</li>
              <li>Security headers completos en next.config</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Cumplimiento regulatorio
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Ley Federal de Protección de Datos Personales (México —
                LFPDPPP)
              </li>
              <li>GDPR compatible para usuarios europeos</li>
              <li>Pagos PCI DSS a través de Stripe cuando aplica</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Incidentes de seguridad
            </h2>
            <p>
              En caso de brecha de seguridad, notificaremos a los afectados en
              máximo 72 horas con detalle del incidente y medidas tomadas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Solicitudes de eliminación
            </h2>
            <p>
              Puedes solicitar la eliminación de tus datos en cualquier
              momento escribiendo a{" "}
              <a
                href="mailto:hola@jupaficonsultores.com"
                className="text-accent hover:underline"
              >
                hola@jupaficonsultores.com
              </a>
              . Ejecutamos el borrado en máximo 30 días y confirmamos por
              email.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
