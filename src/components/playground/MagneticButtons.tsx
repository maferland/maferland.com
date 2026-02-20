'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
const MAGNETIC_RANGE = 100

function MagneticButton({ label }: { label: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Label moves at 1.5x for parallax depth
  const labelX = useTransform(springX, v => v * 1.5)
  const labelY = useTransform(springY, v => v * 1.5)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < MAGNETIC_RANGE) {
      const strength = (MAGNETIC_RANGE - dist) / MAGNETIC_RANGE
      x.set(dx * strength * 0.4)
      y.set(dy * strength * 0.4)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 overflow-hidden"
    >
      <motion.span
        style={{ x: labelX, y: labelY }}
        className="block text-sm font-medium text-white dark:text-slate-900"
      >
        {label}
      </motion.span>
    </motion.button>
  )
}

export default function MagneticButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <MagneticButton label="Hover me" />
      <MagneticButton label="Magnetic" />
      <MagneticButton label="Pull" />
    </div>
  )
}
