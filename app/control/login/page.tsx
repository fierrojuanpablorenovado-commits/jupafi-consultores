'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ControlLoginPage() {
  const router     = useRouter();
  const inputRef   = useRef<HTMLInputElement>(null);
  const [pass, setPass]       = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots]       = useState(0);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Animación de puntos en el botón
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setDots(d => (d + 1) % 4), 350);
    return () => clearInterval(t);
  }, [loading]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pass.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password: pass }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (data.ok) {
        router.push('/control');
      } else {
        setError(data.error ?? 'Contraseña incorrecta.');
        setPass('');
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">

      {/* Grid bg sutil */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,255,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div
              style={{ background: '#c8ff00' }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
            >
              <span className="text-[#09090b] font-black text-base font-mono">JP</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              JuPaFi <span className="text-zinc-500 font-normal">Consultores</span>
            </span>
          </div>
          <p className="text-zinc-600 text-xs font-mono tracking-widest uppercase">
            Mission Control
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-white font-black text-xl mb-1">Acceso privado</h1>
          <p className="text-zinc-500 text-sm mb-8">
            Solo JP puede entrar a este panel.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                Contraseña
              </label>
              <input
                ref={inputRef}
                type="password"
                value={pass}
                onChange={e => { setPass(e.target.value); setError(''); }}
                placeholder="••••••••••••••••••"
                autoComplete="current-password"
                disabled={loading}
                className="
                  w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white text-sm
                  placeholder-zinc-600 outline-none transition-all font-mono tracking-wider
                  disabled:opacity-50
                  focus:ring-2 focus:ring-[#c8ff00]/30 focus:border-[#c8ff00]
                  border-zinc-700
                "
                style={{ borderColor: error ? '#ef4444' : undefined }}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !pass.trim()}
              className="
                w-full py-3 rounded-xl font-black text-sm transition-all
                disabled:opacity-40 disabled:cursor-not-allowed
                active:scale-[.98]
              "
              style={{
                background: loading || !pass.trim() ? '#2d2d2d' : '#c8ff00',
                color:      loading || !pass.trim() ? '#71717a'  : '#09090b',
              }}
            >
              {loading
                ? `Verificando${'.'.repeat(dots)}`
                : 'Entrar al panel →'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-800 text-xs mt-6 font-mono">
          jupaficonsultores.com · privado
        </p>
      </div>
    </div>
  );
}
