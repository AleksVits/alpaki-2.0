import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { asset } from '../asset'
import { Header } from '../components/Header'
import { IconChevron } from '../components/Icons'
import { Logo } from '../components/Logo'
import { Btn } from '../components/Ui'
import type { LegendBlock } from '../i18n'
import { pagePath } from '../route'
import { reducedMotion } from '../scroll'
import { useI18n } from '../useI18n'

/* The sky is generated from a fixed seed, so the prerendered page and the browser draw the same stars. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

const random = seeded(2026)
const skyStars = Array.from({ length: 150 }, (_, i) => {
  const size = random()
  return {
    x: +(random() * 100).toFixed(2),
    y: +(random() * 100).toFixed(2),
    r: +(0.3 + size * size * 1.1).toFixed(2),
    o: +(0.2 + random() * 0.55).toFixed(2),
    twinkle: i % 5 === 0,
    delay: +(random() * 6).toFixed(2),
  }
})

/* The map of the legend on the first screen: five stars, one per chapter (x / y in %). */
const mapStars = [
  { x: 8, y: 62 },
  { x: 29, y: 30 },
  { x: 50, y: 70 },
  { x: 71, y: 24 },
  { x: 92, y: 54 },
]

/* Names from the legend are set in capitals; they get a calmer letter-spaced style. */
const NAME = /(?<![’'\p{L}])(\p{Lu}{4,})(?![’'\p{L}])/u

function withNames(text: string): ReactNode {
  return text.split(NAME).map((part, i) =>
    i % 2 === 1 && part !== 'LEGEND' ? <span key={i} className="lg-name">{part}</span> : <Fragment key={i}>{part}</Fragment>,
  )
}

function Star({ className = '' }: { className?: string }) {
  return (
    <svg className={`lg-star ${className}`} viewBox="-10 -10 20 20" aria-hidden="true">
      <path d="M0 -10 L1.3 -1.3 L10 0 L1.3 1.3 L0 10 L-1.3 1.3 L-10 0 L-1.3 -1.3 Z" />
    </svg>
  )
}

function Block({ block, index, quote }: { block: LegendBlock; index: number; quote: boolean }) {
  const style = { '--i': index } as CSSProperties
  if (Array.isArray(block)) {
    return (
      <ol className="lg-values lg-reveal" style={style}>
        {block.map((value, i) => (
          <li key={value}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            {value}
          </li>
        ))}
      </ol>
    )
  }
  if (quote) {
    return (
      <blockquote className="lg-quote lg-reveal" style={style}>
        <Star className="lg-quote__star" />
        <p>{withNames(block)}</p>
      </blockquote>
    )
  }
  return <p className={`lg-reveal${index === 0 ? ' lg-lead' : ''}`} style={style}>{withNames(block)}</p>
}

export function LegendPage() {
  const { t, lang } = useI18n()
  const home = pagePath(lang, 'home')
  const chapters = t.legend.chapters
  const scrollerRef = useRef<HTMLDivElement>(null)
  // Everything is visible in the prerendered markup. After mount, sections still below the
  // fold wait and are revealed as the reader reaches them.
  const [waiting, setWaiting] = useState<ReadonlySet<string>>(() => new Set())
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const motion = !reducedMotion()
    const sections = Array.from(scroller.querySelectorAll<HTMLElement>('[data-reveal]'))
    const chapterNodes = Array.from(scroller.querySelectorAll<HTMLElement>('.lg-chapter'))

    let frame = 0
    const update = () => {
      frame = 0
      if (motion) scroller.style.setProperty('--lg-scroll', String(Math.round(scroller.scrollTop)))
      // The active chapter is the one crossing the middle of the screen.
      const middle = scroller.clientHeight / 2
      let current = -1
      chapterNodes.forEach((node, i) => {
        const rect = node.getBoundingClientRect()
        if (rect.top <= middle && rect.bottom > middle * 0.35) current = i
      })
      const last = chapterNodes[chapterNodes.length - 1]
      if (last && last.getBoundingClientRect().bottom < middle * 0.35) current = -1
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    let observer: IntersectionObserver | undefined
    if (motion && 'IntersectionObserver' in window) {
      const view = scroller.clientHeight
      const below = sections.filter((node) => node.getBoundingClientRect().top > view * 0.88)
      setWaiting(new Set(below.map((node) => node.dataset.reveal!)))
      observer = new IntersectionObserver((entries) => {
        const seen = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target as HTMLElement)
        if (!seen.length) return
        seen.forEach((node) => observer?.unobserve(node))
        setWaiting((current) => {
          const next = new Set(current)
          seen.forEach((node) => next.delete(node.dataset.reveal!))
          return next
        })
      }, { root: scroller, threshold: 0.12, rootMargin: '0px 0px -10% 0px' })
      below.forEach((node) => observer?.observe(node))
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer?.disconnect()
    }
  }, [])

  const state = (key: string) => (waiting.has(key) ? ' is-waiting' : '')

  return (
    <>
      <Header page="legend" active="" />
      <div ref={scrollerRef} className="site site--legend">
        <div className="lg-sky" aria-hidden="true">
          <span className="lg-sky__glow lg-sky__glow--gold" />
          <span className="lg-sky__glow lg-sky__glow--cool" />
          <svg className="lg-sky__stars" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            {skyStars.map((star, i) => (
              <circle
                key={i}
                cx={star.x}
                cy={star.y}
                r={star.r / 10}
                className={star.twinkle ? 'is-twinkling' : undefined}
                style={{ '--star-o': star.o, animationDelay: `${star.delay}s` } as CSSProperties}
              />
            ))}
          </svg>
        </div>
        <div className="lg-grain" aria-hidden="true" />

        <nav className={`lg-index${active >= 0 ? ' is-shown' : ''}`} aria-label={t.legend.chaptersLabel}>
          {chapters.map((chapter, i) => (
            <a
              key={chapter.n}
              href={`#chapter-${i + 1}`}
              className={i === active ? 'is-active' : undefined}
              aria-current={i === active ? 'location' : undefined}
            >
              <span className="lg-index__n">{chapter.n}</span>
              <span className="lg-index__title">{chapter.title}</span>
            </a>
          ))}
        </nav>

        <main className="lg" id="top">
          <section className="lg-hero" aria-labelledby="lg-title">
            <div className="lg-hero__photo" aria-hidden="true">
              <img src={asset('infrastructure/overview-night.jpg')} alt="" fetchPriority="high" decoding="async" />
            </div>
            <div className="lg-hero__veil" aria-hidden="true" />
            <div className="lg-hero__content">
              <img className="lg-hero__mark" src={asset('logo-mark.webp?v=4')} alt="" />
              <p className="lg-kicker">{t.legend.kicker}</p>
              <h1 id="lg-title" className="lg-hero__title">
                <span>AL’PAKI</span> <span className="lg-gold">LEGEND</span>
              </h1>
              <span className="lg-rule" aria-hidden="true" />
              <p className="lg-hero__lead">{withNames(t.legend.lead)}</p>
            </div>

            <nav className="lg-map" aria-label={t.legend.mapLabel}>
              <svg className="lg-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polyline vectorEffect="non-scaling-stroke" points={mapStars.map(({ x, y }) => `${x},${y}`).join(' ')} />
              </svg>
              {chapters.map((chapter, i) => (
                <a
                  key={chapter.n}
                  className="lg-map__star"
                  href={`#chapter-${i + 1}`}
                  style={{ left: `${mapStars[i].x}%`, top: `${mapStars[i].y}%`, '--i': i } as CSSProperties}
                >
                  <Star />
                  <span className="lg-map__label">
                    <span className="lg-map__n">{chapter.n}</span>
                    <span className="lg-map__title">{chapter.title}</span>
                  </span>
                </a>
              ))}
            </nav>

            <a className="scroll-hint lg-hero__hint" href="#chapter-1" aria-label={t.ui.nextSection}>
              <IconChevron />
            </a>
          </section>

          {chapters.map((chapter, i) => (
            <section
              key={chapter.n}
              id={`chapter-${i + 1}`}
              data-reveal={`c${i}`}
              className={`lg-chapter${chapter.scene ? ' lg-chapter--scene' : ''}${state(`c${i}`)}`}
              aria-labelledby={`chapter-${i + 1}-title`}
            >
              {chapter.scene && (
                <div className="lg-chapter__photo" aria-hidden="true">
                  <img src={asset('hero.jpg?v=2')} alt="" loading="lazy" decoding="async" />
                </div>
              )}
              <div className="lg-chapter__inner">
                <header className="lg-chapter__aside">
                  <span className="lg-chapter__numeral" aria-hidden="true">{chapter.n}</span>
                  <p className="lg-kicker">{t.legend.chapter} {chapter.n}</p>
                  <h2 id={`chapter-${i + 1}-title`} className="lg-chapter__title">{chapter.title}</h2>
                  <span className="lg-rule" aria-hidden="true" />
                </header>
                <div className="lg-chapter__body">
                  {chapter.blocks.map((block, j) => (
                    <Block key={j} block={block} index={j} quote={chapter.quote === j} />
                  ))}
                </div>
              </div>
            </section>
          ))}

          <section className={`lg-finale${state('finale')}`} data-reveal="finale" aria-labelledby="lg-finale-title">
            <div className="lg-finale__photo" aria-hidden="true">
              <img src={asset('contacts-background.jpg')} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="lg-finale__veil" aria-hidden="true" />
            <div className="lg-finale__content">
              <Star className="lg-finale__star" />
              <p className="lg-kicker">{t.legend.finaleKicker}</p>
              <h2 id="lg-finale-title" className="lg-finale__title">{t.legend.finaleTitle}</h2>
              <div className="btn-row lg-finale__actions">
                <Btn href={`${home}#apartments`} solid arrow>{t.legend.apartments}</Btn>
                <Btn href={`${home}#invest-formats`} className="btn--secondary" arrow={false}>{t.legend.invest}</Btn>
                <Btn href={home} className="btn--secondary" arrow={false}>{t.legend.home}</Btn>
              </div>
            </div>
          </section>
        </main>

        <footer className="lg-footer">
          <Logo compact href={home} />
          <p>
            <span>{t.contacts.company}</span>
            <span>{t.legend.footer}</span>
          </p>
        </footer>
      </div>
    </>
  )
}
