import MDXRenderer from '@/app/blog/[slug]/MDXRenderer'
import '@/app/blog/[slug]/syntax-highlighting.css'
import { DetailLayout } from '@/components/detail/DetailLayout'
import type { WorkCaseStudy } from '@/lib/work'

export function WorkCaseStudyLayout({
  content,
  work,
}: {
  content: string
  work: WorkCaseStudy
}) {
  const meta = [
    ['Role', work.role],
    ['Platform', work.platform],
    ['Status', work.status],
    [
      'Stack',
      <span className="flex flex-wrap gap-1.5" key="stack">
        {work.tech.map(tech => (
          <span className="tag" key={tech}>
            {tech}
          </span>
        ))}
      </span>,
    ],
  ].map(([label, value]) => ({
    label: String(label),
    value,
  }))

  return (
    <DetailLayout
      actions={work.links}
      backHref="/#work"
      backLabel="selected work"
      description={work.description}
      eyebrow={`${work.platform} · ${work.status}`}
      meta={meta}
      metaTitle="Project notes"
      subtitle={work.subtitle}
      title={work.name}
    >
      <MDXRenderer source={content} />
    </DetailLayout>
  )
}
