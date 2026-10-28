import { useEffect, useState } from "react"
import { useLocale } from "../context/LocaleContext.tsx"
import {
  SCROLL_HINT_DELAY_MS,
  SCROLL_HINT_MOVE_MS,
  SCROLL_HINT_NUDGE_PX,
  SCROLL_HINT_PAUSE_MS,
  easeInOut,
  shouldReturnToOrigin,
  shouldRunScrollHint,
} from "../utils/scrollHint.ts"

const INTENT_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "])

let hintPlayed = false

function navigationType(): string | undefined {
  const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
  return entry?.type
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function ScrollHint({ active }: { active: boolean }) {
  const { t } = useLocale()
  const [quiet, setQuiet] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const section = document.getElementById("invitation")
    if (!section) return
    const update = () => {
      const bottom = section.getBoundingClientRect().bottom
      setHidden(bottom < 72)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  useEffect(() => {
    if (!active || hintPlayed) return
    let cancelled = false
    let frame = 0
    let intendedY = window.scrollY
    let suppressUntil = 0
    const timers: number[] = []

    const cancelFrame = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const stop = () => {
      cancelled = true
      cancelFrame()
      for (const timer of timers) window.clearTimeout(timer)
    }

    const guestMoved = () => Math.abs(window.scrollY - intendedY) > 3

    const onScroll = () => {
      if (performance.now() < suppressUntil) return
      if (guestMoved()) {
        setQuiet(true)
        stop()
      }
    }

    const onIntent = (event: Event) => {
      if (event.type === "keydown" && !INTENT_KEYS.has((event as KeyboardEvent).key)) return
      setQuiet(true)
      stop()
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    const glide = (from: number, to: number) =>
      new Promise<boolean>((resolve) => {
        const started = performance.now()
        const step = (now: number) => {
          if (cancelled) {
            resolve(false)
            return
          }
          const progress = Math.min(1, (now - started) / SCROLL_HINT_MOVE_MS)
          intendedY = from + (to - from) * easeInOut(progress)
          const root = document.documentElement
          const previous = root.style.scrollBehavior
          root.style.scrollBehavior = "auto"
          window.scrollTo(0, intendedY)
          root.style.scrollBehavior = previous
          intendedY = window.scrollY
          suppressUntil = performance.now() + 80
          if (progress < 1) frame = requestAnimationFrame(step)
          else resolve(true)
        }
        frame = requestAnimationFrame(step)
      })

    const begin = async () => {
      await wait(SCROLL_HINT_DELAY_MS)
      if (cancelled) return
      const reducedMotion = prefersReducedMotion()
      const scrollY = window.scrollY
      if (!shouldRunScrollHint({
        scrollY,
        reducedMotion,
        navigationType: navigationType(),
        alreadyPlayed: hintPlayed,
      })) {
        hintPlayed = true
        return
      }
      hintPlayed = true
      intendedY = scrollY
      const nudged = scrollY + SCROLL_HINT_NUDGE_PX
      const moved = await glide(scrollY, nudged)
      if (!moved || cancelled) return
      await wait(SCROLL_HINT_PAUSE_MS)
      if (cancelled || !shouldReturnToOrigin(window.scrollY, intendedY)) return
      await glide(window.scrollY, scrollY)
      if (!cancelled) setQuiet(true)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("wheel", onIntent, { passive: true })
    window.addEventListener("touchstart", onIntent, { passive: true })
    window.addEventListener("pointerdown", onIntent)
    window.addEventListener("keydown", onIntent)
    void begin()

    return () => {
      stop()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("wheel", onIntent)
      window.removeEventListener("touchstart", onIntent)
      window.removeEventListener("pointerdown", onIntent)
      window.removeEventListener("keydown", onIntent)
    }
  }, [active])

  if (!active) return null

  return (
    <p className={`scroll-hint${quiet ? " is-quiet" : ""}${hidden ? " is-hidden" : ""}`} aria-hidden="true">
      <span className="scroll-hint-label">{t.scrollHint}</span>
      <span className="scroll-hint-chevron" />
    </p>
  )
}
