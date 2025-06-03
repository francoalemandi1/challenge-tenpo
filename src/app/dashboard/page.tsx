'use client';

import { useCallback } from 'react';
import { Post, apiService, PaginatedResponse } from '@/services/api';
import { InfiniteLoader, List, AutoSizer, Index } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { useAuth } from '@/hooks/useAuth';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { PostGrid } from '@/components/organisms/PostGrid';

export default function Dashboard() {
  const { logout } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<PaginatedResponse<Post>, Error>({
    queryKey: ['posts'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => 
      apiService.getPosts({ page: pageParam as number }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  const loadMoreItems = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return;
    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const isRowLoaded = useCallback(({ index }: Index) => {
    return !hasNextPage || index < Math.ceil(posts.length / 4);
  }, [hasNextPage, posts.length]);

  return (
    <DashboardTemplate
      onLogout={logout}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => window.location.reload()}
    >
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreItems}
            rowCount={Math.ceil(totalCount / 4)}
            threshold={5}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                height={height}
                width={width}
                rowCount={Math.ceil(totalCount / 4)}
                rowHeight={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    return (250 + 24) * 4;
                  }
                  return 300;
                }}
                rowRenderer={({ key, index, style }) => {
                  const startIdx = index * 4;
                  const rowPosts = posts.slice(startIdx, startIdx + 4);
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                  
                  return (
                    <PostGrid
                      key={key}
                      posts={rowPosts}
                      isMobile={isMobile}
                      style={style}
                    />
                  );
                }}
                onRowsRendered={onRowsRendered}
                overscanRowCount={3}
                className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </DashboardTemplate>
  );
} 