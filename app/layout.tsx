import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jupaficonsultores.com"),
  title: "JuPaFi Consultores — Productos digitales que escalan",
  description:
    "Consultoría boutique que construye SaaS, apps con IA, automatizaciones y landings premium. 14+ productos digitales lanzados. Stack moderno, ejecución rápida.",
  keywords: [
    "consultoría digital",
    "desarrollo SaaS México",
    "automatización con IA",
    "WhatsApp Business API",
    "Next.js Vercel",
    "JuPaFi",
  ],
  authors: [{ name: "Juan Pablo Fierro Leal" }],
  openGraph: {
    title: "JuPaFi Consultores — Productos digitales que escalan",
    description:
      "Construimos SaaS multi-tenant, apps con IA y automatizaciones que sí funcionan. 14+ productos en producción.",
    url: "https://jupaficonsultores.com",
    siteName: "JuPaFi Consultores",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JuPaFi Consultores",
    description: "Productos digitales que escalan.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-zinc-950 text-zinc-50 font-sans">
        {children}
        {/* Cierra CRM — Lead capture widget */}
        <Script
          src="https://cierra-crm.vercel.app/widget.js"
          strategy="lazyOnload"
          data-key={process.env.NEXT_PUBLIC_CRM_KEY || ''}
          data-project="JuPaFi Consultores"
          data-title="¿Listo para tu próximo proyecto digital?"
          data-cta="Hablar con nosotros"
          data-color="#7c3aed"
        />
      </body>
    </html>
  );
}
