import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProjectCard, GitHubCard, StorybookCard } from './ProjectCard'

const meta: Meta<typeof ProjectCard> = {
  title: 'MDX/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive project cards used in blog posts to showcase related projects, repositories, and tools.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the project card',
    },
    description: {
      control: 'text',
      description: 'A brief description of the project or resource',
    },
    href: {
      control: 'text',
      description: 'The URL to link to',
    },
    icon: {
      control: false,
      description: 'React node for the icon (usually an SVG)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const GitHubIcon = (
  <svg
    className="w-5 h-5 text-slate-700 dark:text-slate-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const StorybookIcon = (
  <svg
    className="w-5 h-5 text-pink-600 dark:text-pink-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M16.71 1H7.29L6 2.29v19.42L7.29 23h9.42L18 21.71V2.29L16.71 1zm0 20.71H7.29V2.29h9.42v19.42z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const DocIcon = (
  <svg
    className="w-5 h-5 text-blue-600 dark:text-blue-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

export const Default: Story = {
  args: {
    title: 'Example Project',
    description:
      'This is an example project card showing how the component looks with default styling.',
    href: 'https://example.com',
    icon: GitHubIcon,
  },
}

export const WithGitHubIcon: Story = {
  args: {
    title: 'GitHub Repository',
    description:
      'Explore the complete codebase, including all the components, utilities, and patterns we built together.',
    href: 'https://github.com/example/repo',
    icon: GitHubIcon,
  },
}

export const WithStorybookIcon: Story = {
  args: {
    title: 'Storybook Component Library',
    description:
      'Interactive documentation of all UI components with examples and usage guidelines.',
    href: 'https://storybook.example.com',
    icon: StorybookIcon,
    className: 'border-pink-200/50 dark:border-pink-800/50',
  },
}

export const WithDocumentationIcon: Story = {
  args: {
    title: 'Documentation',
    description:
      'Comprehensive guides and API references to help you get started quickly.',
    href: 'https://docs.example.com',
    icon: DocIcon,
  },
}

export const LongContent: Story = {
  args: {
    title: 'Project with Very Long Title That Might Wrap',
    description:
      'This project card has a much longer description to test how the component handles text overflow and wrapping. It should maintain good readability and visual balance even with more content than usual.',
    href: 'https://example.com/long-project',
    icon: GitHubIcon,
  },
}

// Pre-built component variants
export const GitHubCardExample: StoryObj = {
  render: () => <GitHubCard />,
  parameters: {
    docs: {
      description: {
        story: 'Pre-configured GitHub repository card used in blog posts.',
      },
    },
  },
}

export const StorybookCardExample: StoryObj = {
  render: () => <StorybookCard />,
  parameters: {
    docs: {
      description: {
        story:
          'Pre-configured Storybook component library card used in blog posts.',
      },
    },
  },
}

export const GridLayout: StoryObj = {
  render: () => (
    <div className="grid md:grid-cols-2 gap-6">
      <GitHubCard />
      <StorybookCard />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of how the cards look in a responsive grid layout, as used in blog posts.',
      },
    },
  },
}
