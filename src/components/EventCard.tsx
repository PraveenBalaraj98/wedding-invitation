import { MapPin } from "lucide-react"
import { useLocale } from "../context/LocaleContext.tsx"
import { addressForDisplay, venueForDisplay, type WeddingEvent } from "../data/weddingConfig.ts"
import { CalendarMenu } from "./CalendarMenu.tsx"

export function EventCard({ event }: { event: WeddingEvent }) {
  const { locale, t } = useLocale()
  const title = t.eventTitles[event.id]
  const address = addressForDisplay(event.address, locale)
  const venue = venueForDisplay(event.venueName, locale)
  const onDark = event.id === "chennai-reception"

  return (
    <article className={`event-card event-${event.id === "chennai-reception" ? "chennai" : event.id === "wedding-ceremony" ? "wedding" : "bengaluru"}`}>
      <p className="event-kicker">{t.eventKickers[event.id]}</p>
      <h3>{title}</h3>
      <p>
        <strong>{t.dateLabel}: </strong>
        {event.dateLabel[locale]}
      </p>
      <p className="event-time">
        <strong>{t.timeLabel}: </strong>
        {event.timeLabel[locale]}
      </p>
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
        <CalendarMenu event={event} onDark={onDark} />
      </div>
    </article>
  )
}
