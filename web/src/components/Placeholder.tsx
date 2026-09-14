import { useI18n } from '../i18n'

type Props = {
  label?: string
  className?: string
  caption?: string
}

export function Placeholder({ label, className = '', caption }: Props) {
  const { t } = useI18n()
  return (
    <div className={`ph ${className}`} role="img" aria-label={label ?? caption ?? t.ui.placeholder}>
      <svg className="ph__icon" viewBox="0 0 72 72" aria-hidden="true">
        <rect x="10" y="16" width="52" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="24" cy="30" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 48 L24 34 L34 44 L46 28 L62 48" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      {(caption || label) && <span className="ph__label">{caption || label}</span>}
    </div>
  )
}
