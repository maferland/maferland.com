import PostMeta from './PostMeta'
import MDXRenderer from '../../app/blog/[slug]/MDXRenderer'
import type { BlogPost } from './BlogPost.types'

interface PostLayoutProps {
  frontmatter: BlogPost
  content: string
}

export default function PostLayout({ frontmatter, content }: PostLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto px-8 py-16">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-slate-100">
          {frontmatter.title}
        </h1>
        <div className="mb-6">
          <PostMeta date={frontmatter.date} tags={frontmatter.tags} />
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {frontmatter.excerpt}
        </p>
      </header>

      <MDXRenderer source={content} />
    </article>
  )
}
