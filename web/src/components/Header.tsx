import { useCallback, useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'
import { IconPhone } from './Icons'
import { socialLinks } from './SocialRail'
import { resetShineCard, shineCard } from './Ui'
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
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const pinOrigin = useCallback(() => {
    const burger = burgerRef.current
    const menu = menuRef.current
    if (!burger || !menu) return
    const rect = burger.getBoundingClientRect()
    menu.style.setProperty('--menu-ox', `${rect.left + rect.width / 2}px`)
    menu.style.setProperty('--menu-oy', `${rect.top + rect.height / 2}px`)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1367px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const close = useCallback(() => {
    pinOrigin()
    setOpen(false)
  }, [pinOrigin])

  const toggle = useCallback(() => {
    pinOrigin()
    setOpen((v) => !v)
  }, [pinOrigin])

  useEffect(() => {
    pinOrigin()
    window.addEventListener('resize', pinOrigin)
    return () => window.removeEventListener('resize', pinOrigin)
  }, [pinOrigin])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prev
    }
  }, [open, close])

  const langs = (place: 'bar' | 'menu') => (
    <div className={`header__langs glass glass--pill header__langs--${place}`}>
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
  )

  return (
    <header className={`header${hidden && !open ? ' header--hidden' : ''}${open ? ' header--menu' : ''}`}>
      <Logo compact />
      <nav className="header__nav glass glass--pill" aria-label="Main">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`header__link ${active === item.id ? 'is-active' : ''}`}
          >
            {t.nav[item.id]}
          </a>
        ))}
      </nav>
      <div className="header__right">
        {langs('bar')}
        <a className="header__phone gold-orb" href="#contacts" aria-label={t.ui.phone} onClick={close}>
          <IconPhone />
        </a>
        <button
          ref={burgerRef}
          type="button"
          className={`header__burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggle}
        >
          <span />
          <span />
        </button>
      </div>
      <div
        ref={menuRef}
        className={`header__menu ${open ? 'is-open' : ''}`}
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <button type="button" className="header__menu-scrim" tabIndex={open ? 0 : -1} aria-label="Close menu" onClick={close} />
        <nav className="header__menu-panel" aria-label="Mobile">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`header__link ${active === item.id ? 'is-active' : ''}`}
              tabIndex={open ? 0 : -1}
              onClick={close}
            >
              {t.nav[item.id]}
            </a>
          ))}
          <div className="header__menu-actions">
            <a
              className="btn btn--solid btn--shine glass glass--chip header__menu-call"
              href="#contacts"
              tabIndex={open ? 0 : -1}
              onClick={close}
              onPointerMove={shineCard}
              onPointerLeave={resetShineCard}
            >
              <span className="header__menu-call-ico" aria-hidden="true">
                <IconPhone />
              </span>
              <span>{t.ui.phone}</span>
            </a>
            <div className="header__menu-social">
              {socialLinks(t.contacts.viber).map((item) => (
                <a
                  key={item.label}
                  className="header__menu-social-btn gold-orb"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  tabIndex={open ? 0 : -1}
                >
                  <img src={item.icon} alt="" />
                </a>
              ))}
            </div>
            {langs('menu')}
          </div>
        </nav>
      </div>
    </header>
  )
}
