"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

/**
 * Reveals text word-by-word as user scrolls through the component's viewport.
 * Each word fades from zinc-700 (muted) to zinc-50 (visible) based on scroll progress.
 * Editorial effect — Stripe / Apple style.
 */
export function ScrollTextReveal({
  text,
  className = "",
}: ScrollTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <span className="relative mr-3 mt-2">
      <span className="absolute opacity-15">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
