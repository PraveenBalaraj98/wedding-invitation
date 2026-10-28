import { describe, expect, it } from "vitest"
import { BENGALURU_ADDRESS, CHENNAI_ADDRESS, CHENNAI_MAPS_URL, MAPS_URL, eventById } from "../data/weddingConfig.ts"
import { buildEventIcs, describeEvent, googleCalendarUrl } from "./calendar.ts"

const now = new Date("2026-10-21T10:15:00.000Z")

function unfold(ics: string): string {
  return ics.replace(/\r\n[ \t]/g, "")
}

describe("calendar exports", () => {
  it("builds the Bengaluru reception from 11:30 to 14:30 IST", () => {
    const event = eventById("bengaluru-reception")
    const ics = unfold(buildEventIcs(event, "en", now))
    const link = googleCalendarUrl(event, "en")

    expect(ics).toContain("DTSTART;TZID=Asia/Kolkata:20261129T113000")
    expect(ics).toContain("DTEND;TZID=Asia/Kolkata:20261129T143000")
    expect(ics).toContain("Asthitva Teak Meadows")
    expect(ics).toContain(BENGALURU_ADDRESS.replace(/,/g, "\\,"))
    expect(ics).toContain(MAPS_URL)
    expect(link).toContain("ctz=Asia%2FKolkata")
    expect(link).toContain("dates=20261129T113000%2F20261129T143000")
    expect(describeEvent(event, "en")).toContain("11:30 AM–2:30 PM")
  })

  it("uses the supplied Chennai address for the muhurtham", () => {
    const event = eventById("wedding-ceremony")
    const ics = unfold(buildEventIcs(event, "en", now))
    const link = googleCalendarUrl(event, "en")

    expect(ics).toContain("DTSTART;TZID=Asia/Kolkata:20261111T060000")
    expect(ics).toContain("DTEND;TZID=Asia/Kolkata:20261111T073000")
    expect(ics).toContain("Soundrapandia Kalyana Mandapam")
    expect(ics).toContain(CHENNAI_ADDRESS.replace(/,/g, "\\,"))
    expect(ics).toContain(CHENNAI_MAPS_URL)
    expect(ics).not.toContain(MAPS_URL)
    expect(ics).not.toContain("Awaiting confirmed venue details.")
    expect(link).toContain("dates=20261111T060000%2F20261111T073000")
    expect(link).toContain("location=")
  })

  it("keeps the Chennai reception from 6:00 PM to 10:00 PM IST", () => {
    const event = eventById("chennai-reception")
    const ics = unfold(buildEventIcs(event, "en", now))
    const link = googleCalendarUrl(event, "en")

    expect(ics).toContain("DTSTART;TZID=Asia/Kolkata:20261110T180000")
    expect(ics).toContain("DTEND;TZID=Asia/Kolkata:20261110T220000")
    expect(ics).not.toContain("X-END-UNCONFIRMED")
    expect(ics).toContain("6:00 PM–10:00 PM")
    expect(ics).toContain("Music: 7:00 PM")
    expect(ics).toContain("Dinner: 7:30 PM")
    expect(ics).toContain("Soundrapandia Kalyana Mandapam")
    expect(ics).toContain(CHENNAI_ADDRESS.replace(/,/g, "\\,"))
    expect(ics).toContain(CHENNAI_MAPS_URL)
    expect(ics).not.toContain("Awaiting confirmed venue details.")
    expect(ics).not.toContain("Kachohalli")
    expect(ics).not.toContain("Asthitva")
    expect(link).toContain("dates=20261110T180000%2F20261110T220000")
    expect(link).toContain("location=")
    expect(ics).toContain("UID:chennai-reception-pushpalatha-gokul@wedding-invitation")
  })
})
