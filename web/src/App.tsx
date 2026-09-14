import { useEffect, useState } from 'react'
import { Header } from './components/Header'
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
import { decodeHash, isMobileFlow, isProgrammaticScroll, scrollToStage, siteScroller } from './scroll'

function snapNearest(root: HTMLElement) {
  if (isMobileFlow()) return
  if (isProgrammaticScroll()) return
  if (document.documentElement.classList.contains('is-nav-lock')) return
  const stages = Array.from(root.querySelectorAll<HTMLElement>('.stage'))
  if (!stages.length) return
  const origin = root.getBoundingClientRect().top
  let best = stages[0]
  let bestDist = Infinity
  for (const stage of stages) {
    const dist = Math.abs(stage.getBoundingClientRect().top - origin)
    if (dist < bestDist) {
      bestDist = dist
      best = stage
    }
  }
  if (bestDist < 8) return
  scrollToStage(best)
}

const sectionMap: Record<string, string> = {
  intro: 'intro',
  'about-stats': 'about',
  'about-intro': 'about',
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
  const [active, setActive] = useState('intro')

  useEffect(() => {
    const root = siteScroller()
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.stage'))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      {
        root,
        threshold: isMobileFlow() ? [0.12, 0.25, 0.4] : [0.35, 0.55, 0.75],
      },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const root = siteScroller()
    if (!root) return

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]')
      if (!(link instanceof HTMLAnchorElement)) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const id = decodeHash(href.slice(1))
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      scrollToStage(target)
      history.pushState(null, '', href)
    }

    let snapTimer = 0
    const scheduleSnap = () => {
      if (isMobileFlow()) return
      window.clearTimeout(snapTimer)
      snapTimer = window.setTimeout(() => snapNearest(root), 160)
    }

    const onScrollEnd = () => {
      if (isMobileFlow()) return
      snapNearest(root)
    }
    const onResize = () => scheduleSnap()

    const hash = decodeHash(window.location.hash.slice(1))
    if (hash) {
      const target = document.getElementById(hash)
      if (target) requestAnimationFrame(() => scrollToStage(target))
    }

    document.addEventListener('click', onClick)
    root.addEventListener('scrollend', onScrollEnd)
    root.addEventListener('scroll', scheduleSnap, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      window.clearTimeout(snapTimer)
      document.removeEventListener('click', onClick)
      root.removeEventListener('scrollend', onScrollEnd)
      root.removeEventListener('scroll', scheduleSnap)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  return (
    <>
      <Header hidden={active === 'intro'} active={sectionMap[active] ?? 'about'} />
      {active !== 'intro' && <SocialRail />}
      <div className="site">
        <main>
          <Intro />
          <AboutStats />
          <AboutIntro />
          <Architecture />
          <Location />
          <Infrastructure />
          <InfraDetail />
          <InvestFormats />
          <InvestManage />
          <Apartments />
          <Construction />
          <Contacts />
        </main>
      </div>
    </>
  )
}
