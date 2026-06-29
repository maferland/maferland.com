import type { Bet } from '@/lib/bets'
import { STATUS } from './status'

function money(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

interface Stat {
  label: string
  value: string
}

// Build the stat list from whatever numbers the bet has.
function statsFor(bet: Bet): Stat[] {
  const stats: Stat[] = []
  const dead = !STATUS[bet.status].alive

  if (typeof bet.spentUsd === 'number') {
    stats.push({
      label: dead ? 'Spent before it died' : 'Spent',
      value: money(bet.spentUsd),
    })
  }
  if (typeof bet.mrrUsd === 'number') {
    stats.push({ label: 'MRR', value: money(bet.mrrUsd) })
  }
  if (typeof bet.revenueUsd === 'number') {
    stats.push({ label: 'Revenue', value: money(bet.revenueUsd) })
  }
  return stats
}

export function hasMetrics(bet: Bet): boolean {
  return (
    typeof bet.spentUsd === 'number' ||
    typeof bet.mrrUsd === 'number' ||
    typeof bet.revenueUsd === 'number'
  )
}

export default function BetMetrics({ bet }: { bet: Bet }) {
  const stats = statsFor(bet)
  if (stats.length === 0) return null

  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3">
      {stats.map(stat => (
        <div key={stat.label}>
          <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {stat.label}
          </dt>
          <dd className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
