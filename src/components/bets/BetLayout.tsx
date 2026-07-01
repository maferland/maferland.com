import MDXRenderer from '../../app/blog/[slug]/MDXRenderer'
import '../../app/blog/[slug]/syntax-highlighting.css'
import type { Bet } from '@/lib/bets'
import { LinkButton } from '@/components/ui/LinkButton'
import StatusBadge from './StatusBadge'
import BetMetrics, { hasMetrics } from './BetMetrics'

export default function BetLayout({
  bet,
  content,
}: {
  bet: Bet
  content: string
}) {
  return (
    <article className="site-container-narrow py-[60px]">
      <header className="mb-8">
        <div className="mb-4">
          <StatusBadge status={bet.status} />
        </div>
        <h1 className="mb-4 text-[44px] font-bold leading-[1.05] tracking-[-0.03em] max-sm:text-[34px]">
          {bet.name}
        </h1>
        <p className="text-lg leading-relaxed text-[var(--body)] sm:text-xl">
          {bet.oneLiner}
        </p>

        {bet.wedge && (
          <p className="mt-4 text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--body)]">Wedge:</span>{' '}
            {bet.wedge}
          </p>
        )}

        {hasMetrics(bet) && (
          <div className="panel mt-6 p-4 sm:p-5">
            <BetMetrics bet={bet} />
          </div>
        )}

        {(bet.site || bet.repo) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {bet.site && <LinkButton href={bet.site}>Visit</LinkButton>}
            {bet.repo && (
              <LinkButton href={bet.repo} variant="ghost">
                GitHub ↗
              </LinkButton>
            )}
          </div>
        )}
      </header>

      <MDXRenderer source={content} />
    </article>
  )
}
