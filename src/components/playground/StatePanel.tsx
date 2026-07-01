'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  {
    id: 'draft',
    label: 'Draft',
    detail: 'Loose idea. Enough shape to decide what deserves another pass.',
    progress: '24%',
  },
  {
    id: 'review',
    label: 'Review',
    detail: 'The interaction is live. Now it needs pressure from real use.',
    progress: '68%',
  },
  {
    id: 'ship',
    label: 'Ship',
    detail: 'Small enough to trust, polished enough to leave in the product.',
    progress: '92%',
  },
]

export default function StatePanel() {
  const [selected, setSelected] = useState(cards[0].id)
  const activeCard = cards.find(card => card.id === selected) ?? cards[0]

  return (
    <div className="flex h-full min-h-[230px] w-full max-w-[270px] flex-col justify-center gap-4">
      <div className="grid grid-cols-3 rounded-xl border border-[var(--line)] bg-[var(--panel2)] p-1">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            onClick={() => setSelected(card.id)}
            className={
              selected === card.id
                ? 'cursor-pointer rounded-lg bg-[var(--panel)] px-3 py-2 text-left text-[var(--text)] shadow-sm'
                : 'cursor-pointer rounded-lg px-3 py-2 text-left text-[var(--muted)]'
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="button"
          >
            <span className="mono text-[9px] text-[var(--accent)]">
              0{index + 1}
            </span>
            <span className="mt-1 block text-xs font-semibold">
              {card.label}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          key={activeCard.id}
          className="rounded-xl border border-[var(--line)] bg-[var(--panel2)] p-4 text-left"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            {activeCard.progress}
          </span>
          <h3 className="mt-1 text-base font-semibold text-[var(--text)]">
            {activeCard.label}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {activeCard.detail}
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              initial={{ width: 0 }}
              animate={{ width: activeCard.progress }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
