import { createElement } from 'react'
import { IconTree, IconBuildings, IconPin, IconShield, IconApt, IconSpa, IconPool, IconCloche, IconLeisure } from '../components/RasterIcons'
import { useNearSection } from '../useNearSection'
import { AboutSequence } from '../components/AboutSequence'
import { UkraineMap } from '../components/Maps'
import { Btn, Lead, Stage, SectionHeading } from '../components/Ui'
import { splitTitle } from '../components/titleText'
import { useI18n } from '../useI18n'

const statIcons = [IconTree, IconBuildings, IconPin, IconShield]
const featureIcons = [IconApt, IconSpa, IconPool, IconCloche, IconLeisure]

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
          <SectionHeading kicker={t.about.factsKicker}>{splitTitle(t.about.kicker)}</SectionHeading>
          <ul className="facts">
            {stats.map((item, i) => {
              const long = !item.sub
              return (
                <li key={item.value} className={`facts__item${long ? ' facts__item--long' : ''}`}>
                  <span className="facts__icon">
                    {createElement(statIcons[i])}
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
                  {createElement(featureIcons[i])}
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
