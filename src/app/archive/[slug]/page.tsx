import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/posts'
import PostLayout from '@/components/blog/PostLayout'
import '../../blog/[slug]/syntax-highlighting.css'

export async function generateStaticParams() {
  const posts = await getPosts('src/content/archive')
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost('src/content/archive', slug)

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

export default async function ArchivePostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost('src/content/archive', slug)

  if (!post) {
    notFound()
  }

  return <PostLayout frontmatter={post.frontmatter} content={post.content} />
}
