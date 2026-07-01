'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(Math.abs(value) / Math.pow(10, place)) % 10

  return (
    <div className="relative h-12 w-8 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${place}-${digit}`}
          className="mono absolute inset-0 flex items-center justify-center text-2xl font-bold text-[var(--text)]"
          initial={{ y: value >= 0 ? 40 : -40 }}
          animate={{ y: 0 }}
          exit={{ y: value >= 0 ? -40 : 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function NumberTicker() {
  const [count, setCount] = useState(0)

  const displayValue = Math.abs(count)
  const digits = Math.max(String(displayValue).length, 3)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-0.5 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2">
        {count < 0 && (
          <span className="mono w-4 text-2xl font-bold text-[var(--text)]">
            −
          </span>
        )}
        {Array.from({ length: digits }, (_, i) => (
          <Digit key={i} value={count} place={digits - 1 - i} />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount(c => c - 1)}
          className="cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--panel2)] p-2 text-[var(--body)] transition-colors hover:text-[var(--accent)]"
        >
          <Minus size={18} />
        </button>
        <button
          onClick={() => setCount(0)}
          className="mono cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--panel2)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--panel2)] p-2 text-[var(--body)] transition-colors hover:text-[var(--accent)]"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}
