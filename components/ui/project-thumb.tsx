"use client";

import { useState } from "react";

interface ProjectThumbProps {
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Project thumbnail with skeleton loader.
 * Uses native img (thum.io URLs aren't optimized by Next).
 */
export function ProjectThumb({
  src,
  alt,
  className = "",
}: ProjectThumbProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 ${className}`}
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-zinc-700 tracking-tighter">
            {alt
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3)
              .toUpperCase()}
          </div>
          <div className="text-[10px] text-zinc-600 mt-2 font-mono uppercase tracking-widest">
            Preview no disponible
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-zinc-900 ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`w-full h-full object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
