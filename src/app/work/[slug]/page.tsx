import { notFound } from 'next/navigation'
import { WorkCaseStudyLayout } from '@/components/work/WorkCaseStudyLayout'
import { getWorkCaseStudies, getWorkCaseStudy } from '@/lib/work'

export async function generateStaticParams() {
  const studies = await getWorkCaseStudies()
  return studies.map(study => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getWorkCaseStudy(slug)

  if (!result) {
    return { title: 'Work Not Found' }
  }

  return {
    title: `${result.work.name} | Selected Work`,
    description: result.work.description,
    openGraph: {
      title: result.work.name,
      description: result.work.description,
      type: 'article' as const,
    },
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getWorkCaseStudy(slug)

  if (!result) {
    notFound()
  }

  return <WorkCaseStudyLayout content={result.content} work={result.work} />
}
