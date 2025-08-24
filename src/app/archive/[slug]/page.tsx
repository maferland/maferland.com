import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/posts'
import { generatePostMetadata } from '@/lib/metadata'
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
  return generatePostMetadata('src/content/archive', slug)
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
