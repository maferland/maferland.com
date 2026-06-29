import type { Metadata } from 'next'
import { getBets } from '@/lib/bets'
import { STATUS } from '@/components/bets/status'
import BetCard from '@/components/bets/BetCard'

export const metadata: Metadata = {
  title: 'Bets | Marc-Antoine Ferland',
  description:
    'Startups I am betting on, and the ones that died trying. Research, a hard kill-gate, and an honest log of every attempt.',
}

export default async function BetsPage() {
  const bets = await getBets()
  const alive = bets.filter(bet => STATUS[bet.status].alive)
  const dead = bets.filter(bet => !STATUS[bet.status].alive)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Bets
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Startups I am betting on, and the ones that died trying. Each idea
          gets deep market research and a hard kill-gate before it earns a
          single line of code. Most do not survive that gate — and that is the
          point. I log every attempt here, alive or dead, betting that enough
          swings land one real win.
        </p>
      </header>

      {alive.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-5">
            Alive
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alive.map(bet => (
              <BetCard key={bet.slug} bet={bet} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Graveyard
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-5">
          Ideas that did not make it, and the honest reason why.
        </p>
        {dead.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dead.map(bet => (
              <BetCard key={bet.slug} bet={bet} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 italic">
            Empty, for now. Give it time.
          </p>
        )}
      </section>
    </div>
  )
}
