'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const springConfig = { stiffness: 300, damping: 30 }

export default function TiltCard() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [0, 1], [15, -15])
  const rotateY = useTransform(springX, [0, 1], [-15, 15])
  const glareX = useTransform(springX, [0, 1], [0, 100])
  const glareY = useTransform(springY, [0, 1], [0, 100])

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
    <div className="perspective-[800px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex h-64 w-48 cursor-default flex-col justify-end rounded-xl border border-[var(--line)] bg-[var(--panel2)] p-6 shadow-xl"
      >
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25), transparent 60%)`
            ),
          }}
        />

        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="mono mb-1 text-xs text-[var(--faint)]">
            INTERACTIVE
          </div>
          <div className="text-lg font-bold text-[var(--text)]">3D Tilt</div>
          <div className="mt-1 text-sm text-[var(--muted)]">
            Move your cursor across the card
          </div>
        </div>
      </motion.div>
    </div>
  )
}
