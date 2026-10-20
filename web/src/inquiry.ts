import type { Translations } from './i18n'

/** What the visitor was looking at when they pressed a call-to-action leading to the form. */
export type Inquiry =
  | { kind: 'apartment'; house: number; type: number; layout?: number }
  | { kind: 'offer' }
  | { kind: 'consultation' }
  | { kind: 'management' }

/** Opening line for the message field, in the current language. */
export function inquiryMessage(inquiry: Inquiry | null, t: Translations) {
  if (!inquiry) return ''
  if (inquiry.kind !== 'apartment') return t.inquiry[inquiry.kind]
  return t.inquiry.apartment
    .replace('{house}', t.apt.buildings[inquiry.house].title)
    .replace('{type}', t.apt.types[inquiry.type].title.toLowerCase() + (inquiry.layout ? `, ${t.apt.layout.replace('{n}', String(inquiry.layout)).toLowerCase()}` : ''))
}

/** Short topic for the email subject. */
export function inquirySubject(inquiry: Inquiry | null, t: Translations) {
  return inquiry ? t.inquiry.subject[inquiry.kind] : ''
}
