import { useState } from 'react'
import {
  IconBanya,
  IconGym,
  IconHammam,
  IconJacuzzi,
  IconPool,
  IconSpa,
  IconArrow,
} from '../components/Icons'
import { Kicker, Lead, Ornament, Pager, Stage, Title, splitTitle } from '../components/Ui'
import { Placeholder } from '../components/Placeholder'
import { useI18n } from '../i18n'

const amenityIcons = [IconPool, IconHammam, IconJacuzzi, IconBanya, IconSpa, IconGym]

export function Infrastructure() {
  const { t } = useI18n()
  const [page, setPage] = useState(0)
  const cards = t.infra.cards
  const total = cards.length

  return (
    <Stage id="infrastructure" className="stage--infra" next="infra-detail">
      <div className="infra">
        <div className="infra__copy">
          <Kicker>{t.infra.kicker}</Kicker>
          <Title>{splitTitle(t.infra.title)}</Title>
          <Ornament />
          <Lead>{t.infra.lead}</Lead>
        </div>
        <div className="infra-grid">
          {cards.map((card) => (
            <a key={card.id} className={`infra-card infra-card--${card.id}`} href="#infra-detail">
              <Placeholder className="infra-card__ph" />
              <div className="infra-card__meta">
                <span>
                  {card.n}  {card.title}
                </span>
                <small>{card.tags}</small>
              </div>
              <span className="infra-card__go">
                <IconArrow />
              </span>
            </a>
          ))}
        </div>
        <Pager
          current={page + 1}
          total={total}
          onPrev={() => setPage((v) => (v - 1 + total) % total)}
          onNext={() => setPage((v) => (v + 1) % total)}
        />
      </div>
    </Stage>
  )
}

export function InfraDetail() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const total = t.infra.amenities.length

  return (
    <Stage id="infra-detail" className="stage--infra-detail" next="invest-formats">
      <Placeholder className="stage__photo" />
      <div className="infra-detail">
        <Kicker>{t.infra.restoreKicker}</Kicker>
        <Title>{splitTitle(t.infra.restoreTitle)}</Title>
        <Ornament />
        <Lead>{t.infra.restoreLead}</Lead>
        <ul className="amenity-bar glass glass--bar">
          {t.infra.amenities.map((item, i) => {
            const Icon = amenityIcons[i]
            return (
              <li key={item.id} className={i === index ? 'is-active' : ''}>
                <button type="button" onClick={() => setIndex(i)}>
                  <span className="amenity-bar__icon">
                    <Icon />
                  </span>
                  {item.label}
                </button>
              </li>
            )
          })}
          <li className="amenity-bar__pager">
            <Pager
              current={index + 1}
              total={total}
              onPrev={() => setIndex((v) => (v - 1 + total) % total)}
              onNext={() => setIndex((v) => (v + 1) % total)}
            />
          </li>
        </ul>
      </div>
    </Stage>
  )
}
