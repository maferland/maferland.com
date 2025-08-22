import PostList from '@/components/blog/PostList'
import { getPosts } from '@/lib/posts'

export default async function ArchivePage() {
  const posts = await getPosts('src/content/archive')

  return (
    <PostList
      title="Archive"
      description="A collection of my previous writing on frontend development, developer experience, and building scalable systems. These posts were originally published on an older version of maferland.com."
      posts={posts}
      basePath="/archive"
      emptyStateMessage="No archive posts found."
    />
  )
}
