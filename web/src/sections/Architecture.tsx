import { useEffect, useState } from 'react'
import { asset } from '../asset'
import { Kicker, Lead, Ornament, Stage, Title, resetShineCard, shineCard, splitTitle } from '../components/Ui'
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
    <Stage id="architecture" className="stage--architecture" next="location">
      <div className={`architecture__heroes${copyHidden ? ' is-viewing' : ''}`}>
        {photos.map((src, i) => (
          <div
            key={src}
            className={`architecture__hero${i === index ? ' is-active' : ''}${i === prevIndex ? ' is-leaving' : ''}`}
          >
            {(i === index || i === prevIndex) && <img className="architecture__hero-bg" src={src} alt="" />}
            <img className="architecture__hero-photo" src={src} alt="" />
          </div>
        ))}
      </div>
      <div className="architecture">
        <div className={`architecture__copy${copyHidden ? ' is-hidden' : ''}`}>
          <Kicker>{t.architecture.kicker}</Kicker>
          <Title>{splitTitle(t.architecture.title)}</Title>
          <Ornament />
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
