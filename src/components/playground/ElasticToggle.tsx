'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const springConfig = { type: 'spring' as const, stiffness: 500, damping: 25 }

export default function ElasticToggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        aria-label="Toggle"
        aria-pressed={enabled}
        className="relative h-10 w-20 cursor-pointer rounded-full border border-[var(--line)]"
        onClick={() => setEnabled(current => !current)}
        type="button"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: enabled ? 'var(--accent)' : 'var(--panel2)',
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute left-1 top-1 h-8 w-8 rounded-full border border-[var(--line)] bg-[var(--panel)] shadow-sm"
          animate={{ x: enabled ? 40 : 0 }}
          transition={springConfig}
        />
      </button>
      <motion.span
        className="mono text-xs font-medium text-[var(--muted)]"
        animate={{ scale: [1, 1.1, 1] }}
        key={String(enabled)}
        transition={{ duration: 0.3 }}
      >
        {enabled ? 'On' : 'Off'}
      </motion.span>
    </div>
  )
}
