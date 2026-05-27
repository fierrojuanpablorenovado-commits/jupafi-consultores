"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface TextFlipProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Rotating word display. Crossfades + slides between words.
 * Used in hero headlines.
 */
export function TextFlip({
  words,
  interval = 2400,
  className = "",
}: TextFlipProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  return (
    <span className={`relative inline-block ${className}`} aria-live="polite">
      {/* invisible placeholder to reserve width for the longest word */}
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -28, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
