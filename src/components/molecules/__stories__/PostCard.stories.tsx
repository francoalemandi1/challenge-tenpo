import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostCard } from '../PostCard'

const meta = {
  title: 'Molecules/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'number',
      description: 'Post ID',
    },
    title: {
      control: 'text',
      description: 'Post title',
    },
    body: {
      control: 'text',
      description: 'Post content',
    },
  },
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    title: 'Example Post Title',
    body: 'This is an example post body with a reasonable length of content.',
  },
}

export const LongContent: Story = {
  args: {
    id: 2,
    title: 'A Very Long Post Title That Should Be Truncated When It Reaches The Maximum Width Of The Container',
    body: 'This is a very long post body that should demonstrate how the component handles text overflow. It contains multiple sentences to ensure we have enough content to test the truncation behavior. The content should be truncated after a certain number of lines while maintaining the layout integrity.',
  },
}

export const ShortContent: Story = {
  args: {
    id: 3,
    title: 'Short Title',
    body: 'Brief content.',
  },
}

export const WithSpecialCharacters: Story = {
  args: {
    id: 4,
    title: '¡Special & Characters in Title!',
    body: 'Content with special characters: <html>, {json}, & more!',
  },
} 