import { Logo } from '../components/Logo'
import { Stage, splitTitle } from '../components/Ui'
import { useI18n } from '../i18n'

export function Intro() {
  const { t } = useI18n()
  return (
    <Stage id="intro" className="stage--intro" next="about-stats">
      <div className="intro">
        <Logo />
        <p className="intro__tag">{splitTitle(t.intro.tagline)}</p>
      </div>
    </Stage>
  )
}
