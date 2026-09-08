import { useState } from 'react'
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
  const total = photos.length
  const start = index % total

  return (
    <Stage id="architecture" className="stage--architecture" next="location">
      <div className="architecture__heroes">
        {photos.map((src, i) => (
          <img
            key={src}
            className={`architecture__hero ${i === index ? 'is-active' : ''}`}
            src={src}
            alt=""
          />
        ))}
      </div>
      <div className="architecture">
        <div className="architecture__copy">
          <Kicker>{t.architecture.kicker}</Kicker>
          <Title>{splitTitle(t.architecture.title)}</Title>
          <Ornament />
          <Lead>{t.architecture.text}</Lead>
          <ul className="materials">
            {t.architecture.materials.map((item, i) => (
              <li key={item.id}>
                <span className="materials__icon">
                  <img src={materialIcons[i]} alt="" />
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="thumbs glass glass--bar">
        <button
          type="button"
          className="thumbs__arrow"
          onClick={() => setIndex((v) => (v - 1 + total) % total)}
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
              onClick={() => setIndex(n)}
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
          onClick={() => setIndex((v) => (v + 1) % total)}
          aria-label={t.ui.next}
        >
          ›
        </button>
      </div>
    </Stage>
  )
}
