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
import { decodeHash, isMobileFlow, scrollToStage, siteScroller } from './scroll'

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
  const [pastIntro, setPastIntro] = useState(false)

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
        threshold: isMobileFlow() ? [0.08, 0.18, 0.35, 0.55] : [0.35, 0.55, 0.75],
      },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
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

    const hash = decodeHash(window.location.hash.slice(1))
    if (hash) {
      const target = document.getElementById(hash)
      if (target) requestAnimationFrame(() => scrollToStage(target))
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [])

  const showChrome = pastIntro

  return (
    <>
      <Header hidden={!showChrome} active={sectionMap[active] ?? 'about'} />
      {showChrome && <SocialRail />}
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
