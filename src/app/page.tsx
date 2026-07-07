import Typewriter from '@/components/Typewriter'
import { LinkButton } from '@/components/ui/LinkButton'
import Link from 'next/link'

const selectedWork = [
  {
    description:
      'Point at what is wrong in any UI and Claude fixes it. Drop a pin, type a comment, and the agent works each annotation as a discrete fix.',
    href: '/work/pinpoint',
    linkLabel: 'case study →',
    name: 'Pinpoint',
    subtitle: 'visual review for AI agents',
    tag: 'MCP',
    tech: ['TypeScript', 'Bun'],
  },
  {
    description:
      'A community platform for Quebec City runners to find clubs, discover events, and explore routes.',
    href: '/work/quebec-run',
    linkLabel: 'case study →',
    name: 'quebec.run',
    subtitle: 'running hub',
    tag: 'web',
    tech: ['Next.js', 'TypeScript'],
  },
  {
    description:
      'A quiet wind-down companion for building a better night routine. Currently in the works.',
    href: '/work/bonne-nuit',
    linkLabel: 'preview →',
    name: 'Bonne Nuit',
    subtitle: 'a wind-down companion',
    tag: 'in progress',
    tech: ['Swift'],
  },
  {
    description:
      'Everything stays on-device. No ads, no accounts, no cloud sync. One-time purchase, your data never leaves the phone.',
    href: 'https://getcalmcycle.com',
    linkLabel: 'view ↗',
    name: 'Calm Cycle',
    subtitle: 'private period tracker',
    tag: 'iOS',
    tech: ['Swift', 'SwiftUI'],
  },
]

const tools = [
  {
    description: 'Claude Code spend in the menu bar.',
    href: 'https://github.com/maferland/burn',
    name: 'Burn',
    platform: 'macOS',
  },
  {
    description: 'Local-first task tracker across AI agents.',
    href: 'https://github.com/maferland/relay',
    name: 'Relay',
    platform: 'CLI',
  },
  {
    description: 'Strips tracking params from copied URLs.',
    href: 'https://github.com/maferland/snip',
    name: 'Snip',
    platform: 'macOS',
  },
  {
    description: 'Auto-clears secrets from the clipboard.',
    href: 'https://github.com/maferland/clipshield',
    name: 'ClipShield',
    platform: 'macOS',
  },
  {
    description: 'Pixel-level diffing for two images.',
    href: 'https://github.com/maferland/differ',
    name: 'Differ',
    platform: 'Electron',
  },
  {
    description: 'Cleans up messy clipboard text.',
    href: 'https://github.com/maferland/tidy',
    name: 'Tidy',
    platform: 'macOS',
  },
]

function SelectedWorkCard({ work }: { work: (typeof selectedWork)[number] }) {
  const content = (
    <>
      <div className="stripe-header" />
      <div className="p-[18px] pb-5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-[19px] font-bold">{work.name}</h2>
          <span
            className={
              work.tag === 'in progress'
                ? 'tag border-[var(--accent)] text-[var(--accent)]'
                : 'tag'
            }
          >
            {work.tag}
          </span>
        </div>
        <div className="mono my-2 text-[11px] text-[var(--accent)]">
          {work.subtitle}
        </div>
        <p className="mb-4 text-[13.5px] leading-[1.55] text-[var(--muted)]">
          {work.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {work.tech.map(tech => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <span
            className={
              work.href
                ? 'mono whitespace-nowrap text-xs text-[var(--accent)]'
                : 'mono whitespace-nowrap text-xs text-[var(--faint)]'
            }
          >
            {work.linkLabel}
          </span>
        </div>
      </div>
    </>
  )

  return (
    <Link
      className="panel panel-hover block overflow-hidden text-inherit no-underline"
      href={work.href}
    >
      {content}
    </Link>
  )
}

export default function Home() {
  return (
    <div>
      <section className="hero-grid site-container grid grid-cols-[1.05fr_.95fr] items-center gap-11 py-[60px] pb-[50px]">
        <div>
          <div className="mono mb-6 inline-flex items-center gap-2 text-[11.5px] tracking-[0.04em] text-[var(--accent)] max-sm:text-[10.5px]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--accent)] [animation:pulse_2s_infinite]" />
            Frontend engineer · open to new roles
          </div>
          <h1 className="text-[52px] font-bold leading-[1.02] tracking-[-0.03em] max-sm:text-[32px]">
            The details are the product.
          </h1>
          <p className="mt-5 max-w-[520px] text-lg leading-[1.55] text-[var(--body)] max-sm:text-base">
            Ten years building the parts of software people actually touch. I
            care about transitions, edge states, and the 50ms you don&apos;t
            notice but feel.
          </p>
          <p className="mt-4 max-w-[520px] text-[15px] leading-6 text-[var(--muted)]">
            Web, iOS, macOS. Lately a lot of building alongside AI too.
          </p>
          <div className="mt-[30px] grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <LinkButton
              className="col-span-2 w-full sm:w-auto"
              href="mailto:me@maferland.com"
            >
              Get in touch
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
        </div>

        <div className="hero-terminal panel overflow-hidden shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-[7px] border-b border-[var(--line)] px-[15px] py-[13px]">
            <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
            <span className="mono ml-2 text-[11px] text-[var(--faint)]">
              ~/maferland
            </span>
          </div>
          <div className="mono px-[18px] py-[18px] pb-5 text-[13px] leading-[1.85]">
            <div className="text-[var(--faint)]">
              $ <span className="text-[var(--text)]">whoami</span>
            </div>
            <div className="my-1 text-[15px] text-[var(--accent)]">
              Marc-Antoine Ferland
            </div>
            <div className="my-2.5 h-px bg-[var(--line)]" />
            <div className="text-[var(--muted)]">
              role&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[var(--body)]">frontend engineer</span>
            </div>
            <div className="text-[var(--muted)]">
              focus&nbsp;&nbsp;&nbsp;
              <span className="text-[var(--body)]">
                ships · sweats details · 0→1
              </span>
            </div>
            <div className="text-[var(--muted)]">
              stack&nbsp;&nbsp;&nbsp;
              <span className="text-[var(--body)]">
                TS · React · Next · Swift
              </span>
            </div>
            <div className="mt-1.5 text-[var(--muted)]">
              build&nbsp;&nbsp;&nbsp;
              <span className="text-[var(--accent)]">
                <Typewriter />
              </span>
              <span className="text-[var(--accent)] [animation:blink_1s_step-end_infinite]">
                ▌
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="metrics-grid site-container grid grid-cols-3 px-0">
          {[
            ['10+', 'years shipping software'],
            ['10', 'products & open-source tools'],
            ['3', 'platforms · web · iOS · macOS'],
          ].map(([stat, label]) => (
            <div
              className="border-[var(--line)] px-6 py-7 [border-left-width:1px] first:border-l-0"
              key={label}
            >
              <div className="text-4xl font-bold tracking-[-0.02em] max-sm:text-3xl">
                {stat}
              </div>
              <div className="mono mt-1 text-[11.5px] text-[var(--muted)]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-container pt-[54px]" id="work">
        <div className="section-label mb-6">
          <span>
            <span className="accent">01</span>&nbsp;&nbsp;selected work
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[18px]">
          {selectedWork.map(work => (
            <SelectedWorkCard key={work.name} work={work} />
          ))}
        </div>
      </section>

      <section className="site-container pt-[46px]">
        <div className="section-label mb-[18px]">
          <span>
            <span className="accent">02</span>&nbsp;&nbsp;also building
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
          {tools.map(tool => (
            <a className="tool-card" href={tool.href} key={tool.name}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold">{tool.name}</h2>
                  <p className="mt-2 text-[13px] leading-5 text-[var(--muted)]">
                    {tool.description}
                  </p>
                </div>
                <span className="mono shrink-0 text-xs text-[var(--accent)]">
                  ↗
                </span>
              </div>
              <div className="mt-3">
                <span className="mono rounded border border-[var(--line)] px-1.5 py-0.5 text-[9px] text-[var(--faint)]">
                  {tool.platform}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="site-container py-[46px] pb-14">
        <div className="section-label mb-7">
          <span>
            <span className="accent">03</span>&nbsp;&nbsp;off the clock
          </span>
        </div>
        <div className="max-w-[600px]">
          <p className="text-2xl font-bold tracking-[-0.02em]">
            I cook everything from scratch.
          </p>
          <p className="mt-1 text-2xl font-bold tracking-[-0.02em]">
            I run, a lot.
          </p>
          <p className="mt-5 text-[15px] leading-[1.65] text-[var(--muted)]">
            Wanted to make games. Spent years in the backend. Ended up here.
            Still trying to make things feel right.
          </p>
        </div>
      </section>
    </div>
  )
}
