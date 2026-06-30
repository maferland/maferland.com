import MDXRenderer from '../../app/blog/[slug]/MDXRenderer'
import '../../app/blog/[slug]/syntax-highlighting.css'
import type { Bet } from '@/lib/bets'
import StatusBadge from './StatusBadge'
import BetMetrics, { hasMetrics } from './BetMetrics'
import ButtonLink from '@/components/ui/ButtonLink'

export default function BetLayout({
  bet,
  content,
}: {
  bet: Bet
  content: string
}) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-8">
        <div className="mb-4">
          <StatusBadge status={bet.status} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-slate-100">
          {bet.name}
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {bet.oneLiner}
        </p>

        {bet.wedge && (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Wedge:
            </span>{' '}
            {bet.wedge}
          </p>
        )}

        {hasMetrics(bet) && (
          <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-4 sm:p-5">
            <BetMetrics bet={bet} />
          </div>
        )}

        {(bet.site || bet.repo) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {bet.site && <ButtonLink href={bet.site}>Visit</ButtonLink>}
            {bet.repo && <ButtonLink href={bet.repo}>GitHub</ButtonLink>}
          </div>
        )}
      </header>

      <MDXRenderer source={content} />
    </article>
  )
}
