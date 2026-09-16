import { useState } from 'react'
import { IconChevron } from '../components/Icons'
import { Lead, Stage, splitTitle, SectionHeading } from '../components/Ui'
import { asset } from '../asset'
import { useI18n } from '../i18n'

const vistaJulyPhotos = [
  'construction/vista-july-01.jpg',
  'construction/vista-july-02.jpg',
  'construction/vista-july-03.jpg',
]

export function Construction() {
  const { t } = useI18n()
  const [house, setHouse] = useState(0)
  const [month, setMonth] = useState(6)
  const [photo, setPhoto] = useState(0)
  const houses = t.build.houses
  const gallery = house === 0 && month === 6 ? vistaJulyPhotos : []

  const selectHouse = (index: number) => {
    setHouse(index)
    setPhoto(0)
  }

  const selectMonth = (index: number) => {
    setMonth(index)
    setPhoto(0)
  }

  return (
    <>
      <Stage
        id="construction"
        className="stage--build"
        next="build-detail"
        overlay={(
          <div className="build__backdrop" aria-hidden="true">
            <img src={asset('construction-overview.jpg')} alt="" loading="lazy" decoding="async" fetchPriority="low" />
          </div>
        )}
      >
        <div className="build">
          <div className="build__copy">
            <SectionHeading kicker={t.build.kicker}>{splitTitle(t.build.title)}</SectionHeading>
            <Lead>{t.build.lead}</Lead>
          </div>
          <div className="build-line">
            <button
              type="button"
              className="build-line__arrow"
              onClick={() => selectHouse((house - 1 + houses.length) % houses.length)}
              aria-label={t.ui.prev}
            >
              <IconChevron dir="left" />
            </button>
            <ol>
              {houses.map((item, i) => (
                <li key={item.id} className={i === house ? 'is-active' : ''}>
                  <button type="button" onClick={() => selectHouse(i)} aria-pressed={i === house}>
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
              onClick={() => selectHouse((house + 1) % houses.length)}
              aria-label={t.ui.next}
            >
              <IconChevron dir="right" />
            </button>
          </div>
          <a className="text-link build__cta" href="#build-detail">
            {t.build.cta}
            <IconChevron />
          </a>
        </div>
      </Stage>

      <Stage
        id="build-detail"
        className="stage--build-detail"
        next="contacts"
        overlay={(
          <div className="build-detail__backdrop" aria-hidden="true">
            <img src={asset('construction-overview.jpg')} alt="" loading="lazy" decoding="async" fetchPriority="low" />
          </div>
        )}
      >
        <div className="build-detail">
          <div className="build-detail__copy">
            <SectionHeading kicker={<>{t.build.crumb} · {houses[house].title}</>}>{houses[house].title}</SectionHeading>
            <p className="build-detail__status">
              {t.build.current}
              <strong>{houses[house].status}</strong>
            </p>
            <Lead>{t.build.detailLead}</Lead>
            <ul className="months">
              {t.build.months.map((name, i) => (
                <li key={name}>
                  <button type="button" className={month === i ? 'is-active' : ''} onClick={() => selectMonth(i)} aria-pressed={month === i}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="build-detail__media">
            <div className="build-detail__hero">
              {gallery.length > 0 ? (
                <>
                  {gallery.map((src, index) => (
                    <img key={src} className={index === photo ? 'is-active' : ''} src={asset(src)} alt={index === photo ? `${t.build.photos} · ${index + 1}` : ''} aria-hidden={index !== photo} loading="lazy" decoding="async" />
                  ))}
                  <button type="button" className="build-detail__nav is-left" onClick={() => setPhoto((v) => (v + gallery.length - 1) % gallery.length)} aria-label={t.ui.prev}>
                    <IconChevron dir="left" />
                  </button>
                  <button type="button" className="build-detail__nav is-right" onClick={() => setPhoto((v) => (v + 1) % gallery.length)} aria-label={t.ui.next}>
                    <IconChevron dir="right" />
                  </button>
                </>
              ) : (
                <p className="build-detail__empty">{t.build.noUpdates}</p>
              )}
            </div>
            {gallery.length > 0 && (
              <div className="build-detail__gallery-foot">
                <p className="build-detail__photos-label">{t.build.photos}</p>
                <div className="build-detail__thumbs">
                  {gallery.map((image, i) => (
                    <button key={image} type="button" className={photo === i ? 'is-active' : ''} onClick={() => setPhoto(i)} aria-label={`${houses[house].title} · ${t.build.months[month]} · ${i + 1}`} aria-pressed={photo === i}>
                      <img src={asset(image)} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Stage>
    </>
  )
}
