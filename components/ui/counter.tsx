"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";
import { useEffect, useRef } from "react";

interface CounterProps {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  separator?: boolean;
}

/**
 * Number counter that animates from 0 (or `from`) to `to` when it enters viewport.
 * Adds thousand separators by default.
 */
export function Counter({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  separator = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => {
    const n = Math.round(v);
    const s = separator ? n.toLocaleString("es-MX") : n.toString();
    return `${prefix}${s}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      animate(count, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
    }
  }, [inView, to, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
