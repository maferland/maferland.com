'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ReactNode } from 'react'

interface ProjectHeroCardProps {
  title: string
  tagline: string
  description: string
  icon: ReactNode
  techStack: string[]
  liveUrl?: string
  githubUrl: string
}

export default function ProjectHeroCard({
  title,
  tagline,
  description,
  icon,
  techStack,
  liveUrl,
  githubUrl,
}: ProjectHeroCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/40 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors duration-300">
            {icon}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              {tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg max-w-2xl">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors"
            >
              View Project
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
          >
            GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
