'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Bet } from '@/lib/bets'
import { STATUS } from './status'
import StatusBadge from './StatusBadge'

export default function BetCard({ bet }: { bet: Bet }) {
  const alive = STATUS[bet.status].alive

  const dateLabel = bet.date
    ? new Date(bet.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : null

  // MRR wins; otherwise show spend only when there's something to show.
  const metric =
    typeof bet.mrrUsd === 'number'
      ? `$${bet.mrrUsd.toLocaleString('en-US')} MRR`
      : typeof bet.spentUsd === 'number' && bet.spentUsd > 0
        ? `$${bet.spentUsd.toLocaleString('en-US')} spent`
        : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/lab/${bet.slug}`}
        className="panel panel-hover flex h-full flex-col gap-3 overflow-hidden p-5 text-inherit no-underline"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--panel2)]">
              <span
                className={
                  alive
                    ? 'h-2.5 w-2.5 rounded-full bg-[var(--accent)]'
                    : 'h-2.5 w-2.5 rounded-full bg-[var(--faint)]'
                }
                aria-hidden
              />
            </div>
            <h3 className="text-lg font-semibold">{bet.name}</h3>
          </div>
          <StatusBadge status={bet.status} />
        </div>

        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {bet.oneLiner}
        </p>

        <div className="mono mt-auto flex items-center gap-2 text-xs text-[var(--faint)]">
          {dateLabel && <span>{dateLabel}</span>}
          {dateLabel && metric && <span aria-hidden>·</span>}
          {metric && <span className="font-medium">{metric}</span>}
        </div>
      </Link>
    </motion.div>
  )
}
