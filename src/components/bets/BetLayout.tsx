import MDXRenderer from '../../app/blog/[slug]/MDXRenderer'
import '../../app/blog/[slug]/syntax-highlighting.css'
import type { Bet } from '@/lib/bets'
import { DetailLayout } from '@/components/detail/DetailLayout'
import StatusBadge from './StatusBadge'
import BetMetrics, { hasMetrics } from './BetMetrics'

export default function BetLayout({
  bet,
  content,
}: {
  bet: Bet
  content: string
}) {
  const meta = [
    ['Stage', <StatusBadge key="status" status={bet.status} />],
    ['Started', bet.date ? new Date(bet.date).getFullYear() : 'TBD'],
    ...(bet.updated
      ? [['Updated', new Date(bet.updated).getFullYear()] as const]
      : []),
    ...(bet.tags && bet.tags.length > 0
      ? [
          [
            'Tags',
            <span className="flex flex-wrap gap-1.5" key="tags">
              {bet.tags.map(tag => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>,
          ] as const,
        ]
      : []),
  ].map(([label, value]) => ({
    label: String(label),
    value,
  }))

  const actions = [
    ...(bet.site ? [{ href: bet.site, label: 'Visit ↗' }] : []),
    ...(bet.repo ? [{ href: bet.repo, label: 'GitHub ↗' }] : []),
  ]

  return (
    <DetailLayout
      actions={actions}
      backHref="/lab"
      backLabel="lab"
      description={bet.wedge}
      eyebrow={`Lab · ${bet.status}`}
      meta={meta}
      metaTitle="Idea notes"
      subtitle={bet.oneLiner}
      title={bet.name}
    >
      {hasMetrics(bet) && (
        <div className="mb-8 border-b border-[var(--line)] pb-6">
          <BetMetrics bet={bet} />
        </div>
      )}
      <MDXRenderer source={content} />
    </DetailLayout>
  )
}
