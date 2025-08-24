import Image from 'next/image'
import { ReactNode } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  href: string
  icon: ReactNode
  className?: string
}

export function ProjectCard({
  title,
  description,
  href,
  icon,
  className = '',
}: ProjectCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 hover:-translate-y-1 flex flex-col ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed flex-1">
          {description}
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group/link transition-colors duration-200 mt-auto"
        >
          <span>Explore</span>
          <svg
            className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export function GitHubCard() {
  return (
    <ProjectCard
      title="GitHub Repository"
      description="Explore the complete codebase, including all the components, utilities, and patterns we built together."
      href="https://github.com/maferland/maferland.com"
      icon={
        <svg
          className="w-5 h-5 text-slate-700 dark:text-slate-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      }
    />
  )
}

export function StorybookCard() {
  return (
    <ProjectCard
      title="Storybook Component Library"
      description="Interactive documentation of all UI components with examples and usage guidelines."
      href="https://main--68a89824f9be1c1eb5ed584a.chromatic.com"
      icon={
        <Image
          src="/images/storybook.png"
          alt="Storybook Icon"
          className="w-5 h-5"
          width={20}
          height={20}
        />
      }
      className="border-pink-200/50 dark:border-pink-800/50"
    />
  )
}
