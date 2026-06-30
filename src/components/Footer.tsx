'use client'

export default function Footer() {
  return (
    <footer className="bg-[var(--accent-soft)]">
      <div className="site-container py-[50px]">
        <h2 className="text-[34px] font-bold tracking-[-0.025em] max-sm:text-[27px]">
          If something here resonated, say hi.
        </h2>
        <p className="mt-2 max-w-[620px] text-base leading-7 text-[var(--muted)]">
          I&apos;m looking for a team that cares about the same stuff. Frontend,
          tooling, 0→1. I&apos;m around.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a className="button-primary" href="mailto:me@maferland.com">
            me@maferland.com
          </a>
          <a className="button-ghost" href="https://github.com/maferland">
            GitHub ↗
          </a>
          <a
            className="button-ghost"
            href="https://www.linkedin.com/in/marcantoineferland"
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="mono mt-10 text-[11px] text-[var(--faint)]">
          © 2026 Marc-Antoine Ferland · maferland.com
        </p>
      </div>
    </footer>
  )
}
