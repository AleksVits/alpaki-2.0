import { IconBell, IconCalendar, IconChart, IconKeys } from '../components/Icons'
import { Btn, Lead, Stage, splitTitle, SectionHeading } from '../components/Ui'
import { asset } from '../asset'
import { useI18n } from '../i18n'

const manageIcons = [IconKeys, IconCalendar, IconBell, IconChart]

export function InvestFormats() {
  const { t } = useI18n()
  return (
    <Stage
      id="invest-formats"
      className="stage--invest"
      next="invest-manage"
      overlay={(
        <div className="invest__backdrop" aria-hidden="true">
          <img src={asset('invest-formats-background.jpg')} alt="" loading="lazy" decoding="async" fetchPriority="low" />
        </div>
      )}
    >
      <div className="invest">
        <div className="invest__copy">
          <SectionHeading kicker={t.invest.kicker}>{splitTitle(t.invest.title)}</SectionHeading>
          <Lead>{t.invest.lead}</Lead>
        </div>
        <div className="invest__formats">
          <ol className="invest-list">
            {[t.invest.items[2], t.invest.items[1], t.invest.items[0]].map((item, index) => (
              <li key={item.n} className="invest-list__item">
                <span className="invest-list__n">{String(index + 1).padStart(2, '0')}</span>
                <span className="invest-list__divider" aria-hidden="true" />
                <span className="invest-list__text">
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </span>
                {item.n === '03' && (
                  <span className="invest-list__sq">
                    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                      <rect x="9" y="7" width="39" height="39" rx="1.5" />
                      <path d="M9 51v5m39-5v5M9 54h39M53 7h5m-5 39h5M56 7v39" />
                      <path d="m9 54 3-2m-3 2 3 2m36-2-3-2m3 2-3 2M56 7l-2 3m2-3 2 3m-2 36-2-3m2 3 2-3" />
                    </svg>
                    <span>{t.invest.minArea}</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
          <ol className="invest__flow">
            {t.invest.flow.split('→').map((step) => (
              <li key={step.trim()}>{step.trim()}</li>
            ))}
          </ol>
        </div>
        <div className="invest__actions btn-row">
          <Btn href="#contacts" solid arrow>{t.invest.ctaOffer}</Btn>
          <Btn href="#contacts" className="btn--secondary" arrow>{t.invest.ctaConsult}</Btn>
        </div>
      </div>
    </Stage>
  )
}

export function InvestManage() {
  const { t } = useI18n()
  return (
    <Stage
      id="invest-manage"
      className="stage--invest-manage"
      next="apartments"
      overlay={(
        <div className="manage__backdrop" aria-hidden="true">
          <img src={asset('invest-manage-background.jpg')} alt="" loading="lazy" decoding="async" fetchPriority="low" />
        </div>
      )}
    >
      <div className="manage">
        <div className="manage__copy">
          <SectionHeading kicker={t.invest.kicker}>{splitTitle(t.invest.manageTitle)}</SectionHeading>
          <Lead>{t.invest.manageLead}</Lead>
        </div>
        <ol className="manage-steps">
          {t.invest.steps.map((step, i) => {
            const Icon = manageIcons[i]
            return (
              <li key={step.n}>
                <span className="manage-steps__icon">
                  <Icon />
                </span>
                <span className="manage-steps__n">{step.n}</span>
                <strong>{step.title}</strong>
                <small>{step.text}</small>
              </li>
            )
          })}
        </ol>
        <div className="manage__foot">
          <Btn href="#contacts" solid arrow>{t.invest.ctaTerms}</Btn>
        </div>
      </div>
    </Stage>
  )
}
