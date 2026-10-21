import { events, type EventId } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"

export const EVENT_SELECT = "wedding:select-event"

export function CelebrationScroll() {
  const { locale, t } = useLocale()

  function openEvent(id: EventId) {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
    window.dispatchEvent(new CustomEvent<EventId>(EVENT_SELECT, { detail: id }))
  }

  return (
    <section id="scroll" className="section">
      <div className="section-inner">
        <h2>{t.scrollTitle}</h2>
        <p className="section-intro">{t.eventsIntro}</p>
        <div className="glance-grid">
          {events.map((event) => (
            <button key={event.id} className="glance-card" type="button" onClick={() => openEvent(event.id)}>
              <span className="event-kicker">{t.eventKickers[event.id]}</span>
              <strong>{t.eventTitles[event.id]}</strong>
              <span>{event.dateLabel[locale]}</span>
              <span>{event.timeLabel[locale]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
