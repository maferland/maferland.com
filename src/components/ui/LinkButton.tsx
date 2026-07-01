import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variantClassNames = {
  primary: 'button-primary',
  ghost: 'button-ghost',
} as const

const sizeClassNames = {
  default: '',
  small: '!rounded-lg !px-3.5 !py-2 text-[13px]',
} as const

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  size?: keyof typeof sizeClassNames
  variant?: keyof typeof variantClassNames
}

export const LinkButton = ({
  children,
  className,
  size = 'default',
  variant = 'primary',
  ...props
}: LinkButtonProps) => (
  <a
    className={cn(variantClassNames[variant], sizeClassNames[size], className)}
    {...props}
  >
    {children}
  </a>
)
