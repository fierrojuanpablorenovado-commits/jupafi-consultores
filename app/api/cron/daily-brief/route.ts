import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/cron/daily-brief
 * Cron diario 9:00 AM CDT (14:00 UTC)
 * Vercel Cron: "0 14 * * *"
 *
 * Qué hace:
 * 1. Pide super-stats a GTF
 * 2. Detecta urgentes (trial ≤3d) y vencidos recientes
 * 3. Manda resumen a JP por WhatsApp via Whapi
 */

const WHAPI_TOKEN = process.env.WHAPI_TOKEN ?? '';
const JP_PHONE    = process.env.JP_WHATSAPP   ?? '5213312933906'; // número JP
const GTF_SECRET  = process.env.GTF_ADMIN_SECRET ?? 'gtf-admin-secret';
const CRON_SECRET = process.env.CRON_SECRET ?? '';

interface TenantStat {
  empresa: string;
  status: string;
  diasTrial: number | null;
  mrr: number;
  email: string | null;
  nombre: string | null;
}

export async function GET(req: NextRequest) {
  // Verificar que es llamada autorizada (Vercel Cron o JP manualmente)
  const auth = req.headers.get('authorization');
  const expected = `Bearer ${CRON_SECRET}`;
  if (CRON_SECRET && auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Obtener stats de GTF
    const statsRes = await fetch('https://gestionatuflotilla.com/api/admin/super-stats', {
      headers: { 'x-admin-secret': GTF_SECRET },
    }).catch(() => null);

    if (!statsRes?.ok) {
      return NextResponse.json({ error: 'No se pudo obtener stats de GTF' }, { status: 502 });
    }

    const stats = await statsRes.json() as {
      resumen: { totalTenants: number; mrrEstimado: number; enTrial: number; porVencer: number };
      tenants: TenantStat[];
    };

    const urgentes = stats.tenants.filter(t =>
      t.diasTrial !== null && t.diasTrial >= 0 && t.diasTrial <= 3
    );
    const vencidosHoy = stats.tenants.filter(t => t.diasTrial === 0);
    const pagando = stats.tenants.filter(t => t.mrr > 0);

    // 2. Solo mandar mensaje si hay algo relevante
    const haySomething = urgentes.length > 0 || vencidosHoy.length > 0;

    const date = new Date().toLocaleDateString('es-MX', {
      weekday: 'long', day: 'numeric', month: 'short', timeZone: 'America/Mexico_City',
    });

    // 3. Construir mensaje
    let msg = `📊 *JuPaFi Mission Control* — ${date}\n\n`;

    msg += `💰 *MRR Real:* $${stats.resumen.mrrEstimado.toLocaleString('es-MX')}/mes\n`;
    msg += `👥 *Clientes GTF:* ${stats.resumen.totalTenants} total · ${pagando.length} pagando\n\n`;

    if (vencidosHoy.length > 0) {
      msg += `🔴 *Vencen HOY (${vencidosHoy.length}):*\n`;
      vencidosHoy.forEach(t => {
        msg += `   • ${t.empresa}${t.nombre ? ` (${t.nombre})` : ''}\n`;
      });
      msg += '\n';
    }

    if (urgentes.filter(t => (t.diasTrial ?? 0) > 0).length > 0) {
      msg += `⚡ *Por vencer (≤3d):*\n`;
      urgentes.filter(t => (t.diasTrial ?? 0) > 0).forEach(t => {
        msg += `   • ${t.empresa} — ${t.diasTrial}d restantes\n`;
      });
      msg += '\n';
    }

    if (!haySomething) {
      msg += `✅ Todo en orden. Sin urgencias hoy.\n`;
    }

    msg += `\n🔗 https://jupaficonsultores.com/control`;

    // 4. Enviar por Whapi
    if (WHAPI_TOKEN) {
      await fetch('https://gate.whapi.cloud/messages/text', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: JP_PHONE,
          body: msg,
        }),
      });
    }

    return NextResponse.json({
      ok: true,
      enviado: haySomething,
      urgentes: urgentes.length,
      vencidosHoy: vencidosHoy.length,
      pagando: pagando.length,
      mensaje: msg,
    });

  } catch (err) {
    console.error('[daily-brief]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
