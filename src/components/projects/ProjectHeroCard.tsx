'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode } from 'react'
import ButtonLink from '@/components/ui/ButtonLink'

interface ProjectHeroCardProps {
  title: string
  tagline: string
  description: string
  icon: ReactNode
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
}

const springConfig = { stiffness: 300, damping: 30 }

export default function ProjectHeroCard({
  title,
  tagline,
  description,
  icon,
  techStack,
  liveUrl,
  githubUrl,
}: ProjectHeroCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-8, 8])
  const glareX = useTransform(springX, [0, 1], [0, 100])
  const glareY = useTransform(springY, [0, 1], [0, 100])

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="perspective-[800px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 sm:p-8"
      >
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15), transparent 60%)`
            ),
          }}
        />

        <div
          className="relative space-y-4"
          style={{ transform: 'translateZ(20px)' }}
        >
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
          <div className="flex flex-wrap gap-3 pt-2">
            {liveUrl && <ButtonLink href={liveUrl}>View Project</ButtonLink>}
            {githubUrl && <ButtonLink href={githubUrl}>GitHub</ButtonLink>}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
