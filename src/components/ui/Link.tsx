import NextLink from 'next/link'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const base = 'relative transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent'

const variants = {
  default: 'text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300',
  subtle: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100',
  accent: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2'
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
      className={cn(
        base, 
        variants[variant], 
        'group inline-flex items-center',
        className
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
      </span>
    </NextLink>
  )
}