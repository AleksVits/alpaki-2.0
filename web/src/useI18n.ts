import { createContext, useContext } from 'react'
import type { Lang, Translations } from './i18n'

type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
