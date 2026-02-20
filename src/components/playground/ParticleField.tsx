'use client'

import { useRef, useEffect, useCallback } from 'react'

interface Dot {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  phase: number
}

const DOT_COUNT = 80
const CONNECT_DIST = 80
const REPEL_RADIUS = 100
const REPEL_FORCE = 4
const DRIFT_SPEED = 0.3
const SPRING = 0.02
const DAMPING = 0.92

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const dots: Dot[] = []
    for (let i = 0; i < DOT_COUNT; i++) {
      const x = Math.random() * rect.width
      const y = Math.random() * rect.height
      dots.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        phase: Math.random() * Math.PI * 2,
      })
    }
    dotsRef.current = dots
  }, [])

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    const isDark = document.documentElement.classList.contains('dark')
    const dots = dotsRef.current
    const { x: mx, y: my } = mouseRef.current
    const t = time * 0.001

    for (const dot of dots) {
      // Gentle ambient drift
      dot.vx += Math.sin(t + dot.phase) * DRIFT_SPEED * 0.01
      dot.vy += Math.cos(t + dot.phase * 1.3) * DRIFT_SPEED * 0.01

      // Mouse repulsion
      const dx = dot.x - mx
      const dy = dot.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < REPEL_RADIUS && dist > 0) {
        const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE
        dot.vx += (dx / dist) * force * 0.1
        dot.vy += (dy / dist) * force * 0.1
      }

      // Spring back
      dot.vx += (dot.originX - dot.x) * SPRING
      dot.vy += (dot.originY - dot.y) * SPRING
      dot.vx *= DAMPING
      dot.vy *= DAMPING
      dot.x += dot.vx
      dot.y += dot.vy
    }

    // Draw connections
    ctx.strokeStyle = isDark
      ? 'rgba(148,163,184,0.15)'
      : 'rgba(100,116,139,0.12)'
    ctx.lineWidth = 1
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x
        const dy = dots[i].y - dots[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECT_DIST) {
          ctx.globalAlpha = 1 - dist / CONNECT_DIST
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.stroke()
        }
      }
    }
    ctx.globalAlpha = 1

    // Draw dots
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b'
    for (const dot of dots) {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    init(canvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      for (const dot of dotsRef.current) {
        const dx = dot.x - cx
        const dy = dot.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const force = Math.max(0, 200 - dist) / dist
        dot.vx += dx * force * 0.3
        dot.vy += dy * force * 0.3
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    const ro = new ResizeObserver(() => init(canvas))
    ro.observe(canvas)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      ro.disconnect()
    }
  }, [init, animate])

  return <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
}
