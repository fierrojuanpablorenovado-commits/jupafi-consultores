import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones — JuPaFi Consultores",
  description:
    "Términos que rigen la relación entre JuPaFi Consultores y sus clientes.",
};

export default function TerminosPage() {
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
          Términos y Condiciones
        </h1>
        <p className="text-zinc-500 mb-16">
          Última actualización: Mayo 2025
        </p>

        <section className="space-y-10 text-zinc-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              1. Aceptación
            </h2>
            <p>
              Al contratar cualquier servicio de JuPaFi Consultores aceptas
              estos términos. Si no estás de acuerdo, no contrates nuestros
              servicios.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              2. Descripción del servicio
            </h2>
            <p>
              JuPaFi Consultores ofrece consultoría y desarrollo de productos
              digitales: SaaS multi-tenant, aplicaciones con inteligencia
              artificial, automatizaciones y landings de alta conversión. Los
              alcances específicos de cada proyecto se definen en propuestas
              escritas firmadas por ambas partes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              3. Pago
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Los proyectos se cotizan y cobran por adelantado o en hitos acordados</li>
              <li>Los precios están denominados en MXN o USD según se especifique en la propuesta</li>
              <li>Trabajos adicionales fuera del alcance original generan cotización separada</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              4. Propiedad del trabajo entregado
            </h2>
            <p>
              Una vez liquidado el 100% del proyecto, el cliente obtiene los
              derechos del código y entregables acordados. Los recursos y
              componentes propietarios de JuPaFi (librerías internas, snippets
              reutilizables) se licencian para uso del cliente pero no se
              transfieren en propiedad.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              5. Uso aceptable
            </h2>
            <p>
              El cliente se compromete a no usar los productos entregados para
              actividades ilegales, spam, contenido fraudulento ni
              competencia desleal hacia JuPaFi Consultores.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              6. Limitación de responsabilidad
            </h2>
            <p>
              JuPaFi Consultores no será responsable por daños indirectos,
              pérdida de datos o lucro cesante derivados del uso de los
              productos entregados. Nuestra responsabilidad máxima se limita
              al monto pagado por el proyecto en cuestión.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              7. Confidencialidad
            </h2>
            <p>
              Toda información técnica y de negocio compartida durante el
              proyecto se trata como confidencial. JuPaFi Consultores puede
              referenciar el proyecto en su portafolio salvo acuerdo expreso
              en contrario.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              8. Contacto
            </h2>
            <p>
              Para cualquier duda sobre estos términos escríbenos a{" "}
              <a
                href="mailto:hola@jupaficonsultores.com"
                className="text-accent hover:underline"
              >
                hola@jupaficonsultores.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
