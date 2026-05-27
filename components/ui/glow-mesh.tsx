"use client";

/**
 * Animated gradient mesh background.
 * Pure CSS conic-gradient with slow rotation. Heavily blurred for ambient effect.
 * Disabled if prefers-reduced-motion.
 */
export function GlowMesh({
  className = "",
  intensity = "default",
}: {
  className?: string;
  intensity?: "subtle" | "default" | "intense";
}) {
  const opacity = {
    subtle: "opacity-20",
    default: "opacity-30",
    intense: "opacity-50",
  }[intensity];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`absolute -inset-[50%] ${opacity} mix-blend-screen`}
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(200, 255, 0, 0.4), transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.3), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.25), transparent 50%)
          `,
          filter: "blur(60px)",
          animation: "mesh-rotate 30s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes mesh-rotate {
          from {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
