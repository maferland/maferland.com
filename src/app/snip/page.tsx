import type { Metadata } from 'next'
import { DM_Mono, DM_Sans, Instrument_Serif } from 'next/font/google'
import SnipLanding from './SnipLanding'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'snip — Copy clean.',
  description:
    'A free, open-source macOS menu bar app that strips tracking parameters from every URL you copy.',
}

export default function SnipPage() {
  return (
    <div
      className={`${instrumentSerif.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <SnipLanding />
    </div>
  )
}
