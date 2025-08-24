import { Github, Linkedin, Mail } from 'lucide-react'

export const socialLinks = [
  {
    href: 'https://github.com/maferland',
    icon: Github,
    label: 'GitHub',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/marcantoineferland',
    icon: Linkedin,
    label: 'LinkedIn',
    external: true,
  },
  {
    href: 'mailto:hello@maferland.com',
    icon: Mail,
    label: 'Email',
    external: false,
  },
] as const

export const techStack = [
  'Next.js 15',
  'TypeScript',
  'TailwindCSS 4',
  'Framer Motion',
  'MDX',
] as const
