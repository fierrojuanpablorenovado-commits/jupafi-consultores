'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, ShieldCheck } from 'lucide-react';

export default function JarvisLoginPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!pass.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass }),
      });
      const data = await response.json() as { ok?: boolean; error?: string };
      if (data.ok) {
        router.replace('/jarvis');
        router.refresh();
      } else {
        setError(data.error ?? 'Contraseña incorrecta.');
        setPass('');
      }
    } catch {
      setError('No pude verificar el acceso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100dvh', background: '#02070b', color: '#eaffff', display: 'grid', placeItems: 'center', padding: 24, overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at 50% 38%, rgba(59,217,255,.16), transparent 24%), linear-gradient(rgba(79,222,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(79,222,255,.035) 1px, transparent 1px)', backgroundSize: 'auto, 46px 46px, 46px 46px' }} />
      <section style={{ position: 'relative', width: 'min(440px, 100%)', border: '1px solid rgba(117,226,255,.16)', borderRadius: 28, padding: 32, background: 'rgba(4,13,19,.88)', boxShadow: '0 30px 100px rgba(0,0,0,.5), inset 0 1px rgba(255,255,255,.04)', backdropFilter: 'blur(24px)' }}>
        <div style={{ width: 82, height: 82, borderRadius: '50%', margin: '0 auto 22px', position: 'relative', background: 'radial-gradient(circle, #eaffff 0 4%, #75eaff 8%, rgba(41,211,255,.45) 24%, rgba(6,31,43,.2) 55%, transparent 70%)', border: '1px solid rgba(124,236,255,.65)', boxShadow: '0 0 48px rgba(72,220,255,.28), inset 0 0 24px rgba(72,220,255,.32)' }} />
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: '.32em', color: '#5bdfff', textTransform: 'uppercase', marginBottom: 8 }}>JP Personal Operating System</div>
          <h1 style={{ margin: 0, fontSize: 34, letterSpacing: '.18em', paddingLeft: '.18em' }}>JARVIS</h1>
          <p style={{ color: '#648794', fontSize: 13, lineHeight: 1.6, margin: '12px 0 0' }}>Acceso privado al sistema central de proyectos, inteligencia y operación.</p>
        </div>

        <form onSubmit={submit}>
          <label style={{ display: 'block', color: '#7ea5b2', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 8 }}>Clave de acceso</label>
          <div style={{ position: 'relative' }}>
            <LockKeyhole size={16} style={{ position: 'absolute', left: 14, top: 14, color: '#5b9daf' }} />
            <input ref={inputRef} type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError(''); }} autoComplete="current-password" placeholder="••••••••••••" style={{ width: '100%', boxSizing: 'border-box', borderRadius: 14, border: `1px solid ${error ? '#e05f66' : 'rgba(117,226,255,.16)'}`, background: '#061018', color: '#eaffff', padding: '13px 14px 13px 42px', outline: 'none', fontSize: 14 }} />
          </div>
          {error && <div style={{ color: '#ff858a', fontSize: 11, marginTop: 9 }}>{error}</div>}
          <button type="submit" disabled={!pass.trim() || loading} style={{ width: '100%', marginTop: 16, border: 0, borderRadius: 14, padding: '13px 16px', fontWeight: 800, background: !pass.trim() || loading ? '#17303a' : 'linear-gradient(135deg,#86f1ff,#42caee)', color: !pass.trim() || loading ? '#507985' : '#021016', cursor: !pass.trim() || loading ? 'not-allowed' : 'pointer' }}>{loading ? 'VERIFICANDO…' : 'ENTRAR A JARVIS'}</button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, color: '#436571', fontSize: 10, marginTop: 22 }}><ShieldCheck size={13} /> Sesión privada · audio local hasta activación</div>
      </section>
    </main>
  );
}
