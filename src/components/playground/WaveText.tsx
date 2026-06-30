'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'

const WORDS = 'hover each letter'
const springConfig = { stiffness: 300, damping: 15 }

function Letter({ char, index }: { char: string; index: number }) {
  const y = useMotionValue(0)
  const springY = useSpring(y, springConfig)
  const scale = useMotionValue(1)
  const springScale = useSpring(scale, springConfig)

  const handleMouseEnter = () => {
    y.set(-24)
    scale.set(1.3)
  }

  const handleMouseLeave = () => {
    y.set(0)
    scale.set(1)
  }

  if (char === ' ') {
    return <span className="inline-block w-3" />
  }

  return (
    <motion.span
      className="inline-block text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 cursor-default"
      style={{
        y: springY,
        scale: springScale,
        color: `hsl(${index * 25 + 200}, 70%, 60%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {char}
    </motion.span>
  )
}

export default function WaveText() {
  return (
    <div className="flex items-center justify-center select-none">
      <div className="flex">
        {WORDS.split('').map((char, i) => (
          <Letter key={i} char={char} index={i} />
        ))}
      </div>
    </div>
  )
}
