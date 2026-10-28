import { describe, expect, it } from "vitest"
import {
  SCROLL_HINT_DELAY_MS,
  SCROLL_HINT_MOVE_MS,
  SCROLL_HINT_NUDGE_PX,
  SCROLL_HINT_PAUSE_MS,
  easeInOut,
  shouldReturnToOrigin,
  shouldRunScrollHint,
} from "./scrollHint.ts"

describe("scroll hint", () => {
  it("keeps the first movement inside the requested timing", () => {
    const motion = SCROLL_HINT_MOVE_MS * 2 + SCROLL_HINT_PAUSE_MS
    expect(SCROLL_HINT_DELAY_MS).toBeGreaterThanOrEqual(800)
    expect(SCROLL_HINT_DELAY_MS).toBeLessThanOrEqual(1200)
    expect(SCROLL_HINT_NUDGE_PX).toBeGreaterThanOrEqual(50)
    expect(SCROLL_HINT_NUDGE_PX).toBeLessThanOrEqual(70)
    expect(motion).toBeGreaterThanOrEqual(1600)
    expect(motion).toBeLessThanOrEqual(2200)
    expect(SCROLL_HINT_DELAY_MS + motion).toBeLessThanOrEqual(3200)
  })

  it("runs once, only from the top, and skips reduced motion and restored history", () => {
    const ready = { scrollY: 0, reducedMotion: false, navigationType: "navigate", alreadyPlayed: false }
    expect(shouldRunScrollHint(ready)).toBe(true)
    expect(shouldRunScrollHint({ ...ready, alreadyPlayed: true })).toBe(false)
    expect(shouldRunScrollHint({ ...ready, reducedMotion: true })).toBe(false)
    expect(shouldRunScrollHint({ ...ready, navigationType: "back_forward" })).toBe(false)
    expect(shouldRunScrollHint({ ...ready, scrollY: 40 })).toBe(false)
  })

  it("does not pull the page back after the guest has scrolled away", () => {
    expect(shouldReturnToOrigin(60, 60)).toBe(true)
    expect(shouldReturnToOrigin(240, 60)).toBe(false)
    expect(easeInOut(0)).toBe(0)
    expect(easeInOut(1)).toBe(1)
    expect(easeInOut(0.5)).toBe(0.5)
  })
})
