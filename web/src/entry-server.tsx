import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { I18nProvider, type Lang } from './i18n.tsx'

/** Markup of the whole page in one language; scripts/prerender.mjs writes it into the built HTML. */
export function render(lang: Lang) {
  return renderToString(
    <StrictMode>
      <I18nProvider initialLang={lang}>
        <App />
      </I18nProvider>
    </StrictMode>,
  )
}
