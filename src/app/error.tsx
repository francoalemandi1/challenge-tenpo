'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

  const getErrorMessage = () => {
    switch (statusCode) {
      case 400:
        return 'Bad Request - The request could not be understood or was missing required parameters.'
      case 401:
        return 'Unauthorized - Authentication failed or user lacks necessary permissions.'
      case 404:
        return 'Not Found - The requested resource could not be found.'
      case 500:
      default:
        return 'Internal Server Error - Something went wrong on our end.'
    }
  }

  const handleAction = () => {
    switch (statusCode) {
      case 401:
        router.push('/auth/login')
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-red-500 mb-4">{statusCode}</h1>
          <p className="text-xl text-gray-700 mb-4">{getErrorMessage()}</p>
          <p className="text-sm text-gray-500">{error.message}</p>
          {error.digest && <p className="text-xs text-gray-400 mt-2">Error ID: {error.digest}</p>}
        </div>

        <button
          onClick={handleAction}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {getActionText()}
        </button>
      </div>
    </div>
  )
}
