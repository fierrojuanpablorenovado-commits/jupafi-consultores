import { PageLoader } from "@/components/ui/page-loader";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Noise } from "@/components/ui/noise";
import { UrgencyBar } from "@/components/urgency-bar";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Differentiators } from "@/components/differentiators";
import { Showcase } from "@/components/showcase";
import { EditorialStatement } from "@/components/editorial-statement";
import { Results } from "@/components/results";
import { Testimonials } from "@/components/testimonials";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Pricing } from "@/components/pricing";
import { Comparison } from "@/components/comparison";
import { Journey } from "@/components/journey";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <PageLoader />
      <SmoothScroll />
      <CustomCursor />
      <main className="relative">
        <Noise opacity={0.025} />
        <UrgencyBar />
        <Navbar />
        <Hero />
        <Differentiators />
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
    </>
  );
}
