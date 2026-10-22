import { useEffect, useRef, useState } from 'react'
import { scrollToStage } from '../scroll'
import { IsoApartment } from '../components/Maps'
import { Placeholder } from '../components/Placeholder'
import { ExpandIcon, Lightbox } from '../components/Lightbox'
import { Btn, Lead, Stage, SectionHeading } from '../components/Ui'
import { splitTitle } from '../components/titleText'
import { buildingBackdrops, buildingRenders, layouts, typeCovers, type Media } from '../apartmentMedia'
import { useI18n } from '../useI18n'
import type { Inquiry } from '../inquiry'

/*
 * One path, three steps: type → building → layout.
 * The step tabs are the only navigation; each step has a single primary action,
 * and nothing is chosen on the visitor's behalf.
 */
const TYPE = 0
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
  const [page, setPage] = useState(TYPE)
  const [direction, setDirection] = useState('forward')
  const goToPage = (next: number) => {
    if (next === page) return
    setDirection(next > page ? 'forward' : 'backward')
    setPage(next)
  }
  const [type, setType] = useState<number | null>(null)
  const [house, setHouse] = useState<number | null>(null)
  const [render, setRender] = useState(0)
  const [layoutIndex, setLayoutIndex] = useState(0)
  const [view, setView] = useState(0)
  const [fullscreen, setFullscreen] = useState<'renders' | 'views' | null>(null)

  // Each step change brings the whole section back into view.
  const previousPage = useRef(page)
  useEffect(() => {
    if (previousPage.current === page) return
    previousPage.current = page
    const section = document.getElementById('apartments')
    if (section) scrollToStage(section)
  }, [page])

  const hasLayouts = (h: number, ty: number | null) => ty !== null && layouts[h][ty].length > 0
  const options = house !== null && type !== null ? layouts[house][type] : []
  const layout = options[Math.min(layoutIndex, options.length - 1)]
  const current = layout?.views[Math.min(view, layout.views.length - 1)]
  const typeTitle = type !== null ? t.apt.types[type].title : ''
  const building = house !== null ? t.apt.buildings[house] : null
  const preview = house ?? 0
  const renders = buildingRenders[preview]
  const variant = (i: number) => t.apt.variant.replace('{n}', String(i + 1))
  const canOpen = [true, type !== null, house !== null && hasLayouts(house, type)]

  const chooseType = (i: number) => {
    setType(i)
    setLayoutIndex(0)
    setView(0)
    goToPage(HOUSE)
  }
  const chooseHouse = (i: number) => {
    setHouse(i)
    setRender(0)
    setLayoutIndex(0)
    setView(0)
  }
  const chooseLayout = (i: number) => {
    setLayoutIndex(i)
    setView(0)
  }

  const backdrop = page === TYPE ? buildingBackdrops[0] : buildingBackdrops[preview]
  const summary = [typeTitle, building?.title, page === VIEW && layout ? variant(layoutIndex) : ''].filter(Boolean).join(' · ')
  const inquiry = (): Inquiry => ({ kind: 'apartment', house: house ?? 0, type: type ?? 0, layout: layout?.n })

  return (
    <Stage
      id="apartments"
      className={`stage--apt stage--apt-${page} apt-motion--${direction}`}
      next="construction"
      overlay={(
        <div className={`apt__backdrop apt__backdrop--${page}`} aria-hidden="true">
          <img key={backdrop} src={backdrop} alt="" loading="lazy" decoding="async" fetchPriority="low" />
        </div>
      )}
    >
      <nav className="apt-progress" aria-label={t.apt.kicker}>
        <ol>
          {t.apt.steps.map((step, i) => (
            <li key={step}>
              <button
                type="button"
                className={i < page ? 'is-done' : ''}
                aria-current={page === i ? 'step' : undefined}
                disabled={!canOpen[i]}
                onClick={() => goToPage(i)}
              >
                <span className="apt-progress__n">{String(i + 1).padStart(2, '0')}</span> {step}
              </button>
            </li>
          ))}
        </ol>
        {summary && <p aria-live="polite">{summary}</p>}
      </nav>

      {page === TYPE && (
        <div className="apt apt-step">
          <div className="apt__copy">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.title)}</SectionHeading>
            <Lead>{t.apt.lead}</Lead>
            <p className="apt-hint">{t.apt.typeHint}</p>
          </div>
          <div className="apt-types">
            {t.apt.types.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`apt-type ${type === i ? 'is-active' : ''}`}
                aria-pressed={type === i}
                onClick={() => chooseType(i)}
              >
                <span className="apt-type__ph apt-media">
                  <img src={typeCovers[i].thumb} alt="" loading="lazy" decoding="async" />
                </span>
                <span>
                  {item.title}
                  <small>{item.meta}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {page === HOUSE && (
        <div className="apt-pick apt-step">
          <div className="apt-pick__main">
            <SectionHeading kicker={t.apt.kicker}>{splitTitle(t.apt.houseTitle)}</SectionHeading>
            <Lead>{t.apt.houseLead.replace('{type}', typeTitle.toLowerCase())}</Lead>
            <div className="apt-pick__cards">
              {t.apt.buildings.map((item, i) => {
                const ready = hasLayouts(i, type)
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`apt-house__card ${house === i ? 'is-active' : ''}${ready ? '' : ' is-soon'}`}
                    onClick={() => chooseHouse(i)}
                    aria-pressed={house === i}
                  >
                    <span className="apt-house__ph apt-media">
                      <img src={buildingRenders[i][0].thumb} alt="" loading="lazy" decoding="async" />
                      {!ready && <span className="apt-badge">{t.apt.soon}</span>}
                    </span>
                    <span>{item.n}  {item.title}</span>
                  </button>
                )
              })}
            </div>
            <div className="apt-pick__action">
              {house === null ? (
                <p className="apt-hint">{t.apt.houseHint}</p>
              ) : hasLayouts(house, type) ? (
                <Btn solid onClick={() => goToPage(VIEW)}>{t.apt.planCta}</Btn>
              ) : (
                <>
                  <p className="apt-hint">{t.apt.soonNote.replace('{house}', building!.title)}</p>
                  <Btn solid href="#contacts" onClick={() => onInquiry(inquiry())}>{t.apt.ctaSoon}</Btn>
                </>
              )}
            </div>
          </div>
          <figure className="apt-pick__preview">
            <button type="button" className="apt-pick__frame apt-zoom" onClick={() => setFullscreen('renders')} aria-label={`${t.ui.fullscreen} · ${t.apt.renders} · ${t.apt.buildings[preview].title}`}>
              <img key={renders[render].src} src={renders[render].src} alt={`${t.apt.renders} · ${t.apt.buildings[preview].title} · ${render + 1}`} loading="lazy" decoding="async" />
              <span className="apt-zoom__badge"><ExpandIcon /></span>
            </button>
            <figcaption>
              <span>{t.apt.renders} · {t.apt.buildings[preview].title}</span>
              {renders.length > 1 && <span className="apt-pick__count">{String(render + 1).padStart(2, '0')} / {String(renders.length).padStart(2, '0')}</span>}
            </figcaption>
            {renders.length > 1 && (
              <Thumbs
                items={renders}
                active={render}
                onSelect={setRender}
                label={(_, i) => `${t.apt.renders} · ${t.apt.buildings[preview].title} · ${i + 1}`}
              />
            )}
          </figure>
        </div>
      )}

      {page === VIEW && building && (
        <div className={`apt-3d apt-step${layout ? ' apt-3d--media' : ''}`}>
          <div className="apt-3d__copy">
            <SectionHeading kicker={`${t.apt.kicker} · ${building.title}`}>{splitTitle(t.apt.viewTitle)}</SectionHeading>
            <Lead>{t.apt.viewLead}</Lead>
            {options.length > 1 && (
              <div className="apt-variants" role="group" aria-label={t.apt.layouts}>
                {options.map((item, i) => (
                  <button key={item.n} type="button" className={item === layout ? 'is-active' : ''} onClick={() => chooseLayout(i)} aria-pressed={item === layout}>
                    <img src={item.plan.thumb} alt="" loading="lazy" decoding="async" />
                    <span>{variant(i)}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="apt-3d__cta">
              <Btn solid href="#contacts" onClick={() => onInquiry(inquiry())}>{t.apt.ctaPrice}</Btn>
            </div>
          </div>
          {layout && current ? (
            <div className="apt-3d__viewer">
              <button type="button" className={`apt-3d__frame apt-3d__frame--${current.kind} apt-zoom`} onClick={() => setFullscreen('views')} aria-label={`${t.ui.fullscreen} · ${t.apt.views[current.kind]}`}>
                <img key={current.src} src={current.src} alt={`${building.title} · ${typeTitle} · ${variant(layoutIndex)} · ${t.apt.views[current.kind]}`} loading="lazy" decoding="async" />
                <span className="apt-3d__kind">{t.apt.views[current.kind]}</span>
                <span className="apt-zoom__badge"><ExpandIcon /></span>
              </button>
              <Thumbs
                items={layout.views}
                active={view}
                onSelect={setView}
                label={(item, i) => `${variant(layoutIndex)} · ${t.apt.views[item.kind]} · ${i + 1}`}
              />
            </div>
          ) : (
            <div className="apt-3d__scene">
              <Placeholder className="apt-3d__ph" />
              <IsoApartment />
            </div>
          )}
        </div>
      )}
      {fullscreen === 'renders' && (
        <Lightbox
          items={renders.map((m, i) => ({ src: m.src, alt: `${t.apt.renders} · ${t.apt.buildings[preview].title} · ${i + 1}`, caption: `${t.apt.renders} · ${t.apt.buildings[preview].title}` }))}
          index={render}
          onIndex={setRender}
          onClose={() => setFullscreen(null)}
        />
      )}
      {fullscreen === 'views' && layout && building && (
        <Lightbox
          items={layout.views.map((m) => ({ src: m.src, alt: `${building.title} · ${typeTitle} · ${variant(layoutIndex)} · ${t.apt.views[m.kind]}`, caption: `${building.title} · ${variant(layoutIndex)} · ${t.apt.views[m.kind]}` }))}
          index={Math.min(view, layout.views.length - 1)}
          onIndex={setView}
          onClose={() => setFullscreen(null)}
        />
      )}
    </Stage>
  )
}
