import { useEffect, useRef, useState } from 'react'
import { asset } from '../asset'
import { Lead, Stage, resetShineCard, shineCard, splitTitle, SectionHeading } from '../components/Ui'
import { useI18n } from '../i18n'

const materialIcons = [
  asset('icons/material-stone.png?v=4'),
  asset('icons/material-wood.png?v=4'),
  asset('icons/material-glass.png?v=4'),
  asset('icons/material-terrace.png?v=4'),
]
const photos = Array.from({ length: 8 }, (_, i) => asset(`architecture/${String(i).padStart(2, '0')}.png`))

export function Architecture() {
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
          <img src={photos[index]} alt="" />
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
            {(i === index || i === prevIndex) && <img className="architecture__hero-bg" src={src} alt="" />}
            <img className="architecture__hero-photo" src={src} alt={`${t.architecture.kicker} — ${i + 1}`} />
          </div>
        ))}
        {copyHidden && (
          <button
            type="button"
            className="architecture__viewer-close"
            onClick={() => setCopyHidden(false)}
            aria-label={t.ui.close}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>
      <div className="architecture">
        <div className={`architecture__copy${copyHidden ? ' is-hidden' : ''}`}>
          <SectionHeading kicker={t.architecture.kicker}>{splitTitle(t.architecture.title)}</SectionHeading>
          <div className="architecture__details">
          <Lead aria-hidden={copyHidden}>{t.architecture.text}</Lead>
          <ul className="materials" aria-hidden={copyHidden}>
            {t.architecture.materials.map((item, i) => (
              <li key={item.id}>
                <span className="materials__icon">
                  <img src={materialIcons[i]} alt="" />
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
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
          ‹
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
              aria-label={`${String(n + 1).padStart(2, '0')}`}
              aria-pressed={n === index}
            >
              <img src={photos[n]} alt="" />
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
          ›
        </button>
      </div>
    </Stage>
  )
}
