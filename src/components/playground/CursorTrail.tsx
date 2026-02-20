'use client'

import { useRef, useEffect, useCallback } from 'react'

interface TrailDot {
  x: number
  y: number
  age: number
}

const MAX_DOTS = 40
const DOT_LIFETIME = 600

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<TrailDot[]>([])
  const rafRef = useRef<number>(0)
  const lastPosRef = useRef({ x: -1, y: -1 })

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    const isDark = document.documentElement.classList.contains('dark')
    const now = performance.now()
    const dots = dotsRef.current

    // Remove expired dots
    dotsRef.current = dots.filter(d => now - d.age < DOT_LIFETIME)

    for (let i = 0; i < dotsRef.current.length; i++) {
      const dot = dotsRef.current[i]
      const life = 1 - (now - dot.age) / DOT_LIFETIME
      const radius = life * 8

      const hue = (i * 8 + now * 0.05) % 360
      ctx.globalAlpha = life * 0.7
      ctx.fillStyle = isDark
        ? `hsla(${hue}, 70%, 70%, ${life})`
        : `hsla(${hue}, 60%, 50%, ${life})`
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
    })
    ro.observe(canvas)

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const last = lastPosRef.current

      // Add dot only if cursor moved enough
      if (Math.abs(x - last.x) > 3 || Math.abs(y - last.y) > 3) {
        dotsRef.current.push({ x, y, age: performance.now() })
        if (dotsRef.current.length > MAX_DOTS) dotsRef.current.shift()
        lastPosRef.current = { x, y }
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      ro.disconnect()
    }
  }, [animate])

  return <canvas ref={canvasRef} className="w-full h-full cursor-none" />
}
