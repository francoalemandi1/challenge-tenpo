import { CSSProperties } from 'react'
import { PostCard } from '../molecules/PostCard'
import { Post } from '../../types/post'

interface PostGridProps {
  posts: Post[]
  isMobile: boolean
  style?: CSSProperties
}

export const PostGrid = {
  Root: ({ posts, isMobile, style }: PostGridProps) => {
    const gridClassName = isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-2 lg:grid-cols-4 gap-6'
    const skeletonCount = isMobile ? 0 : Math.max(0, 4 - posts.length)
    const skeletons = Array(skeletonCount).fill(null)

    return (
      <div data-testid="post-grid" className={gridClassName} style={style}>
        {posts.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
          />
        ))}
        {skeletons.map((_, index) => (
          <PostGrid.Skeleton key={`skeleton-${index}`} />
        ))}
      </div>
    )
  },

  Skeleton: () => (
    <div
      data-testid="skeleton-card"
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[250px]"
      data-slot="card"
    >
      <div className="h-full flex flex-col p-4" data-slot="card-content">
        <div className="space-y-3">
          <div className="animate-pulse rounded-md bg-muted h-6 w-3/4" />
          <div className="animate-pulse rounded-md bg-muted h-24 w-full" />
        </div>
      </div>
    </div>
  ),
}
