# Playground Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a `/playground` page with an interactive typography hero + 7 self-contained interaction demos to showcase design engineering craft.

**Architecture:** Each demo is an isolated client component in `src/components/playground/`. A `DemoCard` wrapper provides consistent sizing and labeling. The page is a server component that imports all demos. Canvas demos use raw `requestAnimationFrame`; motion demos use Framer Motion (already installed).

**Tech Stack:** Next.js 15 App Router, Framer Motion, Canvas API, TailwindCSS 4

---

### Task 1: Page scaffolding + DemoCard wrapper

**Files:**

- Create: `src/app/playground/page.tsx`
- Create: `src/components/playground/DemoCard.tsx`
- Modify: `src/components/Navigation.tsx:12-16`

**Step 1: Create DemoCard component**

Create `src/components/playground/DemoCard.tsx`:

```tsx
'use client'

import { cn } from '@/lib/utils'

interface DemoCardProps {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

export default function DemoCard({
  title,
  description,
  children,
  className,
}: DemoCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden',
        className
      )}
    >
      <div className="aspect-square flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50">
        {children}
      </div>
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
        <h3 className="font-medium text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  )
}
```

**Step 2: Create page route**

Create `src/app/playground/page.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Playground | Marc-Antoine Ferland',
  description:
    'Exploring interaction, motion, and the space between design and code.',
}

export default function PlaygroundPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Hero slot — Task 2 */}

      <header className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Playground
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Exploring interaction, motion, and the space between design and code.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demo slots — Tasks 3-9 */}
      </div>
    </div>
  )
}
```

**Step 3: Add nav link**

In `src/components/Navigation.tsx`, add to the `links` array:

```ts
const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/playground', label: 'Playground' },
  { href: '/blog', label: 'Blog' },
]
```

**Step 4: Verify**

Run: `npm run build`
Expected: Build succeeds, `/playground` route accessible.

**Step 5: Commit**

```bash
git add src/app/playground/page.tsx src/components/playground/DemoCard.tsx src/components/Navigation.tsx
git commit -m "Add playground page scaffolding with DemoCard wrapper"
```

---

### Task 2: Interactive Typography hero

**Files:**

- Create: `src/components/playground/InteractiveTypography.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create the canvas component**

Create `src/components/playground/InteractiveTypography.tsx`:

```tsx
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
    ctx.scale(dpr, dpr)

    // Draw text offscreen to sample pixels
    const fontSize = Math.min(rect.width / 8, 80)
    ctx.fillStyle = '#000'
    ctx.font = `bold ${fontSize}px ${getComputedStyle(canvas).fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText(
      'Marc-Antoine',
      rect.width / 2,
      rect.height / 2 - fontSize * 0.6
    )
    ctx.fillText('Ferland', rect.width / 2, rect.height / 2 + fontSize * 0.6)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const particles: Particle[] = []

    for (let y = 0; y < canvas.height; y += SAMPLE_GAP * dpr) {
      for (let x = 0; x < canvas.width; x += SAMPLE_GAP * dpr) {
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
    const rect = canvas.getBoundingClientRect()
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

      // Spring back to origin
      p.vx += (p.originX - p.x) * SPRING
      p.vy += (p.originY - p.y) * SPRING

      // Damping
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

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    resizeObserverRef.current = new ResizeObserver(() => {
      initParticles(canvas)
    })
    resizeObserverRef.current.observe(canvas)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserverRef.current?.disconnect()
    }
  }, [initParticles, animate])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[300px] sm:h-[400px] cursor-default"
      style={{ fontFamily: 'var(--font-geist-sans)' }}
    />
  )
}
```

**Step 2: Wire into page**

In `src/app/playground/page.tsx`, import and place above the header:

```tsx
import InteractiveTypography from '@/components/playground/InteractiveTypography'
```

Replace the `{/* Hero slot */}` comment with:

```tsx
<div className="mb-12">
  <InteractiveTypography />
</div>
```

**Step 3: Verify**

Run: `npm run dev` — visit `/playground`, move cursor over hero. Particles should scatter and spring back.

**Step 4: Commit**

```bash
git add src/components/playground/InteractiveTypography.tsx src/app/playground/page.tsx
git commit -m "Add interactive typography hero to playground"
```

---

### Task 3: Spring Drag-to-Reorder demo

**Files:**

- Create: `src/components/playground/SpringReorder.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create component**

Create `src/components/playground/SpringReorder.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Reorder } from 'framer-motion'
import { GripVertical } from 'lucide-react'

const initialItems = [
  'Design tokens',
  'Motion curves',
  'Layout grids',
  'Color systems',
  'Typography scale',
]

export default function SpringReorder() {
  const [items, setItems] = useState(initialItems)

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="w-full max-w-xs space-y-2"
    >
      {items.map(item => (
        <Reorder.Item
          key={item}
          value={item}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 cursor-grab active:cursor-grabbing shadow-sm active:shadow-md transition-shadow select-none"
          whileDrag={{ scale: 1.03 }}
        >
          <GripVertical size={16} className="text-slate-400 flex-shrink-0" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {item}
          </span>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

**Step 2: Import into page**

Add import and render inside the grid in `src/app/playground/page.tsx`:

```tsx
import DemoCard from '@/components/playground/DemoCard'
import SpringReorder from '@/components/playground/SpringReorder'
```

Inside the grid div:

```tsx
<DemoCard
  title="Spring Reorder"
  description="Drag items to reorder with spring physics"
>
  <SpringReorder />
</DemoCard>
```

**Step 3: Verify**

Run: `npm run dev` — drag items, they should spring into place.

**Step 4: Commit**

```bash
git add src/components/playground/SpringReorder.tsx src/app/playground/page.tsx
git commit -m "Add spring drag-to-reorder demo"
```

---

### Task 4: Magnetic Buttons demo

**Files:**

- Create: `src/components/playground/MagneticButtons.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create component**

Create `src/components/playground/MagneticButtons.tsx`:

```tsx
'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
const MAGNETIC_RANGE = 100

function MagneticButton({ label }: { label: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Label moves at 1.5x for parallax depth
  const labelX = useTransform(springX, v => v * 1.5)
  const labelY = useTransform(springY, v => v * 1.5)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < MAGNETIC_RANGE) {
      const strength = (MAGNETIC_RANGE - dist) / MAGNETIC_RANGE
      x.set(dx * strength * 0.4)
      y.set(dy * strength * 0.4)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 overflow-hidden"
    >
      <motion.span
        style={{ x: labelX, y: labelY }}
        className="block text-sm font-medium text-white dark:text-slate-900"
      >
        {label}
      </motion.span>
    </motion.button>
  )
}

export default function MagneticButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <MagneticButton label="Hover me" />
      <MagneticButton label="Magnetic" />
      <MagneticButton label="Pull" />
    </div>
  )
}
```

**Step 2: Import into page grid**

```tsx
import MagneticButtons from '@/components/playground/MagneticButtons'
```

```tsx
<DemoCard
  title="Magnetic Buttons"
  description="Buttons that pull toward your cursor with parallax depth"
>
  <MagneticButtons />
</DemoCard>
```

**Step 3: Verify**

Run: `npm run dev` — hover near buttons, they should warp toward the cursor.

**Step 4: Commit**

```bash
git add src/components/playground/MagneticButtons.tsx src/app/playground/page.tsx
git commit -m "Add magnetic buttons demo"
```

---

### Task 5: Morphing Card Expand demo

**Files:**

- Create: `src/components/playground/MorphingCards.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create component**

Create `src/components/playground/MorphingCards.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  {
    id: 'design',
    emoji: '🎨',
    label: 'Design',
    detail: 'Pixel-perfect layouts with systematic spacing and color',
  },
  {
    id: 'motion',
    emoji: '✨',
    label: 'Motion',
    detail: 'Spring physics and meaningful transitions',
  },
  {
    id: 'code',
    emoji: '⚡',
    label: 'Code',
    detail: 'Clean architecture with type safety and performance',
  },
  {
    id: 'craft',
    emoji: '🔧',
    label: 'Craft',
    detail: 'Attention to detail in every interaction',
  },
]

export default function MorphingCards() {
  const [selected, setSelected] = useState<string | null>(null)
  const activeCard = cards.find(c => c.id === selected)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => (
          <motion.button
            key={card.id}
            layoutId={`card-${card.id}`}
            onClick={() => setSelected(card.id)}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-2xl">{card.emoji}</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
              {card.label}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && activeCard && (
          <>
            <motion.div
              className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              layoutId={`card-${selected}`}
              className="absolute flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-xl w-56"
              onClick={() => setSelected(null)}
            >
              <span className="text-4xl">{activeCard.emoji}</span>
              <span className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-3">
                {activeCard.label}
              </span>
              <motion.p
                className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeCard.detail}
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Import into page grid**

```tsx
import MorphingCards from '@/components/playground/MorphingCards'
```

```tsx
<DemoCard
  title="Morphing Cards"
  description="Click cards to see shared layout animation"
>
  <MorphingCards />
</DemoCard>
```

**Step 3: Verify**

Run: `npm run dev` — click a card, it morphs into expanded view. Click to dismiss.

**Step 4: Commit**

```bash
git add src/components/playground/MorphingCards.tsx src/app/playground/page.tsx
git commit -m "Add morphing card expand demo"
```

---

### Task 6: Elastic Number Ticker demo

**Files:**

- Create: `src/components/playground/NumberTicker.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create component**

Create `src/components/playground/NumberTicker.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(Math.abs(value) / Math.pow(10, place)) % 10

  return (
    <div className="relative w-8 h-12 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${place}-${digit}`}
          className="absolute inset-0 flex items-center justify-center text-2xl font-mono font-bold text-slate-900 dark:text-slate-100"
          initial={{ y: value >= 0 ? 40 : -40 }}
          animate={{ y: 0 }}
          exit={{ y: value >= 0 ? -40 : 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function NumberTicker() {
  const [count, setCount] = useState(0)

  const displayValue = Math.abs(count)
  const digits = Math.max(String(displayValue).length, 3)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-0.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 px-4 py-2">
        {count < 0 && (
          <span className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100 w-4">
            −
          </span>
        )}
        {Array.from({ length: digits }, (_, i) => (
          <Digit key={i} value={count} place={digits - 1 - i} />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount(c => c - 1)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Minus size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Plus size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
      </div>
    </div>
  )
}
```

**Step 2: Import into page grid**

```tsx
import NumberTicker from '@/components/playground/NumberTicker'
```

```tsx
<DemoCard
  title="Number Ticker"
  description="Odometer-style counter with spring physics"
>
  <NumberTicker />
</DemoCard>
```

**Step 3: Verify**

Run: `npm run dev` — click +/-, digits should roll with spring overshoot.

**Step 4: Commit**

```bash
git add src/components/playground/NumberTicker.tsx src/app/playground/page.tsx
git commit -m "Add elastic number ticker demo"
```

---

### Task 7: Particle Field demo

**Files:**

- Create: `src/components/playground/ParticleField.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create component**

Create `src/components/playground/ParticleField.tsx`:

```tsx
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
    const rect = canvas.getBoundingClientRect()
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

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const ro = new ResizeObserver(() => init(canvas))
    ro.observe(canvas)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      ro.disconnect()
    }
  }, [init, animate])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
```

**Step 2: Import into page grid**

```tsx
import ParticleField from '@/components/playground/ParticleField'
```

```tsx
<DemoCard
  title="Particle Field"
  description="Constellation dots with cursor repulsion"
>
  <ParticleField />
</DemoCard>
```

**Step 3: Verify & commit**

```bash
git add src/components/playground/ParticleField.tsx src/app/playground/page.tsx
git commit -m "Add particle field demo"
```

---

### Task 8: Magnetic Mesh demo

**Files:**

- Create: `src/components/playground/MagneticMesh.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create component**

Create `src/components/playground/MagneticMesh.tsx`:

```tsx
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

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const ro = new ResizeObserver(() => init(canvas))
    ro.observe(canvas)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      ro.disconnect()
    }
  }, [init, animate])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
```

**Step 2: Import into page grid**

```tsx
import MagneticMesh from '@/components/playground/MagneticMesh'
```

```tsx
<DemoCard
  title="Magnetic Mesh"
  description="Grid that warps toward your cursor like rubber"
>
  <MagneticMesh />
</DemoCard>
```

**Step 3: Verify & commit**

```bash
git add src/components/playground/MagneticMesh.tsx src/app/playground/page.tsx
git commit -m "Add magnetic mesh demo"
```

---

### Task 9: Fluid Gradient demo

**Files:**

- Create: `src/components/playground/FluidGradient.tsx`
- Modify: `src/app/playground/page.tsx`

**Step 1: Create component**

Create `src/components/playground/FluidGradient.tsx`:

```tsx
'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const blobs = [
  { color: 'bg-blue-400', size: 'w-32 h-32', speed: 0.8, phase: 0 },
  { color: 'bg-purple-400', size: 'w-40 h-40', speed: 0.6, phase: 2 },
  { color: 'bg-pink-400', size: 'w-36 h-36', speed: 1.0, phase: 4 },
]

const springConfig = { stiffness: 30, damping: 20 }

function Blob({
  color,
  size,
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
      const orbitX = Math.sin(t + phase) * 60
      const orbitY = Math.cos(t + phase * 0.7) * 40
      el.style.transform = `translate(${orbitX}px, ${orbitY}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [speed, phase])

  return (
    <motion.div
      ref={ref}
      className={`absolute rounded-full ${color} ${size} opacity-60 dark:opacity-40 blur-3xl`}
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
    rawX.set((e.clientX - centerX) * 0.15)
    rawY.set((e.clientY - centerY) * 0.15)
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
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  )
}
```

**Step 2: Import into page grid**

```tsx
import FluidGradient from '@/components/playground/FluidGradient'
```

```tsx
<DemoCard
  title="Fluid Gradient"
  description="Blurred color blobs drifting with cursor influence"
>
  <FluidGradient />
</DemoCard>
```

**Step 3: Verify & commit**

```bash
git add src/components/playground/FluidGradient.tsx src/app/playground/page.tsx
git commit -m "Add fluid gradient demo"
```

---

### Task 10: Final polish + build verification

**Files:**

- Modify: `src/app/playground/page.tsx` (final import order, spacing)

**Step 1: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Verify lint + typecheck**

Run: `npm run lint && npm run typecheck`
Expected: No errors.

**Step 3: Test dark mode**

Run: `npm run dev` — toggle dark mode, verify all demos render correctly in both themes.

**Step 4: Final commit**

```bash
git add -A
git commit -m "Polish playground page: final adjustments"
```
