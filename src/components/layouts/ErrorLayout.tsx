interface ErrorLayoutProps {
  title: string
  message: string
  actionText: string
  onAction: () => void
  error?: Error & { digest?: string }
}

export function ErrorLayout({ title, message, actionText, onAction, error }: ErrorLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{title}</h2>
          <p className="text-gray-700 mb-4">{message}</p>
          {error && <p className="text-sm text-gray-500">{error.message}</p>}
          {error?.digest && <p className="text-xs text-gray-400 mt-2">Error ID: {error.digest}</p>}
        </div>

        <button
          onClick={onAction}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {actionText}
        </button>
      </div>
    </div>
  )
}
