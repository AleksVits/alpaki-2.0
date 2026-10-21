import { GoldIcon } from '../components/GoldIcon'
import { IconChevron } from '../components/Icons'
import { useNearSection } from '../useNearSection'
import { useEffect, useRef, useState } from 'react'
import { asset } from '../asset'
import { Lead, Stage, SectionHeading } from '../components/Ui'
import { resetShineCard, shineCard } from '../components/uiEffects'
import { splitTitle } from '../components/titleText'
import { useI18n } from '../useI18n'

const photos = Array.from({ length: 8 }, (_, i) => asset(`architecture/${String(i).padStart(2, '0')}.webp`))

export function Architecture() {
  const near = useNearSection('architecture')
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [copyHidden, setCopyHidden] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const total = photos.length
  const start = index % total

  const goTo = (next: number) => {
    if (next !== index) setPrevIndex(index)
    setIndex(next)
    setCopyHidden(true)
  }

  useEffect(() => {
    if (prevIndex === null) return
    const id = window.setTimeout(() => setPrevIndex(null), 650)
    return () => window.clearTimeout(id)
  }, [index, prevIndex])

  useEffect(() => {
    const section = document.getElementById('architecture')
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setCopyHidden(false)
          setPrevIndex(null)
        }
      },
      { root: document.querySelector('.site'), threshold: 0.12, rootMargin: '0px' },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <Stage
      id="architecture"
      className={`stage--architecture${copyHidden ? ' is-viewing' : ''}`}
      next="location"
      overlay={(
        <div className="architecture__viewer-bg" aria-hidden="true">
          <img src={near ? photos[index] : undefined} alt="" />
        </div>
      )}
    >
      <div
        className={`architecture__heroes${copyHidden ? ' is-viewing' : ''}`}
        onTouchStart={(event) => {
          const touch = event.touches[0]
          touchStart.current = { x: touch.clientX, y: touch.clientY }
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current
          touchStart.current = null
          if (!start || !copyHidden) return
          const touch = event.changedTouches[0]
          const dx = touch.clientX - start.x
          const dy = touch.clientY - start.y
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            goTo((index + (dx < 0 ? 1 : -1) + total) % total)
          }
        }}
        onTouchCancel={() => { touchStart.current = null }}
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className={`architecture__hero${i === index ? ' is-active' : ''}${i === prevIndex ? ' is-leaving' : ''}`}
          >
            {(i === index || i === prevIndex) && <img className="architecture__hero-bg" src={near ? src : undefined} alt="" />}
            <img className="architecture__hero-photo" src={near ? src : undefined} alt={t.architecture.captions[i]} />
          </div>
        ))}
        {copyHidden && (
          <button
            type="button"
            className="architecture__viewer-close"
            onClick={() => setCopyHidden(false)}
            aria-label={t.ui.close}
          >
            <GoldIcon viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </GoldIcon>
          </button>
        )}
      </div>
      <div className="architecture">
        <div className={`architecture__copy${copyHidden ? ' is-hidden' : ''}`}>
          <SectionHeading kicker={t.architecture.kicker}>{splitTitle(t.architecture.title)}</SectionHeading>
          <div className="architecture__details">
          <Lead aria-hidden={copyHidden}>{t.architecture.text}</Lead>
          <p className="architecture__quote" aria-hidden={copyHidden}>{t.architecture.note}</p>
          </div>
        </div>
      </div>
      <div className="thumbs glass glass--bar">
        <button
          type="button"
          className="thumbs__arrow"
          onClick={() => goTo((index - 1 + total) % total)}
          aria-label={t.ui.prev}
        >
          <IconChevron dir="left" />
        </button>
        {Array.from({ length: 4 }, (_, i) => {
          const n = (start + i) % total
          return (
            <button
              key={photos[n]}
              type="button"
              className={`thumbs__item ${n === index ? 'is-active' : ''}`}
              onClick={() => goTo(n)}
              onPointerMove={shineCard}
              onPointerLeave={resetShineCard}
              aria-label={`${t.ui.photo} ${n + 1} · ${t.architecture.captions[n]}`}
              aria-pressed={n === index}
            >
              <img src={near ? photos[n] : undefined} alt="" />
              <span>{String(n + 1).padStart(2, '0')}</span>
            </button>
          )
        })}
        <div className="pager">
          <span className="pager__num">
            {String(start + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <button
          type="button"
          className="thumbs__arrow"
          onClick={() => goTo((index + 1) % total)}
          aria-label={t.ui.next}
        >
          <IconChevron dir="right" />
        </button>
      </div>
    </Stage>
  )
}
