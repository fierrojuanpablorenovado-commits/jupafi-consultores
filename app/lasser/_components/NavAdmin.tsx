'use client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const links = [
  { href: '/lasser/admin', label: '📊 Dashboard' },
  { href: '/lasser/admin/pedidos', label: '📋 Pedidos' },
  { href: '/lasser/admin/pedidos/nuevo', label: '➕ Nuevo Pedido' },
  { href: '/lasser/taller', label: '🔧 Taller' },
]

export function NavAdmin() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/lasser/api/auth/logout', { method: 'POST' })
    router.push('/lasser/login')
  }

  return (
    <nav className="fixed top-0 left-0 h-full w-56 bg-zinc-900 border-r border-zinc-800 z-40 flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <Link href="/lasser" className="flex items-center gap-2">
          <span className="text-lime-400 font-black text-xl tracking-tight">LASSER</span>
          <span className="text-zinc-400 text-xs font-bold">SPORT</span>
        </Link>
        <p className="text-zinc-600 text-xs mt-1">Panel de control</p>
      </div>
      <div className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === l.href
                ? 'bg-lime-400/10 text-lime-400 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="p-3 border-t border-zinc-800">
        <button
          onClick={logout}
          className="w-full text-left px-3 py-2 text-xs text-zinc-500 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
