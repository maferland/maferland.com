'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  {
    id: 'design',
    emoji: '🎨',
    label: 'Design',
    detail: 'Pixel-perfect layouts with systematic spacing and color',
  },
  {
    id: 'motion',
    emoji: '✨',
    label: 'Motion',
    detail: 'Spring physics and meaningful transitions',
  },
  {
    id: 'code',
    emoji: '⚡',
    label: 'Code',
    detail: 'Clean architecture with type safety and performance',
  },
  {
    id: 'craft',
    emoji: '🔧',
    label: 'Craft',
    detail: 'Attention to detail in every interaction',
  },
]

export default function MorphingCards() {
  const [selected, setSelected] = useState<string | null>(null)
  const activeCard = cards.find(c => c.id === selected)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => (
          <motion.button
            key={card.id}
            layoutId={`card-${card.id}`}
            onClick={() => setSelected(card.id)}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-2xl">{card.emoji}</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
              {card.label}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && activeCard && (
          <>
            <motion.div
              className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              layoutId={`card-${selected}`}
              className="absolute flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-xl w-56"
              onClick={() => setSelected(null)}
            >
              <span className="text-4xl">{activeCard.emoji}</span>
              <span className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-3">
                {activeCard.label}
              </span>
              <motion.p
                className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeCard.detail}
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
