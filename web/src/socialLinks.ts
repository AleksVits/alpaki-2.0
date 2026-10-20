import { IconTelegram, IconWhatsapp, IconViber } from './components/Icons'
import { viberHref, whatsappHref } from './contactLinks'

export function socialLinks(viberLabel: string) {
  return [
    { href: 'https://t.me/', label: 'Telegram', Icon: IconTelegram },
    { href: whatsappHref, label: 'WhatsApp', Icon: IconWhatsapp },
    { href: viberHref, label: viberLabel, Icon: IconViber },
  ]
}
