import { asset } from '../asset'
import {
  IconBuildings,
  IconShield,
  IconTree,
  IconUmbrella,
} from '../components/Icons'
import { UkraineMap } from '../components/Maps'
import { Btn, Kicker, Lead, Ornament, Stage, Title, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

const statIcons = [IconTree, IconBuildings, IconUmbrella, IconShield]
const featureIcons = [
  asset('icons/feature-apt.png?v=1'),
  asset('icons/feature-spa.png?v=1'),
  asset('icons/feature-pool.png?v=1'),
  asset('icons/feature-rest.png?v=1'),
  asset('icons/feature-leisure.png?v=1'),
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
          <Kicker>{t.about.section}</Kicker>
          <Title>{t.about.kicker}</Title>
          <Ornament />
          <ul className="facts">
            {stats.map((item, i) => {
              const Icon = statIcons[i]
              const long = !item.sub
              return (
                <li key={item.value} className={`facts__item${long ? ' facts__item--long' : ''}`}>
                  <span className="facts__icon">
                    <Icon />
                  </span>
                  <span>
                    <strong>{item.value}</strong>
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
  const { t } = useI18n()
  return (
    <Stage id="about-intro" className="stage--about-intro" next="architecture">
      <div className="about-intro">
        <div className="about-intro__copy">
          <Kicker>{t.about.section}</Kicker>
          <Title>{splitTitle(t.about.title)}</Title>
          <Ornament />
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
            <Btn href="#apartments" solid shine className="glass glass--chip">
              {t.about.ctaApt}
            </Btn>
            <Btn href="#invest-formats" shine className="glass glass--chip">
              {t.about.ctaInvest}
            </Btn>
          </div>
        </div>
      </div>
    </Stage>
  )
}
