import { describe, expect, it } from "vitest"
import { MAPS_URL } from "../data/weddingConfig.ts"
import { directionsUrl, viewOnMapsUrl } from "./maps.ts"

describe("maps links", () => {
  it("opens the supplied destination and does not replace it", () => {
    expect(viewOnMapsUrl(MAPS_URL)).toBe("https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9")
    expect(directionsUrl(MAPS_URL)).toBe(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_URL)}`,
    )
    expect(directionsUrl(MAPS_URL)).toContain("WYPcB7q9DJuc2n3r9")
  })
})
