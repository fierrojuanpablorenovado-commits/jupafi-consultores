"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Custom cursor with two layers:
 *   - Dot: follows pointer exactly (instant)
 *   - Ring: follows with spring physics (delayed)
 * Expands and snaps to interactive elements on hover.
 * Desktop-only (hidden on touch devices).
 */
export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    setHidden(false);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
      );
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [mouseX, mouseY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            opacity: hovering ? 1 : 0.6,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full border border-white"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: hovering ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-white"
        />
      </motion.div>

      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body {
            cursor: none !important;
          }
          a,
          button,
          input,
          textarea,
          select,
          [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
