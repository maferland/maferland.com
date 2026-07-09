'use client'

import { LinkButton } from '@/components/ui/LinkButton'

export default function Footer() {
  return (
    <footer className="bg-[var(--accent-soft)]">
      <div className="site-container py-[50px]">
        <h2 className="text-[34px] font-bold tracking-[-0.025em] max-sm:text-[27px]">
          If something here resonated, say hi.
        </h2>
        <p className="mt-2 max-w-[620px] text-base leading-7 text-[var(--muted)]">
          Staff-track frontend, tooling, 0
          <span className="inline-block translate-y-[0.5px]">→</span>1 bets. If
          the team ships things worth caring about, I want to hear.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <LinkButton
            className="col-span-2 w-full sm:w-auto"
            href="mailto:me@maferland.com"
          >
            me@maferland.com
          </LinkButton>
          <LinkButton
            className="w-full px-3 sm:w-auto sm:px-[18px]"
            href="https://github.com/maferland"
            variant="ghost"
          >
            GitHub ↗
          </LinkButton>
          <LinkButton
            className="w-full px-3 sm:w-auto sm:px-[18px]"
            href="https://www.linkedin.com/in/marcantoineferland"
            variant="ghost"
          >
            LinkedIn ↗
          </LinkButton>
        </div>
        <p className="mono mt-10 text-[11px] text-[var(--faint)]">
          © 2026 Marc-Antoine Ferland · maferland.com
        </p>
      </div>
    </footer>
  )
}
