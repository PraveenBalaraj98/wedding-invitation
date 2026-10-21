import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { events, type EventId } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { EventCard } from "../components/EventCard.tsx"
import { EVENT_SELECT } from "./CelebrationScroll.tsx"

export function Events() {
  const { t } = useLocale()
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const event = events[index]
  const last = events.length - 1

  useEffect(() => {
    function onSelect(selected: Event) {
      const id = (selected as CustomEvent<EventId>).detail
      const next = events.findIndex((item) => item.id === id)
      if (next >= 0) setIndex(next)
    }
    window.addEventListener(EVENT_SELECT, onSelect)
    return () => window.removeEventListener(EVENT_SELECT, onSelect)
  }, [])

  if (!event) return null

  return (
    <section id="events" className="section">
      <div className="section-inner event-stage">
        <p className="section-kicker">{t.eventPosition(index + 1, events.length)}</p>
        <h2>{t.eventsHeading}</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={reduced ? false : { opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -36 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <EventCard event={event} />
          </motion.div>
        </AnimatePresence>
        <div className="event-pager">
          <button className="btn btn-ghost" type="button" onClick={() => setIndex((value) => value - 1)} disabled={index === 0}>
            {t.prevEvent}
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => setIndex((value) => value + 1)} disabled={index === last}>
            {t.nextEvent}
          </button>
        </div>
      </div>
    </section>
  )
}
