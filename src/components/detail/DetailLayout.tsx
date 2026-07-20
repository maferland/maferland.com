import Link from 'next/link'
import { ReactNode } from 'react'
import { LinkButton } from '@/components/ui/LinkButton'

interface DetailLink {
  href: string
  label: string
}

interface DetailMetaItem {
  label: string
  value: ReactNode
}

interface DetailLayoutProps {
  actions?: DetailLink[]
  backHref: string
  backLabel: string
  children: ReactNode
  description?: string
  eyebrow: string
  meta: DetailMetaItem[]
  metaTitle: string
  subtitle: string
  title: string
}

export function DetailLayout({
  actions,
  backHref,
  backLabel,
  children,
  description,
  eyebrow,
  meta,
  metaTitle,
  subtitle,
  title,
}: DetailLayoutProps) {
  return (
    <article className="site-container py-[56px]">
      <Link
        className="mono mb-8 inline-flex items-center gap-2 text-xs leading-none text-[var(--muted)] no-underline transition-colors hover:text-[var(--accent)]"
        href={backHref}
      >
        <span aria-hidden="true">←</span>
        <span>{backLabel}</span>
      </Link>

      <header className="grid grid-cols-[minmax(0,1fr)_300px] gap-8 max-md:grid-cols-1">
        <div>
          <div className="mono mb-4 text-[11.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
            {eyebrow}
          </div>
          <h1 className="max-w-[760px] text-[54px] font-bold leading-[1.02] tracking-[-0.04em] max-sm:text-[36px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[680px] text-xl leading-[1.5] text-[var(--body)] max-sm:text-lg">
            {subtitle}
          </p>
          {description && (
            <p className="mt-5 max-w-[680px] text-[15px] leading-[1.7] text-[var(--muted)]">
              {description}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((action, index) => (
                <LinkButton
                  href={action.href}
                  key={action.href}
                  variant={index === 0 ? 'primary' : 'ghost'}
                >
                  {action.label}
                </LinkButton>
              ))}
            </div>
          )}
        </div>

        <aside className="panel h-fit overflow-hidden">
          <div className="h-10 border-b border-[var(--line)] bg-[repeating-linear-gradient(135deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)]" />
          <div className="p-5">
            <div className="mono mb-5 text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
              {metaTitle}
            </div>
            <dl className="divide-y divide-[var(--line)]">
              {meta.map(item => (
                <div
                  className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-3 first:pt-0 last:pb-0"
                  key={item.label}
                >
                  <dt className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--faint)]">
                    {item.label}
                  </dt>
                  <dd className="min-w-0 text-sm leading-5 text-[var(--body)]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </header>

      <div className="mt-12">
        <div className="panel px-6 py-5 [&_h2:first-child]:mt-0 sm:px-7 sm:py-6">
          {children}
        </div>
      </div>
    </article>
  )
}
