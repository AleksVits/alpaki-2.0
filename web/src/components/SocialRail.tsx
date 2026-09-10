import { asset } from '../asset'
import { useI18n } from '../i18n'

export function socialLinks(viberLabel: string) {
  return [
    { href: 'https://t.me/', label: 'Telegram', icon: asset('icons/social-telegram.png?v=1') },
    { href: 'https://wa.me/', label: 'WhatsApp', icon: asset('icons/social-whatsapp.png?v=1') },
    { href: 'viber://chat?number=%2B380000000000', label: viberLabel, icon: asset('icons/social-phone.png?v=2') },
  ]
}

export function SocialRail() {
  const { t } = useI18n()

  return (
    <aside className="rail" aria-label="Social">
      {socialLinks(t.contacts.viber).map((item) => (
        <a
          key={item.label}
          className="rail__btn gold-orb"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
        >
          <img src={item.icon} alt="" />
        </a>
      ))}
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
