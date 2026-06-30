import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/lib/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google'
import './globals.css'

const schibsted = Schibsted_Grotesk({
  display: 'swap',
  variable: '--font-schibsted',
  subsets: ['latin'],
})

const jetbrains = JetBrains_Mono({
  display: 'swap',
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Marc-Antoine Ferland',
  description:
    'Frontend engineer building web, iOS, macOS, and AI-adjacent tools.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme')
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                const theme = stored || 'system'
                
                if (theme === 'dark' || (theme === 'system' && prefersDark)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${schibsted.variable} ${jetbrains.variable}`}>
        <ThemeProvider>
          <div className="site-shell flex flex-col">
            <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)] transition-colors duration-300">
              <Navigation />
            </header>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
