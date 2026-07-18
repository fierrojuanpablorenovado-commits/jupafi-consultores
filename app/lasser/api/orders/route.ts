import { NextResponse } from 'next/server'
import { getAllOrders, createOrder } from '../../_lib/store'
import type { OrderStatus, OrderTipo, Responsable } from '../../_lib/types'

export async function GET() {
  const orders = getAllOrders()
  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  const body = await req.json()
  const order = createOrder({
    status: 'recibido' as OrderStatus,
    tipo: body.tipo as OrderTipo,
    tecnica: body.tecnica ?? '',
    clienteNombre: body.clienteNombre ?? '',
    clienteTelefono: body.clienteTelefono,
    nombreEquipo: body.nombreEquipo ?? '',
    responsable: (body.responsable ?? 'Admin') as Responsable,
    impresion: body.impresion,
    fechaPedido: body.fechaPedido ?? new Date().toISOString().split('T')[0],
    fechaCompromiso: body.fechaCompromiso,
    total: body.total ? Number(body.total) : undefined,
    anticipo: body.anticipo ? Number(body.anticipo) : undefined,
    comentario: body.comentario,
  })
  return NextResponse.json(order, { status: 201 })
}
