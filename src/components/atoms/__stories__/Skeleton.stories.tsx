import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Skeleton } from '../Skeleton'

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[200px] h-[20px]',
  },
}

export const Circle: Story = {
  args: {
    className: 'w-12 h-12 rounded-full',
  },
}

export const Rectangle: Story = {
  args: {
    className: 'w-[350px] h-[200px]',
  },
}

export const Text: Story = {
  args: {
    className: 'w-[200px] h-4',
  },
}

export const Card: Story = {
  args: {
    className: 'w-[350px] h-[200px] rounded-lg',
  },
}

export const WithChildren: Story = {
  args: {
    className: 'w-[200px] h-[100px] flex items-center justify-center',
    children: 'Loading...',
  },
}

export const CustomAnimation: Story = {
  args: {
    className: 'w-[200px] h-[20px] animate-pulse',
  },
}
