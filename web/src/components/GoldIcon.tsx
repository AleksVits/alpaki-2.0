import { useId, type CSSProperties, type SVGProps } from 'react'

/** Local paint servers also work in hidden galleries and prerendered pages. */
export function GoldIcon({ children, className = '', style, viewBox = '0 0 32 32', ...props }: SVGProps<SVGSVGElement>) {
  const id = `icon-gold-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [, , width, height] = viewBox.split(' ').map(Number)

  return (
    <svg
      {...props}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`gold-icon ${className}`}
      style={{ ...style, '--icon-paint': `url(#${id})` } as CSSProperties}
    >
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width * .65} y2={height}>
          <stop offset="0" stopColor="var(--icon-gold-light)" />
          <stop offset=".26" stopColor="var(--icon-gold)" />
          <stop offset=".46" stopColor="var(--icon-gold-light)" />
          <stop offset=".68" stopColor="var(--icon-gold)" />
          <stop offset="1" stopColor="var(--icon-gold-shade)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  )
}
