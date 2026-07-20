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

const EMPTY_COPY: Record<Filter, { title: string; body: string }> = {
  all: {
    title: 'No ideas logged yet.',
    body: 'Public Lab notes will show up here once they are ready.',
  },
  alive: {
    title: 'Nothing alive right now.',
    body: 'Active ideas will show up here once they pass the public threshold.',
  },
  graveyard: {
    title: 'Nothing dead yet.',
    body: 'Killed and parked ideas will land here once they are worth writing down.',
  },
}

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

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          {shown.map(bet => (
            <BetCard key={bet.slug} bet={bet} />
          ))}
        </div>
      ) : (
        <div className="panel flex min-h-[180px] flex-col justify-center p-6">
          <div className="mono mb-3 text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
            Empty
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            {EMPTY_COPY[filter].title}
          </h2>
          <p className="mt-3 max-w-[480px] text-sm leading-6 text-[var(--muted)]">
            {EMPTY_COPY[filter].body}
          </p>
        </div>
      )}
    </div>
  )
}
