import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Simple in-memory rate limit (per warm lambda instance) — basic abuse guard
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const win = 60_000; // 1 min
  const max = 5;
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > win) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > max;
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Demasiados envíos. Intenta en un minuto." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, message, company, website } = body as Record<
      string,
      string
    >;

    // Honeypot — bots fill the hidden "website" field
    if (website) {
      return NextResponse.json({ ok: true }); // silently accept, don't send
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Email inválido." },
        { status: 400 }
      );
    }
    if (message.length > 5000 || name.length > 200) {
      return NextResponse.json(
        { ok: false, error: "Contenido demasiado largo." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO || "info@jupaficonsultores.com";

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Servicio de correo no configurado." },
        { status: 500 }
      );
    }

    const safe = (s: string) =>
      s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const { error: resendError } = await resend.emails.send({
      from: "JuPaFi Web <info@jupaficonsultores.com>",
      to,
      replyTo: email,
      subject: `🟢 Nuevo lead web — ${safe(name)}${company ? ` (${safe(company)})` : ""}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#09090b;color:#c8ff00;padding:20px;border-radius:12px 12px 0 0;font-weight:700">
            🟢 Nuevo contacto desde jupaficonsultores.com
          </div>
          <div style="background:#fafafa;padding:24px;border:1px solid #e4e4e7;border-top:none;border-radius:0 0 12px 12px">
            <p><strong>Nombre:</strong> ${safe(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${safe(email)}">${safe(email)}</a></p>
            <p><strong>Empresa:</strong> ${company ? safe(company) : "—"}</p>
            <hr style="border:none;border-top:1px solid #e4e4e7;margin:16px 0">
            <p style="white-space:pre-wrap">${safe(message)}</p>
          </div>
        </div>`,
    });
    if (resendError) throw new Error(resendError.message);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar. Intenta por WhatsApp." },
      { status: 500 }
    );
  }
}
