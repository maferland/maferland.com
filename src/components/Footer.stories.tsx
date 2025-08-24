import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Footer from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer component with social links, tech stack information, and copyright. Features responsive layout and theme support.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-screen flex items-end">
        <div className="w-full">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complete footer as it appears on all pages with social links and tech stack.',
      },
    },
  },
}
