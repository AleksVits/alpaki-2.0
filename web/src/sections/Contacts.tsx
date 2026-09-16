import { useEffect, useState, type FormEvent } from 'react'
import {
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconViber,
  IconWhatsapp,
} from '../components/Icons'
import { asset } from '../asset'
import { Btn, Kicker, Lead, Stage, splitTitle, SectionHeading } from '../components/Ui'
import { useI18n } from '../i18n'

export function Contacts() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  useEffect(() => {
    if (!privacyOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPrivacyOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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
            <li>
              <IconPin />
              <span>
                <b>{t.contacts.addressComplex}</b>
                <small className="pre">{t.contacts.addressComplexVal}</small>
              </span>
            </li>
            <li>
              <IconPin />
              <span>
                <b>{t.contacts.addressOffice}</b>
                <small>{t.contacts.addressOfficeVal}</small>
              </span>
            </li>
            <li>
              <IconWhatsapp />
              <span>
                <b>{t.contacts.whatsapp}</b>
                <small>{t.contacts.messenger}</small>
              </span>
            </li>
            <li>
              <IconViber />
              <span>
                <b>{t.contacts.viber}</b>
                <small>{t.contacts.messenger}</small>
              </span>
            </li>
            <li>
              <IconPhone />
              <span>
                <b>{t.contacts.phone}</b>
                <small>{t.contacts.phoneVal}</small>
              </span>
            </li>
            <li>
              <IconMail />
              <span>
                <b>{t.contacts.email}</b>
                <small>{t.contacts.emailVal}</small>
              </span>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <Kicker>{t.contacts.formKicker}</Kicker>
          <h3 className="form__title">{t.contacts.formTitle}</h3>
          <p className="form__lead">{t.contacts.formLead}</p>
          {sent ? (
            <p className="form__ok">{t.contacts.success}</p>
          ) : (
            <>
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
                  <button type="button" className="text-link" onClick={() => setPrivacyOpen(true)}>
                    ({t.contacts.privacyTitle})
                  </button>
                </span>
              </label>
              <Btn type="submit" solid arrow={false}>
                {t.contacts.submit}
              </Btn>
            </>
          )}
        </form>
      </div>

      {privacyOpen && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-title"
          onClick={() => setPrivacyOpen(false)}
        >
          <div className="modal__card" onClick={(e) => e.stopPropagation()}>
            <h3 id="privacy-title">{t.contacts.privacyTitle}</h3>
            <p>{t.contacts.privacyText}</p>
            <button type="button" className="btn btn--ghost" onClick={() => setPrivacyOpen(false)}>
              {t.ui.close}
            </button>
          </div>
        </div>
      )}
    </Stage>
  )
}
