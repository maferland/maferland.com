'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from '@/components/ui/Link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/use-click-outside'

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close menu when clicking outside
  useClickOutside(navRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen)

  return (
    <nav
      ref={navRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="font-medium text-base sm:text-lg">
          Marc-Antoine Ferland
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4 md:gap-8">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                variant={pathname === link.href ? 'default' : 'subtle'}
                className={cn(
                  'px-3 py-2 rounded-lg transition-all duration-200',
                  pathname === link.href
                    ? 'font-medium bg-slate-100 dark:bg-slate-800'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden items-center gap-3">
          <ThemeToggle />
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="x"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="absolute left-0 right-0 top-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg z-50"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="max-w-4xl mx-auto px-4 py-4 space-y-2">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: 'easeOut',
                    }}
                  >
                    <Link
                      href={link.href}
                      variant={pathname === link.href ? 'default' : 'subtle'}
                      className={cn(
                        'block px-3 py-3 rounded-lg transition-all duration-200 text-base',
                        pathname === link.href
                          ? 'font-medium bg-slate-100 dark:bg-slate-800'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
