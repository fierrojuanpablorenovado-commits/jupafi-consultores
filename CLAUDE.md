# JuPaFi Consultores — Contexto del Proyecto

## Qué es este proyecto

Sitio web de la agencia JuPaFi Consultores, que incluye el subsitio completo de **Lasser Sport** — una uniformería deportiva en Puerto Vallarta, Jalisco.

La ruta `/lasser` es un producto independiente dentro del mismo Next.js:
- Landing pública de marketing
- Catálogo de servicios
- Sistema de tracking de pedidos para clientes
- Panel de administración interno (protegido con cookie)

---

## Stack técnico

- **Next.js 14.2.18** — App Router, TypeScript
- **Tailwind CSS** — estilos
- **`motion` v11** — animaciones. SIEMPRE importar desde `'motion/react'`, NUNCA desde `'framer-motion'`
- **Bebas Neue** — fuente display via `next/font/google`, variable CSS `--font-bebas`, clase `.font-bebas`
- **Sin base de datos** — datos en memoria (`app/lasser/_lib/store.ts`) con módulo singleton + 28 pedidos seed

---

## Estructura de archivos de Lasser Sport

```
app/lasser/
├── layout.tsx                  # Font Bebas + CSS keyframes/utilidades globales
├── page.tsx                    # Landing pública (server component)
├── login/page.tsx              # Login admin
├── catalogo/page.tsx           # Catálogo de servicios
├── admin/
│   ├── page.tsx                # Dashboard admin
│   ├── pedidos/page.tsx        # Lista completa de pedidos
│   ├── pedidos/nuevo/page.tsx  # Formulario nuevo pedido
│   └── pedidos/[id]/page.tsx   # Detalle / editar pedido
├── taller/page.tsx             # Vista taller (producción)
├── _components/                # Componentes client-side
│   ├── HeroSection.tsx         # Hero con aurora, scan beam, typewriter, partículas
│   ├── LasserLogo.tsx          # SVG logo (variantes: full, icon, text)
│   ├── AnimatedStats.tsx       # Contadores animados con useInView
│   ├── ServiciosGrid.tsx       # Grid de servicios con glassmorphism
│   ├── ScrollReveal.tsx        # Wrapper de scroll reveal con blur fadeUp
│   ├── CursorGlow.tsx          # Aureola lima que sigue el cursor
│   ├── ScrollProgressBar.tsx   # Barra de progreso fija arriba
│   ├── LiveTickerLasser.tsx    # Cinta de eventos en tiempo real
│   ├── TrackingForm.tsx        # Formulario de tracking público
│   ├── NavAdmin.tsx            # Navbar del panel admin
│   ├── StatusBadge.tsx         # Badge de status de pedido
│   ├── OrdersTable.tsx         # Tabla de pedidos
│   ├── NuevoPedidoForm.tsx     # Formulario nuevo pedido
│   ├── TallerActions.tsx       # Acciones del taller
│   └── OrderTimeline.tsx       # Timeline de historial
└── _lib/
    ├── store.ts                # In-memory store (Map<string, Order>)
    ├── types.ts                # Tipos: Order, OrderStatus, etc.
    └── data.ts                 # 28 pedidos seed
```

---

## Diseño — Reglas fijas de Lasser Sport

**Paleta:**
- Fondo: `#000000` (negro puro)
- Acento: `#B5D318` (lima/verde deportivo)
- Texto principal: `white / zinc-50`
- Texto secundario: `zinc-400 / zinc-500`
- Bordes sutiles: `rgba(255,255,255,0.07)`

**Clases CSS disponibles en layout.tsx:**
- `.font-bebas` — fuente Bebas Neue
- `.glow-lime` — text-shadow lima
- `.glow-box` — box-shadow lima suave
- `.glass` — glassmorphism oscuro (`rgba(255,255,255,0.03)` + blur + border)
- `.glass-lime` — glassmorphism con tinte lima
- `.text-gradient-lime` — texto con gradiente lima animado
- `.particle` — partícula flotante animada

**Animaciones estándar (motion/react):**
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 48, scale: 0.97, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)',
             transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}
```

---

## Auth del panel admin

- **Cookie:** `ls_session=ok` (httpOnly, sameSite strict, 7 días)
- **Password:** variable de entorno `LASSER_PASS` (default: `Lasser2026`)
- **Login:** `POST /lasser/api/auth/login`
- **Logout:** `POST /lasser/api/auth/logout`
- El middleware de cada página admin revisa la cookie y redirige a `/lasser/login` si no existe

---

## Store de datos (in-memory)

```typescript
// app/lasser/_lib/store.ts
// Singleton en módulo — se reinicia con cada cold start de Vercel
// Para producción real se debería migrar a Neon Postgres

import { getAllOrders, getStats, getOrderById, createOrder, updateOrder } from './_lib/store'

// getStats() retorna: { total, activos, enProduccion, listos, saldoPendiente }
// getAllOrders() retorna: Order[]
// getOrderById(id) retorna: Order | undefined
// createOrder(data) retorna: Order (genera folio LS-YYYY-NNN)
// updateOrder(id, partial) retorna: Order | undefined
```

**Tipos clave:**
```typescript
type OrderStatus = 'nuevo' | 'en_disenio' | 'autorizado' | 'en_produccion' | 'control_calidad' | 'listo' | 'entregado' | 'cancelado'
type OrderTipo = 'clon' | 'corte' | 'replica_fut' | 'dimeo'

interface Order {
  id: string
  folio: string           // LS-2026-001
  cliente: string
  clienteTelefono: string
  tipo: OrderTipo
  cantidad: number
  descripcion: string
  status: OrderStatus
  fechaEntrega: string    // ISO date
  precio: number
  anticipo: number
  responsable: string
  notas?: string
  createdAt: string
  updatedAt: string
}
```

---

## Variables de entorno requeridas

```env
LASSER_PASS=Lasser2026         # Password del panel admin
```

El proyecto no requiere DB ni servicios externos para funcionar.

---

## Deploy

```bash
# Build local
npx next build

# Deploy a Vercel
npx vercel deploy --prod --yes --project jupafi-consultores
```

**URL producción:** `https://jupaficonsultores.com/lasser`

---

## Convenciones de código

- Server components por defecto — solo agregar `'use client'` cuando se necesiten hooks o interactividad
- Componentes animados siempre en `_components/` como client components
- Respetar `useReducedMotion()` — si `rm` es true, no renderizar efectos pesados (partículas, aurora, scan beam)
- Imports de motion: `import { motion, useInView } from 'motion/react'` — NUNCA `framer-motion`
- El color lima es `#B5D318` — no usar `lime-400` de Tailwind (tono diferente)
