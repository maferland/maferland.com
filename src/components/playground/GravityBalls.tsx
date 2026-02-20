'use client'

import { useRef, useEffect, useCallback } from 'react'

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  hue: number
}

const GRAVITY = 0.3
const BOUNCE = 0.7
const FRICTION = 0.99

export default function GravityBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ballsRef = useRef<Ball[]>([])
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const { w, h } = sizeRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    const isDark = document.documentElement.classList.contains('dark')
    const balls = ballsRef.current

    for (const ball of balls) {
      ball.vy += GRAVITY
      ball.vx *= FRICTION
      ball.x += ball.vx
      ball.y += ball.vy

      // Bounce off walls
      if (ball.y + ball.radius > h) {
        ball.y = h - ball.radius
        ball.vy *= -BOUNCE
      }
      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius
        ball.vx *= -BOUNCE
      }
      if (ball.x + ball.radius > w) {
        ball.x = w - ball.radius
        ball.vx *= -BOUNCE
      }

      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fillStyle = isDark
        ? `hsla(${ball.hue}, 70%, 65%, 0.9)`
        : `hsla(${ball.hue}, 65%, 50%, 0.9)`
      ctx.fill()
    }

    // Remove balls that have settled (barely moving at bottom)
    ballsRef.current = balls.filter(
      b => Math.abs(b.vy) > 0.1 || b.y + b.radius < h - 1 || balls.length < 30
    )

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
      sizeRef.current = { w: rect.width, h: rect.height }
    })
    ro.observe(canvas)

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    sizeRef.current = { w: rect.width, h: rect.height }

    const handleClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const count = 3 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        ballsRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 8 - 2,
          radius: 8 + Math.random() * 14,
          hue: Math.random() * 360,
        })
      }
    }

    canvas.addEventListener('click', handleClick)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('click', handleClick)
      ro.disconnect()
    }
  }, [animate])

  return <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
}
