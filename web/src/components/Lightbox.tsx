import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IconChevron } from './Icons'
import { useI18n } from '../useI18n'

export type LightboxItem = { src: string; alt: string; caption?: string }

/**
 * Full-screen photo viewer: arrows, swipe and the ← → keys move between photos,
 * Esc, the close button or a click on the dark backdrop closes it.
 */
export function Lightbox({ items, index, onIndex, onClose }: { items: LightboxItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const { t } = useI18n()
  const ref = useRef<HTMLDialogElement>(null)
  const touch = useRef<number | null>(null)
  const total = items.length
  const item = items[index]
  const go = (dir: number) => onIndex((index + dir + total) % total)

  useEffect(() => {
    const dialog = ref.current
    const trigger = document.activeElement as HTMLElement | null
    dialog?.showModal()
    document.documentElement.classList.add('is-lightbox-open')
    return () => {
      dialog?.close()
      document.documentElement.classList.remove('is-lightbox-open')
      trigger?.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item.alt}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
      }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        const start = touch.current
        touch.current = null
        if (start === null) return
        const dx = e.changedTouches[0].clientX - start
        if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1)
      }}
    >
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img key={item.src} src={item.src} alt={item.alt} decoding="async" />
        <figcaption>
          {item.caption && <span>{item.caption}</span>}
          {total > 1 && <span className="lightbox__count">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>}
        </figcaption>
      </figure>
      {total > 1 && (
        <>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label={t.ui.prev}>
            <IconChevron dir="left" />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label={t.ui.next}>
            <IconChevron dir="right" />
          </button>
        </>
      )}
      <button type="button" className="lightbox__close" onClick={(e) => { e.stopPropagation(); onClose() }} aria-label={t.ui.close} autoFocus>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
    </dialog>,
    document.body,
  )
}

/** Small corner badge on a photo that opens the full-screen viewer. */
export function ExpandIcon() {
  return (
    <svg className="expand-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  )
}
