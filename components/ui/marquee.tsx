"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for one loop
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  fadeEdges?: boolean;
}

/**
 * Infinite horizontal scroll marquee. Pure CSS animation, GPU-accelerated.
 * Duplicates children once for seamless loop.
 */
export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
  fadeEdges = true,
}: MarqueeProps) {
  const animation =
    direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={`flex w-max ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `${animation} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
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
