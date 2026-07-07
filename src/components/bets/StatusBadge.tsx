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
        'tag inline-flex items-center gap-1 rounded-full',
        meta.alive
          ? 'border-[var(--accent)] text-[var(--accent)]'
          : 'text-[var(--faint)]',
        className
      )}
    >
      {meta.label}
    </span>
  )
}
