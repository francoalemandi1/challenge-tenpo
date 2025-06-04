import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../Card'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Simple Card Content',
    className: 'w-[350px]',
  },
}

export const WithHeader: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>This is the main content of the card.</CardContent>
      </>
    ),
  },
}

export const WithFooter: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
        </CardHeader>
        <CardContent>Card content with a footer section below.</CardContent>
        <CardFooter>
          <p>Footer content</p>
        </CardFooter>
      </>
    ),
  },
}

export const CompleteExample: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This card shows all possible sections</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of the card.</p>
          <p className="mt-4">It can contain multiple paragraphs and other content.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <button className="text-sm text-blue-500">Cancel</button>
          <button className="text-sm text-blue-500 font-bold">Save</button>
        </CardFooter>
      </>
    ),
  },
}

export const CustomStyles: Story = {
  args: {
    className: 'w-[350px] bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    children: (
      <CardHeader>
        <CardTitle className="text-white">Custom Styled Card</CardTitle>
        <CardDescription className="text-white/80">
          This card has custom background and text colors
        </CardDescription>
      </CardHeader>
    ),
  },
}
