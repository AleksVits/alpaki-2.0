import { IconPin } from '../components/Icons'
import { Btn, Kicker, Lead, Stage, Title, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

export function Location() {
  const { t } = useI18n()
  return (
    <Stage id="location" className="stage--location" next="infrastructure">
      <div className="location">
        <div className="location__copy">
          <Kicker>{t.location.kicker}</Kicker>
          <Title>{splitTitle(t.location.title)}</Title>
          <Lead>{t.location.text}</Lead>
        </div>
        <div className="location__scene" aria-hidden="true" />
        <div className="location__bar">
          <div className="location__way">
            <span className="location__ico">
              <img src="/icons/location-train.png?v=1" alt="" />
            </span>
            <span>
              <strong>{t.location.train}</strong>
              <small>{t.location.trainSub}</small>
            </span>
          </div>
          <div className="location__way">
            <span className="location__ico">
              <img src="/icons/location-car.png?v=1" alt="" />
            </span>
            <span>
              <strong>{t.location.car}</strong>
              <small className="pre">{t.location.carSub}</small>
            </span>
          </div>
          <div className="location__places">
            <div className="location__cities">
              <span>
                <IconPin />
                <span>
                  <b>{t.location.if}</b>
                  <em>{t.location.ifMeta}</em>
                </span>
              </span>
              <span>
                <IconPin />
                <span>
                  <b>{t.location.lviv}</b>
                  <em>{t.location.lvivMeta}</em>
                </span>
              </span>
              <span>
                <IconPin />
                <span>
                  <b>{t.location.uzh}</b>
                  <em>{t.location.uzhMeta}</em>
                </span>
              </span>
            </div>
            <p className="location__near">{t.location.nearby}</p>
          </div>
          <Btn href="https://maps.google.com/?q=Kvasy+Trostyanets">{t.location.route}</Btn>
        </div>
      </div>
    </Stage>
  )
}
