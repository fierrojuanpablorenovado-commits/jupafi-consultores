// lib/auth.ts — Funciones de auth compartidas (Edge + Node compatible)

export const COOKIE_NAME = 'jpf_session';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días
const MESSAGE = 'jpfi-session-v1';

/** Genera un token HMAC-SHA256 hex a partir del secret */
export async function makeToken(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(MESSAGE));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Verifica en tiempo constante (timing-safe) que el token sea válido */
export async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    if (!token || token.length !== 64) return false;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    const sigBytes = new Uint8Array(
      (token.match(/../g) ?? []).map((h) => parseInt(h, 16)),
    );
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(MESSAGE));
  } catch {
    return false;
  }
}
