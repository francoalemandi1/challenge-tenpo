import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

function Skeleton({
  className,
  'data-testid': dataTestId,
  ...props
}: HTMLAttributes<HTMLDivElement> & { 'data-testid'?: string }) {
  return (
    <div
      data-testid={dataTestId}
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
