import Link from 'next/link'
import type { BlogPost } from './BlogPost.types'
import PostMeta from './PostMeta'

interface PostCardProps {
  post: BlogPost
  basePath: string // "/blog" or "/archive"
}

export default function PostCard({ post, basePath }: PostCardProps) {
  return (
    <Link key={post.slug} href={`${basePath}/${post.slug}`}>
      <article className="space-y-4 p-4 sm:p-6 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 cursor-pointer group">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
          <PostMeta date={post.date} tags={post.tags} />
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
}
