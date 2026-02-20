'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const springConfig = { stiffness: 200, damping: 25 }

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const spotlightX = useTransform(springX, [0, 1], [0, 100])
  const spotlightY = useTransform(springY, [0, 1], [0, 100])

  const background = useTransform(
    [spotlightX, spotlightY],
    ([sx, sy]) =>
      `radial-gradient(circle 120px at ${sx}% ${sy}%, rgba(255,255,255,0.15), transparent)`
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 dark:from-slate-700 dark:to-slate-600 overflow-hidden flex flex-col items-center justify-center gap-3 p-8 cursor-default"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background }}
      />
      <div className="relative text-center">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
          Move cursor to reveal
        </div>
        <div className="text-xl font-bold text-white">Spotlight Effect</div>
        <div className="text-sm text-slate-300 mt-2 max-w-[200px]">
          A radial gradient follows your cursor to illuminate the card
        </div>
      </div>
    </motion.div>
  )
}
