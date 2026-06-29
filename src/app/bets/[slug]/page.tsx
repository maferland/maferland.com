import { notFound } from 'next/navigation'
import { getBet, getBets } from '@/lib/bets'
import BetLayout from '@/components/bets/BetLayout'

export async function generateStaticParams() {
  const bets = await getBets()
  return bets.map(bet => ({ slug: bet.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getBet(slug)
  if (!result) return { title: 'Not Found' }
  return {
    title: `${result.bet.name} | Bets`,
    description: result.bet.oneLiner,
    openGraph: {
      title: result.bet.name,
      description: result.bet.oneLiner,
      type: 'article' as const,
    },
  }
}

export default async function BetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getBet(slug)

  if (!result) {
    notFound()
  }

  return <BetLayout bet={result.bet} content={result.content} />
}
