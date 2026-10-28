import {
  namesFor,
  TIMEZONE,
  getCopy,
  type Locale,
  type WeddingEvent,
} from "../data/weddingConfig.ts"

function stamp(date: string, time: string): string {
  const [year, month, day] = date.split("-")
  const [hour, minute] = time.split(":")
  return `${year}${month}${day}T${hour}${minute}00`
}

function nextCalendarDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number)
  const next = new Date(Date.UTC(year, month - 1, day + 1))
  return next.toISOString().slice(0, 10)
}

function endStamp(event: WeddingEvent): string | null {
  if (!event.end) return null
  const date = event.end > event.start ? event.date : nextCalendarDate(event.date)
  return stamp(date, event.end)
}

export function calendarTitle(event: WeddingEvent, locale: Locale): string {
  const names = namesFor(locale)
  return `${getCopy(locale).eventTitles[event.id]} — ${names.brideGiven} & ${names.groomGiven}`
}

export function describeEvent(event: WeddingEvent, locale: Locale): string {
  const text = getCopy(locale)
  const lines = [event.dateLabel[locale], event.timeLabel[locale]]

  if (event.schedule.length > 0) {
    for (const item of event.schedule) {
      lines.push(`${item.label[locale]}: ${item.clock[locale]}`)
    }
  }

  if (!event.end) lines.push(text.endUnconfirmed)

  if (event.venueName) lines.push(event.venueName)
  if (event.address) lines.push(event.address)
  else lines.push(text.awaitingVenue)

  if (event.mapsUrl) lines.push(event.mapsUrl)

  return lines.join("\n")
}

export function googleCalendarUrl(event: WeddingEvent, locale: Locale): string {
  const start = stamp(event.date, event.start)
  const end = endStamp(event) ?? start
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: calendarTitle(event, locale),
    dates: `${start}/${end}`,
    ctz: TIMEZONE,
    details: describeEvent(event, locale),
  })

  if (event.address) {
    const location = event.venueName ? `${event.venueName}, ${event.address}` : event.address
    params.set("location", location)
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\n|\r/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

function foldLine(line: string): string {
  const encoder = new TextEncoder()
  if (encoder.encode(line).length <= 75) return line

  const parts: string[] = []
  let current = ""
  let currentBytes = 0

  for (const char of line) {
    const size = encoder.encode(char).length
    const limit = parts.length === 0 ? 75 : 74
    if (current && currentBytes + size > limit) {
      parts.push(current)
      current = char
      currentBytes = size
    } else {
      current += char
      currentBytes += size
    }
  }
  if (current) parts.push(current)

  return parts.map((part, index) => (index === 0 ? part : ` ${part}`)).join("\r\n")
}

function formatUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")
}

export function buildEventIcs(event: WeddingEvent, locale: Locale, now: Date = new Date()): string {
  const end = endStamp(event)
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pushpalatha and Gokul Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    `TZID:${TIMEZONE}`,
    `X-LIC-LOCATION:${TIMEZONE}`,
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "DTSTART:19700101T000000",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${event.id}-pushpalatha-gokul@wedding-invitation`,
    `DTSTAMP:${formatUtc(now)}`,
    `DTSTART;TZID=${TIMEZONE}:${stamp(event.date, event.start)}`,
  ]

  if (end) lines.push(`DTEND;TZID=${TIMEZONE}:${end}`)
  else lines.push("X-END-UNCONFIRMED:TRUE")

  lines.push(
    foldLine(`SUMMARY:${escapeIcs(calendarTitle(event, locale))}`),
    foldLine(`DESCRIPTION:${escapeIcs(describeEvent(event, locale))}`),
  )

  if (event.address) {
    const location = event.venueName ? `${event.venueName}, ${event.address}` : event.address
    lines.push(foldLine(`LOCATION:${escapeIcs(location)}`))
  }

  lines.push("END:VEVENT", "END:VCALENDAR")
  return `${lines.join("\r\n")}\r\n`
}

export type CalendarOffer = "shared" | "downloaded" | "cancelled" | "failed"

/**
 * Hands the guest one .ics file. Phones that can share files open the system
 * share sheet, where a calendar app can import it. Other browsers download the
 * same file. This never also opens Google Calendar.
 */
export async function offerCalendarFile(event: WeddingEvent, locale: Locale): Promise<CalendarOffer> {
  const ics = buildEventIcs(event, locale)
  const filename = `${event.id}.ics`
  const file = new File([ics], filename, { type: "text/calendar" })

  if (typeof navigator.share === "function" && typeof navigator.canShare === "function") {
    try {
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: calendarTitle(event, locale) })
        return "shared"
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled"
    }
  }

  try {
    downloadTextFile(filename, ics, "text/calendar;charset=utf-8")
    return "downloaded"
  } catch {
    return "failed"
  }
}

export function downloadTextFile(filename: string, contents: string, mimeType: string): void {
  const blob = new Blob([contents], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
