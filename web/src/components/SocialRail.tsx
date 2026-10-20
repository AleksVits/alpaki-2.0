import { socialLinks } from '../socialLinks'
import { useI18n } from '../useI18n'

export function SocialRail({ centered = false }: { centered?: boolean }) {
  const { t } = useI18n()

  return (
    <aside className={`rail${centered ? ' rail--contacts' : ''}`} aria-label={t.ui.social}>
      {socialLinks(t.contacts.viber).map((item) => (
        <a
          key={item.label}
          className="rail__btn gold-orb"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
        >
          <item.Icon />
        </a>
      ))}
    </aside>
  )
}
