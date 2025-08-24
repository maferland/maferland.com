import type { BlogPost } from './BlogPost.types'
import PostCard from './PostCard'
import type { ReactNode } from 'react'

interface PostListProps {
  title: string
  description: string
  posts: BlogPost[]
  basePath: string
  emptyStateMessage?: ReactNode
}

export default function PostList({
  title,
  description,
  posts,
  basePath,
  emptyStateMessage = 'No posts found.',
}: PostListProps) {
  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            {description}
          </p>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map(post => (
                <PostCard key={post.slug} post={post} basePath={basePath} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              {typeof emptyStateMessage === 'string' ? (
                <p className="text-slate-500 dark:text-slate-400">
                  {emptyStateMessage}
                </p>
              ) : (
                emptyStateMessage
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
