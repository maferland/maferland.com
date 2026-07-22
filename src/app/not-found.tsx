import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'

export const metadata: Metadata = {
  title: '404 · page not found',
  description: "This one didn't ship.",
}

export default function NotFound() {
  return (
    <section className="site-container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-[640px]">
        <div className="panel overflow-hidden shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-[7px] border-b border-[var(--line)] px-[15px] py-[13px]">
            <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
            <span className="mono ml-2 text-[11px] text-[var(--faint)]">
              ~/maferland — zsh
            </span>
          </div>
          <div className="mono px-5 py-[22px] pb-6 text-[13px] leading-[1.9]">
            <div className="text-[var(--faint)]">
              $ <span className="text-[var(--text)]">cd</span>{' '}
              <span className="text-[var(--body)]">
                $(pwd)/the-page-you-wanted
              </span>
            </div>
            <div className="text-[#ff6b6b]">cd: no such file or directory</div>
            <div className="mt-1 text-[var(--faint)]">
              $ <span className="text-[var(--text)]">echo</span>{' '}
              <span className="text-[var(--body)]">$?</span>
            </div>
            <div className="text-[var(--body)]">404</div>
          </div>
        </div>

        <div className="px-1 pt-[34px]">
          <div className="mb-3 flex items-baseline gap-3.5">
            <span className="inline-block text-[72px] font-extrabold leading-[0.9] tracking-[-0.05em] [animation:glitch_4s_infinite]">
              404
            </span>
            <span className="mono text-[11px] text-[var(--accent)]">
              page not found
            </span>
          </div>
          <h1 className="mb-2.5 text-[26px] font-bold tracking-[-0.02em]">
            This one didn&apos;t ship.
          </h1>
          <p className="mb-6 max-w-[440px] text-[15.5px] leading-[1.6] text-[var(--body)]">
            Either it moved, it never existed, or I killed it and forgot to
            redirect. Occupational hazard of shipping a lot.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <LinkButton href="/">← Back home</LinkButton>
            <LinkButton href="/lab" variant="ghost">
              check the lab
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
