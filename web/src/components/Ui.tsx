import type { PointerEvent, ReactNode } from 'react'
import { asset } from '../asset'
import { IconArrow, IconChevron } from './Icons'

export function shineCard(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const box = el.getBoundingClientRect()
  const x = (e.clientX - box.left) / box.width
  const y = (e.clientY - box.top) / box.height
  el.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
  el.style.setProperty('--my', `${(y * 100).toFixed(2)}%`)
  el.style.setProperty('--tilt-x', `${((x - 0.5) * 10).toFixed(2)}deg`)
  el.style.setProperty('--tilt-y', `${((0.5 - y) * 8).toFixed(2)}deg`)
}

export function resetShineCard(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  el.style.setProperty('--mx', '50%')
  el.style.setProperty('--my', '38%')
  el.style.setProperty('--tilt-x', '0deg')
  el.style.setProperty('--tilt-y', '0deg')
}

type StageProps = {
  id: string
  className?: string
  children: ReactNode
  next?: string
  overlay?: ReactNode
}

export function Stage({ id, className = '', children, next, overlay }: StageProps) {
  return (
    <section id={id} className={`stage ${className}`}>
      <div className="stage__shade" />
      {overlay}
      <div className="stage__inner">{children}</div>
      {next && (
        <a className="scroll-hint" href={`#${next}`} aria-label="Next">
          <IconChevron />
        </a>
      )}
    </section>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>
}

export function Ornament() {
  return (
    <span className="ornament" aria-hidden="true">
      <span className="ornament__line" />
      <img className="ornament__logo" src={asset('logo-mark.png?v=2')} alt="" />
      <span className="ornament__line" />
    </span>
  )
}

export function Title({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`title ${className}`}>{children}</h2>
}

export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`lead ${className}`}>{children}</p>
}

export function Btn({
  href,
  children,
  solid,
  onClick,
  type = 'button',
  arrow = true,
  shine = false,
  className = '',
}: {
  href?: string
  children: ReactNode
  solid?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  arrow?: boolean
  shine?: boolean
  className?: string
}) {
  const cls = `btn ${solid ? 'btn--solid' : 'btn--ghost'} ${shine ? 'btn--shine' : ''} ${className}`.trim()
  const shineProps = shine
    ? { onPointerMove: shineCard, onPointerLeave: resetShineCard }
    : {}
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <IconArrow /> : null}
    </>
  )
  if (href) {
    return (
      <a className={cls} href={href} {...shineProps}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} type={type} onClick={onClick} {...shineProps}>
      {content}
    </button>
  )
}

export function Pager({
  current,
  total,
  onPrev,
  onNext,
}: {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="pager glass glass--pill">
      <button type="button" className="pager__btn" onClick={onPrev} aria-label="Prev">
        <IconChevron dir="left" />
      </button>
      <span className="pager__num">
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <button type="button" className="pager__btn" onClick={onNext} aria-label="Next">
        <IconChevron dir="right" />
      </button>
    </div>
  )
}

export function splitTitle(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <span key={`${i}-${line}`}>
      {line}
      {i < lines.length - 1 ? <br /> : null}
    </span>
  ))
}
