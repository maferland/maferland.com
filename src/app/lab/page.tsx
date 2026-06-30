import type { Metadata } from 'next'
import { getBets } from '@/lib/bets'
import BetsList from '@/components/bets/BetsList'

export const metadata: Metadata = {
  title: 'Lab | Marc-Antoine Ferland',
  description: "Ideas I'm exploring, building, parking, or killing.",
}

export default async function LabPage() {
  const bets = await getBets()

  return (
    <div className="site-container py-[60px]">
      <header className="mb-10">
        <div className="mono mb-4 text-[11.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
          ~/lab
        </div>
        <h1 className="text-[44px] font-bold leading-[1.05] tracking-[-0.03em] max-sm:text-[34px]">
          Ideas, alive and otherwise.
        </h1>
        <p className="mt-4 max-w-[640px] text-[17px] leading-7 text-[var(--body)]">
          Ideas I&apos;m exploring, building, parking, or killing. Most die at
          the research gate. I log them all.
        </p>
      </header>

      <BetsList bets={bets} />
    </div>
  )
}
