'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number }
  reset: () => void
}) {
  const router = useRouter()
  const statusCode = error.statusCode || 500

  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  const handleAction = () => {
    if (statusCode === 401) {
      router.push('/auth/login')
    } else {
      reset()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Dashboard Error</h2>
          <p className="text-gray-700 mb-4">
            {statusCode === 401
              ? 'Your session has expired. Please log in again.'
              : "We couldn't load your dashboard. Please try again."}
          </p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>

        <button
          onClick={handleAction}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {statusCode === 401 ? 'Go to Login' : 'Try Again'}
        </button>
      </div>
    </div>
  )
}
