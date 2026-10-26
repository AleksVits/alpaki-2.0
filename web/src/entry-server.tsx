import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { I18nProvider, type Lang } from './i18n.tsx'
import { LegendPage } from './pages/Legend.tsx'
import type { Page } from './route'

/** Markup of one page in one language; scripts/prerender.mjs writes it into the built HTML. */
export function render(lang: Lang, page: Page = 'home') {
  return renderToString(
    <StrictMode>
      <I18nProvider initialLang={lang}>
        {page === 'legend' ? <LegendPage /> : <App />}
      </I18nProvider>
    </StrictMode>,
  )
}
