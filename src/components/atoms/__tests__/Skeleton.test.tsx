import { render, screen } from '@testing-library/react'
import { Skeleton } from '../Skeleton'

describe('Skeleton Component', () => {
  it('renders with default props', () => {
    render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted')
  })

  it('applies custom className', () => {
    render(<Skeleton data-testid="skeleton" className="custom-class" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('custom-class')
  })

  it('renders with custom dimensions', () => {
    render(<Skeleton data-testid="skeleton" style={{ width: '200px', height: '100px' }} />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '100px',
    })
  })

  it('renders children when provided', () => {
    render(<Skeleton>Loading...</Skeleton>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('maintains animation class with custom classes', () => {
    render(<Skeleton data-testid="skeleton" className="custom-class" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('animate-pulse', 'custom-class')
  })
})
