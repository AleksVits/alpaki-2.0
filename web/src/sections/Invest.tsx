import { IconCalendar, IconChart, IconDish, IconKeys } from '../components/Icons'
import { Placeholder } from '../components/Placeholder'
import { Btn, Kicker, Lead, Pager, Stage, Title, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

const manageIcons = [IconKeys, IconCalendar, IconDish, IconChart]

export function InvestFormats() {
  const { t } = useI18n()
  return (
    <Stage id="invest-formats" className="stage--invest" next="invest-manage">
      <Placeholder className="stage__photo stage__photo--right" />
      <div className="invest">
        <div className="invest__copy">
          <Kicker>{t.invest.kicker}</Kicker>
          <Title>{splitTitle(t.invest.title)}</Title>
          <Lead>{t.invest.lead}</Lead>
        </div>
        <ol className="invest-list">
          {t.invest.items.map((item) => (
            <li key={item.n} className="invest-list__item">
              <span className="invest-list__n">{item.n}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </span>
              {item.n === '03' && <span className="invest-list__sq">1 м²</span>}
            </li>
          ))}
        </ol>
        <p className="invest__flow">{t.invest.flow}</p>
        <div className="btn-row">
          <Btn href="#contacts">{t.invest.ctaOffer}</Btn>
          <Btn href="#contacts">{t.invest.ctaConsult}</Btn>
        </div>
      </div>
    </Stage>
  )
}

export function InvestManage() {
  const { t } = useI18n()
  return (
    <Stage id="invest-manage" className="stage--invest-manage" next="apartments">
      <Placeholder className="stage__photo" />
      <div className="manage">
        <div className="manage__copy">
          <Kicker>{t.invest.kicker}</Kicker>
          <Title>{splitTitle(t.invest.manageTitle)}</Title>
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
          <Btn href="#contacts">{t.invest.ctaTerms}</Btn>
          <Pager
            current={2}
            total={3}
            onPrev={() => document.getElementById('invest-formats')?.scrollIntoView({ behavior: 'smooth' })}
            onNext={() => document.getElementById('apartments')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>
    </Stage>
  )
}
