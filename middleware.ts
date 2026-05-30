import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
  "https://jupaficonsultores.com",
  "https://www.jupaficonsultores.com",
  process.env.NEXT_PUBLIC_APP_URL,
].filter(Boolean) as string[];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowed = ALLOWED_ORIGINS.some(
    (allowed) => origin === allowed || origin.endsWith(".jupaficonsultores.com")
  );

  if (request.method === "OPTIONS") {
    if (!isAllowed) return new NextResponse(null, { status: 403 });
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = NextResponse.next();

  if (isAllowed && origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
