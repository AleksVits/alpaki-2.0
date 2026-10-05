import type { PointerEvent } from 'react'

export function shineCard(e: PointerEvent<HTMLElement>) {
  if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = e.currentTarget
  const box = el.getBoundingClientRect()
  const x = (e.clientX - box.left) / box.width
  const y = (e.clientY - box.top) / box.height
  el.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
  el.style.setProperty('--my', `${(y * 100).toFixed(2)}%`)

  const dead = 0.2
  const edge = (value: number) => {
    const delta = value - 0.5
    const over = Math.abs(delta) - dead
    if (over <= 0) return 0
    return Math.sign(delta) * (over / (0.5 - dead))
  }
  const nx = edge(x)
  const ny = edge(y)
  el.style.setProperty('--tilt-x', `${(nx * 6).toFixed(2)}deg`)
  el.style.setProperty('--tilt-y', `${(-ny * 5).toFixed(2)}deg`)
}

export function resetShineCard(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  el.style.setProperty('--mx', '50%')
  el.style.setProperty('--my', '38%')
  el.style.setProperty('--tilt-x', '0deg')
  el.style.setProperty('--tilt-y', '0deg')
}
