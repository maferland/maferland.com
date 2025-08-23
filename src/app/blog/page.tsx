import { promises as fs } from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'

interface BlogPost {
  title: string
  date: string
  excerpt: string
  tags: string[]
  slug: string
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const contentDir = path.join(process.cwd(), 'src/content/blog')
    const files = await fs.readdir(contentDir)

    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const filePath = path.join(contentDir, file)
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

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Blog
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            Thoughts on frontend engineering, developer experience, and building
            systems that scale.
          </p>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map(post => {
                const formattedDate = new Date(post.date).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article className="space-y-4 p-6 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 cursor-pointer group">
                      <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <time dateTime={post.date}>{formattedDate}</time>
                          {post.tags && (
                            <div className="flex gap-2">
                              {post.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        Read more →
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                Blog posts coming soon...
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                In the meantime, check out{' '}
                <a
                  href="https://v2.maferland.com/blog"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  my previous writing
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
