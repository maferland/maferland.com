'use client'

import { useRef, useEffect, useCallback } from 'react'

interface GridPoint {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
}

const PULL_RADIUS = 120
const PULL_STRENGTH = 0.3
const SPRING = 0.05
const DAMPING = 0.85
const GRID_SPACING = 30

export default function MagneticMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<GridPoint[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const colsRef = useRef(0)

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const cols = Math.floor(rect.width / GRID_SPACING) + 1
    const rows = Math.floor(rect.height / GRID_SPACING) + 1
    colsRef.current = cols

    const offsetX = (rect.width - (cols - 1) * GRID_SPACING) / 2
    const offsetY = (rect.height - (rows - 1) * GRID_SPACING) / 2

    const points: GridPoint[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * GRID_SPACING
        const y = offsetY + r * GRID_SPACING
        points.push({ x, y, originX: x, originY: y, vx: 0, vy: 0 })
      }
    }
    pointsRef.current = points
  }, [])

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
    const { x: mx, y: my } = mouseRef.current
    const points = pointsRef.current

    for (const p of points) {
      const dx = mx - p.x
      const dy = my - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < PULL_RADIUS && dist > 0) {
        const strength = ((PULL_RADIUS - dist) / PULL_RADIUS) * PULL_STRENGTH
        p.vx += dx * strength * 0.05
        p.vy += dy * strength * 0.05
      }

      p.vx += (p.originX - p.x) * SPRING
      p.vy += (p.originY - p.y) * SPRING
      p.vx *= DAMPING
      p.vy *= DAMPING
      p.x += p.vx
      p.y += p.vy
    }

    // Draw dots
    ctx.fillStyle = isDark ? 'rgba(148,163,184,0.4)' : 'rgba(100,116,139,0.3)'
    for (const p of points) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
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
      for (const p of pointsRef.current) {
        const dx = p.originX - cx
        const dy = p.originY - cy
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const force = Math.max(0, 180 - dist) / dist
        p.vx += dx * force * 0.5
        p.vy += dy * force * 0.5
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

  return <canvas ref={canvasRef} className="w-full h-full" />
}
