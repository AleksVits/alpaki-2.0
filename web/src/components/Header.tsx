import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Logo } from './Logo'
import { IconSmartphone } from './Icons'
import { socialLinks } from './SocialRail'
import { phoneHref } from '../contactLinks'
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

const NAV_LOCK = 'is-nav-lock'

function lockNavScroll() {
  document.documentElement.classList.add(NAV_LOCK)
}

function unlockNavScroll() {
  document.documentElement.classList.remove(NAV_LOCK)
}

export function Header({ hidden, active }: Props) {
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const [exited, setExited] = useState(true)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const navMarkerRef = useRef<HTMLSpanElement>(null)

  const pinOrigin = useCallback(() => {
    const burger = burgerRef.current
    const menu = menuRef.current
    if (!burger || !menu) return
    const rect = burger.getBoundingClientRect()
    menu.style.setProperty('--menu-ox', `${rect.left + rect.width / 2}px`)
    menu.style.setProperty('--menu-oy', `${rect.top + rect.height / 2}px`)
  }, [])

  const close = useCallback(() => {
    pinOrigin()
    setOpen(false)
  }, [pinOrigin])

  const toggle = useCallback(() => {
    pinOrigin()
    if (open) {
      setOpen(false)
      return
    }
    lockNavScroll()
    setExited(false)
    setOpen(true)
  }, [open, pinOrigin])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1581px)')
    const onChange = () => {
      if (mq.matches) close()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [close])

  useLayoutEffect(() => {
    pinOrigin()
  }, [open, pinOrigin])

  useLayoutEffect(() => {
    const nav = navRef.current
    const marker = navMarkerRef.current
    if (!nav || !marker) return

    const moveMarker = (animate = true) => {
      const link = nav.querySelector<HTMLElement>(`[data-nav-id="${active}"]`)
      if (!link || link.offsetWidth === 0) return
      const navRect = nav.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      const target = linkRect.left - navRect.left + linkRect.width / 2
      const markerRect = marker.getBoundingClientRect()
      const current = marker.dataset.ready
        ? markerRect.left - navRect.left + markerRect.width / 2
        : target

      marker.getAnimations().forEach((animation) => animation.cancel())
      marker.style.left = `${target}px`
      marker.dataset.ready = 'true'

      if (!animate || Math.abs(current - target) < 1
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const delta = current - target
      marker.animate([
        { transform: `translate3d(${delta}px, 0, 0) rotate(45deg) scale(1)` },
        { transform: `translate3d(${delta * 0.55}px, -7px, 0) rotate(45deg) scale(1.2)`, offset: 0.48 },
        { transform: 'translate3d(0, 0, 0) rotate(45deg) scale(1)' },
      ], {
        duration: 560,
        easing: 'cubic-bezier(.22,.75,.2,1)',
      })
    }

    moveMarker(marker.dataset.ready === 'true')
    const onResize = () => moveMarker(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, lang])

  useEffect(() => {
    pinOrigin()
    window.addEventListener('resize', pinOrigin)
    return () => window.removeEventListener('resize', pinOrigin)
  }, [pinOrigin])

  useEffect(() => {
    return () => unlockNavScroll()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    if (open) {
      setExited(false)
      return
    }
    if (exited) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = reduce ? 0 : 900
    const id = window.setTimeout(() => {
      setExited(true)
      unlockNavScroll()
    }, delay)
    return () => window.clearTimeout(id)
  }, [open, exited])

  const langs = (place: 'bar' | 'menu') => (
    <div
      className={`header__langs glass glass--pill header__langs--${place}`}
      data-active-lang={lang}
    >
      {(['ua', 'en'] as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          className={`header__lang ${lang === code ? 'is-active' : ''}`}
          aria-pressed={lang === code}
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
      <nav ref={navRef} className="header__nav glass glass--pill" aria-label="Main">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            data-nav-id={item.id}
            className={`header__link ${active === item.id ? 'is-active' : ''}`}
          >
            {t.nav[item.id]}
          </a>
        ))}
        <span ref={navMarkerRef} className="header__nav-marker" aria-hidden="true" />
      </nav>
      <div className="header__right">
        {langs('bar')}
        <a className="header__phone gold-orb" href={phoneHref} aria-label={t.ui.phone} onClick={close}>
          <IconSmartphone />
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
        aria-hidden={exited}
        inert={exited || undefined}
      >
        <button
          type="button"
          className="header__menu-scrim"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={close}
          onTransitionEnd={(e) => {
            if (e.propertyName !== 'transform' && e.propertyName !== '-webkit-transform') return
            if (open) return
            setExited(true)
            unlockNavScroll()
          }}
        />
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
              href={phoneHref}
              tabIndex={open ? 0 : -1}
              onClick={close}
              onPointerMove={shineCard}
              onPointerLeave={resetShineCard}
            >
              <span className="header__menu-call-ico" aria-hidden="true">
                <IconSmartphone />
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
                  <span>{item.label}</span>
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
