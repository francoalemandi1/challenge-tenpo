'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ErrorLayout } from '@/components/layouts/ErrorLayout'
import { getErrorMessage } from '@/lib/errors'
import { ROUTES } from '@/config/routes'

interface ErrorProps {
  error: Error & { digest?: string; statusCode?: number }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()
  const statusCode = error.statusCode || 500

  useEffect(() => {
    // Log error to monitoring service
    console.error('Error caught by error.tsx:', error)
  }, [error])

  const handleAction = () => {
    switch (statusCode) {
      case 401:
        router.push(ROUTES.public.login)
        break
      case 404:
        router.push('/')
        break
      default:
        reset()
    }
  }

  const getActionText = () => {
    switch (statusCode) {
      case 401:
        return 'Go to Login'
      case 404:
        return 'Go Home'
      default:
        return 'Try Again'
    }
  }

  return (
    <ErrorLayout
      title={`Error ${statusCode}`}
      message={getErrorMessage(statusCode)}
      actionText={getActionText()}
      onAction={handleAction}
      error={error}
    />
  )
}
