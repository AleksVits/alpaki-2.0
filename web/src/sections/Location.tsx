import { useRef, useState, type PointerEvent } from 'react'
import { asset } from '../asset'
import { IconPin } from '../components/Icons'
import { Btn, Kicker, Lead, Stage, Title, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

/** Visible-stage % path along the glowing mountain road. */
const roadPath =
  'M 26.2 81.1 L 28.0 78.5 L 29.9 76.8 L 32.0 73.5 L 38.0 68.0 L 43.1 62.7 L 48.0 58.2 L 52.4 54.1 L 51.7 51.9 L 52.0 49.7 L 54.4 47.6 L 62.2 43.2 L 63.4 41.1 L 63.7 38.9 L 63.3 36.8 L 67.5 33.6 L 68.4 32.4 L 68.8 31.9 L 68.7 31.0 L 66.7 28.4 L 67.6 26.7 L 70.4 25.0 L 71.5 23.2 L 71.1 20.7 L 72.5 18.9 L 73.6 16.3'

export function Location() {
  const { t } = useI18n()
  const roadRef = useRef<HTMLDivElement>(null)
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null)

  const moveHint = (e: PointerEvent<SVGPathElement>) => {
    const box = roadRef.current?.getBoundingClientRect()
    if (!box) return
    setHint({ x: e.clientX - box.left, y: e.clientY - box.top })
  }

  return (
    <Stage
      id="location"
      className="stage--location"
      next="infrastructure"
      overlay={
        <div className="location__road" ref={roadRef}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="location__road-hit"
              d={roadPath}
              onPointerEnter={moveHint}
              onPointerMove={moveHint}
              onPointerLeave={() => setHint(null)}
            />
          </svg>
          {hint && (
            <div
              className={`location__hint${hint.y < 88 ? ' location__hint--below' : ''}`}
              style={{ left: hint.x, top: hint.y }}
            >
              <strong>{t.location.distance}</strong>
              <small>{t.location.distanceSub}</small>
            </div>
          )}
        </div>
      }
    >
      <div className="location">
        <div className="location__station">
          <span className="location__station-label">{t.location.station}</span>
          <span className="location__station-ico">
            <img src={asset('icons/location-train.png?v=1')} alt="" />
          </span>
        </div>
        <div className="location__copy">
          <Kicker>{t.location.kicker}</Kicker>
          <Title>{splitTitle(t.location.title)}</Title>
          <Lead>{t.location.text}</Lead>
        </div>
        <div className="location__scene" aria-hidden="true" />
        <div className="location__bar">
          <div className="location__way">
            <span className="location__ico">
              <img src={asset('icons/location-train.png?v=1')} alt="" />
            </span>
            <span>
              <strong>{t.location.train}</strong>
              <small>{t.location.trainSub}</small>
            </span>
          </div>
          <div className="location__way">
            <span className="location__ico">
              <img src={asset('icons/location-car.png?v=1')} alt="" />
            </span>
            <span>
              <strong>{t.location.car}</strong>
              <small className="pre">{t.location.carSub}</small>
            </span>
          </div>
          <div className="location__places">
            <div className="location__cities">
              <span>
                <IconPin />
                <span>
                  <b>{t.location.if}</b>
                  <em>{t.location.ifMeta}</em>
                </span>
              </span>
              <span>
                <IconPin />
                <span>
                  <b>{t.location.lviv}</b>
                  <em>{t.location.lvivMeta}</em>
                </span>
              </span>
              <span>
                <IconPin />
                <span>
                  <b>{t.location.uzh}</b>
                  <em>{t.location.uzhMeta}</em>
                </span>
              </span>
            </div>
            <p className="location__near">{t.location.nearby}</p>
          </div>
          <Btn href="https://maps.google.com/?q=Kvasy+Trostyanets">{t.location.route}</Btn>
        </div>
      </div>
    </Stage>
  )
}
