import { useEffect, useRef, useState } from 'react'
import { asset } from '../asset'
import { Logo } from '../components/Logo'
import { Stage } from '../components/Ui'
import { splitTitle } from '../components/titleText'
import { useI18n } from '../useI18n'

export function Intro() {
  const { t } = useI18n()
  const [imageReady, setImageReady] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  // On the prerendered page the photo can finish loading before React attaches onLoad.
  useEffect(() => {
    if (imageRef.current?.complete) setImageReady(true)
  }, [])
  return (
    <Stage
      id="intro"
      className={`stage--intro${imageReady ? ' is-ready' : ''}`}
      next="about-intro"
      overlay={
        <div className={`intro__backdrop${imageReady ? ' is-ready' : ''}`} aria-hidden="true">
          <img
            ref={imageRef}
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
        <Logo />
        <h1 className="intro__tag">
          <span className="visually-hidden">AL’PAKI LEGEND — </span>
          {splitTitle(t.intro.tagline)}
        </h1>
      </div>
    </Stage>
  )
}
