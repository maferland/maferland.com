import type { Metadata } from 'next'
import HandoffPlayground from '@/components/playground/HandoffPlayground'

export const metadata: Metadata = {
  title: 'Playground | Marc-Antoine Ferland',
  description:
    'Exploring interaction, motion, and the space between design and code.',
}

export default function PlaygroundPage() {
  return (
    <div className="site-container py-[60px]">
      <header className="mb-10">
        <div className="mono mb-4 text-[11.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
          ~/playground
        </div>
        <h1 className="text-[44px] font-bold leading-[1.05] tracking-[-0.03em] max-sm:text-[34px]">
          Experiments in motion &amp; interaction.
        </h1>
        <p className="mt-4 max-w-[620px] text-[17px] leading-7 text-[var(--body)]">
          Small UI studies where the point is the feel: motion curves, cursor
          response, and tiny state changes.
        </p>
      </header>
      <HandoffPlayground />
    </div>
  )
}
