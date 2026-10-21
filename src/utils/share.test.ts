import { describe, expect, it } from "vitest"
import { BRIDE, GROOM, MAPS_URL } from "../data/weddingConfig.ts"
import { buildInvitationMessage, whatsAppUrl } from "./share.ts"

describe("invitation sharing", () => {
  it("includes the couple, the three events, and the page link", () => {
    const page = "https://wedding.example/"
    const message = buildInvitationMessage("en", page)

    expect(message).toContain(BRIDE)
    expect(message).toContain(GROOM)
    expect(message).toContain("Tuesday, 10 November 2026")
    expect(message).toContain("Wednesday, 11 November 2026")
    expect(message).toContain("Sunday, 29 November 2026")
    expect(message).toContain("6:00 AM–7:30 AM")
    expect(message).toContain("11:30 AM–2:30 PM")
    expect(message).toContain("Asthitva Teak Meadows")
    expect(message).toContain(page)
    expect(message).toContain("Madhanandapuram")
    expect(message).toContain("562162")
    expect(whatsAppUrl(message)).toBe(`https://wa.me/?text=${encodeURIComponent(message)}`)
    expect(message).not.toContain(MAPS_URL)
  })
})
