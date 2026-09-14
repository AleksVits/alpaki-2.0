import { useState } from 'react'
import { IconChevron } from '../components/Icons'
import { Placeholder } from '../components/Placeholder'
import { Kicker, Lead, Ornament, Stage, Title, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

export function Construction() {
  const { t } = useI18n()
  const [house, setHouse] = useState(0)
  const [month, setMonth] = useState(6)
  const [photo, setPhoto] = useState(0)
  const houses = t.build.houses

  return (
    <>
      <Stage id="construction" className="stage--build" next="build-detail">
        <Placeholder className="stage__photo" />
        <div className="build">
          <Kicker>{t.build.kicker}</Kicker>
          <Title>{splitTitle(t.build.title)}</Title>
          <Ornament />
          <Lead>{t.build.lead}</Lead>
          <div className="build-line">
            <button
              type="button"
              className="build-line__arrow"
              onClick={() => setHouse((v) => (v - 1 + houses.length) % houses.length)}
              aria-label={t.ui.prev}
            >
              <IconChevron dir="left" />
            </button>
            <ol>
              {houses.map((item, i) => (
                <li key={item.id} className={i === house ? 'is-active' : ''}>
                  <button type="button" onClick={() => setHouse(i)}>
                    <span>{item.n}</span>
                    <strong>{item.title}</strong>
                    <small>{item.status}</small>
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              className="build-line__arrow"
              onClick={() => setHouse((v) => (v + 1) % houses.length)}
              aria-label={t.ui.next}
            >
              <IconChevron dir="right" />
            </button>
          </div>
          <a className="text-link" href="#build-detail">
            {t.build.cta}
          </a>
        </div>
      </Stage>

      <Stage id="build-detail" className="stage--build-detail" next="contacts">
        <div className="build-detail">
          <div className="build-detail__copy">
            <Kicker>{t.build.crumb}  ·  {houses[house].title}</Kicker>
            <Title>{houses[house].title}</Title>
            <Ornament />
            <p className="build-detail__status">
              {t.build.current}
              <strong>{houses[house].status}</strong>
            </p>
            <Lead>{t.build.detailLead}</Lead>
            <ul className="months">
              {t.build.months.map((name, i) => (
                <li key={name}>
                  <button type="button" className={month === i ? 'is-active' : ''} onClick={() => setMonth(i)}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="build-detail__media">
            <div className="build-detail__hero">
              <Placeholder className="build-detail__hero-ph" label={`${houses[house].title} · ${t.build.months[month]}`} />
              <button type="button" className="build-detail__nav is-left" onClick={() => setPhoto((v) => (v + 2) % 3)}>
                ‹
              </button>
              <button type="button" className="build-detail__nav is-right" onClick={() => setPhoto((v) => (v + 1) % 3)}>
                ›
              </button>
            </div>
            <p className="build-detail__photos-label">{t.build.photos}</p>
            <div className="build-detail__thumbs">
              {[0, 1, 2].map((i) => (
                <button key={i} type="button" className={photo === i ? 'is-active' : ''} onClick={() => setPhoto(i)}>
                  <Placeholder label={`${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Stage>
    </>
  )
}
