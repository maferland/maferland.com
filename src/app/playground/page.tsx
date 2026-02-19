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
