'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/ui/Link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="max-w-4xl mx-auto px-8 py-6">
      <div className="flex items-center justify-between">
        <Link 
          href="/" 
          className="font-medium text-lg"
        >
          Marc-Antoine Ferland
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8">
            {links.map((link) => (
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
      </div>
    </nav>
  )
}