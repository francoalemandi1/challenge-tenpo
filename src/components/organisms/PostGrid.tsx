import { Post } from '@/services/api';
import { PostCard } from '../molecules/PostCard';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface PostGridProps {
  posts: Post[];
  isMobile: boolean;
  style?: React.CSSProperties;
}

export function PostGrid({ posts, isMobile, style }: PostGridProps) {
  return (
    <div
      style={{
        ...style,
        height: 'auto',
        marginBottom: '2rem'
      }}
      className={isMobile ? "flex flex-col gap-6" : "grid grid-cols-2 lg:grid-cols-4 gap-6"}
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
        />
      ))}
      {isMobile ? null : [...Array(4 - posts.length)].map((_, i) => (
        <Card key={`empty-${i}`} className="h-[250px]">
          <CardContent className="h-full flex flex-col p-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 