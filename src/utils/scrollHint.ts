export const SCROLL_HINT_DELAY_MS = 1000
export const SCROLL_HINT_NUDGE_PX = 60
export const SCROLL_HINT_MOVE_MS = 680
export const SCROLL_HINT_PAUSE_MS = 360

const SCROLL_AT_REST_PX = 8
const RETURN_TOLERANCE_PX = 4

export function easeInOut(progress: number): number {
  const t = Math.min(1, Math.max(0, progress))
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

export function shouldRunScrollHint(input: {
  scrollY: number
  reducedMotion: boolean
  navigationType?: string
  alreadyPlayed: boolean
}): boolean {
  if (input.alreadyPlayed || input.reducedMotion) return false
  if (input.navigationType === "back_forward") return false
  return input.scrollY <= SCROLL_AT_REST_PX
}

export function shouldReturnToOrigin(currentY: number, nudgedY: number): boolean {
  return Math.abs(currentY - nudgedY) <= RETURN_TOLERANCE_PX
}
