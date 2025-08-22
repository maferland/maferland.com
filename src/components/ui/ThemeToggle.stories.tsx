import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/lib/theme-provider'
import ThemeToggle from './ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Theme:</span>
      <ThemeToggle />
    </div>
  ),
}

export const InNavigation: Story = {
  render: () => (
    <div className="flex items-center justify-between w-96 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
      <span className="font-medium">Marc-Antoine Ferland</span>
      <div className="flex items-center gap-6">
        <span className="text-sm text-slate-600 dark:text-slate-400">About</span>
        <span className="text-sm text-slate-600 dark:text-slate-400">Projects</span>
        <ThemeToggle />
      </div>
    </div>
  ),
}