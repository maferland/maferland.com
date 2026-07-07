import Link from 'next/link'
import MDXRenderer from '@/app/blog/[slug]/MDXRenderer'
import '@/app/blog/[slug]/syntax-highlighting.css'
import { LinkButton } from '@/components/ui/LinkButton'
import type { WorkCaseStudy } from '@/lib/work'

export function WorkCaseStudyLayout({
  content,
  work,
}: {
  content: string
  work: WorkCaseStudy
}) {
  return (
    <article className="site-container py-[56px]">
      <Link
        className="mono mb-8 inline-flex text-xs text-[var(--muted)] no-underline transition-colors hover:text-[var(--accent)]"
        href="/#work"
      >
        ← selected work
      </Link>

      <header className="grid grid-cols-[minmax(0,1fr)_280px] gap-8 max-md:grid-cols-1">
        <div>
          <div className="mono mb-4 text-[11.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
            {work.platform} · {work.status}
          </div>
          <h1 className="max-w-[760px] text-[54px] font-bold leading-[1.02] tracking-[-0.04em] max-sm:text-[36px]">
            {work.name}
          </h1>
          <p className="mt-4 max-w-[680px] text-xl leading-[1.5] text-[var(--body)] max-sm:text-lg">
            {work.subtitle}
          </p>
          <p className="mt-5 max-w-[680px] text-[15px] leading-[1.7] text-[var(--muted)]">
            {work.description}
          </p>
          {work.links && work.links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {work.links.map((link, index) => (
                <LinkButton
                  href={link.href}
                  key={link.href}
                  variant={index === 0 ? 'primary' : 'ghost'}
                >
                  {link.label}
                </LinkButton>
              ))}
            </div>
          )}
        </div>

        <aside className="panel h-fit p-5">
          <dl className="space-y-5">
            {[
              ['Role', work.role],
              ['Platform', work.platform],
              ['Status', work.status],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--faint)]">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-[var(--body)]">{value}</dd>
              </div>
            ))}
            <div>
              <dt className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--faint)]">
                Stack
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {work.tech.map(tech => (
                  <span className="tag" key={tech}>
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </header>

      <div className="mt-12 grid grid-cols-[minmax(0,760px)_1fr] gap-8 max-lg:block">
        <div className="panel p-6 sm:p-8">
          <MDXRenderer source={content} />
        </div>
      </div>
    </article>
  )
}
