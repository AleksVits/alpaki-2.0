import { useI18n } from '../useI18n'

/** Slim progress indicator: one dot per full-screen section, the current one drawn as a gold bar. */
export function SectionDots({ ids, active }: { ids: string[]; active: string }) {
  const { t } = useI18n()
  const labels = t.ui.sections as Record<string, string>
  const current = Math.max(0, ids.indexOf(active))

  return (
    <nav className="section-dots" aria-label={t.ui.sectionsNav}>
      <ol>
        {ids.map((id, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`section-dots__dot${i === current ? ' is-active' : ''}`}
              aria-current={i === current ? 'location' : undefined}
              aria-label={`${String(i + 1).padStart(2, '0')} · ${labels[id] ?? id}`}
            >
              <span className="section-dots__label" aria-hidden="true">{labels[id] ?? id}</span>
            </a>
          </li>
        ))}
      </ol>
      <span className="section-dots__count" aria-hidden="true">
        {String(current + 1).padStart(2, '0')}<i> / {String(ids.length).padStart(2, '0')}</i>
      </span>
    </nav>
  )
}
