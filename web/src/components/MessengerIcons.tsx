import { asset } from '../asset'

/** Shared gold artwork; the surrounding link carries the accessible label. */
function ContactIcon({ name }: { name: 'telegram' | 'whatsapp' | 'viber' | 'email' | 'phone' }) {
  return <img className="messenger-icon" src={asset(`icons/contact-gold/${name}.webp`)} width="256" height="256" alt="" aria-hidden="true" decoding="async" />
}

export function IconTelegram() { return <ContactIcon name="telegram" /> }
export function IconWhatsapp() { return <ContactIcon name="whatsapp" /> }
export function IconViber() { return <ContactIcon name="viber" /> }
export function IconMail() { return <ContactIcon name="email" /> }
export function IconPhone() { return <ContactIcon name="phone" /> }
