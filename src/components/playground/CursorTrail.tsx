'use client'

import { useRef, useEffect, useCallback } from 'react'

interface TrailDot {
  x: number
  y: number
  vx: number
  vy: number
  age: number
  isBurst: boolean
}

const MAX_DOTS = 80
const DOT_LIFETIME = 700
const BURST_LIFETIME = 1000
const BURST_COUNT = 24
const BURST_SPEED = 4

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

    dotsRef.current = dotsRef.current.filter(
      d => now - d.age < (d.isBurst ? BURST_LIFETIME : DOT_LIFETIME)
    )

    for (let i = 0; i < dotsRef.current.length; i++) {
      const dot = dotsRef.current[i]
      const lifetime = dot.isBurst ? BURST_LIFETIME : DOT_LIFETIME
      const life = 1 - (now - dot.age) / lifetime

      // Apply velocity for burst particles
      if (dot.isBurst) {
        dot.x += dot.vx
        dot.y += dot.vy
        dot.vx *= 0.96
        dot.vy *= 0.96
      }

      const radius = dot.isBurst ? life * 6 : life * 8
      const hue = (i * 8 + now * 0.05) % 360
      ctx.globalAlpha = life * (dot.isBurst ? 0.9 : 0.7)
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

      if (Math.abs(x - last.x) > 3 || Math.abs(y - last.y) > 3) {
        dotsRef.current.push({
          x,
          y,
          vx: 0,
          vy: 0,
          age: performance.now(),
          isBurst: false,
        })
        if (dotsRef.current.length > MAX_DOTS) dotsRef.current.shift()
        lastPosRef.current = { x, y }
      }
    }

    const handleClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      const cx = e.clientX - r.left
      const cy = e.clientY - r.top
      const now = performance.now()

      for (let i = 0; i < BURST_COUNT; i++) {
        const angle = (i / BURST_COUNT) * Math.PI * 2 + Math.random() * 0.3
        const speed = BURST_SPEED * (0.6 + Math.random() * 0.8)
        dotsRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: now + Math.random() * 50,
          isBurst: true,
        })
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      ro.disconnect()
    }
  }, [animate])

  return <canvas ref={canvasRef} className="w-full h-full cursor-none" />
}
