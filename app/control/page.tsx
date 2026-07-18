'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ─── Config ───────────────────────────────────────────────────────────────────
const PROXY = '/api/control';

const LIVE_SAAS: Record<string, string> = {
  gtf:    'Gestiona tu Flotilla',
  cierra: 'Cierra CRM',
  avisa:  'Avisa (SOFOM)',
};

// URL base y secret de cada proyecto para operaciones directas
const PROJECT_BASE: Record<string, { url: string; secret: string }> = {
  gtf:    { url: 'https://gestionatuflotilla.com',  secret: 'gtf-admin-secret'           },
  cierra: { url: 'https://cierra-crm.vercel.app',   secret: 'cierra-admin-secret'        },
  avisa:  { url: 'https://avisamx.com',             secret: 'avisa-admin-secret-jp2026'  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface TenantStat {
  id: string; empresa: string; nombre: string | null; email: string | null;
  phone: string | null; plan: string; status: string; diasTrial: number | null;
  trialEndsAt: string | null; mrr: number; mrrPotencial: number; usoActivo: boolean;
  createdAt: string;
  vehiculosActivos?: number; vehiculosTotal?: number;
  choferes?: number; cuentasTotal?: number;
  leads?: number; clientes?: number; actividades?: number;
  recursos?: { dbEstimadoKb: number; registrosTotal: number };
}
interface ProjectStats {
  proyecto: string; url: string; generado: string;
  resumen: { totalTenants: number; mrrEstimado: number; mrrPotencial: number; enTrial: number; porVencer: number; };
  alertas: { urgentes: TenantStat[]; sinActividad: TenantStat[]; };
  tenants: TenantStat[];
}
interface JpProject {
  id: string; nombre: string; descripcion: string | null; url: string | null;
  categoria: string; estado: string; mrr: number; clientes: number;
  lanzamiento: string | null; api_stats_url: string | null;
  notas: string | null; tags: string[] | null; updated_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt  = (n: number) => `$${n.toLocaleString('es-MX')}`;
const fmtk = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : fmt(n);
const adminFetch = (url: string, opts?: RequestInit) =>
  fetch(url, { ...opts, credentials: 'include' });

// ─── Grid unificado para TODA la tabla ───────────────────────────────────────
// Cambiar aquí afecta header + todas las filas simultáneamente
const TABLE_GRID = 'grid grid-cols-[minmax(180px,2fr)_120px_80px_80px_95px_65px_100px_120px_95px]';

const PLAN_LABELS: Record<string, string> = {
  basic: 'Starter', pro: 'Pro', enterprise: 'Enterprise', trial: 'Trial', empresa: 'Empresa',
};
const CAT_ICON: Record<string, string> = {
  saas: '⚙', landing: '🌐', herramienta: '🔧', bot: '🤖', academia: '🎓',
};
const ESTADO_COLOR: Record<string, string> = {
  produccion:    'bg-emerald-950 text-emerald-400 border-emerald-800',
  desarrollo:    'bg-blue-950 text-blue-400 border-blue-800',
  pausado:       'bg-amber-950 text-amber-400 border-amber-800',
  descontinuado: 'bg-zinc-900 text-zinc-500 border-zinc-700',
};

// ─── Mini: estado de tenant ───────────────────────────────────────────────────
function StatusPill({ status, dias }: { status: string; dias: number | null }) {
  if (status === 'activo') return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />Activo
    </span>
  );
  if (status === 'en_trial') {
    const d = dias ?? 99;
    const cls = d > 7 ? 'bg-blue-950 text-blue-400 border-blue-800'
              : d > 3 ? 'bg-amber-950 text-amber-300 border-amber-700'
              :         'bg-orange-950 text-orange-300 border-orange-700';
    const dot = d > 7 ? 'bg-blue-400' : d > 3 ? 'bg-amber-400 animate-pulse' : 'bg-orange-500 animate-pulse';
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${cls}`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />Trial {d}d
      </span>
    );
  }
  if (status === 'por_vencer') return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-700">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />⚡ {dias ?? 0}d
    </span>
  );
  if (status === 'vencido_hoy') return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />Vence HOY
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-500 border border-zinc-700">
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />Vencido
    </span>
  );
}

function TrialBar({ dias, status }: { dias: number | null; status: string }) {
  if (status === 'activo') return <div className="w-full h-1 rounded-full bg-emerald-500/20" />;
  if (status === 'vencido' || status === 'vencido_hoy') return (
    <div className="w-full h-1 rounded-full bg-red-900/50"><div className="h-full w-full rounded-full bg-red-800/60" /></div>
  );
  const MAX = 14;
  const pct = Math.round(Math.max(0, dias ?? 0) / MAX * 100);
  const color = (dias ?? 0) > 7 ? 'bg-blue-500' : (dias ?? 0) > 3 ? 'bg-amber-400' : 'bg-orange-500';
  return (
    <div className="w-full h-1 rounded-full bg-zinc-800">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ControlPage() {
  const router = useRouter();

  // data
  const [jpProjects, setJpProjects] = useState<JpProject[]>([]);
  const [stats, setStats]           = useState<Record<string, ProjectStats | null>>({});
  const [loading, setLoading]       = useState(true);

  // UI state
  const [expanded, setExpanded]     = useState<Record<string, boolean>>({ gtf: true, cierra: true });
  const [sending, setSending]       = useState<string | null>(null);
  const [sent, setSent]             = useState<Record<string, boolean>>({});
  const [filter, setFilter]         = useState<'todos' | 'activos' | 'urgentes' | 'trial' | 'vencidos'>('todos');

  // modals
  const [editingProject, setEditingProject] = useState<JpProject | null>(null);
  const [editForm, setEditForm]             = useState({ mrr: '', clientes: '', notas: '', estado: '' });
  const [savingEdit, setSavingEdit]         = useState(false);
  const [showCreate, setShowCreate]         = useState(false);
  const [createProject, setCreateProject]   = useState<string>('gtf');
  const [createForm, setCreateForm]         = useState({ empresa: '', nombre: '', email: '', password: '', plan: 'basic', telefono: '', diasTrial: '14' });
  const [creating, setCreating]             = useState(false);
  const [createMsg, setCreateMsg]           = useState('');
  const [deleteTarget, setDeleteTarget]     = useState<(TenantStat & { projectKey: string }) | null>(null);
  const [deleteConfirm, setDeleteConfirm]   = useState('');
  const [deleting, setDeleting]             = useState(false);
  const [showPasswords, setShowPasswords]   = useState(false);
  const [detailsTarget, setDetailsTarget]   = useState<(TenantStat & { project: string }) | null>(null);
  const [resetPassTarget, setResetPassTarget] = useState<string | null>(null);
  const [newPassword, setNewPassword]       = useState<string | null>(null);
  const [resettingPass, setResettingPass]   = useState(false);
  const [resetPassModal, setResetPassModal] = useState<{ tenantId: string; projectKey: string; empresa: string } | null>(null);
  const [resetPassInput, setResetPassInput] = useState('');
  const [reminderResult, setReminderResult] = useState<{ empresa: string; email: string; wa: boolean } | null>(null);

  // ─── Load ─────────────────────────────────────────────────────────────────
  const loadAll = useCallback(async () => {
    setLoading(true);
    const [projRes, ...statsRes] = await Promise.all([
      adminFetch(`${PROXY}?action=projects`).then(r => r.ok ? r.json() as Promise<JpProject[]> : Promise.resolve([])),
      ...Object.keys(LIVE_SAAS).map(k =>
        adminFetch(`${PROXY}?action=stats&project=${k}`)
          .then(r => r.ok ? r.json() as Promise<ProjectStats> : Promise.resolve(null))
          .catch(() => null)
      ),
    ]);
    setJpProjects(projRes as JpProject[]);
    const newStats: Record<string, ProjectStats | null> = {};
    Object.keys(LIVE_SAAS).forEach((k, i) => { newStats[k] = (statsRes[i] ?? null) as ProjectStats | null; });
    setStats(newStats);
    setLoading(false);
  }, []);

  useEffect(() => { void loadAll(); }, [loadAll]);

  // ─── Actions ──────────────────────────────────────────────────────────────
  const sendReminder = async (t: TenantStat) => {
    setSending(t.id);
    try {
      const r = await adminFetch(PROXY, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'send-reminder', tenantId: t.id }) });
      const d = await r.json() as { ok?: boolean; emailOk?: boolean; waOk?: boolean };
      if (d.ok) {
        setSent(p => ({ ...p, [t.id]: true }));
        setReminderResult({ empresa: t.empresa, email: t.email ?? '—', wa: !!d.waOk });
        setTimeout(() => setReminderResult(null), 5000);
      }
    } finally { setSending(null); }
  };

  const saveEdit = async () => {
    if (!editingProject) return;
    setSavingEdit(true);
    try {
      await adminFetch(PROXY, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update-project', ...editingProject, mrr: Number(editForm.mrr), clientes: Number(editForm.clientes), notas: editForm.notas, estado: editForm.estado }) });
      setEditingProject(null); await loadAll();
    } finally { setSavingEdit(false); }
  };

  const createTenant = async () => {
    setCreating(true); setCreateMsg('');
    try {
      const r = await adminFetch(PROXY, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'create-tenant', project: createProject, ...createForm, diasTrial: Number(createForm.diasTrial) }) });
      const d = await r.json() as { ok?: boolean; error?: string };
      if (d.ok) { setCreateMsg(`✅ ${createForm.empresa}`); setShowCreate(false); setCreateForm({ empresa: '', nombre: '', email: '', password: '', plan: 'basic', telefono: '', diasTrial: '14' }); await loadAll(); }
      else setCreateMsg(`❌ ${d.error ?? 'Error'}`);
    } finally { setCreating(false); }
  };

  const deleteTenant = async () => {
    if (!deleteTarget) return; setDeleting(true);
    try {
      const r = await adminFetch(PROXY, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete-tenant', tenantId: deleteTarget.id, confirm: deleteConfirm, project: deleteTarget.projectKey }) });
      const d = await r.json() as { ok?: boolean; error?: string };
      if (d.ok) { setDeleteTarget(null); setDeleteConfirm(''); await loadAll(); }
      else alert(d.error ?? 'Error');
    } finally { setDeleting(false); }
  };

  const resetPassword = async (tenantId: string, projectKey: string, customPassword?: string) => {
    setResettingPass(true);
    try {
      const r = await adminFetch(PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset-password', project: projectKey, tenantId, ...(customPassword ? { newPassword: customPassword } : {}) }),
      });
      const d = await r.json() as { ok?: boolean; newPassword?: string; error?: string };
      if (d.ok && d.newPassword) {
        setResetPassTarget(tenantId);
        setNewPassword(d.newPassword);
        setResetPassModal(null);
        setResetPassInput('');
      } else {
        alert(d.error ?? 'Error al resetear contraseña');
      }
    } finally { setResettingPass(false); }
  };

  // ─── Derived ──────────────────────────────────────────────────────────────
  const allTenants = Object.entries(LIVE_SAAS).flatMap(([k, label]) =>
    (stats[k]?.tenants ?? []).map(t => ({ ...t, projectKey: k, projectLabel: label }))
  );
  const mrrTotal  = allTenants.reduce((s, t) => s + t.mrr, 0);
  const mrrPot    = allTenants.reduce((s, t) => s + t.mrrPotencial, 0);
  const nActivos  = allTenants.filter(t => t.status === 'activo').length;
  const nTrial    = allTenants.filter(t => t.status === 'en_trial' || t.status === 'por_vencer').length;
  const nUrgentes = allTenants.filter(t => (t.diasTrial ?? 99) <= 3 && (t.diasTrial ?? 99) >= 0 && t.status !== 'activo' && t.status !== 'vencido').length;
  const nVencidos = allTenants.filter(t => t.status === 'vencido' || t.status === 'vencido_hoy').length;

  const filteredTenants = (key: string) => {
    const ts = stats[key]?.tenants ?? [];
    if (filter === 'activos')   return ts.filter(t => t.status === 'activo');
    if (filter === 'trial')     return ts.filter(t => t.status === 'en_trial' || t.status === 'por_vencer');
    if (filter === 'urgentes')  return ts.filter(t => (t.diasTrial ?? 99) <= 3 && t.status !== 'activo');
    if (filter === 'vencidos')  return ts.filter(t => t.status === 'vencido' || t.status === 'vencido_hoy');
    return ts;
  };

  const liveKeys      = Object.keys(LIVE_SAAS);
  const portfolioRest = jpProjects.filter(p => !liveKeys.some(k => p.nombre.toLowerCase().includes(k)));

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">

      {/* ══ HEADER ══════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs font-mono shrink-0" style={{ background: '#c8ff00', color: '#09090b' }}>JP</div>
            <span className="text-sm font-bold text-white hidden sm:block">Mission Control</span>
          </div>

          {/* Filtros rápidos */}
          <div className="flex gap-1 flex-wrap">
            {([
              ['todos',    `Todos`],
              ['activos',  `✅ Activos`],
              ['trial',    `🔵 Trial`],
              ['urgentes', `⚡ Urgentes`],
              ['vencidos', `💀 Vencidos`],
            ] as const).map(([f, label]) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${filter === f ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Mini KPIs header */}
          <div className="hidden lg:flex items-center divide-x divide-zinc-800 text-center">
            {[
              { v: fmtk(mrrTotal),          l: 'MRR',      c: 'text-emerald-400' },
              { v: String(nActivos),         l: 'Activos',  c: 'text-white' },
              { v: String(nTrial),           l: 'Trial',    c: 'text-blue-400' },
              { v: String(nUrgentes),        l: 'Urgentes', c: nUrgentes > 0 ? 'text-orange-400' : 'text-zinc-600' },
              { v: String(nVencidos),        l: 'Vencidos', c: 'text-zinc-500' },
              { v: String(jpProjects.length),l: 'Proyectos',c: 'text-zinc-300' },
            ].map(({ v, l, c }) => (
              <div key={l} className="px-4">
                <p className={`font-black text-sm leading-none ${c}`}>{v}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
            ＋ Nuevo cliente
          </button>
          <button onClick={loadAll} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs px-2.5 py-1.5 rounded-lg">↻</button>
          <button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); router.push('/control/login'); }}
            className="text-zinc-600 hover:text-red-400 text-xs px-2 py-1.5 rounded-lg transition-colors">Salir</button>
        </div>
      </div>

      {/* ══ SECCIÓN ATENDER HOY ════════════════════════════════════════════════ */}
      {!loading && (nUrgentes > 0 || nVencidos > 0 || mrrTotal > 0) && (
        <div className="max-w-screen-2xl mx-auto px-4 pt-4 pb-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {/* KPI: MRR Real */}
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-900/60 flex items-center justify-center text-lg shrink-0">💰</div>
              <div>
                <p className="text-emerald-400 font-black text-xl leading-none">{fmtk(mrrTotal)}</p>
                <p className="text-zinc-500 text-xs mt-0.5">MRR real hoy · potencial {fmtk(mrrPot)}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-zinc-600 text-xs">sin captar</p>
                <p className="text-amber-400 font-bold text-sm">{fmtk(mrrPot - mrrTotal)}</p>
              </div>
            </div>

            {/* KPI: Urgentes */}
            <div className={`border rounded-xl px-4 py-3 flex items-center gap-3 ${nUrgentes > 0 ? 'bg-orange-950/30 border-orange-800/40' : 'bg-zinc-900 border-zinc-800'}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${nUrgentes > 0 ? 'bg-orange-900/60' : 'bg-zinc-800'}`}>⚡</div>
              <div>
                <p className={`font-black text-xl leading-none ${nUrgentes > 0 ? 'text-orange-400' : 'text-zinc-600'}`}>{nUrgentes} urgentes</p>
                <p className="text-zinc-500 text-xs mt-0.5">Trials que vencen en ≤3 días</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-zinc-600 text-xs">vencidos</p>
                <p className={`font-bold text-sm ${nVencidos > 0 ? 'text-red-400' : 'text-zinc-600'}`}>{nVencidos}</p>
              </div>
            </div>

            {/* KPI: Conversión */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-lg shrink-0">📊</div>
              <div className="flex-1">
                <div className="flex items-end gap-2">
                  <p className={`font-black text-xl leading-none ${nActivos > 0 ? 'text-white' : 'text-zinc-600'}`}>
                    {allTenants.length > 0 ? Math.round(nActivos / allTenants.length * 100) : 0}%
                  </p>
                  <p className="text-zinc-500 text-xs mb-0.5">conversión ({nActivos} de {allTenants.length})</p>
                </div>
                <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${allTenants.length > 0 ? Math.round(nActivos / allTenants.length * 100) : 0}%` }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ══ TABLA MAESTRA ═══════════════════════════════════════════════════════ */}
      <div className="max-w-screen-2xl mx-auto px-4 py-5">
        {loading ? (
          <div className="py-32 text-center">
            <p className="text-zinc-600 animate-pulse text-sm">Cargando todos los negocios…</p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

            {/* Cabecera tabla */}
            <div className={`${TABLE_GRID} gap-0 border-b border-zinc-700 px-4 py-3 text-zinc-500 text-xs uppercase tracking-widest font-mono items-center`}>
              <div className="pl-6">Negocio / Cliente</div>
              <div>Estado</div>
              <div className="text-right">MRR Real</div>
              <div className="text-right">Potencial</div>
              <div className="text-center">Uso</div>
              <div className="text-center">Conv%</div>
              <div className="text-center">Actividad</div>
              <div className="text-center">🔑 Acceso</div>
              <div className="text-right">Acciones</div>
            </div>

            {/* ── PROYECTOS SAAS VIVOS ──────────────────────────────────────── */}
            {Object.entries(LIVE_SAAS).map(([key, label]) => {
              const s      = stats[key];
              const isOpen = expanded[key] ?? true;
              const tenants = filteredTenants(key);
              const mrrProj = s?.resumen.mrrEstimado ?? 0;
              const potProj = s?.resumen.mrrPotencial ?? 0;
              const total   = s?.resumen.totalTenants ?? 0;
              const activos = s?.tenants.filter(t => t.status === 'activo').length ?? 0;
              const conv    = total > 0 ? Math.round(activos / total * 100) : 0;
              const convColor = conv >= 50 ? 'text-emerald-400' : conv >= 20 ? 'text-amber-400' : 'text-red-400';
              const urgentes = s?.tenants.filter(t => (t.diasTrial ?? 99) <= 3 && t.status !== 'activo' && t.status !== 'vencido').length ?? 0;

              return (
                <div key={key}>
                  {/* Fila proyecto SaaS */}
                  <div
                    onClick={() => setExpanded(p => ({ ...p, [key]: !p[key] }))}
                    className={`${TABLE_GRID} gap-0 px-4 py-3 bg-zinc-800/60 border-b border-zinc-700/50 hover:bg-zinc-800 cursor-pointer items-center transition-colors group`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-zinc-400 text-xs w-4 shrink-0 transition-transform group-hover:text-white" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                      <span className="text-base">⚙</span>
                      <div className="min-w-0">
                        <p className="text-white font-black text-sm truncate">{label}</p>
                        <p className="text-zinc-500 text-xs font-mono">{total} clientes{urgentes > 0 ? ` · ⚡ ${urgentes} urgentes` : ''}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-emerald-950 text-emerald-400 border-emerald-800">✅ Producción</span>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-black text-sm">{fmtk(mrrProj)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-400 text-sm">{fmtk(potProj)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{total}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-center">
                        <p className={`font-black text-sm ${convColor}`}>{conv}%</p>
                        <p className="text-zinc-600 text-xs">{activos}/{total} activos</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      {s ? (
                        <div className="w-16 space-y-1">
                          <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${conv}%` }} />
                          </div>
                          <p className="text-zinc-600 text-xs text-center">{conv}% conv</p>
                        </div>
                      ) : (
                        <span className="text-red-400 text-xs font-mono">sin datos</span>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-zinc-600 text-xs">—</span>
                    </div>
                    <div className="text-right" />
                  </div>

                  {/* Sub-filas tenants */}
                  {isOpen && (
                    <>
                      {tenants.length === 0 ? (
                        <div className="px-10 py-3 border-b border-zinc-800/40">
                          <p className="text-zinc-600 text-xs italic">Sin clientes en este filtro.</p>
                        </div>
                      ) : tenants.map(t => {
                        const needsAction = t.status !== 'activo' && t.status !== 'vencido';
                        return (
                          <div key={t.id}
                            className={`${TABLE_GRID} gap-0 px-4 py-2.5 border-b items-center transition-colors ${
                              t.mrr > 0
                                ? 'bg-emerald-950/20 border-emerald-800/40 hover:bg-emerald-950/30'
                                : needsAction
                                ? 'bg-orange-950/5 border-zinc-800/40 hover:bg-orange-950/10'
                                : 'bg-zinc-800/5 border-zinc-800/40 hover:bg-zinc-800/20'
                            }`}>
                            <div className="flex items-center gap-2 pl-7 min-w-0">
                              <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black shrink-0 ${
                                t.mrr > 0 ? 'bg-emerald-900 text-emerald-300' : 'bg-zinc-800 text-zinc-400'
                              }`}>
                                {t.empresa.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <p className={`font-semibold text-xs truncate ${t.mrr > 0 ? 'text-emerald-300 font-black' : 'text-zinc-200'}`}>
                                    {t.empresa}
                                  </p>
                                  {t.mrr > 0 && (
                                    <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                                      💰 PAGANDO
                                    </span>
                                  )}
                                </div>
                                <p className="text-zinc-600 text-xs truncate">{t.email ?? '—'}</p>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <StatusPill status={t.status} dias={t.diasTrial} />
                              <TrialBar dias={t.diasTrial} status={t.status} />
                            </div>
                            <div className="text-right">
                              {t.mrr > 0
                                ? <p className="text-emerald-400 font-black text-sm">{fmtk(t.mrr)}</p>
                                : <p className="text-zinc-700 text-sm">$0</p>}
                            </div>
                            <div className="text-right">
                              <p className="text-zinc-500 text-xs">{fmtk(t.mrrPotencial)}</p>
                              <p className="text-zinc-700 text-xs">{PLAN_LABELS[t.plan] ?? t.plan}</p>
                            </div>
                            {/* Col 5 — Uso */}
                            <div className="text-center text-xs">
                              {key === 'gtf' ? (
                                <div className="space-y-0.5">
                                  <p className="text-zinc-400">🚗 {t.vehiculosActivos ?? 0}<span className="text-zinc-700">/{t.vehiculosTotal ?? 0}</span></p>
                                  <p className="text-zinc-600">👤 {t.choferes ?? 0} chof.</p>
                                </div>
                              ) : key === 'avisa' ? (
                                <div className="space-y-0.5">
                                  <p className="text-zinc-400">💼 {(t as any).prestamosActivos ?? 0} activos</p>
                                  <p className="text-zinc-600">📋 {(t as any).prestamosTotal ?? 0} total</p>
                                </div>
                              ) : (
                                <div className="space-y-0.5">
                                  <p className="text-zinc-400">🎯 {t.leads ?? 0} leads</p>
                                  <p className="text-zinc-600">👥 {t.clientes ?? 0} cli.</p>
                                </div>
                              )}
                            </div>
                            {/* Col 6 — Conv% (vacío a nivel tenant) */}
                            <div className="flex justify-center items-center">
                              {t.usoActivo
                                ? <span className="text-xs text-emerald-500 font-bold">● activo</span>
                                : <span className="text-xs text-zinc-700">○ inactivo</span>}
                            </div>
                            {/* Col 8 — Usuarios */}
                            <div className="text-center">
                              {t.nombre ? (
                                <span className="text-xs font-bold bg-blue-950/30 px-2 py-1 rounded text-blue-400 border border-blue-800/30">
                                  👤 1 admin
                                </span>
                              ) : (
                                <span className="text-xs text-zinc-600">—</span>
                              )}
                            </div>
                            {/* Col 9 — Acciones: iconos compactos */}
                            <div className="flex items-center justify-end gap-1 pr-1">
                              {/* Ver detalles (solo pagando) */}
                              {t.mrr > 0 && (
                                <button onClick={() => setDetailsTarget({ ...t, project: key })}
                                  title="Ver usuarios y credenciales"
                                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 transition-colors text-sm border border-emerald-700/30">
                                  👤
                                </button>
                              )}
                              {/* Reset contraseña */}
                              {t.nombre && (
                                <button onClick={() => { setResetPassModal({ tenantId: t.id, projectKey: key, empresa: t.empresa }); setResetPassInput(''); }}
                                  disabled={resettingPass}
                                  title="Cambiar contraseña del admin"
                                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-900/40 hover:bg-blue-800/60 text-blue-400 disabled:opacity-40 transition-colors text-sm border border-blue-700/30">
                                  🔑
                                </button>
                              )}
                              {/* Recordatorio (solo trials) */}
                              {needsAction && (
                                <button onClick={() => sendReminder(t)}
                                  disabled={sending === t.id || sent[t.id]}
                                  title={sent[t.id] ? 'Ya enviado' : `Enviar recordatorio por email + WhatsApp a ${t.empresa}`}
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-sm border ${
                                    sent[t.id]
                                      ? 'bg-emerald-900/30 text-emerald-500 border-emerald-700/30 cursor-default'
                                      : 'bg-amber-900/40 hover:bg-amber-800/60 text-amber-400 border-amber-700/30 disabled:opacity-40'
                                  }`}>
                                  {sending === t.id ? '⏳' : sent[t.id] ? '✅' : '📩'}
                                </button>
                              )}
                              {/* Eliminar */}
                              <button onClick={() => { setDeleteTarget({ ...t, projectKey: key }); setDeleteConfirm(''); }}
                                title="Eliminar cliente permanentemente"
                                className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-900/20 hover:bg-red-900/50 text-red-500 hover:text-red-300 transition-colors text-sm border border-red-700/20 hover:border-red-600">
                                🗑
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {/* Pie del bloque SaaS */}
                      <div className="px-10 py-1.5 bg-zinc-800/20 border-b border-zinc-700/50 flex items-center gap-4">
                        <p className="text-zinc-600 text-xs font-mono">
                          {activos} activos · {s?.resumen.enTrial ?? 0} trial · conv {conv}% · pot {fmtk(potProj - mrrProj)} sin captar
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* ── SEPARADOR PORTFOLIO ───────────────────────────────────────── */}
            <div className="px-4 py-2 bg-zinc-950/60 border-b border-zinc-700/30">
              <p className="text-zinc-600 text-xs uppercase tracking-widest font-mono">Portfolio de proyectos ({portfolioRest.length})</p>
            </div>

            {/* ── PROYECTOS ESTÁTICOS DEL PORTFOLIO ────────────────────────── */}
            {portfolioRest.map(p => (
              <div key={p.id}
                className={`${TABLE_GRID} gap-0 px-4 py-3 border-b border-zinc-800/30 hover:bg-zinc-800/20 items-center transition-colors group`}>
                <div className="flex items-center gap-2.5 min-w-0 pl-6">
                  <span className="text-base">{CAT_ICON[p.categoria] ?? '📦'}</span>
                  <div className="min-w-0">
                    <p className="text-zinc-200 font-semibold text-sm truncate">{p.nombre}</p>
                    <p className="text-zinc-600 text-xs truncate max-w-[200px]">
                      {p.descripcion ? p.descripcion.slice(0, 55) + (p.descripcion.length > 55 ? '…' : '') : p.url ?? '—'}
                    </p>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border capitalize ${ESTADO_COLOR[p.estado] ?? ESTADO_COLOR.produccion}`}>
                    {p.estado}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`font-black text-sm ${p.mrr > 0 ? 'text-emerald-400' : 'text-zinc-700'}`}>{p.mrr > 0 ? fmtk(p.mrr) : '—'}</p>
                </div>
                <div className="text-right"><p className="text-zinc-700 text-sm">—</p></div>
                <div className="text-center">
                  <p className={`font-bold text-sm ${p.clientes > 0 ? 'text-white' : 'text-zinc-700'}`}>{p.clientes > 0 ? `${p.clientes} cli.` : '—'}</p>
                </div>
                <div className="text-center"><p className="text-zinc-700 text-sm">—</p></div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {p.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-zinc-700 text-xs font-mono bg-zinc-800/50 px-1 rounded">#{tag}</span>
                  ))}
                </div>
                <div className="text-center"><p className="text-zinc-700 text-sm">—</p></div>
                <div className="text-right">
                  <button onClick={() => { setEditingProject(p); setEditForm({ mrr: String(p.mrr), clientes: String(p.clientes), notas: p.notas ?? '', estado: p.estado }); }}
                    className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-zinc-300 text-xs px-2 py-1 rounded transition-all">
                    ✏️ editar
                  </button>
                </div>
              </div>
            ))}

            {/* ── TOTALES ─────────────────────────────────────────────────── */}
            <div className={`${TABLE_GRID} gap-0 px-4 py-3 bg-zinc-900/80 border-t border-zinc-700 items-center`}>
              <div className="pl-6">
                <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest font-bold">TOTALES</p>
              </div>
              <div />
              <div className="text-right">
                <p className="text-emerald-400 font-black text-base">{fmtk(mrrTotal)}</p>
                <p className="text-zinc-600 text-xs">MRR real</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-400 font-bold text-sm">{fmtk(mrrPot)}</p>
                <p className="text-zinc-600 text-xs">potencial</p>
              </div>
              <div className="text-center">
                <p className="text-white font-black text-base">{allTenants.length}</p>
                <p className="text-zinc-600 text-xs">clientes</p>
              </div>
              <div className="text-center">
                <p className={`font-black text-base ${nActivos > 0 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  {allTenants.length > 0 ? Math.round(nActivos / allTenants.length * 100) : 0}%
                </p>
                <p className="text-zinc-600 text-xs">conv</p>
              </div>
              <div className="text-center space-y-0.5">
                {nUrgentes > 0 && <p className="text-orange-400 text-xs font-bold">⚡ {nUrgentes}</p>}
                <p className="text-zinc-600 text-xs">{nVencidos} venc.</p>
              </div>
              <div />
              <div />
            </div>
          </div>
        )}
      </div>

      {/* ══ MODAL EDITAR PROYECTO ════════════════════════════════════════════════ */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold">Editar: {editingProject.nombre}</h2>
              <button onClick={() => setEditingProject(null)} className="text-zinc-500 hover:text-white text-xl">×</button>
            </div>
            <div className="space-y-3">
              {([['mrr', 'MRR ($MXN/mes)', 'number'], ['clientes', 'Clientes activos', 'number']] as const).map(([k, label, type]) => (
                <div key={k}>
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">{label}</label>
                  <input type={type} value={editForm[k]} onChange={e => setEditForm(p => ({ ...p, [k]: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-500" />
                </div>
              ))}
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">Estado</label>
                <select value={editForm.estado} onChange={e => setEditForm(p => ({ ...p, estado: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-500">
                  <option value="produccion">Producción</option>
                  <option value="desarrollo">Desarrollo</option>
                  <option value="pausado">Pausado</option>
                  <option value="descontinuado">Descontinuado</option>
                </select>
              </div>
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">Notas</label>
                <textarea value={editForm.notas} onChange={e => setEditForm(p => ({ ...p, notas: e.target.value }))}
                  rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-500 resize-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setEditingProject(null)} className="flex-1 bg-zinc-800 text-zinc-400 text-sm font-semibold py-2.5 rounded-xl">Cancelar</button>
                <button onClick={saveEdit} disabled={savingEdit}
                  className="flex-1 bg-white text-zinc-950 disabled:opacity-40 text-sm font-black py-2.5 rounded-xl">{savingEdit ? 'Guardando…' : 'Guardar'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL CREAR TENANT ══════════════════════════════════════════════════ */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">＋ Nuevo cliente</h2>
              <button onClick={() => setShowCreate(false)} className="text-zinc-500 hover:text-white text-xl">×</button>
            </div>
            <div className="space-y-3">
              {/* Selector de proyecto */}
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">Proyecto *</label>
                <select value={createProject} onChange={e => setCreateProject(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer">
                  <optgroup label="── Live (API activa)">
                    {Object.entries(LIVE_SAAS).map(([k, label]) => (
                      <option key={k} value={k}>{label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="── Portfolio">
                    {jpProjects
                      .filter(p => !Object.values(LIVE_SAAS).some(l => p.nombre.toLowerCase().includes(l.split(' ')[0].toLowerCase())))
                      .map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                  </optgroup>
                </select>
              </div>
              {[
                { k: 'empresa',  l: 'Empresa *',   t: 'text',     ph: 'Nombre de la empresa' },
                { k: 'nombre',   l: 'Contacto *',  t: 'text',     ph: 'Nombre completo' },
                { k: 'email',    l: 'Email *',      t: 'email',    ph: 'correo@empresa.com' },
                { k: 'password', l: 'Contraseña *', t: 'password', ph: 'Mín 8 chars' },
                { k: 'telefono', l: 'Teléfono',     t: 'tel',      ph: '5512345678' },
              ].map(({ k, l, t, ph }) => (
                <div key={k}>
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">{l}</label>
                  <input type={t} placeholder={ph} value={createForm[k as keyof typeof createForm]}
                    onChange={e => setCreateForm(p => ({ ...p, [k]: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-500" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">Plan</label>
                  <select value={createForm.plan} onChange={e => setCreateForm(p => ({ ...p, plan: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-500">
                    <option value="basic">Starter $999</option>
                    <option value="pro">Pro $1,999</option>
                    <option value="enterprise">Enterprise $2,999</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">Días trial</label>
                  <input type="number" value={createForm.diasTrial}
                    onChange={e => setCreateForm(p => ({ ...p, diasTrial: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-zinc-500" />
                </div>
              </div>
              {createMsg && <p className={`text-sm ${createMsg.startsWith('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{createMsg}</p>}
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowCreate(false)} className="flex-1 bg-zinc-800 text-zinc-400 text-sm font-semibold py-2.5 rounded-xl">Cancelar</button>
                <button onClick={createTenant} disabled={creating || !createForm.empresa || !createForm.email || !createForm.password}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-black py-2.5 rounded-xl">
                  {creating ? 'Creando…' : 'Crear cliente'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST RECORDATORIO ENVIADO ════════════════════════════════════════ */}
      {reminderResult && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-zinc-900 border border-emerald-700/60 rounded-2xl px-5 py-4 shadow-2xl min-w-[280px]">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">✅</span>
              <div>
                <p className="text-emerald-400 font-black text-sm">Recordatorio enviado</p>
                <p className="text-zinc-300 text-xs mt-0.5 font-semibold">{reminderResult.empresa}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-zinc-500 text-xs">📧 Email → {reminderResult.email}</p>
                  <p className={`text-xs ${reminderResult.wa ? 'text-emerald-500' : 'text-zinc-600'}`}>
                    {reminderResult.wa ? '✅ WhatsApp enviado' : '⚠️ WhatsApp sin número'}
                  </p>
                </div>
              </div>
              <button onClick={() => setReminderResult(null)} className="text-zinc-600 hover:text-zinc-400 ml-auto text-lg leading-none">×</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL CAMBIAR CONTRASEÑA ══════════════════════════════════════════ */}
      {resetPassModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-blue-800/50 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔑</span>
              <div>
                <h2 className="text-white font-black text-base">Cambiar contraseña</h2>
                <p className="text-zinc-500 text-xs">{resetPassModal.empresa}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-1">Nueva contraseña</label>
                <input
                  type="text"
                  placeholder="Ej: Elbrumy2026 (vacío = aleatoria)"
                  value={resetPassInput}
                  onChange={e => setResetPassInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && resetPassword(resetPassModal.tenantId, resetPassModal.projectKey, resetPassInput || undefined)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => { setResetPassModal(null); setResetPassInput(''); }}
                  className="flex-1 bg-zinc-800 text-zinc-400 text-sm font-semibold py-2.5 rounded-xl">
                  Cancelar
                </button>
                <button
                  onClick={() => resetPassword(resetPassModal.tenantId, resetPassModal.projectKey, resetPassInput || undefined)}
                  disabled={resettingPass}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-black py-2.5 rounded-xl">
                  {resettingPass ? 'Guardando…' : 'Cambiar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL NUEVA CONTRASEÑA ════════════════════════════════════════════ */}
      {newPassword && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-blue-800/50 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🔑</span>
              <h2 className="text-blue-400 font-black text-lg">Nueva contraseña</h2>
            </div>

            <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-4 mb-5 space-y-3">
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Contraseña temporal (guardar en lugar seguro)</p>
              <div className="bg-zinc-900 border border-blue-700/50 rounded-lg p-3 font-mono">
                <p className="text-blue-300 font-black text-base tracking-wide break-all">{newPassword}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(newPassword);
                  alert('Copiado al portapapeles');
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                📋 Copiar contraseña
              </button>
              <p className="text-zinc-500 text-xs">Esta contraseña solo se muestra una vez. Guárdala en un lugar seguro.</p>
            </div>

            <button
              onClick={() => { setNewPassword(null); setResetPassTarget(null); }}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-2.5 rounded-xl transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ══ MODAL DETALLES CLIENTE PAGANTE ═════════════════════════════════════ */}
      {detailsTarget && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-emerald-800/50 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">👤</span>
              <h2 className="text-emerald-400 font-black text-lg">{detailsTarget.empresa}</h2>
            </div>

            <div className="space-y-4">
              {/* Admin */}
              <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-3.5">
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-2">Admin / Contacto</p>
                <p className="text-white font-bold text-sm">{detailsTarget.nombre ?? '—'}</p>
                <p className="text-emerald-400 text-xs font-mono mt-1">{detailsTarget.email ?? '—'}</p>
                {detailsTarget.phone && (
                  <p className="text-zinc-400 text-xs mt-1">📱 {detailsTarget.phone}</p>
                )}
              </div>

              {/* Plan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800 rounded-lg p-3">
                  <p className="text-zinc-500 text-xs font-semibold mb-1">Plan</p>
                  <p className="text-white font-bold text-sm">{PLAN_LABELS[detailsTarget.plan] ?? detailsTarget.plan}</p>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-3">
                  <p className="text-zinc-500 text-xs font-semibold mb-1">MRR</p>
                  <p className="text-emerald-400 font-black text-sm">{fmtk(detailsTarget.mrr)}</p>
                </div>
              </div>

              {/* Recursos (GTF) */}
              {detailsTarget.project === 'gtf' && (
                <div className="space-y-3 border-t border-zinc-800 pt-4">
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Vehículos</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-zinc-800 rounded-lg p-2.5">
                      <p className="text-zinc-500 text-xs mb-1">Activos</p>
                      <p className="text-blue-400 font-black text-lg">{detailsTarget.vehiculosActivos ?? 0}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-2.5">
                      <p className="text-zinc-500 text-xs mb-1">Total</p>
                      <p className="text-zinc-300 font-black text-lg">{detailsTarget.vehiculosTotal ?? 0}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-2.5">
                      <p className="text-zinc-500 text-xs mb-1">Choferes</p>
                      <p className="text-cyan-400 font-black text-lg">{detailsTarget.choferes ?? 0}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-2.5">
                      <p className="text-zinc-500 text-xs mb-1">Cuentas</p>
                      <p className="text-violet-400 font-black text-lg">{detailsTarget.cuentasTotal ?? 0}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recursos (CIERRA) */}
              {detailsTarget.project === 'cierra' && (
                <div className="space-y-3 border-t border-zinc-800 pt-4">
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Actividad CRM</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-zinc-800 rounded-lg p-2.5">
                      <p className="text-zinc-500 text-xs mb-1">Leads</p>
                      <p className="text-blue-400 font-black text-lg">{detailsTarget.leads ?? 0}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-2.5">
                      <p className="text-zinc-500 text-xs mb-1">Clientes</p>
                      <p className="text-emerald-400 font-black text-lg">{detailsTarget.clientes ?? 0}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDetailsTarget(null)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                Cerrar
              </button>
              {detailsTarget.project === 'gtf' && (
                <a
                  href={`https://gestiona-tu-flotilla.vercel.app/admin?tenant=${detailsTarget.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors text-center">
                  Ir a GTF →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL ELIMINAR ══════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-red-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-red-400 font-black text-lg">Eliminar cliente</h2>
            </div>

            <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-4 mb-5 space-y-2">
              <p className="text-white font-bold text-sm">{deleteTarget.empresa}</p>
              <p className="text-zinc-400 text-xs">{deleteTarget.email}</p>
              <p className="text-red-300 text-xs leading-relaxed mt-3">
                ⚠️ Esta acción <strong>eliminará permanentemente</strong> todos los datos: usuarios, historial, configuración. <strong>No se puede deshacer.</strong>
              </p>
            </div>

            <div className="mb-5">
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                Confirma escribiendo: <span className="text-red-400 font-black text-xs">ELIMINAR</span>
              </label>
              <input
                type="text"
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value.toUpperCase())}
                placeholder="ELIMINAR"
                autoFocus
                className={`w-full bg-zinc-800 border rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none font-mono tracking-wider transition-all ${
                  deleteConfirm === 'ELIMINAR' ? 'border-red-600 focus:border-red-500' : 'border-zinc-700 focus:border-zinc-600'
                }`}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                Cancelar
              </button>
              <button
                onClick={deleteTenant}
                disabled={deleting || deleteConfirm !== 'ELIMINAR'}
                className="flex-1 bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-black py-2.5 rounded-xl transition-all">
                {deleting ? '⏳ Eliminando…' : '🗑 Eliminar permanentemente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
