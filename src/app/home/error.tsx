'use client'

import { useRouter } from 'next/navigation'
import { ErrorLayout } from '@/components/layouts/ErrorLayout'
import { ROUTES } from '@/config/routes'

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number }
  reset: () => void
}) {
  const router = useRouter()
  const statusCode = error.statusCode || 500

  const handleAction = () => {
    if (statusCode === 401) {
      router.push(ROUTES.public.login)
    } else {
      reset()
    }
  }

  return (
    <ErrorLayout
      title="Home Error"
      message={
        statusCode === 401
          ? 'Your session has expired. Please log in again.'
          : "We couldn't load your Home. Please try again."
      }
      actionText={statusCode === 401 ? 'Go to Login' : 'Try Again'}
      onAction={handleAction}
      error={error}
    />
  )
}
