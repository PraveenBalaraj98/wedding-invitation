import { MUHURTHAM_START } from "../data/weddingConfig.ts"

export { MUHURTHAM_START }

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Remaining time until the muhurtham instant.
 * Returns null once that instant has been reached, so the display never goes negative.
 * `now` and `target` are absolute instants (milliseconds since the Unix epoch).
 * The target itself is 11 November 2026, 06:00 in Asia/Kolkata.
 */
export function getCountdown(now: number, target: number): CountdownParts | null {
  const diff = target - now
  if (diff <= 0) return null

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}
