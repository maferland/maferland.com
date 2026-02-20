'use client'

const phrases = [
  'interaction design',
  'spring physics',
  'micro-interactions',
  'layout animation',
  'gesture handling',
  'motion curves',
  'pixel perfect',
  'design systems',
  'craft',
  'canvas',
]

const SEPARATOR = ' · '

function MarqueeRow({
  direction,
  speed,
}: {
  direction: 'left' | 'right'
  speed: number
}) {
  const text = phrases.join(SEPARATOR) + SEPARATOR

  return (
    <div className="flex overflow-hidden select-none">
      <div
        className={
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        }
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="whitespace-nowrap text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
          {text}
        </span>
        <span className="whitespace-nowrap text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
          {text}
        </span>
      </div>
    </div>
  )
}

export default function InteractiveTypography() {
  return (
    <div className="relative overflow-hidden py-8 sm:py-12 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="space-y-4 sm:space-y-6">
        <MarqueeRow direction="left" speed={40} />
        <MarqueeRow direction="right" speed={45} />
      </div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none" />
    </div>
  )
}
