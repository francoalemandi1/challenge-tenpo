import { Badge } from '../atoms/Badge'

interface PostCardProps {
  id: number
  title: string
  body: string
  userId?: number
}

export const PostCard = ({ id, title, body }: PostCardProps) => {
  return (
    <div
      role="article"
      className="bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm h-[250px] hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      data-slot="card"
    >
      <div className="h-full flex flex-col p-4 relative" data-slot="card-content">
        <div className="flex items-center gap-2 mb-2">
          <Badge>#{id}</Badge>
        </div>
        <div className="flex flex-col flex-grow min-h-0">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-shrink-0">{title}</h3>
          <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
            <p className="text-gray-600">{body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
