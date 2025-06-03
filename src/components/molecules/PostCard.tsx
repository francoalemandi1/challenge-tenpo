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
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[250px] hover:shadow-lg transition-shadow duration-200"
      data-slot="card"
    >
      <div className="h-full flex flex-col p-4" data-slot="card-content">
        <div className="flex items-center gap-2 mb-2">
          <Badge>#{id}</Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 line-clamp-4 md:line-clamp-5 flex-grow">{body}</p>
      </div>
    </div>
  )
}
