import { NextResponse } from 'next/server'
import { getOrderByToken } from '../../../_lib/store'

export async function GET(_req: Request, { params }: { params: { token: string } }) {
  const order = getOrderByToken(params.token)
  if (!order) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  const { clienteTelefono, ...safe } = order
  void clienteTelefono
  return NextResponse.json(safe)
}
