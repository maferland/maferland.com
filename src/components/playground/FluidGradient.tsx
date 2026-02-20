'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const blobs = [
  { color: '#3b82f6', size: 120, speed: 0.8, phase: 0, orbitX: 70, orbitY: 50 },
  {
    color: '#a855f7',
    size: 100,
    speed: 0.6,
    phase: 2.1,
    orbitX: -60,
    orbitY: 40,
  },
  {
    color: '#ec4899',
    size: 90,
    speed: 1.0,
    phase: 4.2,
    orbitX: 50,
    orbitY: -60,
  },
  {
    color: '#14b8a6',
    size: 80,
    speed: 0.9,
    phase: 5.5,
    orbitX: -40,
    orbitY: -45,
  },
]

const springConfig = { stiffness: 30, damping: 20 }

function Blob({
  color,
  size,
  speed,
  phase,
  orbitX,
  orbitY,
  mouseX,
  mouseY,
}: (typeof blobs)[number] & {
  mouseX: ReturnType<typeof useSpring>
  mouseY: ReturnType<typeof useSpring>
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf: number
    const animate = (time: number) => {
      const t = time * 0.001 * speed
      const ox = Math.sin(t + phase) * orbitX
      const oy = Math.cos(t + phase * 0.7) * orbitY
      el.style.transform = `translate(${ox}px, ${oy}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [speed, phase, orbitX, orbitY])

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}cc, ${color}00 70%)`,
        x: mouseX,
        y: mouseY,
      }}
    />
  )
}

export default function FluidGradient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mouseX = useSpring(rawX, springConfig)
  const mouseY = useSpring(rawY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rawX.set((e.clientX - centerX) * 0.3)
    rawY.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 rounded-2xl"
    >
      <div className="absolute inset-0 flex items-center justify-center mix-blend-screen">
        {blobs.map((blob, i) => (
          <Blob key={i} {...blob} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>
    </div>
  )
}
