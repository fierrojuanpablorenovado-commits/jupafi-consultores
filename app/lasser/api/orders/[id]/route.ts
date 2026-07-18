import { NextResponse } from 'next/server'
import { getOrderById, updateOrder, updateOrderStatus } from '../../../_lib/store'
import type { OrderStatus } from '../../../_lib/types'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const order = getOrderById(params.id)
  if (!order) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()

  if (body.status) {
    const updated = updateOrderStatus(params.id, body.status as OrderStatus)
    if (!updated) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(updated)
  }

  const updated = updateOrder(params.id, body)
  if (!updated) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(updated)
}
