import { useState } from 'react'
import { FloorPlan, IsoApartment } from '../components/Maps'
import { Placeholder } from '../components/Placeholder'
import { Btn, Lead, Pager, Stage, splitTitle, SectionHeading } from '../components/Ui'
import { useI18n } from '../i18n'

export function Apartments() {
  const { t } = useI18n()
  const [page, setPage] = useState(0)
  const [type, setType] = useState(0)
  const [house, setHouse] = useState(0)
  const [floor, setFloor] = useState(2)
  const total = 4

  const go = (dir: number) => setPage((v) => (v + dir + total) % total)

  return (
    <Stage id="apartments" className={`stage--apt stage--apt-${page}`} next="construction">
      {page !== 1 && <Placeholder className="stage__photo" />}

      {page === 0 && (
        <div className="apt">
          <div className="apt__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.title)}</SectionHeading>
            <Lead>{t.apt.lead}</Lead>
            <Btn onClick={() => setPage(1)}>{t.apt.cta}</Btn>
          </div>
          <div className="apt-types">
            {t.apt.types.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`apt-type ${type === i ? 'is-active' : ''}`}
                onClick={() => {
                  setType(i)
                  setPage(1)
                }}
              >
                <Placeholder className="apt-type__ph" />
                <span>
                  {item.n}  {item.title}
                  <small>{item.meta}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {page === 1 && (
        <div className="apt-house">
          <div className="apt-house__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.houseTitle)}</SectionHeading>
            <Lead>{t.apt.houseLead}</Lead>
            <ol className="apt-house__steps">
              {t.apt.steps.map((step, i) => (
                <li key={step} className={i === 0 ? 'is-active' : ''}>
                  {String(i + 1).padStart(2, '0')}  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="apt-house__row">
            {t.apt.buildings.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`apt-house__card ${house === i ? 'is-active' : ''}`}
                onClick={() => setHouse(i)}
              >
                <Placeholder className="apt-house__ph" />
                <span>
                  {item.n}  {item.title}
                </span>
              </button>
            ))}
          </div>
          <Btn onClick={() => setPage(2)}>{t.apt.ctaHouse}</Btn>
          <aside className="plan-card">
            <p className="plan-card__kicker">{t.apt.planKicker}</p>
            <p className="plan-card__area">{t.apt.planArea}</p>
            <FloorPlan />
            <div className="plan-card__types">
              {t.apt.types.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className={type === i ? 'is-active' : ''}
                  onClick={() => setType(i)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <Btn onClick={() => setPage(2)}>{t.apt.planCta}</Btn>
          </aside>
        </div>
      )}

      {page === 2 && (
        <div className="apt-3d">
          <div className="apt-3d__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.viewTitle)}</SectionHeading>
            <Lead>{t.apt.viewLead}</Lead>
            <p className="apt-3d__meta">
              <b>{t.apt.buildings[house].title}</b>
              <span>{t.apt.floor}</span>
              <span>{t.apt.planArea}</span>
              <span>{t.apt.types[type].title}</span>
            </p>
            <Btn href="#contacts">{t.apt.ctaPrice}</Btn>
            <button type="button" className="text-link" onClick={() => setPage(1)}>
              {t.apt.back}
            </button>
          </div>
          <div className="apt-3d__scene">
            <Placeholder className="apt-3d__ph" />
            <IsoApartment />
            {t.apt.zones.map((zone) => (
              <span key={zone.id} className={`apt-3d__zone apt-3d__zone--${zone.id}`}>
                {zone.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {page === 3 && (
        <div className="apt-floor">
          <div className="apt-floor__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.floorTitle)}</SectionHeading>
            <Lead>{t.apt.floorLead}</Lead>
            <div className="apt-floor__list">
              {t.apt.floors.map((n, i) => (
                <button
                  key={n}
                  type="button"
                  className={floor === i ? 'is-active' : ''}
                  onClick={() => setFloor(i)}
                >
                  {n}
                </button>
              ))}
            </div>
            <Btn onClick={() => setPage(2)}>{t.apt.planCta}</Btn>
          </div>
          <Placeholder className="apt-floor__ph" label={`${t.apt.buildings[house].title} · ${t.apt.floors[floor]}`} />
        </div>
      )}

      <div className="apt__pager">
        <Pager current={page + 1} total={total} onPrev={() => go(-1)} onNext={() => go(1)} />
      </div>
    </Stage>
  )
}
