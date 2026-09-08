'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Bot, ChevronRight, Sparkles } from 'lucide-react';

export default function JarvisLauncher() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/control/login' || pathname.startsWith('/control/jarvis')) return null;

  return (
    <button
      type="button"
      onClick={() => router.push('/control/jarvis')}
      aria-label="Abrir JARVIS"
      className="fixed right-5 top-5 z-[9999] group flex items-center gap-3 rounded-2xl border border-cyan-400/30 bg-[#071119]/95 px-4 py-3 text-left shadow-[0_0_35px_rgba(34,211,238,.18)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-300/70 hover:shadow-[0_0_50px_rgba(34,211,238,.30)]"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/10 text-cyan-300">
        <span className="absolute inset-1 rounded-full border border-cyan-300/20 animate-pulse" />
        <Bot size={19} className="relative" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.22em] text-cyan-300/70">
          <Sparkles size={11} /> System online
        </span>
        <span className="mt-0.5 block text-sm font-black tracking-[.16em] text-white">JARVIS</span>
        <span className="block text-[10px] text-zinc-500">JP Operating System</span>
      </span>
      <ChevronRight size={17} className="ml-1 text-cyan-300/60 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
