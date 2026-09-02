import { useState } from 'react'
import { Logo } from './Logo'
import { IconPhone } from './Icons'
import { useI18n, type Lang } from '../i18n'

type Props = {
  hidden?: boolean
  active: string
}

const items = [
  { id: 'about', href: '#about-stats' },
  { id: 'infra', href: '#infrastructure' },
  { id: 'invest', href: '#invest-formats' },
  { id: 'apartments', href: '#apartments' },
  { id: 'construction', href: '#construction' },
  { id: 'contacts', href: '#contacts' },
] as const

export function Header({ hidden, active }: Props) {
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <header className={`header ${hidden ? 'header--hidden' : ''}`}>
      <Logo compact />
      <nav className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Main">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`header__link ${active === item.id ? 'is-active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {t.nav[item.id]}
          </a>
        ))}
      </nav>
      <div className="header__right">
        <div className="header__langs">
          {(['ua', 'en'] as Lang[]).map((code) => (
            <button
              key={code}
              type="button"
              className={`header__lang ${lang === code ? 'is-active' : ''}`}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <a className="header__phone gold-orb" href="#contacts" aria-label={t.ui.phone}>
          <IconPhone />
        </a>
        <button
          type="button"
          className={`header__burger ${open ? 'is-open' : ''}`}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
