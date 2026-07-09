'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/lib/theme-provider'
import { usePathname } from 'next/navigation'

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/snip') {
    return <>{children}</>
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col">
        <header className="relative">
          <Navigation />
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
