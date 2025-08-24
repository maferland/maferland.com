import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Custom Next.js Link component with variants and hover animations. Features an animated underline effect and focus states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'accent'],
      description: 'Visual style variant of the link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    href: {
      control: 'text',
      description: 'URL or path to navigate to',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Link text content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default link style with standard text color and hover effects.',
      },
    },
  },
}

export const Subtle: Story = {
  args: {
    href: '#',
    variant: 'subtle',
    children: 'Subtle Link',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Subtle link style with muted colors, ideal for secondary actions.',
      },
    },
  },
}

export const Accent: Story = {
  args: {
    href: '#',
    variant: 'accent',
    children: 'Accent Link',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accent link style with blue colors and underline, great for call-to-action links.',
      },
    },
  },
}

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    variant: 'accent',
    children: 'External Link →',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of an external link with proper security attributes.',
      },
    },
  },
}

export const WithCustomClass: Story = {
  args: {
    href: '#',
    variant: 'default',
    className: 'text-lg font-semibold',
    children: 'Custom Styled Link',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link with additional custom CSS classes applied.',
      },
    },
  },
}

export const LongText: Story = {
  args: {
    href: '#',
    variant: 'default',
    children:
      'This is a much longer link text that demonstrates how the component handles longer content with proper wrapping and hover effects',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link with longer text content to test wrapping and animations.',
      },
    },
  },
}

// Showcase all variants together
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Link href="#" variant="default">
          Default Link
        </Link>
      </div>
      <div>
        <Link href="#" variant="subtle">
          Subtle Link
        </Link>
      </div>
      <div>
        <Link href="#" variant="accent">
          Accent Link
        </Link>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All link variants displayed together for comparison.',
      },
    },
  },
}
