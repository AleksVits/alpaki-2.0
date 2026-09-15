import { asset } from '../asset'
import { Btn, Lead, Stage, splitTitle, SectionHeading } from '../components/Ui'
import { useI18n } from '../i18n'

export function Location() {
  const { t } = useI18n()

  return (
    <Stage id="location" className="stage--location" next="infrastructure">
      <div className="location">
        <div className="location__copy">
          <SectionHeading kicker={t.location.kicker}>{splitTitle(t.location.title)}</SectionHeading>
          <Lead>{t.location.text}</Lead>
          <p className="location__near">{t.location.nearby}</p>
        </div>
        <div className="location__scene" aria-hidden="true" />
        <div className="location__bar glass glass--bar">
          <div className="location__facts">
            <div className="location__ways">
              <div className="location__way location__way--train">
                <span className="location__ico">
                  <img src={asset('icons/location-train.png?v=4')} alt="" />
                </span>
                <span>
                  <strong>{t.location.train}</strong>
                  <small>{t.location.trainSub}</small>
                </span>
              </div>
              <span className="location__sep" aria-hidden="true" />
              <div className="location__way location__way--car">
                <span className="location__ico">
                  <img src={asset('icons/location-car.png?v=4')} alt="" />
                </span>
                <span>
                  <strong>{t.location.car}</strong>
                  <small className="pre">{t.location.carSub}</small>
                </span>
              </div>
            </div>
            <span className="location__sep" aria-hidden="true" />
            <span className="location__rule" aria-hidden="true" />
            <div className="location__places">
              <div className="location__cities">
                <span>
                  <img className="location__pin" src={asset('icons/location-pin.png?v=1')} alt="" />
                  <span>
                    <b>{t.location.if}</b>
                    <em>{t.location.ifMeta}</em>
                  </span>
                </span>
                <span>
                  <img className="location__pin" src={asset('icons/location-pin.png?v=1')} alt="" />
                  <span>
                    <b>{t.location.lviv}</b>
                    <em>{t.location.lvivMeta}</em>
                  </span>
                </span>
                <span>
                  <img className="location__pin" src={asset('icons/location-pin.png?v=1')} alt="" />
                  <span>
                    <b>{t.location.uzh}</b>
                    <em>{t.location.uzhMeta}</em>
                  </span>
                </span>
              </div>
            </div>
            <span className="location__sep" aria-hidden="true" />
          </div>
          <Btn href="https://maps.google.com/?q=Kvasy+Trostyanets" solid shine className="glass glass--chip">
            {t.location.route}
          </Btn>
        </div>
      </div>
    </Stage>
  )
}
