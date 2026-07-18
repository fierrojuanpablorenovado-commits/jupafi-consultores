import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllOrders } from '../../_lib/store'
import { NavAdmin } from '../../_components/NavAdmin'
import { OrdersTable } from '../../_components/OrdersTable'

export default async function PedidosPage() {
  const session = cookies().get('ls_session')
  if (session?.value !== 'ok') redirect('/lasser/login')

  const orders = getAllOrders()

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <NavAdmin />
      <main className="pl-56">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black">Pedidos</h1>
              <p className="text-zinc-500 text-sm mt-1">{orders.length} pedidos en el sistema</p>
            </div>
            <Link
              href="/lasser/admin/pedidos/nuevo"
              className="bg-[#B5D318] text-zinc-950 font-black px-5 py-2.5 rounded-xl hover:bg-[#c8e820] transition text-sm"
            >
              + Nuevo Pedido
            </Link>
          </div>
          <OrdersTable orders={orders} />
        </div>
      </main>
    </div>
  )
}
