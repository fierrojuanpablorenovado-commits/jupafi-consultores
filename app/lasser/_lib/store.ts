import type { Order, OrderStatus } from './types'
import { SEED_ORDERS } from './data'

// Module-level store — persists within Vercel function instance
let _store: Map<string, Order> | null = null

function getStore(): Map<string, Order> {
  if (!_store) {
    _store = new Map(SEED_ORDERS.map(o => [o.id, o]))
  }
  return _store
}

export function getAllOrders(): Order[] {
  return Array.from(getStore().values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getOrderById(id: string): Order | undefined {
  return getStore().get(id)
}

export function getOrderByToken(token: string): Order | undefined {
  return Array.from(getStore().values()).find(o => o.token === token)
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | null {
  const store = getStore()
  const order = store.get(id)
  if (!order) return null
  const updated = { ...order, status, updatedAt: new Date().toISOString() }
  store.set(id, updated)
  return updated
}

export function updateOrder(id: string, patch: Partial<Order>): Order | null {
  const store = getStore()
  const order = store.get(id)
  if (!order) return null
  const updated = { ...order, ...patch, id, updatedAt: new Date().toISOString() }
  store.set(id, updated)
  return updated
}

export function createOrder(data: Omit<Order, 'id' | 'token' | 'folio' | 'createdAt' | 'updatedAt'>): Order {
  const store = getStore()
  const id = `ord-${Date.now()}`
  const token = `ls${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`.slice(0, 34)
  const now = new Date().toISOString()
  const folio = generateFolio(store.size + 1)
  const order: Order = { ...data, id, token, folio, createdAt: now, updatedAt: now }
  store.set(id, order)
  return order
}

function generateFolio(n: number): string {
  return `LS-2026-${String(n).padStart(3, '0')}`
}

// Stats helper
export function getStats() {
  const orders = getAllOrders()
  const activos = orders.filter(o => o.status !== 'entregado')
  const enProduccion = orders.filter(o => o.status === 'produccion')
  const listos = orders.filter(o => o.status === 'listo')
  const saldoPendiente = activos.reduce((sum, o) => {
    const saldo = (o.total ?? 0) - (o.anticipo ?? 0)
    return sum + (saldo > 0 ? saldo : 0)
  }, 0)
  return { total: orders.length, activos: activos.length, enProduccion: enProduccion.length, listos: listos.length, saldoPendiente }
}
