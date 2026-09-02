import type { CSSProperties } from 'react'
import { asset } from '../asset'

type Props = {
  compact?: boolean
  className?: string
  style?: CSSProperties
}

export function Logo({ compact = false, className = '', style }: Props) {
  return (
    <a href="#intro" className={`logo ${compact ? 'logo--compact' : ''} ${className}`} style={style} aria-label="AL'PAKI LEGEND">
      <img className="logo__mark" src={asset('logo-mark.png?v=2')} alt="" />
      <span className="logo__text">
        <span className="logo__name">
          AL<span className="logo__apos">’</span>PAKI
        </span>
        <span className="logo__legend">Legend</span>
      </span>
    </a>
  )
}
