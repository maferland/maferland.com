import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'

export type BetStatus =
  | 'researching'
  | 'promising'
  | 'building'
  | 'live'
  | 'killed'
  | 'parked'

export interface Bet {
  slug: string
  name: string
  date: string
  updated?: string
  oneLiner: string
  status: BetStatus
  wedge?: string
  repo?: string
  site?: string
  tags?: string[]
  spentUsd?: number
  mrrUsd?: number
  revenueUsd?: number
}

function toNumber(value: unknown): number | undefined {
  return typeof value === 'number' ? value : undefined
}

const CONTENT_DIR = 'src/content/bets'

// Map the Foundry ledger frontmatter (snake_case) onto the Bet shape.
function toBet(frontmatter: Record<string, unknown>, slug: string): Bet {
  return {
    slug,
    name: String(frontmatter.name ?? slug),
    date: String(frontmatter.date ?? ''),
    updated: frontmatter.updated ? String(frontmatter.updated) : undefined,
    oneLiner: String(frontmatter.one_liner ?? frontmatter.oneLiner ?? ''),
    status: (frontmatter.status as BetStatus) ?? 'researching',
    wedge: frontmatter.wedge ? String(frontmatter.wedge) : undefined,
    repo: frontmatter.repo ? String(frontmatter.repo) : undefined,
    site: frontmatter.site ? String(frontmatter.site) : undefined,
    tags: Array.isArray(frontmatter.tags)
      ? (frontmatter.tags as string[])
      : undefined,
    spentUsd: toNumber(frontmatter.spent_usd),
    mrrUsd: toNumber(frontmatter.mrr_usd),
    revenueUsd: toNumber(frontmatter.revenue_usd),
  }
}

// Only records explicitly flagged public: true are rendered.
function isPublic(frontmatter: Record<string, unknown>): boolean {
  return frontmatter.public === true
}

export async function getBets(): Promise<Bet[]> {
  try {
    const fullPath = path.join(process.cwd(), CONTENT_DIR)
    const files = await fs.readdir(fullPath)

    const bets = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const fileContent = await fs.readFile(
            path.join(fullPath, file),
            'utf8'
          )
          const { data } = matter(fileContent)
          if (!isPublic(data)) return null
          return toBet(data, file.replace('.mdx', ''))
        })
    )

    return bets
      .filter((bet): bet is Bet => bet !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export async function getBet(slug: string) {
  try {
    const filePath = path.join(process.cwd(), CONTENT_DIR, `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    if (!isPublic(data)) return null
    return { bet: toBet(data, slug), content }
  } catch {
    return null
  }
}
