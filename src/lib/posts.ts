import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import type { BlogPost } from '@/components/blog/BlogPost.types'

export async function getPosts(contentDir: string): Promise<BlogPost[]> {
  try {
    const fullPath = path.join(process.cwd(), contentDir)
    const files = await fs.readdir(fullPath)

    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const filePath = path.join(fullPath, file)
          const fileContent = await fs.readFile(filePath, 'utf8')
          const { data: frontmatter } = matter(fileContent)

          return {
            ...frontmatter,
            slug: file.replace('.mdx', ''),
          } as BlogPost
        })
    )

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch {
    return []
  }
}

export async function getPost(contentDir: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), contentDir, `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')

    const { data: frontmatter, content } = matter(fileContent)

    return {
      content,
      frontmatter: frontmatter as BlogPost,
      slug,
    }
  } catch {
    return null
  }
}
