import dynamic from "next/dynamic";
import { UrgencyBar } from "@/components/urgency-bar";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Differentiators } from "@/components/differentiators";

// Noise is decorative, defer it
const Noise = dynamic(() => import("@/components/ui/noise").then((m) => m.Noise));

// Lazy-load everything below the fold to keep initial bundle minimal.
// User only pays the cost of these sections when they scroll near them.
const ProcessVideo = dynamic(() => import("@/components/process-video").then((m) => m.ProcessVideo));
const Showcase = dynamic(() => import("@/components/showcase").then((m) => m.Showcase));
const EditorialStatement = dynamic(() => import("@/components/editorial-statement").then((m) => m.EditorialStatement));
const Results = dynamic(() => import("@/components/results").then((m) => m.Results));
const Testimonials = dynamic(() => import("@/components/testimonials").then((m) => m.Testimonials));
const Portfolio = dynamic(() => import("@/components/portfolio").then((m) => m.Portfolio));
const Services = dynamic(() => import("@/components/services").then((m) => m.Services));
const Pricing = dynamic(() => import("@/components/pricing").then((m) => m.Pricing));
const Comparison = dynamic(() => import("@/components/comparison").then((m) => m.Comparison));
const Journey = dynamic(() => import("@/components/journey").then((m) => m.Journey));
const FAQ = dynamic(() => import("@/components/faq").then((m) => m.FAQ));
const CTA = dynamic(() => import("@/components/cta").then((m) => m.CTA));
const Footer = dynamic(() => import("@/components/footer").then((m) => m.Footer));

export default function Home() {
  return (
    <main className="relative">
      <Noise opacity={0.025} />
      <UrgencyBar />
      <Navbar />

      {/* ── Acceso panel privado JP ── */}
      <a
        href="/control"
        title="Panel privado"
        aria-label="Panel privado"
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-2"
      >
        <div
          style={{ background: '#c8ff00', boxShadow: '0 0 20px rgba(200,255,0,0.35)' }}
          className="w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(200,255,0,0.55)] transition-all duration-200"
        >
          <span className="text-zinc-950 font-black text-sm font-mono leading-none">JP</span>
        </div>
      </a>
      <Hero />
      <Differentiators />
      <ProcessVideo />
      <Showcase />
      <EditorialStatement />
      <Results />
      <Testimonials />
      <Portfolio />
      <Services />
      <Pricing />
      <Comparison />
      <Journey />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
