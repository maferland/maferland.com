'use client'

import { useRef, useEffect } from 'react'

const blobs = [
  {
    color: '#3b82f6',
    size: 200,
    speed: 0.5,
    phase: 0,
    orbitX: 120,
    orbitY: 90,
  },
  {
    color: '#a855f7',
    size: 180,
    speed: 0.4,
    phase: 2.1,
    orbitX: -100,
    orbitY: 80,
  },
  {
    color: '#ec4899',
    size: 160,
    speed: 0.6,
    phase: 4.2,
    orbitX: 90,
    orbitY: -100,
  },
  {
    color: '#14b8a6',
    size: 150,
    speed: 0.55,
    phase: 5.5,
    orbitX: -80,
    orbitY: -85,
  },
]

// Spring-like following with momentum
const SPRING = 0.008
const FRICTION = 0.92

export default function FluidGradient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })
  const mouseVelocity = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseTarget.current = {
        x: (e.clientX - cx) * 0.3,
        y: (e.clientY - cy) * 0.3,
      }
    }

    const animate = (time: number) => {
      // Spring physics: accelerate toward target, friction slows it down
      const mv = mouseVelocity.current
      const mc = mouseCurrent.current
      const mt = mouseTarget.current
      mv.x += (mt.x - mc.x) * SPRING
      mv.y += (mt.y - mc.y) * SPRING
      mv.x *= FRICTION
      mv.y *= FRICTION
      mc.x += mv.x
      mc.y += mv.y

      const t = time * 0.001

      for (let i = 0; i < blobs.length; i++) {
        const el = blobRefs.current[i]
        if (!el) continue
        const b = blobs[i]
        const orbitX = Math.sin(t * b.speed + b.phase) * b.orbitX
        const orbitY = Math.cos(t * b.speed + b.phase * 0.7) * b.orbitY
        const tx = orbitX + mouseCurrent.current.x
        const ty = orbitY + mouseCurrent.current.y
        el.style.transform = `translate(${tx}px, ${ty}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 rounded-2xl"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          ref={el => {
            blobRefs.current[i] = el
          }}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}bb, ${blob.color}00 70%)`,
            filter: 'blur(20px)',
          }}
        />
      ))}
    </div>
  )
}
