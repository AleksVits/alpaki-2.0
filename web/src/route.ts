import type { Lang } from './i18n'

/** Separate pages of the site. Each has a Ukrainian address and an English one under `en/`. */
export type Page = 'home' | 'legend'

const base = import.meta.env.BASE_URL

/** The page part of an address relative to `base`, e.g. `legend/` or `en/legend/`. */
export function pageFromPath(pathname: string): Page {
  return /^(en\/)?legend(\/|$|index\.html)/.test(pathname.slice(base.length)) ? 'legend' : 'home'
}

export function pagePath(lang: Lang, page: Page) {
  return `${base}${lang === 'en' ? 'en/' : ''}${page === 'legend' ? 'legend/' : ''}`
}
