interface LasserLogoProps {
  className?: string
  variant?: 'full' | 'icon' | 'text'
}

export function LasserLogo({ className = 'h-10', variant = 'full' }: LasserLogoProps) {
  if (variant === 'text') {
    return (
      <span className="flex items-baseline gap-1.5">
        <span className="font-bebas text-2xl text-white tracking-wide leading-none">LASSER</span>
        <span className="font-bebas text-base text-[#B5D318] tracking-widest leading-none">SPORT</span>
        <span className="text-zinc-600 text-xs">®</span>
      </span>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 220 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lasser Sport"
      role="img"
    >
      {/* Swoosh principal — ala que va de abajo-izq a arriba-der */}
      <path
        d="M 6 48 C 18 38 48 14 200 6 L 204 18 C 58 24 26 46 16 58 Z"
        fill="white"
        opacity="0.95"
      />
      {/* Barra lima 1 — energía */}
      <path
        d="M 6 48 L 16 58 L 23 51 L 13 41 Z"
        fill="#B5D318"
      />
      {/* Barra lima 2 — energía más sutil */}
      <path
        d="M 13 41 L 23 51 L 29 45 L 19 35 Z"
        fill="#B5D318"
        opacity="0.6"
      />
      {/* Texto LASSER */}
      <text
        x="14"
        y="70"
        fontFamily="Impact, 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="26"
        fill="white"
        letterSpacing="1.5"
      >
        LASSER
      </text>
      {/* Texto SPORT */}
      <text
        x="139"
        y="70"
        fontFamily="Impact, 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="13"
        fill="#B5D318"
        letterSpacing="1"
      >
        SPORT®
      </text>
    </svg>
  )
}
