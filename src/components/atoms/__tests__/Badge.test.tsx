import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Badge } from '../Badge'

describe('Badge Component', () => {
  it('renders children content correctly', () => {
    render(<Badge>123</Badge>)
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<Badge>123</Badge>)
    const badge = screen.getByText('123')
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'rounded-full',
      'border',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-semibold',
      'transition-colors'
    )
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-test-class'
    render(<Badge className={customClass}>123</Badge>)
    const badge = screen.getByText('123')
    expect(badge).toHaveClass(customClass)
  })

  it('maintains accessibility role', () => {
    render(<Badge>123</Badge>)
    const badge = screen.getByText('123')
    expect(badge).toHaveAttribute('role', 'status')
  })

  it('renders with different content types', () => {
    const { rerender } = render(<Badge>{123}</Badge>)
    expect(screen.getByText('123')).toBeInTheDocument()

    rerender(<Badge>{'Test'}</Badge>)
    expect(screen.getByText('Test')).toBeInTheDocument()

    rerender(<Badge><span>Complex content</span></Badge>)
    expect(screen.getByText('Complex content')).toBeInTheDocument()
  })

  it('handles empty content gracefully', () => {
    render(<Badge>{''}</Badge>)
    const badge = screen.getByRole('status')
    expect(badge).toBeInTheDocument()
    expect(badge).toBeEmptyDOMElement()
  })

  it('combines custom classes with default classes', () => {
    const customClass = 'test-class'
    render(<Badge className={customClass}>123</Badge>)
    const badge = screen.getByText('123')
    
    expect(badge).toHaveClass('inline-flex', customClass)
  })
}) 