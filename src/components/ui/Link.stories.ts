import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'subtle', 'accent'],
      description: 'Visual style variant for different contexts',
    },
    href: {
      control: { type: 'text' },
      description: 'URL to link to',
    },
    children: {
      control: { type: 'text' },
      description: 'Link text content',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for customization',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '/example',
    children: 'Default Link',
    variant: 'default',
  },
}

export const Subtle: Story = {
  args: {
    href: '/example',
    children: 'Subtle Link',
    variant: 'subtle',
  },
}

export const Accent: Story = {
  args: {
    href: '/example',
    children: 'Accent Link',
    variant: 'accent',
  },
}
