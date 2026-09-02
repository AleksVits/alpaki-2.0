import {
  IconBuildings,
  IconFire,
  IconShield,
  IconTree,
  IconUmbrella,
} from '../components/Icons'
import { UkraineMap } from '../components/Maps'
import { Btn, Lead, Stage, Title, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

const statIcons = [IconTree, IconBuildings, IconUmbrella, IconShield]
const featureIcons = [
  '/icons/feature-apt.png?v=1',
  '/icons/feature-spa.png?v=1',
  '/icons/feature-pool.png?v=1',
  '/icons/feature-rest.png?v=1',
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
          <h2 className="about-stats__title">{t.about.kicker}</h2>
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
          <p className="about-stats__chips">{t.about.chips}</p>
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
          <Title className="about-intro__title">{splitTitle(t.about.title)}</Title>
          <Lead>{t.about.lead}</Lead>
          <ul className="features">
            {t.about.features.map((item, i) => (
              <li key={item.id}>
                <span className="features__icon">
                  {featureIcons[i] ? (
                    <img src={featureIcons[i]} alt="" />
                  ) : (
                    <IconFire />
                  )}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <Lead className="lead--tight">{t.about.owner}</Lead>
          <div className="btn-row">
            <Btn href="#apartments">{t.about.ctaApt}</Btn>
            <Btn href="#invest-formats">{t.about.ctaInvest}</Btn>
          </div>
        </div>
      </div>
    </Stage>
  )
}
