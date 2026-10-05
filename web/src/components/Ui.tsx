import type { HTMLAttributes, ReactNode } from 'react'
import { IconArrow, IconChevron } from './Icons'
import { shineCard, resetShineCard } from './uiEffects'
import { useI18n } from '../useI18n'

type StageProps = {
  id: string
  className?: string
  children: ReactNode
  next?: string
  overlay?: ReactNode
}

export function Stage({ id, className = '', children, next, overlay }: StageProps) {
  const { t } = useI18n()
  return (
    <section id={id} className={`stage ${className}`}>
      <div className="stage__shade" />
      {overlay}
      <div className="stage__inner">{children}</div>
      {next && (
        <a className="scroll-hint" href={`#${next}`} aria-label={t.ui.nextSection}>
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
    </span>
  )
}

export function Title({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`title ${className}`}>{children}</h2>
}

export function SectionHeading({ kicker, children }: { kicker: ReactNode; children: ReactNode }) {
  return (
    <div className="section-heading">
      <Kicker>{kicker}</Kicker>
      <Title>{children}</Title>
      <Ornament />
    </div>
  )
}

export function Lead({ children, className = '', ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`lead ${className}`} {...rest}>
      {children}
    </p>
  )
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
      <a className={cls} href={href} onClick={onClick} {...shineProps}>
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
  const { t } = useI18n()
  return (
    <div className="pager glass glass--pill">
      <button type="button" className="pager__btn" onClick={onPrev} aria-label={t.ui.prev}>
        <IconChevron dir="left" />
      </button>
      <span className="pager__num">
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <button type="button" className="pager__btn" onClick={onNext} aria-label={t.ui.next}>
        <IconChevron dir="right" />
      </button>
    </div>
  )
}
