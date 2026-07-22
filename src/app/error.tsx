'use client'

import { useEffect } from 'react'
import { LinkButton } from '@/components/ui/LinkButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="site-container flex min-h-[70vh] items-center py-16">
      <div className="w-full max-w-[640px]">
        <div className="panel overflow-hidden shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-[7px] border-b border-[var(--line)] px-[15px] py-[13px]">
            <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
            <span className="mono ml-2 text-[11px] text-[var(--faint)]">
              ~/maferland — fish
            </span>
          </div>
          <div className="mono px-5 py-[22px] pb-6 text-[13px] leading-[1.9]">
            <div className="text-[var(--faint)]">
              $ <span className="text-[var(--text)]">npm</span>{' '}
              <span className="text-[var(--body)]">run serve-that-page</span>
            </div>
            <div className="text-[var(--body)]">&gt; building...</div>
            <div className="text-[#ff6b6b]">
              ✗ Error: something broke on my end (500)
            </div>
            <div className="text-[var(--faint)]">
              &nbsp;&nbsp;at maferland.com (not your fault)
            </div>
            <div className="mt-1 text-[#f0b35e]">
              ⚠ retrying won&apos;t hurt.
            </div>
          </div>
        </div>

        <div className="px-1 pt-[34px]">
          <div className="mb-3 flex items-baseline gap-3.5">
            <span className="text-[72px] font-extrabold leading-[0.9] tracking-[-0.05em]">
              500
            </span>
            <span className="mono text-[11px] text-[#f0b35e]">
              something broke
            </span>
          </div>
          <h1 className="mb-2.5 text-[26px] font-bold tracking-[-0.02em]">
            Okay, that&apos;s on me.
          </h1>
          <p className="mb-6 max-w-[440px] text-[15.5px] leading-[1.6] text-[var(--body)]">
            A server hiccuped. I obsess over the details, but the details
            occasionally obsess back. Give it a refresh, or head home.
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <button type="button" className="button-primary" onClick={reset}>
              ↻ Try again
            </button>
            <LinkButton href="/" variant="ghost">
              go home
            </LinkButton>
            <span className="mono flex items-center gap-1.5 text-[11px] text-[var(--faint)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0b35e] [animation:pulse_2s_infinite]" />
              looking into it
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
