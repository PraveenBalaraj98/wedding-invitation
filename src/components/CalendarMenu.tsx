import { CalendarPlus } from "lucide-react"
import { useLocale } from "../context/LocaleContext.tsx"
import { googleCalendarUrl } from "../utils/calendar.ts"
import type { WeddingEvent } from "../data/weddingConfig.ts"

export function CalendarMenu({ event, onDark = false }: { event: WeddingEvent; onDark?: boolean }) {
  const { locale, t } = useLocale()
  if (!event.date || !event.start || !event.end || !event.venueName || !event.address) return null

  return (
    <a
      className={`btn btn-${onDark ? "on-dark" : "ghost"}`}
      href={googleCalendarUrl(event, locale)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CalendarPlus aria-hidden="true" />
      {t.addToCalendar}
    </a>
  )
}
