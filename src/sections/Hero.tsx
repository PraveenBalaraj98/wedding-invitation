import { BRIDE, BRIDE_GIVEN, GROOM, GROOM_GIVEN, eventById } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Countdown } from "../components/Countdown.tsx"
import { Button } from "../components/Button.tsx"
import { Ganesha, Kolam } from "../components/Ornaments.tsx"

export function Hero() {
  const { locale, t } = useLocale()
  const wedding = eventById("wedding-ceremony")

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <p className="section-kicker">{t.omLabel}</p>
        <Ganesha label={t.ganeshaLabel} />
        <Kolam />
        <h1>{BRIDE_GIVEN}</h1>
        <p className="amp">&</p>
        <h1>{GROOM_GIVEN}</h1>
        <p className="hero-official">
          {BRIDE} {t.and} {GROOM}
        </p>
        <p className="hero-when">
          {wedding.dateLabel[locale]} · {wedding.timeLabel[locale]}
        </p>
        <Countdown />
        <Button variant="primary" href="#invitation">
          {t.nav.invitation}
        </Button>
      </div>
    </section>
  )
}
