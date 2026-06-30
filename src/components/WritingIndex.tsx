import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import type { BlogPost } from '@/components/blog/BlogPost.types'

function groupPostsByYear(posts: BlogPost[]) {
  return posts.reduce<Record<string, BlogPost[]>>((groups, post) => {
    const year = new Date(post.date).getFullYear().toString()
    return {
      ...groups,
      [year]: [...(groups[year] ?? []), post],
    }
  }, {})
}

export default async function WritingIndex() {
  const posts = await getPosts('src/content/blog')
  const archivePosts = await getPosts('src/content/archive')
  const [featuredPost, ...remainingPosts] = posts
  const groupedPosts = groupPostsByYear([...remainingPosts, ...archivePosts])
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))

  return (
    <div>
      <header className="site-container-narrow py-[60px] pb-[30px]">
        <div className="mono mb-4 text-[11.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
          ~/writing
        </div>
        <h1 className="text-[44px] font-bold leading-[1.05] tracking-[-0.03em] max-sm:text-[34px]">
          Things worth writing down.
        </h1>
        <p className="mt-4 text-[17px] leading-7 text-[var(--body)]">
          Notes on frontend craft, developer tools, and the occasional rabbit
          hole that kept being useful.
        </p>
      </header>

      {featuredPost ? (
        <section className="site-container-narrow py-4">
          <Link
            className="panel panel-hover grid overflow-hidden text-inherit no-underline sm:grid-cols-[1.1fr_.9fr]"
            href={`/blog/${featuredPost.slug}`}
          >
            <div className="p-6">
              <span className="tag border-[var(--accent)] text-[var(--accent)]">
                featured
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em]">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {featuredPost.excerpt}
              </p>
              <span className="mono mt-5 inline-flex text-xs text-[var(--accent)]">
                read ↗
              </span>
            </div>
            <div className="stripe-header h-full min-h-[190px]" />
          </Link>
        </section>
      ) : null}

      <section className="site-container-narrow py-[14px]">
        {years.map(year => (
          <div className="writing-year" key={year}>
            <div className="section-label mb-1">
              <span>{year}</span>
            </div>
            {groupedPosts[year].map(post => {
              const isArchive = archivePosts.some(
                archivePost => archivePost.slug === post.slug
              )
              return (
                <Link
                  className="writing-row"
                  href={`${isArchive ? '/archive' : '/blog'}/${post.slug}`}
                  key={`${isArchive ? 'archive' : 'blog'}-${post.slug}`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold">{post.title}</h2>
                      {post.tags?.[0] ? (
                        <span className="tag">{post.tags[0]}</span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[13px] leading-5 text-[var(--muted)]">
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="mono text-xs text-[var(--accent)]">↗</span>
                </Link>
              )
            })}
          </div>
        ))}
      </section>

      <footer className="site-container-narrow pb-16 pt-6">
        <p className="mono text-xs text-[var(--muted)]">
          Posts show up here when there is something worth keeping.
        </p>
      </footer>
    </div>
  )
}
