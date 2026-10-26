import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Header } from '../components/Header'
import { Logo } from '../components/Logo'
import { Btn, Kicker, Ornament } from '../components/Ui'
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
const skyStars = Array.from({ length: 170 }, (_, i) => {
  const size = random()
  return {
    x: +(random() * 100).toFixed(2),
    y: +(random() * 100).toFixed(2),
    r: +(0.35 + size * size * 1.15).toFixed(2),
    o: +(0.25 + random() * 0.6).toFixed(2),
    twinkle: i % 5 === 0,
    delay: +(random() * 6).toFixed(2),
  }
})

/* A small constellation beside each chapter, on alternating sides. Its large star stands
   for the chapter; the figure lights up and its lines are drawn as the chapter is reached. */
type ConstStar = { x: number; y: number; main?: boolean }
const constellations: ConstStar[][] = [
  [{ x: 12, y: 70 }, { x: 34, y: 42 }, { x: 62, y: 30, main: true }, { x: 84, y: 52 }, { x: 70, y: 86 }],
  [{ x: 14, y: 22 }, { x: 40, y: 38, main: true }, { x: 30, y: 72 }, { x: 64, y: 84 }, { x: 88, y: 60 }],
  [{ x: 86, y: 18 }, { x: 58, y: 34 }, { x: 36, y: 56, main: true }, { x: 50, y: 88 }, { x: 16, y: 80 }],
  [{ x: 20, y: 40 }, { x: 46, y: 24 }, { x: 72, y: 44, main: true }, { x: 60, y: 76 }, { x: 88, y: 90 }],
  [{ x: 80, y: 74 }, { x: 56, y: 58 }, { x: 44, y: 28, main: true }, { x: 18, y: 18 }, { x: 24, y: 62 }],
]

/* Names from the legend are set in capitals; they get a calmer letter-spaced style. */
const NAME = /(?<![’'\p{L}])(\p{Lu}{4,})(?![’'\p{L}])/u

function withNames(text: string): ReactNode {
  return text.split(NAME).map((part, i) =>
    i % 2 === 1 && part !== 'LEGEND' ? <span key={i} className="legend-name">{part}</span> : <Fragment key={i}>{part}</Fragment>,
  )
}

function Block({ block, first }: { block: LegendBlock; first: boolean }) {
  if (Array.isArray(block)) {
    return (
      <ul className="legend-values">
        {block.map((value) => <li key={value}>{value}</li>)}
      </ul>
    )
  }
  return <p className={first ? 'legend-panel__first' : undefined}>{withNames(block)}</p>
}

function Star({ className = '' }: { className?: string }) {
  return (
    <svg className={`legend-star ${className}`} viewBox="-10 -10 20 20" aria-hidden="true">
      <path d="M0 -10 L1.4 -1.4 L10 0 L1.4 1.4 L0 10 L-1.4 1.4 L-10 0 L-1.4 -1.4 Z" />
    </svg>
  )
}

export function LegendPage() {
  const { t, lang } = useI18n()
  const home = pagePath(lang, 'home')
  const scrollerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  // Everything is visible in the prerendered markup; chapters still below the fold are
  // hidden after mount and revealed as the reader reaches them.
  const [waiting, setWaiting] = useState<ReadonlySet<number>>(() => new Set())

  useEffect(() => {
    const scroller = scrollerRef.current
    const path = pathRef.current
    if (!scroller || !path) return
    const chapters = Array.from(path.querySelectorAll<HTMLElement>('.legend-chapter'))
    const motion = !reducedMotion()

    let frame = 0
    const update = () => {
      frame = 0
      const view = scroller.clientHeight
      const rect = path.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (view * 0.62 - rect.top) / Math.max(1, rect.height)))
      path.style.setProperty('--legend-progress', progress.toFixed(4))
      if (motion) scroller.style.setProperty('--legend-scroll', String(Math.round(scroller.scrollTop)))
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
      const below = chapters.flatMap((node, i) => (node.getBoundingClientRect().top > view * 0.9 ? [i] : []))
      setWaiting(new Set(below))
      observer = new IntersectionObserver((entries) => {
        const seen = entries.filter((entry) => entry.isIntersecting).map((entry) => chapters.indexOf(entry.target as HTMLElement))
        if (!seen.length) return
        seen.forEach((i) => observer?.unobserve(chapters[i]))
        setWaiting((current) => {
          const next = new Set(current)
          seen.forEach((i) => next.delete(i))
          return next
        })
      }, { root: scroller, threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
      below.forEach((i) => observer?.observe(chapters[i]))
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer?.disconnect()
    }
  }, [])

  return (
    <>
      <Header page="legend" active="" />
      <div ref={scrollerRef} className="site site--legend">
        <div className="legend-sky" aria-hidden="true">
          <span className="legend-sky__glow legend-sky__glow--gold" />
          <span className="legend-sky__glow legend-sky__glow--cool" />
          <span className="legend-sky__glow legend-sky__glow--low" />
          <svg className="legend-sky__stars" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
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

        <main className="legend" id="top">
          <header className="legend-hero">
            <Kicker>{t.legend.kicker}</Kicker>
            <h1 className="legend-hero__title">{t.legend.title}</h1>
            <Ornament />
            <p className="legend-hero__lead">{withNames(t.legend.lead)}</p>
          </header>

          <div ref={pathRef} className="legend-path">
            <span className="legend-path__line" aria-hidden="true"><span /></span>

            <ol className="legend-chapters" aria-label={t.legend.chaptersLabel}>
              {t.legend.chapters.map((chapter, i) => (
                <li key={chapter.n} className={`legend-chapter${waiting.has(i) ? ' is-waiting' : ''}`}>
                  <div className={`legend-constellation legend-constellation--${i % 2 ? 'right' : 'left'}`} aria-hidden="true">
                    <svg className="legend-constellation__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline
                        pathLength={1}
                        vectorEffect="non-scaling-stroke"
                        points={constellations[i % constellations.length].map(({ x, y }) => `${x},${y}`).join(' ')}
                      />
                    </svg>
                    {constellations[i % constellations.length].map((star, j) => (
                      <span
                        key={j}
                        className={`legend-constellation__star${star.main ? ' is-main' : ''}`}
                        style={{ left: `${star.x}%`, top: `${star.y}%` }}
                      >
                        <Star />
                      </span>
                    ))}
                  </div>
                  <span className="legend-chapter__numeral" aria-hidden="true">{chapter.n}</span>
                  <article className="legend-panel" aria-labelledby={`legend-chapter-${i + 1}`}>
                    <span className="legend-panel__rule" aria-hidden="true" />
                    <h2 id={`legend-chapter-${i + 1}`} className="legend-panel__title">
                      <span className="visually-hidden">{chapter.n}. </span>
                      {chapter.title}
                    </h2>
                    {chapter.blocks.map((block, j) => (
                      <Block key={j} block={block} first={j === 0} />
                    ))}
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <section className="legend-finale" aria-labelledby="legend-finale-title">
            <Star className="legend-finale__star" />
            <Kicker>{t.legend.finaleKicker}</Kicker>
            <h2 id="legend-finale-title" className="legend-finale__title">{t.legend.finaleTitle}</h2>
            <div className="btn-row legend-finale__actions">
              <Btn href={`${home}#apartments`} solid arrow>{t.legend.apartments}</Btn>
              <Btn href={`${home}#invest-formats`} className="btn--secondary" arrow={false}>{t.legend.invest}</Btn>
              <Btn href={home} className="btn--secondary" arrow={false}>{t.legend.home}</Btn>
            </div>
          </section>
        </main>

        <footer className="legend-footer">
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
