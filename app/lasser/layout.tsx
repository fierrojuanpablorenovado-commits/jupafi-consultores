import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lasser Sport® — Uniformes Deportivos Puerto Vallarta',
  description: 'Fabricamos uniformes deportivos 100% personalizados para equipos, academias y empresas en Puerto Vallarta. Réplicas, corte, DTF y sublimado.',
  openGraph: {
    title: 'Lasser Sport® — El uniforme que tu equipo merece',
    description: 'Réplicas, corte a medida, DTF y sublimado. Puerto Vallarta, Jalisco.',
    url: 'https://jupaficonsultores.com/lasser',
  },
  robots: { index: true, follow: true },
}

export default function LasserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bebas.variable} min-h-screen`}>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0.12; }
          50% { opacity: 0.22; }
          100% { transform: translateY(-60px) scale(0.6); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .font-bebas { font-family: var(--font-bebas), 'Impact', sans-serif; }
        .glow-lime { text-shadow: 0 0 60px rgba(181,211,24,0.5), 0 0 120px rgba(181,211,24,0.2); }
        .glow-box { box-shadow: 0 0 32px rgba(181,211,24,0.35); }
        .glow-box-hover:hover { box-shadow: 0 0 40px rgba(181,211,24,0.5); }
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .glass-lime {
          background: rgba(181,211,24,0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(181,211,24,0.15);
        }
        .text-gradient-lime {
          background: linear-gradient(135deg, #B5D318 0%, #d4f020 50%, #B5D318 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: #B5D318;
          pointer-events: none;
          animation: float-up linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .particle, [style*="animation"] { animation: none !important; }
        }
      `}</style>
      {children}
    </div>
  )
}
