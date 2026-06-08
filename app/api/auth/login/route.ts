import { NextRequest, NextResponse } from 'next/server';
import { makeToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';

// ─── Rate limiting en memoria (5 intentos / 15 min por IP) ──────────────────
const WINDOW_MS   = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts    = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_ATTEMPTS) return true;
  entry.count++;
  return false;
}

function clearAttempts(ip: string) {
  attempts.delete(ip);
}

// ─── POST /api/auth/login ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera 15 minutos.' },
      { status: 429 },
    );
  }

  const body   = await req.json().catch(() => ({})) as { password?: string };
  const pass   = process.env.CONTROL_PASS;
  const secret = process.env.CONTROL_SECRET;

  if (!pass || !secret) {
    return NextResponse.json({ error: 'Servidor mal configurado.' }, { status: 500 });
  }

  if (!body.password || body.password !== pass) {
    return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
  }

  clearAttempts(ip);
  const token = await makeToken(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   COOKIE_MAX_AGE,
    path:     '/',
  });
  return res;
}
// deploy: 2026-06-08 13:53
