export function decodeHash(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function siteScroller() {
  return document.querySelector<HTMLElement>('.site')
}

export function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let programmaticScroll = false
let programmaticTimer = 0

export function isProgrammaticScroll() {
  return programmaticScroll
}

export function scrollToStage(el: Element) {
  programmaticScroll = true
  window.clearTimeout(programmaticTimer)
  el.scrollIntoView({
    behavior: reducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
  programmaticTimer = window.setTimeout(() => {
    programmaticScroll = false
  }, 900)
}
