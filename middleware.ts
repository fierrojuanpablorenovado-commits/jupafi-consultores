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

  // ── Bloquear bots/crawlers en rutas del panel ─────────────────────────────
  if (pathname.startsWith('/control') || pathname.startsWith('/api/control')) {
    const ua = request.headers.get('user-agent') ?? '';
    const isCrawler = /googlebot|bingbot|slurp|duckduckbot|baidu|yandex|sogou|exabot|facebot|facebookexternalhit|semrush|ahrefs|mj12bot|dotbot/i.test(ua);
    if (isCrawler) {
      return new NextResponse(null, { status: 404 });
    }
  }

  // ── Proteger /control (excepto /control/login) ─────────────────────────────
  if (pathname.startsWith('/control') && pathname !== '/control/login') {
    const token  = request.cookies.get(COOKIE_NAME)?.value ?? '';
    const secret = process.env.CONTROL_SECRET ?? '';
    const valid  = secret ? await verifyToken(token, secret) : false;

    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = '/control/login';
      url.search   = '';
      const res = NextResponse.redirect(url);
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return res;
    }
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return res;
  }

  // ── Proteger /api/control con cookie (además de lógica interna del route) ──
  if (pathname.startsWith('/api/control')) {
    const token  = request.cookies.get(COOKIE_NAME)?.value ?? '';
    const secret = process.env.CONTROL_SECRET ?? '';
    const valid  = secret ? await verifyToken(token, secret) : false;
    if (!valid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
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
