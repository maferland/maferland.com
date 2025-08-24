import { ComponentProps } from 'react'

interface MDXLinkProps extends ComponentProps<'a'> {
  href?: string
}

export default function MDXLink({ href, children, ...props }: MDXLinkProps) {
  return (
    <a
      href={href || '#'}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}
