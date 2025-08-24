'use client'

import { Heart } from 'lucide-react'
import Link from '@/components/ui/Link'
import { socialLinks, techStack } from '@/lib/social-links'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Left: Copyright and attribution */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} Marc-Antoine Ferland
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
              Built with <Heart size={12} className="text-red-500" /> using
              Next.js, TypeScript & Claude Code
            </p>
          </div>

          {/* Right: Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(link => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Bottom: Tech stack */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500 dark:text-slate-500">
            {techStack.map(tech => (
              <span
                key={tech}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
