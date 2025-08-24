'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SocialLink from '@/components/ui/SocialLink'
import { socialLinks } from '@/lib/social-links'

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Hero() {
  return (
    <motion.div
      className="space-y-8 sm:space-y-12"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <AnimatedSection className="space-y-4 sm:space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
          Marc-Antoine Ferland
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Senior Frontend Engineer crafting delightful experiences and building
          systems that multiply team productivity
        </p>
      </AnimatedSection>

      {/* Bio */}
      <AnimatedSection className="space-y-6 sm:space-y-8 max-w-2xl" delay={0.2}>
        <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          After 10 years in this field, I&apos;ve discovered what I love most:
          being a{' '}
          <em className="text-slate-900 dark:text-slate-100">multiplier</em>. I
          build systems and tooling that supercharge teams and help ship
          pixel-perfect experiences without compromise.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          My journey started with dreams of video game development, took a
          detour through backend work, and led me to find the perfect balance of
          great UX and DX in frontend engineering.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          Beyond code, I find the same craft-focused mindset in cooking
          everything from scratch and pushing limits through long-distance
          running. I&apos;m exploring ways to extend my influence while staying
          ahead of AI&apos;s transformation of our field.
        </p>
      </AnimatedSection>

      {/* Social Links */}
      <AnimatedSection
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
        delay={0.4}
      >
        {socialLinks.map(link => (
          <SocialLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            external={link.external}
          />
        ))}
      </AnimatedSection>

      {/* Archive Link */}
      <AnimatedSection
        className="pt-12 sm:pt-16 border-t border-foreground/10"
        delay={0.6}
      >
        <p className="text-sm text-foreground/50">
          Looking for my previous writing?{' '}
          <motion.a
            href="https://v2.maferland.com/blog"
            className="inline-flex items-center gap-1 underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors"
            whileHover={{ x: 4 }}
          >
            Browse the archive
            <ArrowUpRight size={12} className="sm:size-[14px]" />
          </motion.a>
        </p>
      </AnimatedSection>
    </motion.div>
  )
}
