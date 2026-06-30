import type { BetStatus } from '@/lib/bets'
import { STATUS } from './status'
import { cn } from '@/lib/utils'

export default function StatusBadge({
  status,
  className,
}: {
  status: BetStatus
  className?: string
}) {
  const meta = STATUS[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full',
        meta.badge,
        className
      )}
    >
      <span aria-hidden>{meta.emoji}</span>
      {meta.label}
    </span>
  )
}
