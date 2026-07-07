'use client'

import { useEffect, useState } from 'react'

const phrases = [
  'products that ship.',
  "the 50ms you don't notice.",
  'small things, done right.',
]

export default function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [letterCount, setLetterCount] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [pauseTicks, setPauseTicks] = useState(0)

  useEffect(() => {
    const phrase = phrases[phraseIndex]
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && letterCount === phrase.length) {
          if (pauseTicks < 16) {
            setPauseTicks(pauseTicks + 1)
            return
          }
          setIsDeleting(true)
          setPauseTicks(0)
          return
        }

        if (isDeleting && letterCount === 0) {
          setIsDeleting(false)
          setPhraseIndex((phraseIndex + 1) % phrases.length)
          return
        }

        setLetterCount(letterCount + (isDeleting ? -1 : 1))
      },
      isDeleting ? 45 : 85
    )

    return () => window.clearTimeout(timeout)
  }, [isDeleting, letterCount, pauseTicks, phraseIndex])

  return <>{phrases[phraseIndex].slice(0, letterCount)}</>
}
