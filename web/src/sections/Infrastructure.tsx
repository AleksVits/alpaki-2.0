import { useEffect, useRef, useState } from 'react'
import { IconAmenity, IconArrow, IconChevron } from '../components/Icons'
import { Lead, Stage, splitTitle, SectionHeading } from '../components/Ui'
import { asset } from '../asset'
import { useI18n } from '../i18n'

export function Infrastructure({
  activeGroupId,
  onSelectGroup,
}: {
  activeGroupId: string
  onSelectGroup: (id: string) => void
}) {
  const { t } = useI18n()
  const groups = t.infra.groups
  const activeIndex = Math.max(0, groups.findIndex((group) => group.id === activeGroupId))

  return (
    <Stage
      id="infrastructure"
      className="stage--infra"
      next="infra-detail"
      overlay={(
        <div className="infra__backdrop" aria-hidden="true">
          <img
            src={asset('infrastructure/overview-night.jpg')}
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
      )}
    >
      <div className="infra">
        <div className="infra__copy">
          <SectionHeading kicker={t.infra.kicker}>{splitTitle(t.infra.title)}</SectionHeading>
          <Lead>{t.infra.lead}</Lead>
        </div>
        <div
          className="infra-carousel"
          role="region"
          aria-label={t.infra.carouselLabel}
        >
          <div className="infra-page infra-page--count-5">
            <div className="infra-grid">
              {groups.map((group, cardIndex) => (
                <a
                  key={group.id}
                  className={`infra-card infra-card--slot-${cardIndex + 1}${cardIndex === activeIndex ? ' is-active' : ''}`}
                  href="#infra-detail"
                  onClick={() => onSelectGroup(group.id)}
                >
                  <img
                    className="infra-card__image"
                    src={asset(group.items[0].images[0])}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <div className="infra-card__meta">
                    <span>
                      <b>{group.n}</b> {group.title}
                    </span>
                    <small>{group.tags}</small>
                  </div>
                  <span className="infra-card__go" aria-hidden="true">
                    <IconArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Stage>
  )
}

export function InfraDetail({ groupId }: { groupId: string }) {
  const { t } = useI18n()
  const group = t.infra.groups.find((entry) => entry.id === groupId) ?? t.infra.groups[0]
  const [itemIndex, setItemIndex] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const itemsRef = useRef<HTMLDivElement>(null)
  const item = group.items[itemIndex]
  const photo = item.images[photoIndex] ?? item.images[0]

  const showItem = (next: number) => {
    setItemIndex((next + group.items.length) % group.items.length)
    setPhotoIndex(0)
  }
  const showPhoto = (next: number) => setPhotoIndex((next + item.images.length) % item.images.length)

  useEffect(() => {
    group.items.forEach((entry) => {
      entry.images.forEach((src) => {
        const image = new Image()
        image.src = asset(src)
      })
    })
  }, [group])

  useEffect(() => {
    const strip = itemsRef.current
    const selected = strip?.querySelectorAll('button')[itemIndex]
    if (!strip || !selected) return
    const stripRect = strip.getBoundingClientRect()
    const selectedRect = selected.getBoundingClientRect()
    const fullyVisible = selectedRect.left >= stripRect.left && selectedRect.right <= stripRect.right
    if (fullyVisible) return
    const centeredLeft = strip.scrollLeft + selectedRect.left - stripRect.left
      - (stripRect.width - selectedRect.width) / 2
    strip.scrollTo({
      left: centeredLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [itemIndex, groupId])

  return (
    <Stage
      id="infra-detail"
      className="stage--infra-detail"
      next="invest-formats"
      overlay={(
        <div className="infra-detail__media" aria-hidden="true">
          <img key={photo} src={asset(photo)} alt="" decoding="async" />
        </div>
      )}
    >
      <div className="infra-detail">
        <div className="infra-detail__copy">
          <SectionHeading kicker={group.title}>
            {splitTitle(group.detailTitle)}
          </SectionHeading>
          <Lead>{group.lead}</Lead>
        </div>

        <div className="infra-detail__picker glass glass--bar">
          <div className="infra-detail__items" ref={itemsRef}>
            {group.items.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                className={index === itemIndex ? 'is-active' : ''}
                onClick={() => showItem(index)}
                aria-pressed={index === itemIndex}
              >
                <span className="infra-detail__item-icon"><IconAmenity id={entry.id} /></span>
                <span className="infra-detail__item-label">{entry.title}</span>
              </button>
            ))}
          </div>
          {item.images.length > 1 && (
            <div className="infra-detail__photo-nav">
              <button type="button" onClick={() => showPhoto(photoIndex - 1)} aria-label={t.ui.prev}>
                <IconChevron dir="left" />
              </button>
              <strong>{item.title}</strong>
              <span aria-live="polite">{String(photoIndex + 1).padStart(2, '0')} / {String(item.images.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => showPhoto(photoIndex + 1)} aria-label={t.ui.next}>
                <IconChevron dir="right" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Stage>
  )
}
