import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

// ─── Configuración de proyectos ───────────────────────────────────────────────

const GTF    = 'https://gestiona-tu-flotilla.vercel.app';
const CIERRA = 'https://cierra-crm.vercel.app';

const PROJECTS_CONFIG: Record<string, { statsUrl: string; secret: string }> = {
  gtf:    { statsUrl: `${GTF}/api/admin/super-stats`,    secret: 'gtf-admin-secret'    },
  cierra: { statsUrl: `${CIERRA}/api/admin/super-stats`, secret: 'cierra-admin-secret' },
};

// ─── Auth via cookie (el middleware ya la protege; esta es doble verificación) ─

async function checkAuth(req: NextRequest): Promise<boolean> {
  const token  = req.cookies.get(COOKIE_NAME)?.value ?? '';
  const secret = process.env.CONTROL_SECRET ?? '';
  if (!secret) return false;
  return verifyToken(token, secret);
}

// ─── GET /api/control?action=... ─────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!(await checkAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  // --- portfolio projects ---
  if (action === 'projects') {
    const res = await fetch(`${GTF}/api/admin/projects`, {
      headers: { 'x-admin-secret': 'gtf-admin-secret' },
      cache: 'no-store',
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json([], { status: 200 });
    return NextResponse.json(await res.json());
  }

  // --- stats de un proyecto específico ---
  if (action === 'stats') {
    const project = searchParams.get('project');
    const cfg = project ? PROJECTS_CONFIG[project] : null;
    if (!cfg) return NextResponse.json({ error: 'Unknown project' }, { status: 400 });

    const res = await fetch(cfg.statsUrl, {
      headers: { 'x-admin-secret': cfg.secret },
      cache: 'no-store',
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json(null, { status: 200 });
    return NextResponse.json(await res.json());
  }

  // --- recursos de un tenant ---
  if (action === 'resources') {
    const tenantId = searchParams.get('tenantId');
    if (!tenantId) return NextResponse.json({ error: 'tenantId required' }, { status: 400 });

    const res = await fetch(`${GTF}/api/admin/tenant-resources?tenantId=${tenantId}`, {
      headers: { 'x-admin-secret': 'gtf-admin-secret' },
      cache: 'no-store',
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json(null, { status: 200 });
    return NextResponse.json(await res.json());
  }

  return NextResponse.json({ error: 'action required' }, { status: 400 });
}

// ─── POST /api/control ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!(await checkAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { action, ...payload } = body;

  // --- send reminder ---
  if (action === 'send-reminder') {
    const res = await fetch(`${GTF}/api/admin/send-reminder`, {
      method: 'POST',
      headers: { 'x-admin-secret': 'gtf-admin-secret', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json({ error: 'Failed' }, { status: 500 });
    return NextResponse.json(await res.json());
  }

  // --- create tenant ---
  if (action === 'create-tenant') {
    const res = await fetch(`${GTF}/api/admin/create-tenant`, {
      method: 'POST',
      headers: { 'x-admin-secret': 'gtf-admin-secret', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json({ error: 'Failed' }, { status: 500 });
    return NextResponse.json(await res.json());
  }

  // --- delete tenant ---
  if (action === 'delete-tenant') {
    const res = await fetch(`${GTF}/api/admin/delete-tenant`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': 'gtf-admin-secret', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json({ error: 'Failed' }, { status: 500 });
    return NextResponse.json(await res.json());
  }

  // --- update project (portfolio) ---
  if (action === 'update-project') {
    const res = await fetch(`${GTF}/api/admin/projects`, {
      method: 'POST',
      headers: { 'x-admin-secret': 'gtf-admin-secret', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json({ error: 'Failed' }, { status: 500 });
    return NextResponse.json(await res.json());
  }

  return NextResponse.json({ error: 'action required' }, { status: 400 });
}
