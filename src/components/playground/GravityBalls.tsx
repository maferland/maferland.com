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
const MAX_SPEED = 15
const COLLISION_ITERATIONS = 3

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
    }

    // Ball-to-ball collisions (multiple passes to stabilize dense piles)
    for (let iter = 0; iter < COLLISION_ITERATIONS; iter++) {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i]
          const b = balls[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const distSq = dx * dx + dy * dy
          const minDist = a.radius + b.radius

          if (distSq < minDist * minDist && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const nx = dx / dist
            const ny = dy / dist

            // Separate overlapping balls
            const overlap = (minDist - dist) / 2
            a.x -= nx * overlap
            a.y -= ny * overlap
            b.x += nx * overlap
            b.y += ny * overlap

            // Only apply impulse on first iteration to avoid compounding
            if (iter === 0) {
              const dvx = a.vx - b.vx
              const dvy = a.vy - b.vy
              const dvn = dvx * nx + dvy * ny

              if (dvn > 0) {
                const massA = a.radius * a.radius
                const massB = b.radius * b.radius
                const totalMass = massA + massB

                const impulse = dvn * BOUNCE
                a.vx -= ((impulse * massB) / totalMass) * nx
                a.vy -= ((impulse * massB) / totalMass) * ny
                b.vx += ((impulse * massA) / totalMass) * nx
                b.vy += ((impulse * massA) / totalMass) * ny
              }
            }
          }
        }
      }
    }

    // Clamp velocities
    for (const ball of balls) {
      const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy)
      if (speed > MAX_SPEED) {
        ball.vx = (ball.vx / speed) * MAX_SPEED
        ball.vy = (ball.vy / speed) * MAX_SPEED
      }
    }

    // Draw
    for (const ball of balls) {
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fillStyle = isDark
        ? `hsla(${ball.hue}, 70%, 65%, 0.9)`
        : `hsla(${ball.hue}, 65%, 50%, 0.9)`
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
