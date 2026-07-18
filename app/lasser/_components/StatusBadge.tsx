'use client'
import type { OrderStatus } from '../_lib/types'
import { STATUS_LABEL, STATUS_COLOR } from '../_lib/types'

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLOR[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  )
}
