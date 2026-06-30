'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, Skull } from 'lucide-react'
import type { Bet } from '@/lib/bets'
import { STATUS } from './status'
import StatusBadge from './StatusBadge'

export default function BetCard({ bet }: { bet: Bet }) {
  const alive = STATUS[bet.status].alive
  const Icon = alive ? Rocket : Skull

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
        className="group relative h-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-5 flex flex-col gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors duration-200">
              <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {bet.name}
            </h3>
          </div>
          <StatusBadge status={bet.status} />
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {bet.oneLiner}
        </p>

        <div className="mt-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {dateLabel && <span>{dateLabel}</span>}
          {dateLabel && metric && <span aria-hidden>·</span>}
          {metric && <span className="font-medium">{metric}</span>}
        </div>
      </Link>
    </motion.div>
  )
}
