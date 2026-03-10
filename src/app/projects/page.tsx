import type { Metadata } from 'next'
import {
  Flame,
  Footprints,
  Images,
  Scissors,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import ProjectHeroCard from '@/components/projects/ProjectHeroCard'
import UtilityCard from '@/components/projects/UtilityCard'

export const metadata: Metadata = {
  title: 'Projects | Marc-Antoine Ferland',
  description: 'Side projects and open source work',
}

const featured = [
  {
    title: 'quebec.run',
    tagline: 'Quebec City running hub',
    description:
      'A community platform for runners in Quebec City to find clubs, discover events, and explore routes. Built to connect local runners and make it easier to find your next group run.',
    icon: <Footprints className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
    techStack: ['TypeScript', 'Next.js', 'React'],
    liveUrl: 'https://quebec.run',
  },
  {
    title: 'Differ',
    tagline: 'Pixel-level image comparison',
    description:
      'A desktop app for comparing images side-by-side with pixel-level diffing. Quickly spot visual differences between design iterations, screenshots, or any two images.',
    icon: <Images className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
    techStack: ['TypeScript', 'Electron'],
    githubUrl: 'https://github.com/maferland/differ',
  },
]

const aiTools = [
  {
    title: 'Burn',
    tagline:
      "Track Claude Code spending from the macOS menu bar. See today's cost at a glance with a 7-day chart and monthly totals.",
    icon: <Flame className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
    techStack: ['Swift', 'SwiftUI'],
    githubUrl: 'https://github.com/maferland/burn',
  },
]

const utilities = [
  {
    title: 'Snip',
    tagline:
      'Automatically strips tracking parameters from URLs when you copy them. No manual action required.',
    icon: <Scissors className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
    techStack: ['Swift', 'macOS'],
    githubUrl: 'https://github.com/maferland/snip',
  },
  {
    title: 'Tidy',
    tagline:
      'Automatically clean up messy clipboard text on macOS. Fixes formatting, whitespace, and other annoyances.',
    icon: <Sparkles className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
    techStack: ['Swift', 'macOS'],
    githubUrl: 'https://github.com/maferland/tidy',
  },
  {
    title: 'ClipShield',
    tagline:
      'Monitors your clipboard for sensitive data like passwords and API keys, then auto-clears it.',
    icon: (
      <ShieldAlert className="w-5 h-5 text-slate-700 dark:text-slate-300" />
    ),
    techStack: ['Swift', 'macOS'],
    githubUrl: 'https://github.com/maferland/clipshield',
  },
]

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Projects
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Side projects and open source work
        </p>
      </header>

      <div className="space-y-6">
        {featured.map(project => (
          <ProjectHeroCard key={project.title} {...project} />
        ))}
      </div>

      <section className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
          AI Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiTools.map(tool => (
            <UtilityCard key={tool.title} {...tool} />
          ))}
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
          macOS Utilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {utilities.map(util => (
            <UtilityCard key={util.title} {...util} />
          ))}
        </div>
      </section>
    </div>
  )
}
