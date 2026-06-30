'use client'

import { useState } from 'react'
import type { Bet } from '@/lib/bets'
import { STATUS } from './status'
import BetCard from './BetCard'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'alive' | 'graveyard'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'alive', label: 'Alive' },
  { key: 'graveyard', label: 'Graveyard' },
]

export default function BetsList({ bets }: { bets: Bet[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const shown = bets.filter(bet => {
    if (filter === 'alive') return STATUS[bet.status].alive
    if (filter === 'graveyard') return !STATUS[bet.status].alive
    return true
  })

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              'mono rounded-lg border px-3 py-1.5 text-xs transition-colors duration-200',
              filter === key
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)]'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        {shown.map(bet => (
          <BetCard key={bet.slug} bet={bet} />
        ))}
      </div>
    </div>
  )
}
