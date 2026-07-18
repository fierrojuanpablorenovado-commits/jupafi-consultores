export type OrderStatus =
  | 'recibido'
  | 'diseño'
  | 'autorizacion'
  | 'produccion'
  | 'calidad'
  | 'listo'
  | 'entregado'

export type OrderTipo = 'clon' | 'corte' | 'replica_fut' | 'dimeo'
export type Responsable = 'Mayra' | 'Ale' | 'Cynthia' | 'Admin'

export interface Order {
  id: string
  folio: string
  token: string
  status: OrderStatus
  tipo: OrderTipo
  tecnica: string
  clienteNombre: string
  clienteTelefono?: string
  nombreEquipo: string
  responsable: Responsable
  impresion?: string
  fechaPedido: string
  fechaCompromiso?: string
  total?: number
  anticipo?: number
  comentario?: string
  createdAt: string
  updatedAt: string
}

export const STATUS_LABEL: Record<OrderStatus, string> = {
  recibido:     'Recibido',
  diseño:       'Diseño',
  autorizacion: 'Autorización',
  produccion:   'Producción',
  calidad:      'Calidad',
  listo:        '✓ Listo',
  entregado:    'Entregado',
}

export const STATUS_ORDER: OrderStatus[] = [
  'recibido', 'diseño', 'autorizacion', 'produccion', 'calidad', 'listo', 'entregado'
]

export const STATUS_COLOR: Record<OrderStatus, string> = {
  recibido:     'bg-blue-500/20 text-blue-300 border-blue-500/30',
  diseño:       'bg-violet-500/20 text-violet-300 border-violet-500/30',
  autorizacion: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  produccion:   'bg-orange-500/20 text-orange-300 border-orange-500/30',
  calidad:      'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  listo:        'bg-lime-500/20 text-lime-300 border-lime-500/30',
  entregado:    'bg-zinc-600/20 text-zinc-400 border-zinc-600/30',
}

export const TIPO_LABEL: Record<OrderTipo, string> = {
  clon:        'Réplica',
  corte:       'Corte',
  replica_fut: 'Réplica Fut.',
  dimeo:       'Dimeo',
}
