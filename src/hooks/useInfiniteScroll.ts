import { useCallback } from 'react'
import type { Index } from 'react-virtualized'
import type { UseInfiniteQueryResult } from '@tanstack/react-query'

interface PaginatedData {
  pages: Array<{ data: unknown[] }>
}

interface UseInfiniteScrollOptions<T extends PaginatedData> {
  query: UseInfiniteQueryResult<T>
  itemsPerRow: number
}

export function useInfiniteScroll<T extends PaginatedData>({
  query,
  itemsPerRow,
}: UseInfiniteScrollOptions<T>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = query

  const loadMoreItems = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return
    await fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const isRowLoaded = useCallback(
    ({ index }: Index) => {
      return !hasNextPage || index < Math.ceil((data?.pages.length || 0) / itemsPerRow)
    },
    [hasNextPage, data?.pages.length, itemsPerRow]
  )

  return {
    loadMoreItems,
    isRowLoaded,
    hasNextPage,
    isFetchingNextPage,
  }
}
