import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { SectionDots } from './components/SectionDots'
import { SocialRail } from './components/SocialRail'
import { AboutIntro, AboutStats } from './sections/About'
import { Apartments } from './sections/Apartments'
import { Architecture } from './sections/Architecture'
import { Construction } from './sections/Construction'
import { Contacts } from './sections/Contacts'
import { InfraDetail, Infrastructure } from './sections/Infrastructure'
import { Intro } from './sections/Intro'
import { InvestFormats, InvestManage } from './sections/Invest'
import { Location } from './sections/Location'
import type { Inquiry } from './inquiry'
import { decodeHash, scrollToStage, siteScroller } from './scroll'

const sectionMap: Record<string, string> = {
  intro: 'intro',
  'about-intro': 'about',
  'about-stats': 'about',
  architecture: 'about',
  location: 'about',
  infrastructure: 'infra',
  'infra-detail': 'infra',
  'invest-formats': 'invest',
  'invest-manage': 'invest',
  apartments: 'apartments',
  construction: 'construction',
  'build-detail': 'construction',
  contacts: 'contacts',
}

export default function App() {
  // Starts at the intro so the first render matches the prerendered page; the effects below
  // pick up the address hash and the visible section right after mount.
  const [active, setActive] = useState('intro')
  const [pastIntro, setPastIntro] = useState(false)
  const [infraGroup, setInfraGroup] = useState('wellness')
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)

  useEffect(() => {
    const root = siteScroller()
    if (!root) return
    let frame = 0

    const updateActive = () => {
      frame = 0
      const rootRect = root.getBoundingClientRect()
      const viewportHeight = rootRect.height
      const visible = Array.from(root.querySelectorAll<HTMLElement>('.stage'))
        .map((node) => {
          const rect = node.getBoundingClientRect()
          const overlap = Math.max(0, Math.min(rect.bottom, rootRect.bottom) - Math.max(rect.top, rootRect.top))
          const score = overlap / Math.max(1, Math.min(rect.height, viewportHeight))
          const centerDistance = Math.abs((rect.top + rect.bottom) / 2 - (rootRect.top + rootRect.bottom) / 2)
          return { node, score, centerDistance }
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || a.centerDistance - b.centerDistance)[0]

      if (visible?.node.id) setActive(visible.node.id)
    }
    const scheduleActive = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateActive)
    }

    updateActive()
    root.addEventListener('scroll', scheduleActive, { passive: true })
    window.addEventListener('resize', scheduleActive)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      root.removeEventListener('scroll', scheduleActive)
      window.removeEventListener('resize', scheduleActive)
    }
  }, [])

  useEffect(() => {
    const root = siteScroller()
    if (!root) return

    const updatePastIntro = () => {
      const intro = document.getElementById('intro')
      if (!intro) return
      // Show header once the intro has mostly left the viewport (second section enters).
      setPastIntro(intro.getBoundingClientRect().bottom <= root.clientHeight * 0.62)
    }

    updatePastIntro()
    root.addEventListener('scroll', updatePastIntro, { passive: true })
    window.addEventListener('resize', updatePastIntro)
    return () => {
      root.removeEventListener('scroll', updatePastIntro)
      window.removeEventListener('resize', updatePastIntro)
    }
  }, [])

  useEffect(() => {
    const root = siteScroller()
    if (!root) return

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]')
      if (!(link instanceof HTMLAnchorElement)) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const id = decodeHash(href.slice(1))
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      setActive(id)
      scrollToStage(target)
      history.pushState(null, '', href)
    }

    const hash = decodeHash(window.location.hash.slice(1))
    if (hash) {
      const target = document.getElementById(hash)
      if (target) requestAnimationFrame(() => scrollToStage(target))
    }

    const onHistoryNavigation = () => {
      const id = decodeHash(window.location.hash.slice(1)) || 'intro'
      const target = document.getElementById(id)
      if (!target) return
      setActive(id)
      scrollToStage(target)
    }

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onHistoryNavigation)
    window.addEventListener('hashchange', onHistoryNavigation)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onHistoryNavigation)
      window.removeEventListener('hashchange', onHistoryNavigation)
    }
  }, [])

  const showChrome = pastIntro

  return (
    <>
      <Header hidden={!showChrome} active={sectionMap[active] ?? 'about'} />
      {showChrome && <SocialRail centered={active === 'contacts'} />}
      {showChrome && <SectionDots ids={Object.keys(sectionMap)} active={active} />}
      <div className="site">
        <main>
          <Intro />
          <AboutIntro />
          <AboutStats />
          <Architecture />
          <Location />
          <Infrastructure activeGroupId={infraGroup} onSelectGroup={setInfraGroup} />
          <InfraDetail key={infraGroup} groupId={infraGroup} />
          <InvestFormats onInquiry={setInquiry} />
          <InvestManage onInquiry={setInquiry} />
          <Apartments onInquiry={setInquiry} />
          <Construction />
          <Contacts inquiry={inquiry} />
        </main>
      </div>
    </>
  )
}
