import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MDXRenderer from './MDXRenderer'
import './syntax-highlighting.css'

interface BlogPost {
  title: string
  date: string
  excerpt: string
  tags: string[]
}

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)
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

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content/blog')

  try {
    const files = await fs.readdir(contentDir)
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace('.mdx', ''),
      }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <article className="max-w-4xl mx-auto px-8 py-16">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-slate-100">
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 mb-6">
          <time dateTime={post.frontmatter.date}>{formattedDate}</time>
          {post.frontmatter.tags && (
            <div className="flex gap-2">
              {post.frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {post.frontmatter.excerpt}
        </p>
      </header>

      <MDXRenderer source={post.content} />
    </article>
  )
}
