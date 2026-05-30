import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marca y Propiedad Intelectual — JuPaFi Consultores",
  description:
    "Lineamientos de uso de la marca JuPaFi Consultores y derechos de propiedad intelectual.",
};

export default function MarcaPage() {
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
          Marca y Propiedad Intelectual
        </h1>
        <p className="text-zinc-500 mb-16">
          Última actualización: Mayo 2025
        </p>

        <section className="space-y-10 text-zinc-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Propiedad del software
            </h2>
            <p>
              Todo el código, diseño, algoritmos y documentación desarrollados
              por JuPaFi Consultores son propiedad de Juan Pablo Fierro Leal.
              Queda prohibida la copia, reproducción o ingeniería inversa sin
              autorización expresa por escrito.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Marca y logotipo
            </h2>
            <p>
              El nombre "JuPaFi Consultores", el logotipo y la identidad
              visual son marca registrada (o en proceso de registro). No
              puedes usar nuestra marca en tus propios productos, servicios o
              materiales de marketing sin autorización escrita.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Licencia de uso para clientes
            </h2>
            <p>
              Al contratar un proyecto obtienes una licencia de uso sobre los
              entregables acordados, según lo especificado en tu propuesta.
              Los componentes y librerías internas de JuPaFi se licencian para
              uso dentro del proyecto contratado pero no se transfieren en
              propiedad.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Tu contenido
            </h2>
            <p>
              Los datos, textos, imágenes y contenidos que compartes con
              nosotros son de tu propiedad. Nos otorgas licencia para
              utilizarlos únicamente para ejecutar el proyecto contratado.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Open Source
            </h2>
            <p>
              Nuestros productos pueden incluir dependencias de código
              abierto. Sus licencias individuales (MIT, Apache 2.0, etc.)
              están disponibles en los repositorios de cada proyecto.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">
              Contacto
            </h2>
            <p>
              Para solicitar uso de marca o aclarar derechos escríbenos a{" "}
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
