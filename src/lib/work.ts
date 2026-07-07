import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface WorkLink {
  href: string
  label: string
}

export interface WorkCaseStudy {
  description: string
  links?: WorkLink[]
  name: string
  order: number
  platform: string
  role: string
  slug: string
  status: string
  subtitle: string
  tech: string[]
}

export interface WorkCaseStudyResult {
  content: string
  work: WorkCaseStudy
}

const contentDir = 'src/content/work'

export async function getWorkCaseStudies(): Promise<WorkCaseStudy[]> {
  const fullPath = path.join(process.cwd(), contentDir)
  const files = await fs.readdir(fullPath)

  const studies = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async file => {
        const filePath = path.join(fullPath, file)
        const fileContent = await fs.readFile(filePath, 'utf8')
        const { data } = matter(fileContent)

        return {
          ...data,
          slug: file.replace('.mdx', ''),
        } as WorkCaseStudy
      })
  )

  return studies.sort((a, b) => a.order - b.order)
}

export async function getWorkCaseStudy(
  slug: string
): Promise<WorkCaseStudyResult | null> {
  try {
    const filePath = path.join(process.cwd(), contentDir, `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { content, data } = matter(fileContent)

    return {
      content,
      work: {
        ...data,
        slug,
      } as WorkCaseStudy,
    }
  } catch {
    return null
  }
}
