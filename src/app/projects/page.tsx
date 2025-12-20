import type { Metadata } from 'next'
import { Footprints, ShieldCheck } from 'lucide-react'
import ProjectHeroCard from '@/components/projects/ProjectHeroCard'

export const metadata: Metadata = {
  title: 'Projects | Marc-Antoine Ferland',
  description: 'Side projects and open source work',
}

const projects = [
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
    title: 'CleanCopy',
    tagline: 'Strips tracking params from your clipboard',
    description:
      'A macOS menu bar app that automatically removes tracking parameters from URLs when you copy them. No manual action required - just copy links normally and get clean URLs.',
    icon: (
      <ShieldCheck className="w-6 h-6 text-slate-700 dark:text-slate-300" />
    ),
    techStack: ['Swift', 'macOS'],
    githubUrl: 'https://github.com/maferland/clean-copy',
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
        {projects.map(project => (
          <ProjectHeroCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  )
}
