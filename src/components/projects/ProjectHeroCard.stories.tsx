import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Footprints, ShieldCheck, Code } from 'lucide-react'
import ProjectHeroCard from './ProjectHeroCard'

const meta: Meta<typeof ProjectHeroCard> = {
  title: 'Projects/ProjectHeroCard',
  component: ProjectHeroCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hero-style card for showcasing projects with title, tagline, description, tech stack badges, and action links.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Project name',
    },
    tagline: {
      control: 'text',
      description: 'Short one-line description',
    },
    description: {
      control: 'text',
      description: 'Longer project description (2-3 sentences)',
    },
    icon: {
      control: false,
      description: 'Icon ReactNode displayed in the header',
    },
    techStack: {
      control: 'object',
      description: 'Array of technology names',
    },
    liveUrl: {
      control: 'text',
      description: 'URL to live project (optional)',
    },
    githubUrl: {
      control: 'text',
      description: 'URL to GitHub repo (optional)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithBothLinks: Story = {
  args: {
    title: 'quebec.run',
    tagline: 'Quebec City running hub',
    description:
      'A community platform for runners in Quebec City to find clubs, discover events, and explore routes. Built to connect local runners and make it easier to find your next group run.',
    icon: <Footprints className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
    techStack: ['TypeScript', 'Next.js', 'React'],
    liveUrl: 'https://quebec.run',
    githubUrl: 'https://github.com/maferland/quebec.run',
  },
  parameters: {
    docs: {
      description: {
        story: 'Project card with both live URL and GitHub link.',
      },
    },
  },
}

export const LiveUrlOnly: Story = {
  args: {
    title: 'quebec.run',
    tagline: 'Quebec City running hub',
    description:
      'A community platform for runners in Quebec City to find clubs, discover events, and explore routes.',
    icon: <Footprints className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
    techStack: ['TypeScript', 'Next.js', 'React'],
    liveUrl: 'https://quebec.run',
  },
  parameters: {
    docs: {
      description: {
        story: 'Project with only a live URL (private GitHub repo).',
      },
    },
  },
}

export const GitHubOnly: Story = {
  args: {
    title: 'CleanCopy',
    tagline: 'Strips tracking params from your clipboard',
    description:
      'A macOS menu bar app that automatically removes tracking parameters from URLs when you copy them. No manual action required.',
    icon: (
      <ShieldCheck className="w-6 h-6 text-slate-700 dark:text-slate-300" />
    ),
    techStack: ['Swift', 'macOS'],
    githubUrl: 'https://github.com/maferland/clean-copy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Project with only GitHub link (no live demo available).',
      },
    },
  },
}

export const ManyTechBadges: Story = {
  args: {
    title: 'Complex App',
    tagline: 'Full-stack application',
    description:
      'A comprehensive application showcasing multiple technologies working together.',
    icon: <Code className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
    techStack: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Redis',
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/app',
  },
  parameters: {
    docs: {
      description: {
        story: 'Project with many tech stack badges to test wrapping.',
      },
    },
  },
}
