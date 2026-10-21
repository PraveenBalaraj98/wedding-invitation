import { motion, useReducedMotion } from "framer-motion"
import { CalendarPlus, Download } from "lucide-react"
import { eventById } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Button } from "../components/Button.tsx"
import { Countdown } from "../components/Countdown.tsx"
import { buildEventIcs, downloadTextFile, googleCalendarUrl } from "../utils/calendar.ts"

export function SaveTheDate() {
  const { locale, t } = useLocale()
  const reduced = useReducedMotion()
  const event = eventById("wedding-ceremony")
  const english = locale === "en"
  const [weekday, dated] = english ? event.dateLabel.en.split(", ") : ["", event.dateLabel[locale]]
  const note = t.dateNote

  function onDownload() {
    downloadTextFile(`${event.id}.ics`, buildEventIcs(event, locale), "text/calendar;charset=utf-8")
  }

  return (
    <section id="save-the-date" className="section">
      <div className="section-inner">
        <motion.article
          className="date-card"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="date-kicker">{t.saveTheDate}</p>
          <p className="date-main">{english ? dated : event.dateLabel[locale]}</p>
          {english && weekday && <p className="date-weekday">{weekday}</p>}
          <p className="date-time">
            {t.eventKickers["wedding-ceremony"]} · {event.timeLabel[locale]}
          </p>
          <Countdown />
          {note && <p className="date-note">{note}</p>}
          <div className="date-actions">
            <Button href={googleCalendarUrl(event, locale)} external>
              <CalendarPlus aria-hidden="true" />
              {t.addToCalendar}
            </Button>
            <Button variant="ghost" onClick={onDownload}>
              <Download aria-hidden="true" />
              {t.downloadCalendar}
            </Button>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
