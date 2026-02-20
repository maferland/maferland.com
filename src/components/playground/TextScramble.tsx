'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
const PHRASES = [
  'Design Engineer',
  'Pixel Perfect',
  'Motion Design',
  'Clean Code',
  'Ship Fast',
]

function scramble(target: string, progress: number): string {
  return target
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' '
      if (i / target.length < progress) return char
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    })
    .join('')
}

export default function TextScramble() {
  const [display, setDisplay] = useState(PHRASES[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAnimatingRef = useRef(false)
  const rafRef = useRef<number>(0)

  const animateScramble = useCallback((targetIndex: number) => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    const target = PHRASES[targetIndex]
    const startTime = performance.now()
    const duration = 800

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(scramble(target, eased))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(target)
        isAnimatingRef.current = false
      }
    }

    rafRef.current = requestAnimationFrame(step)
  }, [])

  const handleClick = useCallback(() => {
    const next = (currentIndex + 1) % PHRASES.length
    setCurrentIndex(next)
    animateScramble(next)
  }, [currentIndex, animateScramble])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="h-12 flex items-center">
        <span className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {display}
        </span>
      </div>
      <button
        onClick={handleClick}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
      >
        Scramble
      </button>
    </div>
  )
}
