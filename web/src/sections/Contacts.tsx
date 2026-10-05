import { useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconViber,
  IconWhatsapp,
} from '../components/Icons'
import { asset } from '../asset'
import { emailHref, phoneHref, viberHref, whatsappHref } from '../contactLinks'
import { Btn, Kicker, Lead, Stage, SectionHeading } from '../components/Ui'
import { splitTitle } from '../components/titleText'
import { useI18n } from '../useI18n'

export function Contacts() {
  const { t } = useI18n()
  const [draftOpened, setDraftOpened] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const privacyRef = useRef<HTMLDialogElement>(null)
  const privacyTriggerRef = useRef<HTMLButtonElement>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fields = new FormData(e.currentTarget)
    const body = [
      `${t.contacts.name}: ${fields.get('name')}`,
      `${t.contacts.emailField}: ${fields.get('email')}`,
      `${t.contacts.phoneField}: ${fields.get('phone')}`,
      '', String(fields.get('message') || ''),
    ].join('\n')
    window.location.href = `${emailHref}?subject=${encodeURIComponent(t.contacts.formKicker)}&body=${encodeURIComponent(body)}`
    setDraftOpened(true)
  }

  useEffect(() => {
    if (!privacyOpen) return
    const dialog = privacyRef.current
    const trigger = privacyTriggerRef.current
    dialog?.showModal()
    return () => {
      dialog?.close()
      trigger?.focus({ preventScroll: true })
    }
  }, [privacyOpen])

  return (
    <Stage id="contacts" className="stage--contacts" overlay={
      <div className="contacts__backdrop" aria-hidden="true">
        <img src={asset('contacts-background.jpg')} alt="" loading="lazy" decoding="async" />
      </div>
    }>
      <div className="contacts">
        <div className="contacts__copy">
          <SectionHeading kicker={t.contacts.company}>{splitTitle(t.contacts.title)}</SectionHeading>
          <Lead>{t.contacts.lead}</Lead>
          <p className="contacts__hours">
            <IconClock /> {t.contacts.hours}
          </p>
          <ul className="contacts__list">
            <li className="contacts__place contacts__place--main">
              <IconPin />
              <span>
                <b>{t.contacts.addressComplex}</b>
                <small className="pre">{t.contacts.addressComplexVal}</small>
              </span>
            </li>
            <li className="contacts__place contacts__place--office">
              <IconPin />
              <span>
                <b>{t.contacts.addressOffice}</b>
                <small>{t.contacts.addressOfficeVal}</small>
              </span>
            </li>
            <li className="contacts__channel">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <IconWhatsapp />
                <span><b>{t.contacts.whatsapp}</b><small>{t.contacts.messenger}</small></span>
              </a>
            </li>
            <li className="contacts__channel">
              <a href={viberHref}>
                <IconViber />
                <span><b>{t.contacts.viber}</b><small>{t.contacts.messenger}</small></span>
              </a>
            </li>
            <li className="contacts__channel">
              <a href={phoneHref}>
                <IconPhone />
                <span><b>{t.contacts.phone}</b><small>{t.contacts.phoneVal}</small></span>
              </a>
            </li>
            <li className="contacts__channel">
              <a href={emailHref}>
                <IconMail />
                <span><b>{t.contacts.email}</b><small>{t.contacts.emailVal}</small></span>
              </a>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <Kicker>{t.contacts.formKicker}</Kicker>
          <h3 className="form__title">{t.contacts.formTitle}</h3>
          <p className="form__lead">{t.contacts.formLead}</p>
          {draftOpened && <p className="form__ok" role="status">{t.contacts.success}</p>}
          <label>
            {t.contacts.name}
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            {t.contacts.emailField}
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            {t.contacts.phoneField}
            <input name="phone" type="tel" required autoComplete="tel" />
          </label>
          <label>
            {t.contacts.message}
            <textarea name="message" rows={3} />
          </label>
          <label className="form__check">
            <input type="checkbox" required />
            <span>
              {t.contacts.privacy}{' '}
              <button ref={privacyTriggerRef} type="button" className="text-link" onClick={() => setPrivacyOpen(true)}>
                ({t.contacts.privacyTitle})
              </button>
            </span>
          </label>
          <Btn type="submit" solid arrow={false}>
            {t.contacts.submit}
          </Btn>
        </form>
      </div>

      {privacyOpen && createPortal(
        <dialog
          ref={privacyRef}
          className="modal"
          aria-labelledby="privacy-title"
          onCancel={() => setPrivacyOpen(false)}
          onClick={() => setPrivacyOpen(false)}
        >
          <div className="modal__card" onClick={(e) => e.stopPropagation()}>
            <h3 id="privacy-title">{t.contacts.privacyTitle}</h3>
            <p>{t.contacts.privacyText}</p>
            <button type="button" className="btn btn--ghost" onClick={() => setPrivacyOpen(false)}>
              {t.ui.close}
            </button>
          </div>
        </dialog>, document.body,
      )}
    </Stage>
  )
}
