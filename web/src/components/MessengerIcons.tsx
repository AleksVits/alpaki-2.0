import { asset } from '../asset'

/** Gold messenger marks (public/icons/messenger-*.webp); the button or link around them carries the label. */
function MessengerIcon({ name }: { name: 'telegram' | 'whatsapp' | 'viber' }) {
  return <img className="messenger-icon" src={asset(`icons/messenger-${name}.webp`)} width="128" height="128" alt="" aria-hidden="true" decoding="async" />
}

export function IconTelegram() { return <MessengerIcon name="telegram" /> }
export function IconWhatsapp() { return <MessengerIcon name="whatsapp" /> }
export function IconViber() { return <MessengerIcon name="viber" /> }
