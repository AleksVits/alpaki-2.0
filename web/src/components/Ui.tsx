import type { ReactNode } from 'react'
import { IconArrow, IconChevron } from './Icons'

type StageProps = {
  id: string
  className?: string
  children: ReactNode
  next?: string
}

export function Stage({ id, className = '', children, next }: StageProps) {
  return (
    <section id={id} className={`stage ${className}`}>
      <div className="stage__shade" />
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
}: {
  href?: string
  children: ReactNode
  solid?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  arrow?: boolean
}) {
  const className = `btn ${solid ? 'btn--solid' : 'btn--ghost'}`
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <IconArrow /> : null}
    </>
  )
  if (href) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    )
  }
  return (
    <button className={className} type={type} onClick={onClick}>
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
    <div className="pager">
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
  return text.split('\n').map((line) => (
    <span key={line}>
      {line}
      <br />
    </span>
  ))
}
