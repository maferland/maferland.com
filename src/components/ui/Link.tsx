import NextLink from 'next/link'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const base = 'transition-colors focus-visible:outline-2 focus-visible:outline-accent'

const variants = {
  default: 'text-foreground hover:text-foreground/70',
  subtle: 'text-foreground/60 hover:text-foreground/80',
  accent: 'text-accent hover:text-accent/80 underline underline-offset-2'
} as const

interface LinkProps extends ComponentProps<typeof NextLink> {
  variant?: keyof typeof variants
  className?: string
}

export default function Link({ 
  variant = 'default', 
  className, 
  children, 
  ...props 
}: LinkProps) {
  return (
    <NextLink 
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </NextLink>
  )
}