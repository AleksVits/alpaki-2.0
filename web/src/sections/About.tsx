import { useNearSection } from '../useNearSection'
import { asset } from '../asset'
import { AboutSequence } from '../components/AboutSequence'
import { UkraineMap } from '../components/Maps'
import { Btn, Lead, Stage, splitTitle, SectionHeading } from '../components/Ui'
import { useI18n } from '../i18n'

const statIcons = [
  asset('icons/fact-tree.png?v=1'),
  asset('icons/fact-buildings.png?v=1'),
  asset('icons/fact-locations.png?v=1'),
  asset('icons/fact-shield.png?v=1'),
]
const featureIcons = [
  asset('icons/feature-apt.png?v=2'),
  asset('icons/feature-spa.png?v=3'),
  asset('icons/feature-pool.png?v=2'),
  asset('icons/feature-rest.png?v=2'),
  asset('icons/feature-leisure.png?v=2'),
]

export function AboutStats() {
  const { t } = useI18n()
  const stats = [
    { value: t.about.ha, sub: t.about.haSub },
    { value: t.about.buildings, sub: t.about.buildingsSub },
    { value: t.about.locations, sub: t.about.locationsSub },
    { value: t.about.reserve, sub: '' },
  ]

  return (
    <Stage id="about-stats" className="stage--about-stats" next="about-intro">
      <div className="about-stats">
        <div className="about-stats__copy">
          <SectionHeading kicker={t.about.factsKicker}>{t.about.kicker}</SectionHeading>
          <ul className="facts">
            {stats.map((item, i) => {
              const long = !item.sub
              return (
                <li key={item.value} className={`facts__item${long ? ' facts__item--long' : ''}`}>
                  <span className="facts__icon">
                    <img src={statIcons[i]} alt="" />
                  </span>
                  <span>
                    {long ? <small>{item.value}</small> : <strong>{item.value}</strong>}
                    {item.sub && <small>{item.sub}</small>}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="about-stats__chips">
            {t.about.chips.split('·').map((chip) => (
              <span key={chip.trim()}>{chip.trim()}</span>
            ))}
          </p>
        </div>
        <div className="about-stats__map">
          <UkraineMap />
        </div>
      </div>
    </Stage>
  )
}

export function AboutIntro() {
  const near = useNearSection('about-intro')
  const { t } = useI18n()
  return (
    <Stage id="about-intro" className="stage--about-intro" next="architecture" overlay={near ? <AboutSequence /> : null}>
      <div className="about-intro">
        <div className="about-intro__copy">
          <SectionHeading kicker={t.about.ideaKicker}>{splitTitle(t.about.title)}</SectionHeading>
          <Lead>{t.about.lead}</Lead>
          <ul className="features">
            {t.about.features.map((item, i) => (
              <li key={item.id}>
                <span className="features__icon">
                  <img src={featureIcons[i]} alt="" />
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="about-intro__quote">{t.about.owner}</p>
          <div className="btn-row">
            <Btn href="#apartments" solid arrow>
              {t.about.ctaApt}
            </Btn>
            <Btn href="#invest-formats" className="btn--secondary" arrow>
              {t.about.ctaInvest}
            </Btn>
          </div>
        </div>
      </div>
    </Stage>
  )
}
