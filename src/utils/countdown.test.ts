import { describe, expect, it } from "vitest"
import { MUHURTHAM_START, getCountdown } from "./countdown.ts"

describe("muhurtham countdown", () => {
  it("targets 6:00 AM Asia/Kolkata on 11 November 2026", () => {
    expect(MUHURTHAM_START.toISOString()).toBe("2026-11-11T00:30:00.000Z")
  })

  it("is exactly one day before at 6:00 AM IST on 10 November", () => {
    const now = new Date("2026-11-10T06:00:00+05:30").getTime()
    expect(getCountdown(now, MUHURTHAM_START.getTime())).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  })

  it("counts 21 days and 6 hours from the start of 21 October IST", () => {
    const now = new Date("2026-10-21T00:00:00+05:30").getTime()
    expect(getCountdown(now, MUHURTHAM_START.getTime())).toEqual({
      days: 21,
      hours: 6,
      minutes: 0,
      seconds: 0,
    })
  })

  it("shows one second remaining and never a negative value", () => {
    const target = MUHURTHAM_START.getTime()
    expect(getCountdown(target - 1000, target)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
    })
    expect(getCountdown(target, target)).toBeNull()
    expect(getCountdown(target + 60_000, target)).toBeNull()
  })
})
