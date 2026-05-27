# Deploy a Vercel + Dominio Namecheap

Guía paso a paso para publicar **jupaficonsultores.com** (o tu TLD) en producción usando el dominio comprado en Namecheap.

---

## Parte 1 · Subir el proyecto a Vercel

### Opción A — Vercel CLI (recomendada, más rápida)

```bash
# Una vez por máquina:
npm i -g vercel

# En el proyecto:
cd D:\Claude\jupafi-consultores
vercel login          # autenticarte con GitHub/email
vercel                # primera vez — sigue prompts (acepta defaults)
vercel --prod         # deploy a producción
```

Tras `vercel --prod` te da una URL `jupafi-consultores-xxx.vercel.app`. Esa URL ya funciona — ahora conectamos tu dominio.

### Opción B — GitHub → Vercel Dashboard

1. Crea repo en GitHub (`jupafi-consultores`)
2. ```bash
   cd D:\Claude\jupafi-consultores
   git init
   git add .
   git commit -m "feat: initial agency site"
   git remote add origin https://github.com/TU_USER/jupafi-consultores.git
   git push -u origin main
   ```
3. Ve a [vercel.com/new](https://vercel.com/new) → "Import" → seleccionas el repo
4. Click "Deploy" (toma defaults — Next.js detectado automático)
5. Listo en ~2 minutos

---

## Parte 2 · Conectar tu dominio de Namecheap

Tienes **dos métodos**. Recomiendo el #1 (Vercel Nameservers) porque es más simple y Vercel maneja todo.

### Método 1 · Apuntar nameservers a Vercel (RECOMENDADO)

**En Vercel:**
1. Tu proyecto → **Settings** → **Domains**
2. Click "Add" y escribe `jupaficonsultores.com`
3. Click "Add" otra vez y agrega `www.jupaficonsultores.com`
4. Vercel te mostrará 2 nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
   *(Los exactos los muestra Vercel — usa los que te dé.)*

**En Namecheap:**
1. Login → **Domain List** → encuentra tu dominio → click **Manage**
2. En la pestaña **Domain**, busca **Nameservers**
3. Cambia el dropdown de "Namecheap BasicDNS" a **"Custom DNS"**
4. Pega los 2 nameservers de Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
5. Click el ✓ verde para guardar

**Tiempo de propagación:** 5 minutos a 48 horas (normalmente <1 hora).

Verificas en Vercel → Settings → Domains: cuando esté listo, aparece "✓ Valid Configuration" y SSL se emite automáticamente.

---

### Método 2 · Apuntar solo registros A + CNAME (sin cambiar nameservers)

Útil si quieres mantener Namecheap como DNS provider (porque tienes otros subdominios o email ahí).

**En Namecheap:**
1. Domain List → Manage → pestaña **Advanced DNS**
2. Borra los registros existentes que apunten a "parking page"
3. Agrega estos registros:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | `76.76.21.21` | Automatic |
| CNAME | www | `cname.vercel-dns.com` | Automatic |

4. Click ✓ para guardar cada uno

**En Vercel:**
- Settings → Domains → Add `jupaficonsultores.com` y `www.jupaficonsultores.com`
- Vercel detecta los registros automáticamente

**Importante:** el IP `76.76.21.21` es el anycast de Vercel actual. Si Vercel te muestra otro valor en el wizard de "Add Domain", usa el que te dé Vercel.

---

## Parte 3 · Verificación post-deploy

Cuando el dominio esté listo:

```bash
# Verifica que el dominio responda
curl -I https://jupaficonsultores.com

# Debe responder 200 OK con headers de Vercel
```

**Checklist visual:**
- [ ] https://jupaficonsultores.com carga el sitio
- [ ] https://www.jupaficonsultores.com redirige a la versión sin www (o al revés — Vercel decide, configurable)
- [ ] Candado SSL verde en el navegador
- [ ] OG image previewea correctamente al pegar el link en WhatsApp/Twitter
- [ ] Lighthouse score ≥ 90 en todas las categorías

---

## Parte 4 · Email profesional (opcional, recomendado)

Para que `hola@jupaficonsultores.com` funcione, opciones:

### Opción A · Cloudflare Email Routing (gratis, redirección)
- Si solo quieres reenviar a Gmail: usa Cloudflare Email Routing (gratis).
- Requiere mover DNS a Cloudflare (incompatible con método 1 de arriba).

### Opción B · Google Workspace ($6 USD/mes/usuario)
1. workspace.google.com → "Get started"
2. Sigue el wizard, agrega `jupaficonsultores.com` como dominio
3. Te da registros MX para agregar en Vercel (o Namecheap si usas método 2)
4. Configura tu cuenta `hola@jupaficonsultores.com`

### Opción C · Zoho Mail (gratis hasta 5 usuarios)
1. zoho.com/mail → plan gratis
2. Verificas dominio con TXT record
3. Agrega registros MX
4. Configuras hola@jupaficonsultores.com

**Recomendación:** Google Workspace por integración con todo lo que ya usas (Drive, Meet, etc.). $6 USD/mes vale la pena para una agencia profesional.

---

## Parte 5 · Después del deploy

### Cambios que vas a querer hacer:

1. **WhatsApp real:** Edita `components/cta.tsx` y `components/footer.tsx`
   - Buscar: `523312345678` → reemplazar por tu número real (formato sin `+`)

2. **OG image personalizada:** Crea `/public/og.png` (1200x630 px)
   - Diseño sugerido: fondo negro, "JuPaFi Consultores" en blanco + "Productos digitales que escalan." en lime
   - Herramienta rápida: [og-playground.vercel.app](https://og-playground.vercel.app/)

3. **Favicon:** Reemplaza `/app/icon.png` con tu logo (512x512 mínimo)

4. **Analytics:** Vercel → Settings → Analytics → Enable (gratis para tier hobby)

5. **Formulario de contacto:** El email actual abre el cliente de correo. Para form real, integra Resend ($0 hasta 3,000 emails/mes):
   ```bash
   pnpm add resend
   ```
   Y creas `app/api/contact/route.ts` con la API de Resend.

---

## Comandos de referencia rápida

```bash
# Local development
cd D:\Claude\jupafi-consultores
pnpm dev                    # http://localhost:3000

# Build de prueba
pnpm build

# Deploy a producción
vercel --prod

# Ver deployments
vercel ls

# Logs en vivo de producción
vercel logs --follow
```

---

## ¿Problemas?

| Problema | Solución |
|----------|----------|
| "Invalid configuration" en Vercel | DNS aún no propaga. Espera 1h y refresca. |
| SSL no se emite | Vercel emite Let's Encrypt automático tras verificar dominio. Espera 10 min. |
| `www` no redirige | En Vercel, Settings → Domains, marca cuál es el primario. |
| OG image no aparece | Verifica que `/public/og.png` existe y mide 1200x630 |
| Build falla en Vercel pero local OK | Revisa `pnpm build` local — si pasa, probablemente sea variable de entorno faltante |

---

**Próximo paso recomendado:** corre `vercel --prod` cuando quieras y me avisas en qué momento de la guía estás. Si pegamos en algún paso te ayudo en tiempo real.
