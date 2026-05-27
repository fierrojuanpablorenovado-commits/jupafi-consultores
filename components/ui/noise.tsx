/**
 * Subtle film-grain noise overlay. Adds analog texture to dark surfaces.
 * Inline SVG turbulence — zero network cost.
 */
export function Noise({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
