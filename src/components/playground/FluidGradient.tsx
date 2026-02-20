'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const blobs = [
  {
    color: 'bg-blue-400',
    sizeClass: 'w-2/3 aspect-square',
    speed: 0.8,
    phase: 0,
  },
  {
    color: 'bg-purple-400',
    sizeClass: 'w-3/4 aspect-square',
    speed: 0.6,
    phase: 2,
  },
  {
    color: 'bg-pink-400',
    sizeClass: 'w-[70%] aspect-square',
    speed: 1.0,
    phase: 4,
  },
  {
    color: 'bg-teal-400',
    sizeClass: 'w-1/2 aspect-square',
    speed: 0.9,
    phase: 5,
  },
]

const springConfig = { stiffness: 30, damping: 20 }

function Blob({
  color,
  sizeClass,
  speed,
  phase,
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
      const orbitX = Math.sin(t + phase) * 80
      const orbitY = Math.cos(t + phase * 0.7) * 60
      el.style.transform = `translate(${orbitX}px, ${orbitY}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [speed, phase])

  return (
    <motion.div
      ref={ref}
      className={`absolute rounded-full ${color} ${sizeClass} opacity-70 dark:opacity-50 blur-3xl`}
      style={{
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
    rawX.set((e.clientX - centerX) * 0.25)
    rawY.set((e.clientY - centerY) * 0.25)
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
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 dark:bg-slate-900 rounded-2xl"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {blobs.map((blob, i) => (
          <Blob key={i} {...blob} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>
    </div>
  )
}
