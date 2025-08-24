import PostLayout from '@/components/blog/PostLayout'
import { getPost, getPosts } from '@/lib/posts'
import { generatePostMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts('src/content/blog')
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
  return generatePostMetadata('src/content/blog', slug)
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost('src/content/blog', slug)
  console.log(post)

  if (!post) {
    notFound()
  }

  return <PostLayout frontmatter={post.frontmatter} content={post.content} />
}
