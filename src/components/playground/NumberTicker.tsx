'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(Math.abs(value) / Math.pow(10, place)) % 10

  return (
    <div className="relative w-8 h-12 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${place}-${digit}`}
          className="absolute inset-0 flex items-center justify-center text-2xl font-mono font-bold text-slate-900 dark:text-slate-100"
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
      <div className="flex items-center gap-0.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 px-4 py-2">
        {count < 0 && (
          <span className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100 w-4">
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
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
        >
          <Minus size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300 cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
        >
          <Plus size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
      </div>
    </div>
  )
}
