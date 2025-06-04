import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PostGrid } from '../PostGrid'

const mockPosts = [
  {
    id: 1,
    title: 'First Post',
    body: 'First post content',
    userId: 1,
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'Second post content',
    userId: 1,
  },
]

describe('PostGrid Component', () => {
  it('renders all posts in mobile view', () => {
    render(<PostGrid.Root posts={mockPosts} isMobile={true} />)

    // Check if all posts are rendered
    mockPosts.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
      expect(screen.getByText(post.body)).toBeInTheDocument()
    })

    // Check mobile layout
    const grid = screen.getByTestId('post-grid')
    expect(grid).toHaveClass('flex', 'flex-col', 'gap-6')
  })

  it('renders posts in grid layout for desktop', () => {
    render(<PostGrid.Root posts={mockPosts} isMobile={false} />)

    // Check if all posts are rendered
    mockPosts.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
      expect(screen.getByText(post.body)).toBeInTheDocument()
    })

    // Check desktop grid layout
    const grid = screen.getByTestId('post-grid')
    expect(grid).toHaveClass('grid', 'grid-cols-2', 'lg:grid-cols-4', 'gap-6')
  })

  it('handles empty posts array', () => {
    render(<PostGrid.Root posts={[]} isMobile={false} />)

    const grid = screen.getByTestId('post-grid')
    expect(grid).toBeInTheDocument()
    const skeletons = screen.queryAllByTestId('skeleton-card')
    expect(skeletons).toHaveLength(4) // Should show 4 skeleton cards in desktop view
  })

  it('applies custom styles when provided', () => {
    render(<PostGrid.Root posts={[]} isMobile={false} style={{ cursor: 'pointer' }} />)

    const grid = screen.getByTestId('post-grid')
    expect(grid).toHaveStyle({ cursor: 'pointer' })
  })

  it('renders skeleton cards only in desktop view', () => {
    const { rerender } = render(<PostGrid.Root posts={mockPosts} isMobile={false} />)

    // Check desktop view
    let skeletons = screen.queryAllByTestId('skeleton-card')
    expect(skeletons).toHaveLength(2) // 4 columns - 2 posts = 2 skeletons

    // Check mobile view
    rerender(<PostGrid.Root posts={mockPosts} isMobile={true} />)
    skeletons = screen.queryAllByTestId('skeleton-card')
    expect(skeletons).toHaveLength(0)
  })

  describe('PostGrid.Skeleton', () => {
    it('renders with correct structure', () => {
      render(<PostGrid.Skeleton />)

      const skeleton = screen.getByTestId('skeleton-card')
      expect(skeleton).toBeInTheDocument()

      const contentContainer = skeleton.querySelector('[data-slot="card-content"]')
      expect(contentContainer).toBeInTheDocument()

      const pulseElements = document.getElementsByClassName('animate-pulse')
      expect(pulseElements.length).toBe(2) // Title and body placeholders
    })
  })
})
