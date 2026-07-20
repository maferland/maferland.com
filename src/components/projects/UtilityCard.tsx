'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface UtilityCardProps {
  title: string
  tagline: string
  icon: ReactNode
  techStack: string[]
  liveUrl?: string
  githubUrl: string
}

export default function UtilityCard({
  title,
  tagline,
  icon,
  techStack,
  liveUrl,
  githubUrl,
}: UtilityCardProps) {
  return (
    <motion.a
      href={liveUrl ?? githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-5 flex flex-col gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors duration-200">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
        />
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {techStack.map(tech => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
