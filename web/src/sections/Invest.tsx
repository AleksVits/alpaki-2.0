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
            {t.invest.items.map((item) => (
              <li key={item.n} className="invest-list__item">
                <span className="invest-list__n">{item.n}</span>
                <span className="invest-list__divider" aria-hidden="true" />
                <span className="invest-list__text">
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </span>
                {item.n === '03' && <span className="invest-list__sq">{t.invest.minArea}</span>}
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
