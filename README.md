# JuPaFi Consultores

Sitio web oficial de **JuPaFi Consultores** — consultoría boutique de productos digitales.

**Dominio:** jupaficonsultores.com
**Stack:** Next.js 14 · TypeScript · Tailwind · motion · Vercel

---

## Estructura

```
jupafi-consultores/
├── app/
│   ├── layout.tsx          ← metadata + fonts
│   ├── globals.css         ← variables CSS + utilities
│   └── page.tsx            ← composición de la home
├── components/
│   ├── navbar.tsx          ← sticky con blur al scroll + mobile menu
│   ├── hero.tsx            ← headline + stats + CTAs
│   ├── differentiators.tsx ← 4 diferenciadores clave
│   ├── services.tsx        ← 6 servicios con precios desde
│   ├── portfolio.tsx       ← 14 proyectos con filtro por categoría
│   ├── process.tsx         ← 5 pasos del proceso
│   ├── cta.tsx             ← contacto final con email + WA
│   └── footer.tsx
├── data/
│   ├── projects.ts         ← 14 proyectos (editar aquí para agregar más)
│   └── services.ts         ← 6 servicios (editar aquí para tarifas)
└── public/                 ← imágenes, og-image, favicon
```

## Correr local

```bash
cd D:\Claude\jupafi-consultores
pnpm install   # o npm install
pnpm dev       # arranca en http://localhost:3000
```

## Deploy a Vercel

### Opción 1 — Vercel CLI (más rápido)
```bash
npm i -g vercel
cd D:\Claude\jupafi-consultores
vercel              # primera vez, sigue prompts
vercel --prod       # deploy a producción
```

### Opción 2 — GitHub + Vercel Dashboard
1. `git init && git add . && git commit -m "init"`
2. Crear repo en GitHub y `git push`
3. En vercel.com → New Project → importar repo
4. Deploy automático en cada push

## Conectar el dominio

En el dashboard de Vercel:
1. Project → Settings → Domains
2. Agregar `jupaficonsultores.com`
3. Apuntar los DNS de tu registrador a los nameservers de Vercel
4. SSL se configura solo

## Editar contenido

| Para cambiar... | Edita... |
|-----------------|----------|
| Proyectos del portfolio | `data/projects.ts` |
| Servicios y precios | `data/services.ts` |
| Headline principal | `components/hero.tsx` |
| Proceso (5 pasos) | `components/process.tsx` |
| Email / WhatsApp | `components/cta.tsx` + `components/footer.tsx` |
| Metadata SEO | `app/layout.tsx` |

## Paleta

```
bg base:    #09090b  (zinc-950)
bg elev:    #18181b  (zinc-900)
border:     #27272a  (zinc-800)
text:       #fafafa  (zinc-50)
text mute:  #a1a1aa  (zinc-400)
accent:     #c8ff00  (lime fluor)
```

## Lo que ya está cubierto

- ✅ Mobile-first (probado en 375px)
- ✅ Animaciones con motion (stagger en hero, scroll-reveal en sections)
- ✅ Respeta `prefers-reduced-motion`
- ✅ Contraste WCAG AA
- ✅ Metadata OG completa
- ✅ Filtro de portfolio por categoría
- ✅ Menú hamburguesa mobile funcional
- ✅ SEO: lang, title, description, OG
- ✅ Fonts optimizadas con `next/font`

## TODO (cuando quieras)

- [ ] Cambiar número WhatsApp en `components/cta.tsx` (línea con `wa.me/523312345678`)
- [ ] Agregar OG image custom en `/public/og.png` (1200x630)
- [ ] Subir favicon a `/app/icon.png`
- [ ] Conectar formulario de contacto a Resend / Formspree
- [ ] Agregar Plausible / Vercel Analytics
- [ ] Sitemap.xml + robots.txt (Next.js los genera con archivos en app/)

---

Construido con la skill `websites-premium`. Para modificar criterios de diseño globales, ver `C:\Users\fierr\.claude\skills\websites-premium\`.
