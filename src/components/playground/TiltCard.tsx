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
        className="relative w-48 h-64 rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 dark:from-slate-700 dark:to-slate-500 p-6 flex flex-col justify-end cursor-default shadow-xl"
      >
        {/* Glare overlay */}
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
          <div className="text-xs font-mono text-slate-400 mb-1">
            INTERACTIVE
          </div>
          <div className="text-lg font-bold text-white">3D Tilt</div>
          <div className="text-sm text-slate-300 mt-1">
            Move your cursor across the card
          </div>
        </div>
      </motion.div>
    </div>
  )
}
