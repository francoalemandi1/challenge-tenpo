import { Button } from '@/components/atoms/Button'
import { Card, CardContent, CardTitle } from '@/components/atoms/Card'
import { Skeleton } from '@/components/atoms/Skeleton'

interface HomeTemplateProps {
  children: React.ReactNode
  onLogout: () => void
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

export function HomeTemplate({
  children,
  onLogout,
  isLoading,
  isError,
  onRetry,
}: HomeTemplateProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="h-[250px]">
              <CardContent className="h-full flex flex-col p-4">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <CardTitle className="text-red-600 mb-4 text-center">Error loading posts</CardTitle>
            <div className="flex justify-center">
              <Button onClick={onRetry}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-10 bg-gray-50 py-4 mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Home</h1>
            <Button onClick={onLogout} variant="outline" size="sm">
              Sign out
            </Button>
          </div>
        </div>
        <div className="h-[calc(100vh-100px)]">{children}</div>
      </div>
    </div>
  )
}
