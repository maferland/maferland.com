import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export default function ButtonLink({
  href,
  className,
  children,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group/link inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors',
        className
      )}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
      />
    </a>
  )
}
