import { useEffect, useState, type CSSProperties } from 'react'
import { asset } from '../asset'

const logoFrames = [1, 2, 3, 4, 5].map((number) => asset(`logo-animation/${number}.png`))

type Props = {
  compact?: boolean
  animatedMark?: boolean
  className?: string
  style?: CSSProperties
}

function AnimatedLogoMark() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all(logoFrames.map((src) => {
      const frame = new Image()
      frame.src = src
      return frame.decode()
    })).then(() => {
      if (!cancelled) setReady(true)
    }).catch(() => {
      // Keep the original mark when a frame cannot be loaded.
    })
    return () => { cancelled = true }
  }, [])

  if (!ready) return <img className="logo__mark" src={asset('logo-mark.png?v=2')} alt="" />

  return (
    <span className="logo__mark logo__mark--animated" aria-hidden="true">
      {logoFrames.map((src, index) => <img key={src} src={src} alt="" className={`logo__frame logo__frame--${index + 1}`} />)}
    </span>
  )
}

export function Logo({ compact = false, animatedMark = false, className = '', style }: Props) {
  return (
    <a href="#intro" className={`logo ${compact ? 'logo--compact' : ''} ${className}`} style={style} aria-label="AL'PAKI LEGEND">
      {animatedMark ? <AnimatedLogoMark /> : <img className="logo__mark" src={asset('logo-mark-header.png')} alt="" />}
      <span className="logo__text">
        <span className="logo__name">
          AL<span className="logo__apos">’</span>PAKI
        </span>
        <span className="logo__legend">Legend</span>
      </span>
    </a>
  )
}
