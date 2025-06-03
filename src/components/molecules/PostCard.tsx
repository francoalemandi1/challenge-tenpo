import { Card, CardContent } from '../ui/card';
import { Badge } from '../atoms/Badge';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
}

export function PostCard({ id, title, body }: PostCardProps) {
  return (
    <Card role="article" className="h-[250px] hover:shadow-lg transition-shadow duration-200">
      <CardContent className="h-full flex flex-col p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge>#{id}</Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-4 md:line-clamp-5 flex-grow">
          {body}
        </p>
      </CardContent>
    </Card>
  );
} 