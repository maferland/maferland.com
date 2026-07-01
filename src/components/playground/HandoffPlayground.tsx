'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import ElasticToggle from './ElasticToggle'
import MagneticButtons from './MagneticButtons'
import MorphingCards from './MorphingCards'
import NumberTicker from './NumberTicker'
import SpringReorder from './SpringReorder'
import TextScramble from './TextScramble'
import TiltCard from './TiltCard'
import WaveText from './WaveText'

function SpotlightTile() {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  return (
    <div
      className="h-[74px] rounded-xl border border-[var(--line)]"
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, var(--accent-soft), transparent 44%), var(--panel2)`,
      }}
      onMouseMove={event => {
        const rect = event.currentTarget.getBoundingClientRect()
        setPosition({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        })
      }}
    />
  )
}

function ColorMixerTile() {
  const [hue, setHue] = useState(150)

  return (
    <div className="flex h-[74px] items-center gap-4">
      <div
        className="h-12 w-12 rounded-xl border border-[var(--line)]"
        style={{ background: `oklch(.72 .16 ${hue})` }}
      />
      <input
        aria-label="Color hue"
        className="w-full"
        max="360"
        min="0"
        onChange={event => setHue(Number(event.target.value))}
        type="range"
        value={hue}
      />
    </div>
  )
}

function SpringSwitchTile() {
  const [enabled, setEnabled] = useState(false)

  return (
    <button
      aria-pressed={enabled}
      className="relative h-[34px] w-[66px] overflow-hidden rounded-full border border-[var(--line)] bg-[var(--panel2)]"
      onClick={() => setEnabled(!enabled)}
      type="button"
    >
      <span
        className="absolute left-[3px] top-[3px] h-7 w-7 rounded-full bg-[var(--accent)] transition-transform duration-[320ms]"
        style={{
          transform: `translateX(${enabled ? 32 : 0}px)`,
          transitionTimingFunction: 'cubic-bezier(.2,.9,.2,1)',
        }}
      />
    </button>
  )
}

function StepperTile() {
  const [count, setCount] = useState(3)

  return (
    <div className="flex h-[74px] items-center justify-center gap-4">
      <button
        className="h-9 w-9 rounded-lg border border-[var(--line)] text-lg active:scale-[.86]"
        onClick={() => setCount(count - 1)}
        type="button"
      >
        -
      </button>
      <span className="mono min-w-8 text-center text-2xl font-semibold">
        {count}
      </span>
      <button
        className="h-9 w-9 rounded-lg border border-[var(--line)] text-lg active:scale-[.86]"
        onClick={() => setCount(count + 1)}
        type="button"
      >
        +
      </button>
    </div>
  )
}

function EqualizerTile() {
  return (
    <div className="flex h-[74px] items-center justify-center gap-2">
      {Array.from({ length: 7 }, (_, index) => (
        <span
          className="h-12 w-2 origin-bottom rounded-full bg-[var(--accent)]"
          key={index}
          style={{
            animation: 'eq 1.1s ease-in-out infinite',
            animationDelay: `${index * 0.18}s`,
          }}
        />
      ))}
    </div>
  )
}

function OrbitTile() {
  return (
    <div className="flex h-[74px] items-center justify-center">
      <div
        className="relative h-16 w-16 rounded-full border border-[var(--line)]"
        style={{ animation: 'orbit 3s linear infinite' }}
      >
        <span className="absolute left-1/2 top-[-5px] h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
        <div
          className="absolute inset-2 rounded-full border border-[var(--line)]"
          style={{
            animation: 'orbit 5s linear infinite',
            animationDirection: 'reverse',
          }}
        >
          <span className="absolute bottom-[-5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--body)]" />
        </div>
      </div>
    </div>
  )
}

interface Tile {
  caption: string
  name: string
  tag: string
  tile: ReactNode
  size?: 'compact' | 'tall' | 'hero'
}

const tiles: Tile[] = [
  {
    caption: 'Radial gradient follows the cursor inside the tile.',
    name: 'spotlight',
    tag: 'onmousemove',
    tile: <SpotlightTile />,
  },
  {
    caption: 'Range input drives an OKLCH hue in real time.',
    name: 'oklch mixer',
    tag: 'range -> color',
    tile: <ColorMixerTile />,
  },
  {
    caption:
      'A fast curve keeps the switch feeling responsive without leaking.',
    name: 'spring switch',
    tag: 'cubic-bezier',
    tile: <SpringSwitchTile />,
  },
  {
    caption: 'Tiny state changes, visible enough to feel responsive.',
    name: 'stepper',
    tag: 'state',
    tile: <StepperTile />,
  },
  {
    caption: 'Seven bars loop with staggered animation delays.',
    name: 'equalizer',
    tag: '@keyframes',
    tile: <EqualizerTile />,
  },
  {
    caption: 'Two periods, opposite direction, one compact orbit.',
    name: 'orbit',
    tag: 'transform',
    tile: <OrbitTile />,
  },
  {
    caption: 'A second toggle with spring physics and state feedback.',
    name: 'elastic toggle',
    tag: 'spring',
    tile: <ElasticToggle />,
    size: 'tall',
  },
  {
    caption: 'Drag rows to reorder them; the list resolves with springs.',
    name: 'spring reorder',
    tag: 'drag',
    tile: <SpringReorder />,
    size: 'tall',
  },
  {
    caption: 'A card tilts under the cursor with a moving glare layer.',
    name: 'tilt card',
    tag: '3d',
    tile: <TiltCard />,
    size: 'hero',
  },
  {
    caption: 'Hover individual letters and they jump with spring motion.',
    name: 'wave text',
    tag: 'hover',
    tile: <WaveText />,
    size: 'tall',
  },
  {
    caption: 'Buttons pull toward the cursor with a bit of parallax depth.',
    name: 'magnetic buttons',
    tag: 'motion value',
    tile: <MagneticButtons />,
    size: 'tall',
  },
  {
    caption: 'Digits roll in place with spring transitions.',
    name: 'number ticker',
    tag: 'framer motion',
    tile: <NumberTicker />,
    size: 'tall',
  },
  {
    caption: 'Characters resolve from noise into the next phrase.',
    name: 'text scramble',
    tag: 'raf',
    tile: <TextScramble />,
    size: 'tall',
  },
  {
    caption: 'Click a tile and it expands into a focused detail state.',
    name: 'morphing cards',
    tag: 'layout',
    tile: <MorphingCards />,
    size: 'hero',
  },
]

export default function HandoffPlayground() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px]">
      {tiles.map(tile => (
        <article className="panel p-4" key={tile.name}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="mono text-[11px] font-medium text-[var(--text)]">
              {tile.name}
            </h2>
            <span className="mono text-[9.5px] text-[var(--faint)]">
              {tile.tag}
            </span>
          </div>
          <div
            className={
              tile.size === 'hero'
                ? 'flex min-h-[280px] items-center justify-center overflow-hidden'
                : tile.size === 'tall'
                  ? 'flex min-h-[168px] items-center justify-center overflow-hidden'
                  : ''
            }
          >
            {tile.tile}
          </div>
          <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
            {tile.caption}
          </p>
        </article>
      ))}
    </div>
  )
}
