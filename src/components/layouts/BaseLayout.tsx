import { cn } from '@/lib/utils'

interface BaseLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function BaseLayout({ children, header, footer, className }: BaseLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {header && <div className="sticky top-0 z-10 bg-gray-50 py-4 mb-4">{header}</div>}
        <div className="h-[calc(100vh-100px)]">{children}</div>
        {footer}
      </div>
    </div>
  )
}
