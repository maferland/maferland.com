import Image from 'next/image'
import MDXRenderer from '../../app/blog/[slug]/MDXRenderer'
import '../../app/blog/[slug]/syntax-highlighting.css'
import type { BlogPost } from './BlogPost.types'
import PostMeta from './PostMeta'

interface PostLayoutProps {
  frontmatter: BlogPost
  content: string
}

export default function PostLayout({ frontmatter, content }: PostLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-slate-100">
          {frontmatter.title}
        </h1>
        <div className="mb-6">
          <PostMeta date={frontmatter.date} tags={frontmatter.tags} />
        </div>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {frontmatter.excerpt}
        </p>
      </header>

      {frontmatter.heroImage && (
        <div style={{ width: '100%', height: 'auto', marginBottom: '25px' }}>
          <Image
            src={frontmatter.heroImage}
            alt={frontmatter.title}
            width={1200}
            height={800}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
      )}

      <MDXRenderer source={content} />
    </article>
  )
}
