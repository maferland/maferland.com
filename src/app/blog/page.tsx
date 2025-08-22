import { getPosts } from '@/lib/posts'
import PostList from '@/components/blog/PostList'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getPosts('src/content/blog')

  const emptyStateMessage = (
    <div className="space-y-4">
      <p className="text-slate-500 dark:text-slate-400">
        Blog posts coming soon...
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500">
        In the meantime, check out{' '}
        <Link
          href="/archive"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          my archive
        </Link>{' '}
        or{' '}
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
  )

  return (
    <div>
      <PostList
        title="Blog"
        description="Thoughts on frontend engineering, developer experience, and building systems that scale."
        posts={posts}
        basePath="/blog"
        emptyStateMessage={emptyStateMessage}
      />

      <div className="max-w-4xl mx-auto px-8 py-8 border-t border-slate-200 dark:border-slate-700">
        <p className="text-center text-sm text-slate-400 dark:text-slate-500">
          Check out{' '}
          <Link
            href="/archive"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            my archive
          </Link>{' '}
          for my previous writing
        </p>
      </div>
    </div>
  )
}
