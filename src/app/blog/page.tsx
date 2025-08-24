import PostList from '@/components/blog/PostList'
import { getPosts } from '@/lib/posts'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getPosts('src/content/blog')
  console.log({ posts })

  return (
    <div>
      <PostList
        title="Blog"
        description="Thoughts on frontend engineering, developer experience, and building systems that scale."
        posts={posts}
        basePath="/blog"
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
