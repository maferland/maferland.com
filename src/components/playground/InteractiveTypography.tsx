'use client'

import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
}

const REPEL_RADIUS = 100
const REPEL_FORCE = 8
const SPRING = 0.04
const DAMPING = 0.85
const PARTICLE_SIZE = 1.5
const SAMPLE_GAP = 3
const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'

export default function InteractiveTypography() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Work in device pixels directly (no ctx.scale) for accurate sampling
    const fontSize = Math.min(rect.width / 8, 80) * dpr
    ctx.fillStyle = '#000'
    ctx.font = `bold ${fontSize}px ${SYSTEM_FONT}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    ctx.fillText('Marc-Antoine', centerX, centerY - fontSize * 0.6)
    ctx.fillText('Ferland', centerX, centerY + fontSize * 0.6)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const particles: Particle[] = []
    const gap = SAMPLE_GAP * dpr

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const i = (y * canvas.width + x) * 4
        if (imageData.data[i + 3] > 128) {
          const px = x / dpr
          const py = y / dpr
          particles.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            vx: 0,
            vy: 0,
            size: PARTICLE_SIZE,
          })
        }
      }
    }

    particlesRef.current = particles
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b'

    const { x: mx, y: my } = mouseRef.current
    const particles = particlesRef.current

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      const dx = p.x - mx
      const dy = p.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < REPEL_RADIUS) {
        const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force
      }

      p.vx += (p.originX - p.x) * SPRING
      p.vy += (p.originY - p.y) * SPRING
      p.vx *= DAMPING
      p.vy *= DAMPING
      p.x += p.vx
      p.y += p.vy

      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
    }

    ctx.restore()
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    initParticles(canvas)

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
      for (const p of particlesRef.current) {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const force = Math.max(0, 250 - dist) / dist
        p.vx += dx * force * 0.4
        p.vy += dy * force * 0.4
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    resizeObserverRef.current = new ResizeObserver(() => {
      initParticles(canvas)
    })
    resizeObserverRef.current.observe(canvas)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      resizeObserverRef.current?.disconnect()
    }
  }, [initParticles, animate])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[300px] sm:h-[400px] cursor-default"
    />
  )
}
