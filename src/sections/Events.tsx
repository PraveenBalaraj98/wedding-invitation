import { useEffect, useState } from "react"
import { events, type EventId } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { EventCard } from "../components/EventCard.tsx"
import { useCarouselSwipe } from "../hooks/useCarouselSwipe.ts"
import { EVENT_SELECT } from "./CelebrationScroll.tsx"

const CAROUSEL_QUERY = "(max-width: 767px)"

function useMobileCarousel() {
  const [carousel, setCarousel] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(CAROUSEL_QUERY).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(CAROUSEL_QUERY)
    const onChange = () => setCarousel(media.matches)
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return carousel
}

export function Events() {
  const { t } = useLocale()
  const carousel = useMobileCarousel()
  const [index, setIndex] = useState(0)
  const swipe = useCarouselSwipe({ index, count: events.length, onChange: setIndex })

  useEffect(() => {
    function onSelect(selected: Event) {
      const id = (selected as CustomEvent<EventId>).detail
      const next = events.findIndex((item) => item.id === id)
      if (next >= 0) setIndex(next)
    }
    window.addEventListener(EVENT_SELECT, onSelect)
    return () => window.removeEventListener(EVENT_SELECT, onSelect)
  }, [])

  return (
    <section id="events" className="section">
      <div className="section-inner event-stage">
        {carousel && <p className="section-kicker">{t.eventPosition(index + 1, events.length)}</p>}
        <h2>{t.eventsHeading}</h2>
        {carousel ? (
          <div
            className="carousel event-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label={t.eventsHeading}
            {...swipe.regionProps}
          >
            <div className="carousel-viewport" {...swipe.viewportProps}>
              <div className={swipe.trackClassName} style={swipe.trackStyle}>
                {events.map((event) => (
                  <div className="carousel-slide" key={event.id}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-dots event-dots" role="tablist" aria-label={t.eventsHeading}>
              {events.map((event, eventIndex) => (
                <button
                  key={event.id}
                  type="button"
                  role="tab"
                  className={eventIndex === index ? "is-current" : ""}
                  aria-label={t.eventPosition(eventIndex + 1, events.length)}
                  aria-selected={eventIndex === index}
                  onClick={() => swipe.go(eventIndex)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="event-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
