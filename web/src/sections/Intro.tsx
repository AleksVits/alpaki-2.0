import { useState } from 'react'
import { asset } from '../asset'
import { Logo } from '../components/Logo'
import { Stage, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

export function Intro() {
  const { t } = useI18n()
  const [imageReady, setImageReady] = useState(false)
  return (
    <Stage
      id="intro"
      className={`stage--intro${imageReady ? ' is-ready' : ''}`}
      next="about-stats"
      overlay={
        <div className={`intro__backdrop${imageReady ? ' is-ready' : ''}`} aria-hidden="true">
          <img
            src={asset('hero.jpg?v=2')}
            alt=""
            fetchPriority="high"
            onLoad={() => setImageReady(true)}
            onError={() => setImageReady(true)}
          />
        </div>
      }
    >
      <div className="intro">
        <Logo animatedMark />
        <p className="intro__tag">{splitTitle(t.intro.tagline)}</p>
      </div>
    </Stage>
  )
}
