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
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.stage'))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { threshold: [0.35, 0.55, 0.75] },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <div className="site">
      <Header hidden={active === 'intro'} active={sectionMap[active] ?? 'about'} />
      {active !== 'intro' && <SocialRail />}
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
  )
}
