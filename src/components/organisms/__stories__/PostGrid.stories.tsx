import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostGrid } from '../PostGrid'

const mockPosts = [
  {
    id: 1,
    userId: 1,
    title: 'First Post',
    body: 'First post content that demonstrates a typical post length.',
  },
  {
    id: 2,
    userId: 1,
    title: 'Second Post',
    body: 'Another post with different content to show variation.',
  },
  {
    id: 3,
    userId: 2,
    title: 'Third Post',
    body: 'Yet another post to demonstrate grid layout.',
  },
]

const meta = {
  title: 'Organisms/PostGrid',
  component: PostGrid.Root,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    posts: {
      control: 'object',
      description: 'Array of posts to display',
    },
    isMobile: {
      control: 'boolean',
      description: 'Whether to show mobile or desktop layout',
    },
    style: {
      control: 'object',
      description: 'Additional CSS styles',
    },
  },
} satisfies Meta<typeof PostGrid.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  args: {
    posts: mockPosts,
    isMobile: false,
  },
}

export const Mobile: Story = {
  args: {
    posts: mockPosts,
    isMobile: true,
  },
}

export const SinglePost: Story = {
  args: {
    posts: [mockPosts[0]],
    isMobile: false,
  },
}

export const EmptyGrid: Story = {
  args: {
    posts: [],
    isMobile: false,
  },
}

export const WithCustomStyles: Story = {
  args: {
    posts: mockPosts,
    isMobile: false,
    style: {
      backgroundColor: '#f0f0f0',
      padding: '2rem',
    },
  },
}

// Skeleton stories
export const SkeletonStory: StoryObj = {
  name: 'Skeleton',
  render: () => <PostGrid.Skeleton />,
  args: {},
}

export const SkeletonGrid: StoryObj = {
  name: 'Skeleton Grid',
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <PostGrid.Skeleton key={i} />
      ))}
    </div>
  ),
  args: {},
}
