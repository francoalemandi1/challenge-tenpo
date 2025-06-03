import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from '../Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the badge',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '123',
  },
}

export const WithCustomClass: Story = {
  args: {
    children: '456',
    className: 'bg-blue-500 text-white',
  },
}

export const WithLongText: Story = {
  args: {
    children: 'This is a very long text for a badge',
  },
}

export const WithSpecialCharacters: Story = {
  args: {
    children: '¡Special & Characters!',
  },
} 