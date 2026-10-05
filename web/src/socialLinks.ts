import { asset } from './asset'
import { viberHref, whatsappHref } from './contactLinks'

export function socialLinks(viberLabel: string) {
  return [
    { href: 'https://t.me/', label: 'Telegram', icon: asset('icons/social-telegram.png?v=1') },
    { href: whatsappHref, label: 'WhatsApp', icon: asset('icons/social-whatsapp.png?v=1') },
    { href: viberHref, label: viberLabel, icon: asset('icons/social-phone.png?v=2') },
  ]
}
