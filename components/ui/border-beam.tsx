"use client";

/**
 * Animated rotating border beam. Used to highlight featured/highlighted cards.
 * CSS-only, no JS. Heavily inspired by Magic UI / Aceternity primitives.
 */
export function BorderBeam({
  duration = 8,
  delay = 0,
  className = "",
}: {
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)] ${className}`}
      aria-hidden="true"
      style={{
        background: `conic-gradient(from 0deg, transparent 0deg, rgba(200, 255, 0, 0.9) 60deg, transparent 120deg, transparent 360deg)`,
        animation: `beam-spin ${duration}s linear infinite ${delay}s`,
      }}
    >
      <style jsx>{`
        @keyframes beam-spin {
          from {
            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(200, 255, 0, 0.9) 60deg,
              transparent 120deg,
              transparent 360deg
            );
          }
          to {
            background: conic-gradient(
              from 360deg,
              transparent 0deg,
              rgba(200, 255, 0, 0.9) 60deg,
              transparent 120deg,
              transparent 360deg
            );
          }
        }
      `}</style>
    </div>
  );
}
