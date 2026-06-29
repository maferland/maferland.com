import Link from 'next/link'
import type { Bet } from '@/lib/bets'
import StatusBadge from './StatusBadge'

export default function BetCard({ bet }: { bet: Bet }) {
  return (
    <Link
      href={`/bets/${bet.slug}`}
      className="group block rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-5 sm:p-6 transition-colors hover:border-slate-300 dark:hover:border-slate-600"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
          {bet.name}
        </h3>
        <StatusBadge status={bet.status} className="flex-shrink-0" />
      </div>

      <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
        {bet.oneLiner}
      </p>

      {bet.tags && bet.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {bet.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
