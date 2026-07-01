'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/theme-provider'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--panel)] text-[15px] leading-none text-[var(--muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--text)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        ◑
      </motion.div>
    </motion.button>
  )
}
