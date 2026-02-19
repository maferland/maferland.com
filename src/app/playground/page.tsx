import type { Metadata } from 'next'
import InteractiveTypography from '@/components/playground/InteractiveTypography'
import DemoCard from '@/components/playground/DemoCard'
import SpringReorder from '@/components/playground/SpringReorder'
import MagneticButtons from '@/components/playground/MagneticButtons'

export const metadata: Metadata = {
  title: 'Playground | Marc-Antoine Ferland',
  description:
    'Exploring interaction, motion, and the space between design and code.',
}

export default function PlaygroundPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-12">
        <InteractiveTypography />
      </div>

      <header className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Playground
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Exploring interaction, motion, and the space between design and code.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DemoCard
          title="Spring Reorder"
          description="Drag items to reorder with spring physics"
        >
          <SpringReorder />
        </DemoCard>
        <DemoCard
          title="Magnetic Buttons"
          description="Buttons that pull toward your cursor with parallax depth"
        >
          <MagneticButtons />
        </DemoCard>
        {/* More demos — Tasks 5-9 */}
      </div>
    </div>
  )
}
