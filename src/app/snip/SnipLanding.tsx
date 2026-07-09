'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './SnipLanding.module.css'

type Scenario = {
  label: string
  base: string
  params: Array<{ key: string; val: string }>
}

type RainItem = {
  x: number
  y: number
  speed: number
  opacity: number
  text: string
}

const trackingParams = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'fbclid',
  'gclid',
  'msclkid',
  'igshid',
  'twclid',
  'mc_eid',
  'mkt_tok',
  '_hsenc',
  'yclid',
  's_kwcid',
  'ef_id',
  'ref',
] as const

const scenarios: Scenario[] = [
  {
    label: 'from twitter.com',
    base: 'https://techcrunch.com/post',
    params: [
      { key: 'utm_source', val: 'tw' },
      { key: 'utm_medium', val: 'social' },
      { key: 'fbclid', val: 'IwAR3x' },
    ],
  },
  {
    label: 'from spotify.com',
    base: 'https://open.spotify.com/track/4uLU6h',
    params: [
      { key: 'si', val: 'a2b3c4' },
      { key: 'utm_source', val: 'copy' },
    ],
  },
  {
    label: 'from substack.com',
    base: 'https://substack.com/p/tools',
    params: [
      { key: 'mc_eid', val: '7f8e' },
      { key: 'utm_medium', val: 'email' },
      { key: 'mkt_tok', val: 'Xk9' },
    ],
  },
]

const rainParams = [
  ...trackingParams,
  'si',
  'utm_id',
  'utm_term',
  'utm_content',
]

const steps = [
  {
    index: '01',
    glyph: '↓',
    title: 'Install',
    text: 'Drag snip.app to /Applications. Open it once. It lives in your menu bar.',
    mono: false,
  },
  {
    index: '02',
    glyph: '⌘C',
    title: 'Copy any URL',
    text: 'Copy from Safari, Chrome, Slack, Mail, anywhere. snip checks the URL.',
    mono: true,
  },
  {
    index: '03',
    glyph: '✓',
    title: 'Paste clean',
    text: 'Paste the same link, minus the tracking junk.',
    mono: false,
  },
] as const

const githubUrl = 'https://github.com/maferland/snip'

function cleanUrl(url: string) {
  try {
    const parsedUrl = new URL(url)
    trackingParams.forEach(param => parsedUrl.searchParams.delete(param))
    return parsedUrl.toString()
  } catch {
    return url
  }
}

function getStrippedParams(url: string) {
  try {
    const parsedUrl = new URL(url)
    return trackingParams.filter(param => parsedUrl.searchParams.has(param))
  } catch {
    return []
  }
}

function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default function SnipLanding() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [activeParamIndex, setActiveParamIndex] = useState(-1)
  const [snippedIndices, setSnippedIndices] = useState<number[]>([])
  const [phase, setPhase] = useState<'dirty' | 'snipping' | 'clean'>('dirty')
  const [inputUrl, setInputUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const currentScenario = scenarios[scenarioIndex]
  const strippedList = useMemo(() => getStrippedParams(inputUrl), [inputUrl])
  const cleanedUrl = useMemo(() => cleanUrl(inputUrl), [inputUrl])
  const hasChange =
    inputUrl.length > 5 && strippedList.length > 0 && cleanedUrl !== inputUrl
  const noTrackingFound =
    inputUrl.length > 10 && !hasChange && isValidUrl(inputUrl)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const startScenario = (index: number) => {
      const scenario = scenarios[index]
      setScenarioIndex(index)
      setActiveParamIndex(-1)
      setSnippedIndices([])
      setPhase('dirty')

      let delay = 1400
      scenario.params
        .map((_, paramIndex) => paramIndex)
        .reverse()
        .forEach(paramIndex => {
          timers.push(
            setTimeout(() => {
              setActiveParamIndex(paramIndex)
              setPhase('snipping')
            }, delay)
          )
          delay += 680
          timers.push(
            setTimeout(() => {
              setSnippedIndices(indices => [...indices, paramIndex])
              setActiveParamIndex(-1)
            }, delay)
          )
          delay += 200
        })

      timers.push(setTimeout(() => setPhase('clean'), delay + 80))
      timers.push(
        setTimeout(
          () => startScenario((index + 1) % scenarios.length),
          delay + 3000
        )
      )
    }

    timers.push(setTimeout(() => startScenario(0), 200))

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement

    if (!canvas || !parent) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrameId = 0
    let items: RainItem[] = []

    const initItems = (width: number, height: number) => {
      const count = 22
      items = Array.from({ length: count }, (_, index) => ({
        x: (width / count) * index + Math.random() * (width / count),
        y: Math.random() * height,
        speed: 0.22 + Math.random() * 0.28,
        opacity: 0.028 + Math.random() * 0.04,
        text: rainParams[Math.floor(Math.random() * rainParams.length)],
      }))
    }

    const resize = () => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      initItems(canvas.width, canvas.height)
    }

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.font = '11px var(--font-dm-mono), monospace'
      context.textAlign = 'left'

      items.forEach(item => {
        context.globalAlpha = item.opacity
        context.fillStyle = '#16150F'
        context.fillText(item.text, item.x, item.y)
        item.y += item.speed

        if (item.y > canvas.height + 24) {
          item.y = -14
          item.text = rainParams[Math.floor(Math.random() * rainParams.length)]
          item.x = 8 + Math.random() * Math.max(canvas.width - 100, 100)
        }
      })

      context.globalAlpha = 1
      animationFrameId = requestAnimationFrame(draw)
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(parent)
    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
    }
  }, [])

  const copyCleanedUrl = async () => {
    await navigator.clipboard.writeText(cleanedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.mark}>
          <span className={styles.logoMark} aria-hidden="true">
            ✂
          </span>
          <span className={styles.wordmark}>snip.</span>
          <span className={styles.platform}>macOS</span>
        </div>
        <a className={styles.navLink} href={githubUrl} target="_blank">
          GitHub ↗
        </a>
      </nav>

      <div className={styles.heroWrap}>
        <canvas ref={canvasRef} className={styles.rain} />
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>
            <span>✂</span>
            <span>macOS · Menu Bar · Free · Open Source</span>
          </div>

          <h1 className={`${styles.display} ${styles.h1}`}>Copy clean.</h1>
          <p className={styles.subhead}>
            snip removes tracking parameters from URLs after you copy them.
          </p>

          <div className={styles.demoCard}>
            <div className={styles.chromeBar}>
              <div className={styles.chromeLeft}>
                <div className={styles.dots}>
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
                <span className={styles.scenarioLabel}>
                  {currentScenario.label}
                </span>
              </div>
              {phase === 'clean' && (
                <span className={styles.stripBadge}>
                  ✓ {snippedIndices.length} stripped
                </span>
              )}
            </div>

            <div className={styles.urlBox}>
              <span
                style={{
                  color: phase === 'clean' ? 'var(--snip-green)' : '#16150F',
                  transition: 'color 0.5s ease',
                }}
              >
                {currentScenario.base}
              </span>
              {currentScenario.params.map((param, index) => {
                const isSnipped = snippedIndices.includes(index)
                const isActive = activeParamIndex === index

                if (phase === 'clean' && isSnipped) return null

                return (
                  <span
                    key={param.key}
                    style={{
                      color: 'var(--snip-orange)',
                      background: isActive
                        ? 'var(--snip-orange-bg)'
                        : 'transparent',
                      borderRadius: '3px',
                      padding: isActive ? '1px 4px' : '0',
                      textDecoration: isSnipped ? 'line-through' : 'none',
                      opacity: isSnipped ? 0 : 1,
                      transition:
                        'opacity 0.3s ease, background 0.18s ease, padding 0.18s ease',
                    }}
                  >
                    {index === 0 ? '?' : '&'}
                    {param.key}={param.val}
                  </span>
                )
              })}
            </div>
          </div>

          <div className={styles.buttonRow}>
            <a className={styles.primaryButton} href={githubUrl} target="_blank">
              <span aria-hidden="true">↓</span>
              <span>Download on GitHub</span>
            </a>
            <a className={styles.secondaryLink} href={githubUrl} target="_blank">
              View source ↗
            </a>
          </div>
        </section>
      </div>

      <section className={styles.trySection}>
        <div className={styles.tryInner}>
          <p className={`${styles.eyebrow} ${styles.darkEyebrow}`}>Try it</p>
          <h2 className={`${styles.display} ${styles.tryHeading}`}>
            Paste a dirty URL.
          </h2>
          <input
            className={styles.input}
            value={inputUrl}
            onChange={event => setInputUrl(event.target.value)}
            placeholder="https://example.com?utm_source=twitter&fbclid=IwAR3x…"
            type="text"
          />

          {hasChange && (
            <div className={styles.resultPanel}>
              <p className={styles.cleanedLabel}>✓ Cleaned</p>
              <div className={styles.cleanedRow}>
                <p className={styles.cleanedUrl}>{cleanedUrl}</p>
                <button
                  className={`${styles.copyButton} ${
                    copied ? styles.copyButtonCopied : ''
                  }`}
                  onClick={copyCleanedUrl}
                  type="button"
                >
                  {copied ? '✓ copied' : 'copy'}
                </button>
              </div>
              <div className={styles.strippedRow}>
                <span className={styles.strippedPrefix}>stripped:</span>
                {strippedList.map(param => (
                  <span className={styles.strippedChip} key={param}>
                    {param}
                  </span>
                ))}
              </div>
            </div>
          )}

          {noTrackingFound && (
            <div className={styles.cleanBanner}>
              <span>✓ Already clean. No tracking params found.</span>
            </div>
          )}
        </div>
      </section>

      <section className={styles.strippedSection}>
        <p className={styles.eyebrow}>What gets stripped</p>
        <h2 className={`${styles.display} ${styles.sectionHeading}`}>
          Common trackers, gone.
        </h2>
        <div className={styles.chips}>
          {trackingParams.map(param => (
            <span className={styles.paramChip} key={param}>
              {param}
            </span>
          ))}
          <span className={styles.moreChip}>+ more</span>
        </div>
        <p className={styles.caption}>
          Hover a param to watch snip remove it.
        </p>
      </section>

      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <p className={styles.eyebrow}>How it works</p>
          <h2 className={`${styles.display} ${styles.sectionHeading}`}>
            Set it up once.
          </h2>
          <div className={styles.steps}>
            {steps.map(step => (
              <div key={step.index}>
                <div className={styles.stepIndex}>{step.index}</div>
                <div
                  className={`${styles.glyph} ${
                    step.mono ? styles.monoGlyph : ''
                  }`}
                >
                  {step.glyph}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bottomCta}>
        <h2 className={`${styles.display} ${styles.bottomHeading}`}>
          Copy cleaner links.
        </h2>
        <p className={styles.bottomText}>
          Free, open source, MIT licensed. Built for macOS.
        </p>
        <a className={styles.primaryButton} href={githubUrl} target="_blank">
          <span aria-hidden="true">↓</span>
          <span>Download on GitHub</span>
        </a>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerText}>snip. · MIT</span>
        <div className={styles.footerLinks}>
          <a className={styles.footerLink} href="https://maferland.com">
            maferland.com ↗
          </a>
          <a className={styles.footerLink} href={githubUrl} target="_blank">
            GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  )
}
