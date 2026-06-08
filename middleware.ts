import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

// ─── CORS Origins ─────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  'https://jupaficonsultores.com',
  'https://www.jupaficonsultores.com',
  process.env.NEXT_PUBLIC_APP_URL,
].filter(Boolean) as string[];

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Proteger /control (excepto /control/login) ─────────────────────────────
  if (pathname.startsWith('/control') && pathname !== '/control/login') {
    const token  = request.cookies.get(COOKIE_NAME)?.value ?? '';
    const secret = process.env.CONTROL_SECRET ?? '';
    const valid  = secret ? await verifyToken(token, secret) : false;

    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = '/control/login';
      url.search   = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── Proteger /api/control con cookie (además de lógica interna del route) ──
  if (pathname.startsWith('/api/control')) {
    const token  = request.cookies.get(COOKIE_NAME)?.value ?? '';
    const secret = process.env.CONTROL_SECRET ?? '';
    const valid  = secret ? await verifyToken(token, secret) : false;
    if (!valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // ── CORS para otras rutas /api ─────────────────────────────────────────────
  const origin = request.headers.get('origin') ?? '';
  const isAllowed =
    ALLOWED_ORIGINS.some(
      (allowed) => origin === allowed || origin.endsWith('.jupaficonsultores.com'),
    );

  if (request.method === 'OPTIONS') {
    if (!isAllowed) return new NextResponse(null, { status: 403 });
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age':       '86400',
      },
    });
  }

  const response = NextResponse.next();
  if (isAllowed && origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}

export const config = {
  matcher: ['/control/:path*', '/api/:path*'],
};
