"use client";

import { useEffect } from "react";

/**
 * Capa de polish premium para JuPaFi: scroll progress, spotlight cursor,
 * counter animation, mesh gradient ambiental, noise overlay. Inerte en SSR.
 */
export default function PremiumPolish() {
  useEffect(() => {
    // Scroll progress
    const bar = document.getElementById("scroll-progress");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        if (bar) {
          const h = document.documentElement;
          const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
          bar.style.width = pct + "%";
        }
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Spotlight delegado
    const onMove = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest<HTMLElement>(".spotlight-card");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", e.clientX - r.left + "px");
      t.style.setProperty("--my", e.clientY - r.top + "px");
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    // Reveal-up
    let ro: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      ro = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in-view");
              ro!.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll(".reveal-up").forEach((el) => ro!.observe(el));
    }

    // Counter
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io!.unobserve(el);
            const raw = el.textContent?.trim() ?? "";
            const m = raw.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
            if (!m) {
              el.classList.add("counted");
              return;
            }
            const prefix = m[1];
            const suffix = m[3];
            const target = parseFloat(m[2].replace(",", "."));
            const isInt = !m[2].includes(".") && !m[2].includes(",");
            const dur = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              const v = target * eased;
              el.textContent = prefix + (isInt ? Math.round(v) : v.toFixed(1)) + suffix;
              if (p < 1) requestAnimationFrame(tick);
              else {
                el.textContent = raw;
                el.classList.add("counted");
              }
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.5 }
      );
      document.querySelectorAll(".counter-pop").forEach((el) => io!.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMove);
      ro?.disconnect();
      io?.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <div className="mesh-ambient" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
