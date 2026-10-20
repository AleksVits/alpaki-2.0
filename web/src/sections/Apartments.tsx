import { useEffect, useRef, useState } from 'react'
import { scrollToStage } from '../scroll'
import { FloorPlan, IsoApartment } from '../components/Maps'
import { Placeholder } from '../components/Placeholder'
import { Btn, Lead, Pager, Stage, SectionHeading } from '../components/Ui'
import { splitTitle } from '../components/titleText'
import { buildingRenders, layouts, typeCovers, type Media } from '../apartmentMedia'
import { useI18n } from '../useI18n'
import type { Inquiry } from '../inquiry'

// Screens follow one path, and the pager walks it in the same order.
const TYPES = 0
const HOUSE = 1
const VIEW = 2

function Thumbs({ items, active, onSelect, label }: { items: Media[]; active: number; onSelect: (i: number) => void; label: (item: Media, i: number) => string }) {
  return (
    <div className="apt-thumbs">
      {items.map((item, i) => (
        <button
          key={`${item.src}-${i}`}
          type="button"
          className={`apt-thumbs__item apt-thumbs__item--${item.kind}${i === active ? ' is-active' : ''}`}
          onClick={() => onSelect(i)}
          aria-label={label(item, i)}
          aria-pressed={i === active}
        >
          <img src={item.thumb} alt="" loading="lazy" decoding="async" />
        </button>
      ))}
    </div>
  )
}

export function Apartments({ onInquiry }: { onInquiry: (inquiry: Inquiry) => void }) {
  const { t } = useI18n()
  const [page, setPage] = useState(TYPES)
  const previousPage = useRef(page)
  useEffect(() => {
    if (previousPage.current === page) return
    previousPage.current = page
    const section = document.getElementById('apartments')
    if (section) scrollToStage(section)
  }, [page])
  const [type, setTypeState] = useState(0)
  const [house, setHouseState] = useState(0)
  const [render, setRender] = useState(0)
  const [layoutIndex, setLayoutIndex] = useState(0)
  const [view, setView] = useState(0)
  const total = 3

  const go = (dir: number) => setPage((v) => Math.max(TYPES, Math.min(VIEW, v + dir)))
  const setType = (i: number) => {
    setTypeState(i)
    setLayoutIndex(0)
    setView(0)
  }
  const setHouse = (i: number) => {
    setHouseState(i)
    setRender(0)
    setLayoutIndex(0)
    setView(0)
  }
  const selectLayout = (i: number) => {
    setLayoutIndex(i)
    setView(0)
  }

  const building = t.apt.buildings[house]
  const renders = buildingRenders[house]
  const options = layouts[house][type]
  const layout = options[Math.min(layoutIndex, options.length - 1)]
  const current = layout?.views[Math.min(view, layout.views.length - 1)]
  const layoutName = layout ? t.apt.layout.replace('{n}', String(layout.n)) : ''
  const backdrop = page === TYPES ? buildingRenders[0][0] : page === HOUSE ? renders[render] : renders[0]

  return (
    <Stage
      id="apartments"
      className={`stage--apt stage--apt-${page}`}
      next="construction"
      overlay={(
        <div className={`apt__backdrop apt__backdrop--${page}`} aria-hidden="true">
          <img key={backdrop.src} src={backdrop.src} alt="" loading="lazy" decoding="async" fetchPriority="low" />
        </div>
      )}
    >
      <nav className="apt-progress" aria-label={t.apt.kicker}>
        <ol>{t.apt.steps.map((step, i) => <li key={step}><button type="button" aria-current={page === i ? 'step' : undefined} onClick={() => setPage(i)}>{String(i + 1).padStart(2, '0')} · {step}</button></li>)}</ol>
        <p aria-live="polite">{t.apt.types[type].title} · {building.title}{page === VIEW && layoutName ? ` · ${layoutName}` : ''}</p>
      </nav>
      {page === TYPES && (
        <div className="apt">
          <div className="apt__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.title)}</SectionHeading>
            <Lead>{t.apt.lead}</Lead>
            <Btn solid onClick={() => setPage(HOUSE)}>{t.apt.cta}</Btn>
          </div>
          <div className="apt-types">
            {t.apt.types.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`apt-type ${type === i ? 'is-active' : ''}`}
                onClick={() => {
                  setType(i)
                  setPage(HOUSE)
                }}
              >
                <span className="apt-type__ph apt-media">
                  <img src={typeCovers[i].thumb} alt="" loading="lazy" decoding="async" />
                </span>
                <span>
                  {item.n}  {item.title}
                  <small>{item.meta}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {page === HOUSE && (
        <div className="apt-house">
          <div className="apt-house__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.houseTitle)}</SectionHeading>
            <Lead>{t.apt.houseLead}</Lead>

          </div>
          <div className="apt-house__row">
            {t.apt.buildings.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`apt-house__card ${house === i ? 'is-active' : ''}`}
                onClick={() => setHouse(i)}
                aria-pressed={house === i}
              >
                <span className="apt-house__ph apt-media">
                  <img src={buildingRenders[i][0].thumb} alt="" loading="lazy" decoding="async" />
                </span>
                <span>
                  {item.n}  {item.title}
                </span>
              </button>
            ))}
          </div>
          {renders.length > 1 && (
            <div className="apt-house__renders">
              <p className="apt-house__renders-label">{t.apt.renders} · {building.title}</p>
              <Thumbs
                items={renders}
                active={render}
                onSelect={setRender}
                label={(_, i) => `${t.apt.renders} · ${building.title} · ${i + 1}`}
              />
            </div>
          )}
          <Btn solid onClick={() => setPage(VIEW)}>{t.apt.planCta}</Btn>
          <aside className="plan-card">
            <p className="plan-card__kicker">{t.apt.planKicker}</p>
            <p className="plan-card__area">{t.apt.planArea}</p>
            {layout ? (
              <img className="plan-card__plan" src={layout.plan.src} alt={`${t.apt.views.plan} · ${building.title} · ${t.apt.types[type].title} · ${layoutName}`} loading="lazy" decoding="async" />
            ) : (
              <FloorPlan />
            )}
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
            <Btn className="btn--secondary" onClick={() => setPage(VIEW)}>{t.apt.planCta}</Btn>
          </aside>
        </div>
      )}

      {page === VIEW && (
        <div className={`apt-3d${layout ? ' apt-3d--media' : ''}`}>
          <div className="apt-3d__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.viewTitle)}</SectionHeading>
            <Lead>{t.apt.viewLead}</Lead>
            <p className="apt-3d__meta">
              <b>{building.title}</b>
              <span>{t.apt.planArea}</span>
              <span>{t.apt.types[type].title}{layout ? ` · ${layoutName}` : ''}</span>
            </p>
            {options.length > 1 && (
              <div className="apt-3d__layouts" role="group" aria-label={t.apt.layouts}>
                {options.map((item, i) => (
                  <button key={item.n} type="button" className={item === layout ? 'is-active' : ''} onClick={() => selectLayout(i)} aria-pressed={item === layout}>
                    {t.apt.layout.replace('{n}', String(item.n))}
                  </button>
                ))}
              </div>
            )}
            <Btn solid href="#contacts" onClick={() => onInquiry({ kind: 'apartment', house, type, layout: layout?.n })}>{t.apt.ctaPrice}</Btn>
            <button type="button" className="text-link" onClick={() => setPage(HOUSE)}>
              {t.apt.back}
            </button>
          </div>
          {layout && current ? (
            <div className="apt-3d__viewer">
              <div className={`apt-3d__frame apt-3d__frame--${current.kind}`}>
                <img key={current.src} src={current.src} alt={`${building.title} · ${layoutName} · ${t.apt.views[current.kind]}`} loading="lazy" decoding="async" />
              </div>
              <Thumbs
                items={layout.views}
                active={view}
                onSelect={setView}
                label={(item, i) => `${layoutName} · ${t.apt.views[item.kind]} · ${i + 1}`}
              />
            </div>
          ) : (
            <div className="apt-3d__scene">
              <Placeholder className="apt-3d__ph" />
              <IsoApartment />
              {t.apt.zones.map((zone) => (
                <span key={zone.id} className={`apt-3d__zone apt-3d__zone--${zone.id}`}>
                  {zone.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="apt__pager">
        <Pager current={page + 1} total={total} bounded onPrev={() => go(-1)} onNext={() => go(1)} />
      </div>
    </Stage>
  )
}
