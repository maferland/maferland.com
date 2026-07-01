'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'

const WORD_LINES = ['hover each', 'letter']
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
      className="inline-block cursor-default text-3xl font-bold text-[var(--text)] sm:text-4xl"
      style={{
        y: springY,
        scale: springScale,
        color: index % 3 === 0 ? 'var(--accent)' : 'var(--text)',
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
      <div className="flex flex-col items-center leading-none">
        {WORD_LINES.map((line, lineIndex) => (
          <div className="flex" key={line}>
            {line.split('').map((char, charIndex) => (
              <Letter
                key={`${line}-${charIndex}`}
                char={char}
                index={lineIndex * 9 + charIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
