import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const ALLOWED_ORIGINS = [
  'https://jupaficonsultores.com',
  'https://www.jupaficonsultores.com',
  process.env.NEXT_PUBLIC_APP_URL,
].filter(Boolean) as string[];

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value ?? '';
  const secret = process.env.CONTROL_SECRET ?? '';
  return secret ? verifyToken(token, secret) : false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isJarvis = pathname === '/jarvis' || pathname.startsWith('/jarvis/');
  const isJarvisApi = pathname.startsWith('/api/jarvis');
  const isControl = pathname.startsWith('/control');
  const isControlApi = pathname.startsWith('/api/control');

  if (isControl || isControlApi || isJarvis || isJarvisApi) {
    const ua = request.headers.get('user-agent') ?? '';
    const isCrawler = /googlebot|bingbot|slurp|duckduckbot|baidu|yandex|sogou|exabot|facebot|facebookexternalhit|semrush|ahrefs|mj12bot|dotbot/i.test(ua);
    if (isCrawler) return new NextResponse(null, { status: 404 });
  }

  // JARVIS es una aplicación independiente con su propia pantalla de acceso.
  if (isJarvis && pathname !== '/jarvis/login') {
    const valid = await hasValidSession(request);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = '/jarvis/login';
      url.search = '';
      const response = NextResponse.redirect(url);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  if (isJarvisApi) {
    const valid = await hasValidSession(request);
    if (!valid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
      );
    }
    return NextResponse.next();
  }

  if (isControl && pathname !== '/control/login') {
    const valid = await hasValidSession(request);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = '/control/login';
      url.search = '';
      const response = NextResponse.redirect(url);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  if (isControlApi) {
    const valid = await hasValidSession(request);
    if (!valid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
      );
    }
    return NextResponse.next();
  }

  const origin = request.headers.get('origin') ?? '';
  const isAllowed = ALLOWED_ORIGINS.some(
    (allowed) => origin === allowed || origin.endsWith('.jupaficonsultores.com'),
  );

  if (request.method === 'OPTIONS') {
    if (!isAllowed) return new NextResponse(null, { status: 403 });
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
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
  matcher: ['/control/:path*', '/jarvis/:path*', '/api/:path*'],
};
