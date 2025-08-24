import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Github as GithubIcon,
  Globe as GlobeIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
} from 'lucide-react'
import SocialLink from './SocialLink'

const meta: Meta<typeof SocialLink> = {
  title: 'UI/SocialLink',
  component: SocialLink,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Animated social media link component with Framer Motion effects. Features hover animations, external link indicators, and customizable icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL to navigate to',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Lucide icon component to display',
      table: {
        type: { summary: 'LucideIcon' },
      },
    },
    label: {
      control: 'text',
      description: 'Text label for the link',
      table: {
        type: { summary: 'string' },
      },
    },
    external: {
      control: 'boolean',
      description:
        'Whether the link opens in a new tab with security attributes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const GitHub: Story = {
  args: {
    href: 'https://github.com/username',
    icon: GithubIcon,
    label: 'GitHub',
    external: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'GitHub profile link with external link indicator.',
      },
    },
  },
}

export const Twitter: Story = {
  args: {
    href: 'https://twitter.com/username',
    icon: TwitterIcon,
    label: 'Twitter',
    external: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Twitter profile link with hover animations.',
      },
    },
  },
}

export const LinkedIn: Story = {
  args: {
    href: 'https://linkedin.com/in/username',
    icon: LinkedinIcon,
    label: 'LinkedIn',
    external: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'LinkedIn profile link for professional networking.',
      },
    },
  },
}

export const Email: Story = {
  args: {
    href: 'mailto:hello@example.com',
    icon: MailIcon,
    label: 'Email',
    external: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Email contact link (internal, no external indicator).',
      },
    },
  },
}

export const Website: Story = {
  args: {
    href: 'https://example.com',
    icon: GlobeIcon,
    label: 'Website',
    external: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Personal website link with globe icon.',
      },
    },
  },
}

export const YouTube: Story = {
  args: {
    href: 'https://youtube.com/@username',
    icon: YoutubeIcon,
    label: 'YouTube',
    external: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'YouTube channel link for content creators.',
      },
    },
  },
}

export const Instagram: Story = {
  args: {
    href: 'https://instagram.com/username',
    icon: InstagramIcon,
    label: 'Instagram',
    external: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Instagram profile link for social media presence.',
      },
    },
  },
}

export const Internal: Story = {
  args: {
    href: '/contact',
    icon: MailIcon,
    label: 'Contact',
    external: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Internal link without external indicator or new tab behavior.',
      },
    },
  },
}

export const WithCustomClass: Story = {
  args: {
    href: 'https://github.com/username',
    icon: GithubIcon,
    label: 'Custom Styled',
    external: true,
    className:
      'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
  },
  parameters: {
    docs: {
      description: {
        story: 'Social link with custom styling classes applied.',
      },
    },
  },
}

// Showcase multiple social links together
export const SocialLinksGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <SocialLink
        href="https://github.com/username"
        icon={GithubIcon}
        label="GitHub"
        external
      />
      <SocialLink
        href="https://twitter.com/username"
        icon={TwitterIcon}
        label="Twitter"
        external
      />
      <SocialLink
        href="https://linkedin.com/in/username"
        icon={LinkedinIcon}
        label="LinkedIn"
        external
      />
      <SocialLink
        href="mailto:hello@example.com"
        icon={MailIcon}
        label="Email"
        external={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example grid layout of multiple social links, commonly used in profile sections.',
      },
    },
  },
}

export const VerticalList: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <SocialLink
        href="https://github.com/username"
        icon={GithubIcon}
        label="GitHub"
        external
      />
      <SocialLink
        href="https://linkedin.com/in/username"
        icon={LinkedinIcon}
        label="LinkedIn"
        external
      />
      <SocialLink
        href="https://example.com"
        icon={GlobeIcon}
        label="Website"
        external
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical list layout of social links for sidebar or footer use.',
      },
    },
  },
}
