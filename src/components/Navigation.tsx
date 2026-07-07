'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { LinkButton } from '@/components/ui/LinkButton'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/use-click-outside'
import { BrandMark } from './BrandMark'

const links = [
  { href: '/', label: 'home' },
  { href: '/#work', label: 'work' },
  { href: '/playground', label: 'playground' },
  { href: '/writing', label: 'writing' },
  { href: '/lab', label: 'lab' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close menu when clicking outside
  useClickOutside(navRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen)

  return (
    <nav ref={navRef} className="site-container py-[15px]">
      <div className="flex items-center justify-between gap-4 max-[680px]:flex-wrap">
        <Link className="flex items-center gap-2.5 no-underline" href="/">
          <BrandMark className="h-7 w-7" />
          <span className="mono text-sm font-semibold tracking-[-0.01em] text-[var(--text)]">
            maferland
          </span>
        </Link>

        <div className="hidden items-center gap-2.5 sm:flex">
          <div className="mono mr-2 flex items-center gap-[22px] text-[13px]">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-[var(--text)]',
                  (link.href === '/' && pathname === '/') ||
                    (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--muted)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <LinkButton href="mailto:me@maferland.com" size="small">
            Get in touch →
          </LinkButton>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative rounded-lg border border-[var(--line)] p-2 text-[var(--text)] transition-colors"
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
              className="absolute left-0 right-0 top-full z-50 border-t border-[var(--line)] bg-[var(--bg)] shadow-lg"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="site-container space-y-2 py-4">
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
                      className={cn(
                        'mono block rounded-lg px-3 py-3 text-base transition-colors',
                        pathname === link.href
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'text-[var(--muted)] hover:text-[var(--text)]'
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
