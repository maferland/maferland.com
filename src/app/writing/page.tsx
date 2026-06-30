import type { Metadata } from 'next'
import WritingIndex from '@/components/WritingIndex'

export const metadata: Metadata = {
  title: 'Writing | Marc-Antoine Ferland',
  description: 'Notes on frontend craft, developer tools, and building things.',
}

export default function WritingPage() {
  return <WritingIndex />
}
