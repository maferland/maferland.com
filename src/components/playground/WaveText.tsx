'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const WORDS = 'hover over me'

export default function WaveText() {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      className="flex items-center justify-center cursor-default select-none"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex">
        {WORDS.split('').map((char, i) => (
          <motion.span
            key={i}
            className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 inline-block"
            animate={
              hovering
                ? {
                    y: [0, -20, 0],
                    transition: {
                      duration: 0.5,
                      delay: i * 0.04,
                      ease: 'easeInOut',
                    },
                  }
                : { y: 0 }
            }
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
