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
      <div className="flex gap-2 mb-6">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-lg transition-colors duration-200',
              filter === key
                ? 'font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shown.map(bet => (
          <BetCard key={bet.slug} bet={bet} />
        ))}
      </div>
    </div>
  )
}
