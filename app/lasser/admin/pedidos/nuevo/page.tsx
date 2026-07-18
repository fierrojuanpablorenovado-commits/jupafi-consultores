import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NavAdmin } from '../../../_components/NavAdmin'
import { NuevoPedidoForm } from '../../../_components/NuevoPedidoForm'

export default async function NuevoPedidoPage() {
  const session = cookies().get('ls_session')
  if (session?.value !== 'ok') redirect('/lasser/login')

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <NavAdmin />
      <main className="pl-56">
        <div className="max-w-2xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black">Nuevo Pedido</h1>
            <p className="text-zinc-500 text-sm mt-1">Registra un pedido para comenzar el seguimiento</p>
          </div>
          <NuevoPedidoForm />
        </div>
      </main>
    </div>
  )
}
