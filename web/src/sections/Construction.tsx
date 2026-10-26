import { useState } from 'react'
import { IconChevron } from '../components/Icons'
import { Lead, Stage, SectionHeading } from '../components/Ui'
import { splitTitle } from '../components/titleText'
import { asset } from '../asset'
import { useI18n } from '../useI18n'

// Construction materials by `house:month`. Empty for now: every month shows the placeholder until
// real site photos arrive. Former July visuals for Vista stay in public/construction/.
const photosByHouseMonth: Record<string, string[]> = {}

export function Construction() {
  const { t } = useI18n()
  const [house, setHouse] = useState(0)
  const [month, setMonth] = useState(6)
  const [photo, setPhoto] = useState(0)
  const houses = t.build.houses
  const gallery = photosByHouseMonth[`${house}:${month}`] ?? []

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
                  <button type="button" className={[month === i ? 'is-active' : '', photosByHouseMonth[`${house}:${i}`]?.length ? 'has-photos' : ''].filter(Boolean).join(' ')} title={photosByHouseMonth[`${house}:${i}`]?.length ? t.build.hasPhotos : t.build.emptyTitle} onClick={() => selectMonth(i)} aria-pressed={month === i}>
                    {name}
                    {photosByHouseMonth[`${house}:${i}`]?.length ? <span className="months__dot" aria-label={t.build.hasPhotos} /> : null}
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
                <>
                  <img className="is-active" src={asset('construction-overview.jpg')} alt="" loading="lazy" decoding="async" />
                  <div className="build-detail__empty" role="status">
                    <div className="build-detail__empty-card">
                      <strong>{t.build.emptyTitle}</strong>
                      <p>{t.build.noUpdates}</p>
                      <small>{t.build.previewNote}</small>
                    </div>
                  </div>
                </>
              )}
            </div>
            {gallery.length > 0 && (
              <div className="build-detail__gallery-foot">
                <p className="build-detail__photos-label">{t.build.photos}</p>
                <span className="pager__num" aria-live="polite">{String(photo + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
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
