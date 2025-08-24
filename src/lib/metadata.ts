import { getPost } from '@/lib/posts'

export async function generatePostMetadata(contentDir: string, slug: string) {
  const post = await getPost(contentDir, slug)

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
      type: 'article' as const,
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  }
}
