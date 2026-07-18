"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic hero video. Auto-plays muted on loop.
 * Falls back to poster image if video fails.
 * Pauses when off-screen or tab hidden to save resources.
 */
export function HeroVideo({
  src = "/hero-gemini.mp4",
  poster = "/hero-gemini-poster.jpg",
  className = "",
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(v);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        src={src}
        onCanPlay={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      {/* Lighter overlay — let Gemini images breathe, keep readability with vignette at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.15)_0%,rgba(9,9,11,0.55)_70%,rgba(9,9,11,0.95)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
    </div>
  );
}
