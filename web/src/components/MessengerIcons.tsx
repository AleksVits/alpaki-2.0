import type { ReactNode } from 'react'

/** Optical 24px grid: crisp silhouettes, with room around each brand mark. */
function MessengerIcon({ children }: { children: ReactNode }) {
  return <svg className="messenger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{children}</svg>
}

export function IconTelegram() {
  return <MessengerIcon>
    <path d="m3 10.6 17-6.5c.7-.3 1.1.1.9.9l-2.9 14c-.1.7-.6.9-1.2.5l-4.5-3.3-2.3 2.2c-.3.3-.5.4-.6-.1l.3-4.4 8-7-10 6.2-4.6-1.4c-.8-.3-.8-.8-.1-1.1Z" fill="currentColor" stroke="none" />
  </MessengerIcon>
}

export function IconWhatsapp() {
  return <MessengerIcon>
    <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.8A8.5 8.5 0 1 1 20.5 11.7Z" />
    <path d="M8.3 7.1c-.3-.6-.6-.6-1-.6-.8 0-1.4 1.1-1.3 2 .2 2.8 3.9 6.6 7 7.2 1.4.3 2.6-.5 2.8-1.5.1-.4 0-.5-.3-.7l-1.8-.9c-.3-.2-.5-.1-.7.2l-.7.8c-.2.2-.4.2-.7 0a7.2 7.2 0 0 1-3.1-2.8c-.2-.3-.1-.5.1-.7l.6-.7c.2-.2.2-.4.1-.7Z" transform="translate(1 1) scale(.94)" fill="currentColor" stroke="none" />
  </MessengerIcon>
}

export function IconViber() {
  return <MessengerIcon>
    <path d="M7.2 3.8a24 24 0 0 1 9.6 0c2.4.5 3.7 2.1 3.9 4.5.2 2 .2 4 0 5.9-.3 2.6-1.7 4.1-4.2 4.5-1.8.3-3.6.3-5.4.2L7 22v-3.6c-2.3-.6-3.6-2-3.8-4.3a31 31 0 0 1 0-5.8c.2-2.4 1.6-4 4-4.5Z" />
    <path d="m8 7.6 1.5 2c.2.3.2.6-.1.9l-.6.6c.7 1.4 1.7 2.4 3.2 3.1l.6-.7c.2-.3.5-.3.8-.1l2.1 1.5c.3.2.3.5.2.8-.4.9-1.1 1.4-2 1.2-3.5-.8-6.7-3.9-7.5-7.3-.2-.9.2-1.7 1-2.1.3-.2.6-.2.8.1Z" fill="currentColor" stroke="none" />
    <path d="M12.8 6.8a5.2 5.2 0 0 1 4.6 4.7M12.9 9.3a2.7 2.7 0 0 1 2 2.1" strokeWidth="1.3" />
  </MessengerIcon>
}
