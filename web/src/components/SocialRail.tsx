import { IconPhone, IconTelegram, IconWhatsapp } from './Icons'
import { useI18n } from '../i18n'

export function SocialRail() {
  const { t } = useI18n()

  return (
    <aside className="rail" aria-label="Social">
      <a className="rail__btn gold-orb" href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Telegram">
        <IconTelegram />
      </a>
      <a className="rail__btn gold-orb" href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <IconWhatsapp />
      </a>
      <a className="rail__btn gold-orb" href="tel:+380000000000" aria-label={t.contacts.phone}>
        <IconPhone />
      </a>
    </aside>
  )
}

export function ScrollHint({ href }: { href: string }) {
  return (
    <a className="scroll-hint" href={href} aria-label="Next">
      <span />
      <span />
    </a>
  )
}
