import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PostCard } from '../PostCard'

const mockPost = {
  id: 1,
  title: 'Test Post Title',
  body: 'Test post body content',
  userId: 1,
}

describe('PostCard Component', () => {
  it('renders post information correctly', () => {
    render(<PostCard {...mockPost} />)

    // Verify all post information is displayed
    expect(screen.getByText(`#${mockPost.id}`)).toBeInTheDocument()
    expect(screen.getByText(mockPost.title)).toBeInTheDocument()
    expect(screen.getByText(mockPost.body)).toBeInTheDocument()
  })

  it('renders with correct layout structure', () => {
    render(<PostCard {...mockPost} />)

    // Check main container
    const card = screen.getByRole('article')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('h-[250px]')

    // Check heading
    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent(mockPost.title)
    expect(heading).toHaveClass('text-lg', 'font-semibold')

    // Check body text
    const body = screen.getByText(mockPost.body)
    expect(body).toHaveClass('text-gray-600')
  })

  it('handles long content with truncation', () => {
    const longPost = {
      ...mockPost,
      title: 'A'.repeat(100),
      body: 'B'.repeat(300),
    }

    render(<PostCard {...longPost} />)

    const title = screen.getByRole('heading')
    const bodyContainer = screen.getByText(/B+/).parentElement

    expect(title).toHaveClass('line-clamp-2')
    expect(bodyContainer).toHaveClass('overflow-y-auto')
  })

  it('applies hover and transition styles', () => {
    render(<PostCard {...mockPost} />)
    const card = screen.getByRole('article')
    expect(card).toHaveClass('hover:shadow-lg', 'transition-shadow', 'duration-200')
  })

  // Nuevos tests
  it('handles posts with empty title or body', () => {
    const emptyPost = {
      ...mockPost,
      title: '',
      body: '',
    }
    render(<PostCard {...emptyPost} />)

    expect(screen.getByRole('heading')).toBeEmptyDOMElement()
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('maintains consistent layout with short content', () => {
    const shortPost = {
      ...mockPost,
      title: 'Short',
      body: 'Brief',
    }
    render(<PostCard {...shortPost} />)

    const card = screen.getByRole('article')
    expect(card).toHaveClass('h-[250px]')
    expect(card.querySelector('.flex-grow')).toBeInTheDocument()
  })

  it('renders special characters in content correctly', () => {
    const specialPost = {
      ...mockPost,
      title: '¡Special & Characters!',
      body: '< HTML > & { JSON } Characters',
    }
    render(<PostCard {...specialPost} />)

    expect(screen.getByText(specialPost.title)).toBeInTheDocument()
    expect(screen.getByText(specialPost.body)).toBeInTheDocument()
  })

  it('maintains proper spacing between elements', () => {
    render(<PostCard {...mockPost} />)

    const badge = screen.getByText(`#${mockPost.id}`)
    expect(badge.parentElement).toHaveClass('mb-2')

    const title = screen.getByRole('heading')
    expect(title).toHaveClass('mb-2')
  })
})
