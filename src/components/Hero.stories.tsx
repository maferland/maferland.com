import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Hero from './Hero'

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Main hero section component for the homepage. Features staggered animations, gradient text, social links, and a responsive layout.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complete hero section as it appears on the homepage with all animations and content.',
      },
    },
  },
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'Hero section optimized for desktop viewing with larger text sizes.',
      },
    },
  },
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Hero section responsive layout on tablet devices.',
      },
    },
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      description: {
        story:
          'Hero section optimized for mobile devices with adjusted typography.',
      },
    },
  },
}

// Story showcasing just the header section
export const HeaderOnly: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
          Marc-Antoine Ferland
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Senior Frontend Engineer crafting delightful experiences and building
          systems that multiply team productivity
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Just the header section with name and tagline, showcasing the gradient text effect.',
      },
    },
  },
}

// Story showing the biography section
export const BiographySection: Story = {
  render: () => {
    return (
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          After 10 years in this field, I&apos;ve discovered what I love most:
          being a{' '}
          <em className="text-slate-900 dark:text-slate-100">multiplier</em>. I
          build systems and tooling that supercharge teams and help ship
          pixel-perfect experiences without compromise.
        </p>

        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          My journey started with dreams of video game development, took a
          detour through backend work, and led me to find the perfect balance of
          great UX and DX in frontend engineering.
        </p>

        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          Beyond code, I find the same craft-focused mindset in cooking
          everything from scratch and pushing limits through long-distance
          running. I&apos;m exploring ways to extend my influence while staying
          ahead of AI&apos;s transformation of our field.
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'The biography section showcasing the personal story and professional journey.',
      },
    },
  },
}

// Story with no animations for static preview
export const StaticPreview: Story = {
  render: () => {
    return (
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Marc-Antoine Ferland
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Senior Frontend Engineer crafting delightful experiences and
            building systems that multiply team productivity
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            After 10 years in this field, I&apos;ve discovered what I love most:
            being a{' '}
            <em className="text-slate-900 dark:text-slate-100">multiplier</em>.
            I build systems and tooling that supercharge teams and help ship
            pixel-perfect experiences without compromise.
          </p>
        </div>

        {/* Archive Link */}
        <div className="pt-16 border-t border-foreground/10">
          <p className="text-sm text-foreground/50">
            Looking for my previous writing?{' '}
            <a
              href="#"
              className="inline-flex items-center gap-1 underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors"
            >
              Browse the archive
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Static version of the hero without animations, useful for documentation and testing.',
      },
    },
  },
}
