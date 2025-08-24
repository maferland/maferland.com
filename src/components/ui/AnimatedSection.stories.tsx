import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AnimatedSection from './AnimatedSection'

const meta: Meta<typeof AnimatedSection> = {
  title: 'UI/AnimatedSection',
  component: AnimatedSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Animated wrapper component using Framer Motion for smooth fade-in and slide-up effects. Perfect for page sections and content reveals.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Content to be animated',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    delay: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Animation delay in seconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Animated Content</h2>
        <p className="text-slate-600 dark:text-slate-400">
          This content animates in with a fade and slide-up effect.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic animated section with default timing (no delay).',
      },
    },
  },
}

export const WithDelay: Story = {
  args: {
    delay: 0.3,
    children: (
      <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-100">
          Delayed Animation
        </h2>
        <p className="text-blue-700 dark:text-blue-300">
          This section animates in after a 0.3 second delay.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Animated section with a delay, useful for staggered animations.',
      },
    },
  },
}

export const TextContent: Story = {
  args: {
    children: (
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Site</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Animated section containing text content like headings and paragraphs.',
      },
    },
  },
}

export const CardContent: Story = {
  args: {
    children: (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Fast Performance</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Lightning-fast animations
            </p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Experience smooth and performant animations that enhance user
          experience without compromising on speed.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Animated card component with icon, perfect for feature highlights.',
      },
    },
  },
}

export const LongDelay: Story = {
  args: {
    delay: 1.0,
    children: (
      <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
        <h2 className="text-2xl font-bold mb-2 text-green-900 dark:text-green-100">
          Long Delay Animation
        </h2>
        <p className="text-green-700 dark:text-green-300">
          This section takes 1 second to start animating, useful for sequential
          reveals.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated section with a longer delay for dramatic effect.',
      },
    },
  },
}

export const CustomStyling: Story = {
  args: {
    className: 'transform hover:scale-105 transition-transform duration-200',
    children: (
      <div className="p-6 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-orange-900 dark:text-orange-100">
          Custom Styled Section
        </h2>
        <p className="text-orange-700 dark:text-orange-300">
          This section has additional hover effects via className prop.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Animated section with custom CSS classes for additional effects.',
      },
    },
  },
}

// Showcase staggered animations
export const StaggeredSections: Story = {
  render: () => (
    <div className="space-y-6">
      <AnimatedSection delay={0}>
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <h3 className="font-semibold">First Section (no delay)</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Animates immediately
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <h3 className="font-semibold">Second Section (0.2s delay)</h3>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Animates after 0.2 seconds
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <h3 className="font-semibold">Third Section (0.4s delay)</h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Animates after 0.4 seconds
          </p>
        </div>
      </AnimatedSection>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple animated sections with staggered delays, creating a cascade effect.',
      },
    },
  },
}
