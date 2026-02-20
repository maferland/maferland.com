'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const springConfig = { type: 'spring' as const, stiffness: 500, damping: 25 }

export default function ElasticToggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setEnabled(e => !e)}
        className="relative w-20 h-10 rounded-full cursor-pointer"
        aria-label="Toggle"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: enabled ? '#3b82f6' : '#94a3b8',
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-md"
          animate={{ x: enabled ? 40 : 0 }}
          transition={springConfig}
        />
      </button>
      <motion.span
        className="text-sm font-medium text-slate-600 dark:text-slate-300"
        animate={{ scale: [1, 1.1, 1] }}
        key={String(enabled)}
        transition={{ duration: 0.3 }}
      >
        {enabled ? 'On' : 'Off'}
      </motion.span>
    </div>
  )
}
