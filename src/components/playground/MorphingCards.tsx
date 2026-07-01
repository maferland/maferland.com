'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  {
    id: 'design',
    label: 'Shape',
    detail: 'Layout, spacing, and hierarchy settle before color gets loud.',
  },
  {
    id: 'motion',
    label: 'Motion',
    detail: 'Springs and timing make state changes feel physical.',
  },
  {
    id: 'code',
    label: 'Code',
    detail: 'Small components keep the interaction easy to reason about.',
  },
  {
    id: 'craft',
    label: 'Craft',
    detail: 'Edges, focus, and empty states get the same attention.',
  },
]

export default function MorphingCards() {
  const [selected, setSelected] = useState(cards[0].id)
  const activeCard = cards.find(card => card.id === selected) ?? cards[0]

  return (
    <div className="flex h-full min-h-[250px] w-full flex-col justify-center gap-4">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            onClick={() => setSelected(card.id)}
            className={
              selected === card.id
                ? 'flex h-[76px] cursor-pointer flex-col justify-center rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] px-4 text-left text-[var(--body)]'
                : 'flex h-[76px] cursor-pointer flex-col justify-center rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 text-left text-[var(--body)]'
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="button"
          >
            <span className="mono text-xs text-[var(--accent)]">
              0{index + 1}
            </span>
            <span className="mt-2 text-sm font-semibold">{card.label}</span>
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
            selected
          </span>
          <h3 className="mt-1 text-base font-semibold text-[var(--text)]">
            {activeCard.label}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {activeCard.detail}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
