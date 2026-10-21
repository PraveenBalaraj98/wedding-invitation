import { useState } from "react"
import { CalendarPlus, Clock, Download, MapPin, Music, Utensils } from "lucide-react"
import { useLocale } from "../context/LocaleContext.tsx"
import { addressForDisplay, venueForDisplay, type EventId, type WeddingEvent } from "../data/weddingConfig.ts"
import { buildEventIcs, downloadTextFile, googleCalendarUrl } from "../utils/calendar.ts"
import { Button } from "./Button.tsx"

const scheduleIcons = [Clock, Music, Utensils]

const eventImage: Record<EventId, string> = {
  "chennai-reception": "/images/event-chennai.jpg",
  "wedding-ceremony": "/images/event-wedding.jpg",
  "bengaluru-reception": "/images/event-bengaluru.jpg",
}

function EventPhoto({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false)
  if (missing) return null
  return <img className="event-photo" src={src} alt={alt} onError={() => setMissing(true)} />
}

export function EventCard({ event }: { event: WeddingEvent }) {
  const { locale, t } = useLocale()
  const title = t.eventTitles[event.id]
  const address = addressForDisplay(event.address, locale)
  const venue = venueForDisplay(event.venueName, locale)
  const onDark = event.id === "chennai-reception"

  function onDownload() {
    downloadTextFile(`${event.id}.ics`, buildEventIcs(event, locale), "text/calendar;charset=utf-8")
  }

  return (
    <article className={`event-card event-${event.id === "chennai-reception" ? "chennai" : event.id === "wedding-ceremony" ? "wedding" : "bengaluru"}`}>
      <EventPhoto src={eventImage[event.id]} alt={title} />
      <p className="event-kicker">{t.eventKickers[event.id]}</p>
      <h3>{title}</h3>
      <p>
        <strong>{t.dateLabel}: </strong>
        {event.dateLabel[locale]}
      </p>
      {event.schedule.length > 0 ? (
        <ol className="timeline">
          {event.schedule.map((item, index) => {
            const Icon = scheduleIcons[index] ?? Clock
            return (
              <li key={item.time}>
                <span className="inline-flex items-center gap-2">
                  <Icon aria-hidden="true" size={16} />
                  {item.label[locale]}
                </span>
                <span>{item.clock[locale]}</span>
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="event-time">
          <strong>{t.timeLabel}: </strong>
          {event.timeLabel[locale]}
        </p>
      )}
      {address ? (
        <address className="venue-confirmed not-italic">
          {venue && <strong className="block">{venue}</strong>}
          {address}
        </address>
      ) : (
        <p className="venue-placeholder">{t.awaitingVenue}</p>
      )}
      <div className="action-grid">
        {event.mapsUrl && (
          <a className={`btn btn-${onDark ? "gold" : "primary"}`} href={event.mapsUrl}>
            <MapPin aria-hidden="true" />
            {t.viewOnMap}
          </a>
        )}
        <Button href={googleCalendarUrl(event, locale)} external variant={onDark ? "on-dark" : "ghost"}>
          <CalendarPlus aria-hidden="true" />
          {t.addToCalendar}
        </Button>
        <Button variant={onDark ? "on-dark" : "ghost"} onClick={onDownload}>
          <Download aria-hidden="true" />
          {t.downloadCalendar}
        </Button>
      </div>
    </article>
  )
}
