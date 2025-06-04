'use client'

/**
 * Home Page: Implementación eficiente de lista de 2000 elementos
 *
 * Estrategia de implementación:
 * 1. Virtualización: Usando react-virtualized para renderizar solo los elementos visibles en pantalla,
 *    reduciendo significativamente el uso de memoria y mejorando el rendimiento.
 *
 * 2. Paginación Infinita: Implementada con React Query para:
 *    - Cargar datos bajo demanda
 *    - Mantener un cache eficiente
 *    - Reducir llamadas innecesarias al servidor
 *
 * 3. Optimización de Rendimiento:
 *    - Prefetch de próxima página
 *    - Skeleton loading para mejor UX
 *    - Manejo de errores con boundary
 */

import { Post, apiService, PaginatedResponse } from '@/services/api'
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized'
import 'react-virtualized/styles.css'
import { useAuth } from '@/hooks/useAuth'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PostGrid } from '@/components/organisms/PostGrid'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { Button } from '@/components/atoms/Button'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function Home() {
  const { logout } = useAuth()

  // Configuración de React Query para paginación infinita eficiente
  const query = useInfiniteQuery<PaginatedResponse<Post>, Error>({
    queryKey: ['posts'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => apiService.getPosts({ page: pageParam as number }),
    getNextPageParam: lastPage => lastPage.nextPage,
  })

  const { data, isLoading, isError } = query
  const posts = data?.pages.flatMap(page => page.data) ?? []
  const totalCount = data?.pages[0]?.total ?? 0

  // Hook personalizado para manejar la lógica de scroll infinito
  const { loadMoreItems, isRowLoaded } = useInfiniteScroll({
    query,
    itemsPerRow: 4, // Grid de 4 columnas en desktop
  })

  const header = (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Home</h1>
      <Button onClick={logout} variant="outline" size="sm">
        Sign out
      </Button>
    </div>
  )

  // Skeleton loading para mejor UX durante la carga inicial
  if (isLoading) {
    return (
      <BaseLayout header={header}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <PostGrid.Skeleton key={i} />
          ))}
        </div>
      </BaseLayout>
    )
  }

  // Manejo de errores a nivel de página
  if (isError) {
    throw new Error('Failed to load posts')
  }

  return (
    <BaseLayout header={header}>
      {/* AutoSizer para ajuste responsivo automático */}
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreItems}
            rowCount={Math.ceil(totalCount / 4)}
            threshold={5} // Precargar cuando falten 5 filas
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                height={height}
                width={width}
                rowCount={Math.ceil(totalCount / 4)}
                // Altura de fila dinámica según dispositivo
                rowHeight={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    return (250 + 24) * 4 // Altura para móvil (4 items en columna)
                  }
                  return 300 // Altura para desktop (1 fila de 4 items)
                }}
                // Renderizado eficiente de filas con grid responsivo
                rowRenderer={({ key, index, style }) => {
                  const startIdx = index * 4
                  const rowPosts = posts.slice(startIdx, startIdx + 4)
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

                  return (
                    <PostGrid.Root key={key} posts={rowPosts} isMobile={isMobile} style={style} />
                  )
                }}
                onRowsRendered={onRowsRendered}
                overscanRowCount={3} // Prerender de 3 filas para scroll suave
                className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </BaseLayout>
  )
}
