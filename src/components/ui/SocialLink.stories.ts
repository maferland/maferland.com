import type { Meta, StoryObj } from '@storybook/react'
import { Github, Linkedin, Mail } from 'lucide-react'
import SocialLink from './SocialLink'

const meta: Meta<typeof SocialLink> = {
  title: 'UI/SocialLink',
  component: SocialLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: { type: 'text' },
      description: 'URL to link to',
    },
    label: {
      control: { type: 'text' },
      description: 'Link label text',
    },
    external: {
      control: { type: 'boolean' },
      description: 'Whether link opens in new tab with arrow icon',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const GitHub: Story = {
  args: {
    href: 'https://github.com/maferland',
    icon: Github,
    label: 'GitHub',
    external: true,
  },
}

export const LinkedIn: Story = {
  args: {
    href: 'https://www.linkedin.com/in/marcantoineferland',
    icon: Linkedin,
    label: 'LinkedIn', 
    external: true,
  },
}

export const Email: Story = {
  args: {
    href: 'mailto:hello@maferland.com',
    icon: Mail,
    label: 'Email',
    external: false,
  },
}