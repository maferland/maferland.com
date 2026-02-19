'use client'

import { cn } from '@/lib/utils'

interface DemoCardProps {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

export default function DemoCard({
  title,
  description,
  children,
  className,
}: DemoCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden',
        className
      )}
    >
      <div className="aspect-square flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50">
        {children}
      </div>
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
        <h3 className="font-medium text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  )
}
