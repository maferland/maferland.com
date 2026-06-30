import type { Metadata } from 'next'
import { getBets } from '@/lib/bets'
import BetsList from '@/components/bets/BetsList'

export const metadata: Metadata = {
  title: 'Lab | Marc-Antoine Ferland',
  description: "Startups I'm betting on, and the ones that didn't make it.",
}

export default async function LabPage() {
  const bets = await getBets()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Lab
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Startups I&apos;m betting on, and the ones that didn&apos;t make it.
          Most die at the research gate. I log them all.
        </p>
      </header>

      <BetsList bets={bets} />
    </div>
  )
}
