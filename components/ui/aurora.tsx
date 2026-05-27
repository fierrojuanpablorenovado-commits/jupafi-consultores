"use client";

/**
 * Aurora-style soft moving gradient background.
 * Inspired by Vercel/Linear ambient backgrounds.
 */
export function Aurora({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full animate-aurora-1" />
      <div className="absolute top-[10%] right-[-15%] w-[55%] h-[55%] bg-indigo-500/15 blur-[120px] rounded-full animate-aurora-2" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full animate-aurora-3" />

      <style jsx>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15%, 10%) scale(1.1); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, 15%) scale(1.15); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, -10%) scale(1.1); }
        }
        .animate-aurora-1 { animation: aurora-1 18s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 22s ease-in-out infinite; }
        .animate-aurora-3 { animation: aurora-3 26s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-aurora-1, .animate-aurora-2, .animate-aurora-3 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
