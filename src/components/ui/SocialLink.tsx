'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialLinkProps {
  href: string
  icon: LucideIcon
  label: string
  external?: boolean
  className?: string
}

export default function SocialLink({
  href,
  icon: Icon,
  label,
  external = false,
  className,
}: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        'group relative flex items-center gap-3 px-6 py-3 rounded-xl',
        'border border-foreground/15 bg-background/50 backdrop-blur-sm',
        'hover:border-foreground/40 hover:bg-foreground/15 hover:shadow-lg hover:shadow-foreground/10',
        'transition-all duration-300 ease-out',
        className
      )}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
      {external && (
        <ArrowUpRight
          size={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </motion.a>
  )
}
